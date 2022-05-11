using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkingProject.Database
{
    public class User : IdentityUser<Guid>
    {
        public Guid Id { get; set; }

        public List<Car> ? Cars { get; set; }

        public List<DateEntryAndExit>? ListDateTimesEntryAndExit { get; set; }

        public string? Discounts { get; set; }
    }
}
