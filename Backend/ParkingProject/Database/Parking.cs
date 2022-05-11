﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkingProject.Database
{
    public class Parking
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public Guid CarId { get; set; }

        public ParkingState ? ParkingState { get; set; }

        public DateTime ? DateEntry { get; set; }

        public DateTime? ExpectedDateExit { get; set; }

        public DateTime? ActualDateExit { get; set; }
    }
}
