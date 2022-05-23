using ParkingProject.Controllers;
using ParkingProject.Services;
using System;
using Xunit;

namespace TestParkingProject
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            var brandController = new UserService();
            bool result = brandController.MethodForTest(true);
            Assert.True(result, "true  is   true, congratulations!");
        }
    }
}
