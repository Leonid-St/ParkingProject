using System;

namespace ParkingProject.Models
{
    public class UserRegisterRequest
    {
        public string Email { get; set; }

        public string UserName { get; set; }

        public Guid? CarId { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}