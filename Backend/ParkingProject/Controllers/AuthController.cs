using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ParkingProject.Models;
using ParkingProject.Services;
using ParkingProject.Database;

namespace ParkingProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ApplicationContext _context;

        // TODO: inject Logging
        public AuthController(IUserService userService, ApplicationContext context)
        {
            _userService = userService;
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var entity = await _userService.GetUserAsync(User);
            if (entity == null)
            {
                var oper = _context.Operators.FirstOrDefault(e => e.Name == "Leonid");
                if (oper != null)
                {
                    var operDto = new UserInfo
                    {
                        Id = oper.Id,
                        Email = oper.Name,
                        IsOperator = true,
                    };
                    return Ok(operDto);
                }
                return BadRequest();
            }
            var dto = new UserInfo
            {
                Id = entity.Id,
                Email = entity.Email,
                UserName = entity.UserName
            };
            return Ok(dto);
        }

        [HttpPost(nameof(Login))]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            var result = await _userService.LoginUserAsync(model);
            if (result.Errors.Any())
            {
                return BadRequest(result.Errors);
            }

            return Ok(result);
        }

        [HttpPost(nameof(Register))]
        public async Task<IActionResult> Register(UserRegisterRequest model)
        {
            var result = await _userService.RegisterUserAsync(model);
            if (result.Errors.Any())
            {
                return BadRequest(result.Errors);
            }

            return Ok(result);
        }
    }
}