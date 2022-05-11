using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ParkingProject.Database;

namespace ParkingProject.Models
{
    public class BrandPostRequest
    {
        public string BrandName { get; set; }

        public List<Model>? ListModels { get; set; }
    }
}
