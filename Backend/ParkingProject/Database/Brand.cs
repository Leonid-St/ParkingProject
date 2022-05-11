using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkingProject.Database
{
    public class Brand
    {
        public Guid Id { get; set; }

        public string BrandName { get; set; }

        public List<Model>? ListModels { get; set; }
    }
}
