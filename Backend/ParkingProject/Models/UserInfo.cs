using System;

namespace ParkingProject.Models
{
    public class UserInfo
    {
        public Guid Id { get; set; }

        public string Email { get; set; }

        public string UserName { get; set; }

        public bool IsOperator { get; set; }
    }
}