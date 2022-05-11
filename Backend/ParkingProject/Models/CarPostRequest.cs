using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkingProject.Models
{
    public class CarPostRequest
    {
        public Guid BrandId { get; set; }

        public Guid ModelId { get; set; }

        public float ParkingCost { get; set; }
    }
}
