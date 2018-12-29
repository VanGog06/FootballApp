using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using System.Security.Claims;
using System.Text;
using FootballApp.Api.Helpers;
using FootballApp.Services.DataServices.Contracts;
using FootballApp.Services.Models.Users;
using Microsoft.Extensions.Options;

namespace FootballApp.Services.DataServices
{
    public class UserService : IUserService
    {
        private List<UserViewModel> users = new List<UserViewModel>
        {
            new UserViewModel {Id = 1, Email = "test@test.com", Password = "TestPassword", Username = "Pesho", FirstName = "Pesho", Lastname = "Peshov" }
        };

        private readonly AppSettings appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            this.appSettings = appSettings.Value;
        }

        public UserViewModel Authenticate(string username, string password)
        {
            var user = this.users.SingleOrDefault(u => u.Username == username && u.Password == password);

            if (user == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity
                (
                    new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.Id.ToString()),
                        //new Claim(ClaimTypes.Role, "Admin")
                    }
                ),
                Expires = DateTime.UtcNow.AddSeconds(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            user.Password = null;

            return user;
        }

        public IEnumerable<UserViewModel> GetAll()
        {
            return this.users.Select(u =>
            {
                u.Password = null;
                return u;
            });
        }
    }
}