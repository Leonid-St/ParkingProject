﻿using System;
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
    public class ModelController : Controller
    {
        private readonly ApplicationContext _context;

        public ModelController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Brand>> Get()
        {
            var model = _context.Models.ToList();

            return Ok(model);
        }

        [HttpGet("{id}")]
        public ActionResult<Model> Get(Guid id)
        {
            var model = _context.Models.FirstOrDefault(r => r.Id == id);
            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        [HttpPost]
        public ActionResult<Model> Post([FromBody] ModalPostRequest modalPostRequest)
        {
            var id = Guid.NewGuid();
            var model = new Model
            {
                Id = id,
                ModelName = modalPostRequest.ModelName,
                BrandId = modalPostRequest?.BrandId,
            };

            _context.Models.Add(model);
            _context.SaveChanges();

            return Ok(model);
        }

      /*  public ActionResult Edit(Model newModal)
        {
            var model = _context.Models.FirstOrDefault(e => e.Id == newModal.Id);
            if (model != null)
            {
                _context.Models.Update(model);
                return Ok();
            }
            return NoContent();
        }*/

        [HttpDelete("{id}")]
        public ActionResult Delete(Guid id)
        {
            var model = _context.Models.FirstOrDefault(r => r.Id == id);
            if (model == null)
            {
                return NotFound();
            }

            _context.Models.Remove(model);
            _context.SaveChanges();

            return NoContent();
        }
    }
}