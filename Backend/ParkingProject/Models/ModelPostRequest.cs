using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkingProject.Models
{
    public class ModelPostRequest
    {
        public Guid BrandId { get; set; }

        public string ModelName { get; set; }
    }
}
