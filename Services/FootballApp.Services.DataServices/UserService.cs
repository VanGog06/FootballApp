using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using FootballApp.Api.Helpers;
using FootballApp.Common;
using FootballApp.Data;
using FootballApp.Data.DbModels;
using FootballApp.Services.DataServices.Contracts;
using FootballApp.Services.Dtos.Users;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace FootballApp.Services.DataServices
{
    public class UserService : IUserService
    {
        private readonly FootballAppContext context;
        private readonly AppSettings appSettings;

        public UserService(FootballAppContext context, IOptions<AppSettings> appSettings)
        {
            this.context = context;
            this.appSettings = appSettings.Value;
        }

        public UserWithoutPasswordDto Authenticate(UsernamePasswordDto dto)
        {
            var user = this.context.Users.SingleOrDefault(u => u.Username == dto.Username);

            if (user == null)
            {
                return null;
            }

            if (!VerifyPasswordHash(dto.Password, user.PasswordHash, user.PasswordSalt))
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
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var userDto = new UserWithoutPasswordDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Username = user.Username,
                Token = tokenHandler.WriteToken(token)
            };

            return userDto;
        }

        public IEnumerable<UserWithoutPasswordDto> GetAll()
        {
            return this.context.Users
                .Select(u => new UserWithoutPasswordDto
                {
                    Id = u.Id,
                    Email = u.Email,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Username = u.Username
                });
        }

        public UserDto Create(UserDto userDto)
        {
            if (this.context.Users.Any(x => x.Username == userDto.Username))
                throw new ArgumentException(GlobalConstants.UsernameTaken);

            CreatePasswordHash(userDto.Password, out var passwordHash, out var passwordSalt);

            var user = new User
            {
                Email = userDto.Email,
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Username = userDto.Password
            };

            this.context.Users.Add(user);
            this.context.SaveChanges();

            return userDto;
        }

        public void ChangePassword(UpdateUserPasswordDto dto)
        {
            var user = this.context.Users.Find(dto.Id);

            if (user == null)
            {
                throw new ArgumentException(GlobalConstants.UserNotFound);
            }

            if (!VerifyPasswordHash(dto.OldPassword, user.PasswordHash, user.PasswordSalt))
            {
                throw new ArgumentException(GlobalConstants.IncorrectUsernamePassword);
            }

            CreatePasswordHash(dto.NewPassword, out var passwordHash, out var passwordSalt);

            user.PasswordSalt = passwordSalt;
            user.PasswordHash = passwordHash;

            this.context.Users.Update(user);
            this.context.SaveChanges();
        }

        public void UpdateAccountInfo(UpdateUserAccountDto dto)
        {
            var user = this.context.Users.Find(dto.Id);

            if (user == null)
            {
                throw new ArgumentException(GlobalConstants.UserNotFound);
            }

            if (!VerifyPasswordHash(dto.Password, user.PasswordHash, user.PasswordSalt))
            {
                throw new ArgumentException(GlobalConstants.IncorrectUsernamePassword);
            }

            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.Email = dto.Email;

            this.context.Users.Update(user);
            this.context.SaveChanges();
        }

        public void Delete(DeleteUserDto dto)
        {
            var user = this.context.Users.Find(dto.Id);

            if (user == null)
            {
                throw new ArgumentException(GlobalConstants.UserNotFound);
            }

            if (!VerifyPasswordHash(dto.Password, user.PasswordHash, user.PasswordSalt))
            {
                throw new ArgumentException(GlobalConstants.IncorrectPassword);
            }

            this.context.Users.Remove(user);
            this.context.SaveChanges();
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException(nameof(password));
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException(nameof(password));
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}
