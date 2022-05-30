using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ParkingProject.Models;
using ParkingProject.Services;
using ParkingProject.Database;
using System.Collections.Generic;

namespace ParkingProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly ApplicationContext _context;

        // TODO: inject Logging
        public UserController(IUserService userService, ApplicationContext context)
        {
            _userService = userService;
            _context = context;
        }
        // GET: DriverController
        [HttpGet]
        public ActionResult<IEnumerable<User>> Get()
        {
            var users = _context.Users.ToList();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public ActionResult<User> Get(Guid id)
        {
            var user = _context.Users.FirstOrDefault(r => r.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST: DriverController/Create
        /*[HttpPost]
        public ActionResult<User> Post([FromBody] UserReRequest driverRegisterRequest)
        {
            var car = _context.Cars.FirstOrDefault(c => c.Id == driverRegisterRequest.CarBrandId);
            var carList = new List<Car>();
            carList.Add(car);
            var id = Guid.NewGuid();
            var parking = new User
            {
                Id = id,
                Email = driverRegisterRequest.Email,
                UserName = driverRegisterRequest.UserName,
                Cars = carList,
                User = driverRegisterRequest.User,
                DateEntry = DateTime.Now,
                ExpectedDateExit = driverRegisterRequest.ExpectedDateExit,
            };

            _context.Parkings.Add(parking);
            _context.SaveChanges();

            return Ok(parking);
        }*/

    }
}
