using System.Collections.Generic;

namespace ParkingProject.Models

{
    public class UserRegisterResponse
    {
        public IEnumerable<string> Errors { get; set; }

        public bool IsSucceed { get; set; }
    }
}