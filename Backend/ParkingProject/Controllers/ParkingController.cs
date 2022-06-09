using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ParkingProject.Database;
using ParkingProject.Models;

namespace ParkingProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkingController : Controller
    {
        private readonly ApplicationContext _context;

        public ParkingController(ApplicationContext context)
        {
            _context = context;
        }


        [HttpGet]
        public ActionResult<IEnumerable<Parking>> Get()
        {
            var parkings = _context.Parkings.ToList();

            return Ok(parkings);
        }

        [HttpGet("{id}")]
        public ActionResult<Parking> Get(Guid id)
        {
            var parking = _context.Parkings.FirstOrDefault(r => r.Id == id);
            if (parking == null)
            {
                return NotFound();
            }

            return Ok(parking);
        }

        [HttpPost]
        public ActionResult<Parking> Post([FromBody] ParkingRequest queryParking)
        {
            var id = Guid.NewGuid();
            var car = _context.Cars.FirstOrDefault(e => e.Id == queryParking.CarId);
            dynamic user = _context.Users.FirstOrDefault(e => e.Id == queryParking.UserId);
            dynamic parking;
            ParkingState parkingState = new ParkingState
            { Id = Guid.NewGuid(), 
                Inside = true ,
            };
            if (user ==null){
                 user = _context.Operators.FirstOrDefault(e => e.Id == queryParking.UserId);
                parking = new Parking
                {
                    Id = id,
                    CarId = queryParking.CarId,
                    UserId = queryParking.UserId,
                    UserName = user.Name,
                    DateEntry = DateTime.Now,
                    ExpectedDateExit = queryParking?.ExpectedDateExit,
                    ParkingState = parkingState,
                };
            }
            else
            {
 parking = new Parking {
                Id = id,
                CarId = queryParking.CarId,
                UserId = queryParking.UserId,
                UserName = user.UserName,
                DateEntry = DateTime.Now,
                ExpectedDateExit = queryParking?.ExpectedDateExit,
                ParkingState = parkingState,
            };
            }
            

            _context.Parkings.Add(parking);
            _context.SaveChanges();

            return Ok(parking);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(Guid id)
        {
            var parking = _context.Parkings.FirstOrDefault(r => r.Id == id);
            if (parking == null)
            {
                return NotFound();
            }

            _context.Parkings.Remove(parking);
            _context.SaveChanges();

            return NoContent();
        }
    }
}