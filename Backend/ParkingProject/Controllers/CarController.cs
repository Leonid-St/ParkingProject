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
    public class CarController : Controller
    {
        private readonly ApplicationContext _context;

        public CarController(ApplicationContext context)
        {
            _context = context;
        }


        [HttpGet]
        public ActionResult<IEnumerable<Car>> Get()
        {
            var cars = _context.Cars.ToList();

            return Ok(cars);
        }

        [HttpGet("{id}")]
        public ActionResult<Parking> Get(Guid id)
        {
            var car = _context.Cars.FirstOrDefault(r => r.Id == id);
            if (car == null)
            {
                return NotFound();
            }

            return Ok(car);
        }

        [HttpPost]
        public ActionResult<Car> Post([FromBody] CarPostRequest carPostRequest)
        {
            var id = Guid.NewGuid();
            var brand = _context.Brands.FirstOrDefault(e => e.Id == carPostRequest.BrandId);
            var model = _context.Models.FirstOrDefault(e => e.Id == carPostRequest.ModelId);
            var car = new Car
            {
                Id = id,
                BrandId = carPostRequest.BrandId,
                BrandName = brand.BrandName,
                ModelId = carPostRequest.ModelId,
                ModelName = model.ModelName,
                ParkingCost = carPostRequest.ParkingCost,
            };

            _context.Cars.Add(car);
            _context.SaveChanges();

            return Ok(car);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(Guid id)
        {
            var car = _context.Cars.FirstOrDefault(r => r.Id == id);
            if (car == null)
            {
                return NotFound();
            }

            _context.Cars.Remove(car);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
