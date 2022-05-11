using System.Security.Claims;
using System.Threading.Tasks;
using ParkingProject.Database;
using ParkingProject.Models;

namespace ParkingProject.Services
{
    public interface IUserService
    {
        Task<User> GetUserAsync(ClaimsPrincipal claimsPrincipal);

        Task<UserRegisterResponse> RegisterUserAsync(UserRegisterRequest model);

        Task<LoginResponse> LoginUserAsync(LoginRequest model);
    }
}