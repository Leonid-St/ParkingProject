using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkingProject.Database
{
    public class Model
    {
        public Guid Id { get; set; }

        public Guid? BrandId { get; set; }

        public string BrandName { get; set; }

        public string ModelName { get; set; }
    }
}
