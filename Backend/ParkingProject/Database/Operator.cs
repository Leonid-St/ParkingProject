using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
namespace ParkingProject.Database
{
    public class Operator : IdentityUser<Guid>
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Password { get; set; }
    }
}
