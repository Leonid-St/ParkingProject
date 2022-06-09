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
    public class BrandController : Controller
    {
        private readonly ApplicationContext _context;

        public BrandController(ApplicationContext context)
        {
            _context = context;
        }


        [HttpGet]
        public ActionResult<IEnumerable<Brand>> Get()
        {
            var brands = _context.Brands.ToList();

            return Ok(brands);
        }

        [HttpGet("{id}")]
        public ActionResult<Brand> Get(Guid id)
        {
            var brand = _context.Brands.FirstOrDefault(r => r.Id == id);
            if (brand == null)
            {
                return NotFound();
            }

            return Ok(brand);
        }

        [HttpPost]
        public ActionResult<Brand> Post([FromBody] BrandPostRequest brandPostRequest)
        {
            var id = Guid.NewGuid();
            var brand = new Brand
            {
                Id = id,
                Name = brandPostRequest.Name,
                ListModels = brandPostRequest?.ListModels,
            };

            _context.Brands.Add(brand);
            _context.SaveChanges();

            return Ok(brand);
        }

     
        [HttpDelete("{id}")]
        public ActionResult Delete(Guid id)
        {
            var brand = _context.Brands.FirstOrDefault(r => r.Id == id);
            if (brand == null)
            {
                return NotFound();
            }
            var models = _context.Models.Where(e => e.BrandId == brand.Id);
            _context.Models.RemoveRange(models);
            _context.SaveChanges();
            _context.Brands.Remove(brand);
            _context.SaveChanges();

            return NoContent();
        }
    }

   

}
