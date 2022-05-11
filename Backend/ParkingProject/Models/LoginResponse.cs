using System.Collections.Generic;

namespace ParkingProject.Models
{
    public class LoginResponse
    {
        public JwtToken Token { get; set; }

        public bool IsOperator { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}