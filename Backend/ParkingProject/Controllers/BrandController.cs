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

        public BrandController()
        {
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
                BrandName = brandPostRequest.BrandName,
                ListModels = brandPostRequest?.ListModels,
            };

            _context.Brands.Add(brand);
            _context.SaveChanges();

            return Ok(brand);
        }

     /*   public ActionResult Edit(Brand newBrand)
        {
            var brand = _context.Brands.FirstOrDefault(e => e.Id == newBrand.Id);
            if (brand != null)
            {
                _context.Brands.Update(brand);
                return Ok();
            }
            return NoContent();
        }
*/
        [HttpDelete("{id}")]
        public ActionResult Delete(Guid id)
        {
            var brand = _context.Brands.FirstOrDefault(r => r.Id == id);
            if (brand == null)
            {
                return NotFound();
            }

            _context.Brands.Remove(brand);
            _context.SaveChanges();

            return NoContent();
        }
    }

    // GET: BrandController/Edit/5
    /*  public ActionResult Edit(int id)
      {
          return View();
      }

      // POST: BrandController/Edit/5
      [HttpPost]
      [ValidateAntiForgeryToken]
      public ActionResult Edit(int id, IFormCollection collection)
      {
          try
          {
              return RedirectToAction(nameof(Index));
          }
          catch
          {
              return View();
          }
      }

      // GET: BrandController/Delete/5
      public ActionResult Delete(int id)
      {
          return View();
      }

      // POST: BrandController/Delete/5
      [HttpPost]
      [ValidateAntiForgeryToken]
      public ActionResult Delete(int id, IFormCollection collection)
      {
          try
          {
              return RedirectToAction(nameof(Index));
          }
          catch
          {
              return View();
          }
      }*/

}
