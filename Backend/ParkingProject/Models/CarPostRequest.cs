using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkingProject.Models
{
    public class CarPostRequest
    {
        public Guid UserId { get; set; }

        public string BrandName { get; set; }

        public string ModelName { get; set; }

    }
}
