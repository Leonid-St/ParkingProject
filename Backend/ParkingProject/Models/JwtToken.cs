using System;

namespace ParkingProject.Models
{
    public class JwtToken
    {
        public string Token { get; set; }

        public DateTime? ExpireDate { get; set; }
    }
}