using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkingProject.Database
{
    public class DateEntryAndExit
    {
        public Guid Id { get; set; }

        public DateTime? DateEntry { get; set; }

        public DateTime? DateExit { get; set; }
    }
}
