using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ParkingProject.Database;

namespace ParkingProject.Models
{
    public class ParkingRequest
    {
        public Guid UserId { get; set; }

        public Guid CarId { get; set; }

        public DateTime? ExpectedDateExit { get; set; }
    }
}
