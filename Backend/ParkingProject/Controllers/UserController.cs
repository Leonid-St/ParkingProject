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


    }
}
