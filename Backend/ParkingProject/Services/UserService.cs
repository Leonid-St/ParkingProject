using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ParkingProject.Database;
using ParkingProject.Models;

namespace ParkingProject.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationContext _context;

        public UserService()
        {
        }

        public UserService(
            UserManager<User> userManager,
            IConfiguration configuration,
            ApplicationContext context)
        {
            _userManager = userManager;
            _configuration = configuration;
            _context = context;
        }

        public async Task<User> GetUserAsync(ClaimsPrincipal claimsPrincipal)
        {
            return await _userManager.GetUserAsync(claimsPrincipal);
        }


        public async Task<LoginResponse> LoginUserAsync(LoginRequest model)
        {

            var oper = _context.Operators.FirstOrDefault(e => e.Name == model.Email);
            if (oper != null)
            {
                if (model.Password == oper.Password)
                {
                    var claimsOper = new[]
                      {
                new Claim("Email", model.Email),
                new Claim(ClaimTypes.NameIdentifier, oper.Id.ToString())
            };

                    var keyOper = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AuthSettings:Key"]));

                    var tokenOper = new JwtSecurityToken(
                                   issuer: _configuration["AuthSettings:Issuer"],
                                   audience: _configuration["AuthSettings:Audience"],
                                   claims: claimsOper,
                                   expires: DateTime.Now.AddDays(30),
                                   signingCredentials: new SigningCredentials(keyOper, SecurityAlgorithms.HmacSha256));

                    string tokenOperAsString = new JwtSecurityTokenHandler().WriteToken(tokenOper);
                    return new LoginResponse
                    {
                        Errors = new List<string>(),
                        IsOperator = true,
                        Token = new JwtToken
                        {
                            Token = tokenOperAsString,
                            ExpireDate = tokenOper.ValidTo
                        }
                    };
                }
            }
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return new LoginResponse
                {
                    Errors = new[] { "There is no user with that Email address" }
                };
            }

            var result = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!result)
            {
                return new LoginResponse
                {
                    Errors = new[] { "Invalid password" }
                };
            }

            var claims = new[]
                       {
                new Claim("Email", model.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AuthSettings:Key"]));

            var token = new JwtSecurityToken(
                           issuer: _configuration["AuthSettings:Issuer"],
                           audience: _configuration["AuthSettings:Audience"],
                           claims: claims,
                           expires: DateTime.Now.AddDays(30),
                           signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

            string tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);

            return new LoginResponse
            {
                Errors = new List<string>(),
                IsOperator = false,
                Token = new JwtToken
                {
                    Token = tokenAsString,
                    ExpireDate = token.ValidTo
                }
            };
        }

        public bool MethodForTest(bool testValue)
        {
            if (testValue == true){
                return true;
            }else
            {
                return false;
            }
        }

        public async Task<UserRegisterResponse> RegisterUserAsync(UserRegisterRequest model)
        {
            if (model == null)
            {
                throw new NullReferenceException("NullReferenceException");
            }

            if (model.Password != model.ConfirmPassword)
            {
                return new UserRegisterResponse
                {
                    Errors = new[] { "Confirm password doesn't match the password" }
                };
            }
            var listCars = new List<Car>();
            if (model.CarId != null)
            {
                Car car = null;
                car = _context.Cars.FirstOrDefault(e => e.Id == model.CarId);
                listCars.Add(car);
            }

            var identityUser = new User
            {
                Email = model.Email,
                UserName = model.UserName,
                Cars = listCars,
            };

            var result = await _userManager.CreateAsync(identityUser, model.Password);

            if (!result.Succeeded)
            {
                return new UserRegisterResponse
                {
                    Errors = result.Errors.Select(e => e.Description)
                };
            }

            return new UserRegisterResponse() { Errors = new List<string>(), IsSucceed = true };
        }
    }
}