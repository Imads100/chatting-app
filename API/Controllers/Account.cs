using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Account : ControllerBase
    {
        
        private readonly DataContext _context;
       
       private readonly ITokenService _TokenService;
      public Account(DataContext context,ITokenService TokenService)
      {
        _context = context;
        _TokenService = TokenService;
      }
        

        [HttpPost("register")]

        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if(await UserExists(registerDto.UserName))
            return BadRequest("Username is taken");

        using  var  hmac = new HMACSHA512();
        var user = new AppUser{
          UserName = registerDto.UserName.ToLower(),
          PassWordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.PassWord)),
          PasswordSalt = hmac.Key 
        };
_context.Users.Add(user);
 await _context.SaveChangesAsync();


 return new UserDto{
  Username = user.UserName,
  Token = _TokenService.CreateToken(user)
 };
           
        }


[HttpPost("Login")]
public  async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
{
  var user = await _context.Users.SingleOrDefaultAsync(x=> x.UserName == loginDto.username);


  if(user == null)
  return BadRequest("Invalid user Name");


  using var hmac = new HMACSHA512(user.PasswordSalt);

  var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));

  for(int i = 0; i< ComputeHash.Length ; i++)
  {
     if(ComputeHash[i] != user.PassWordHash[i]) 
      return Unauthorized("Invalid Password");
  }

return new  UserDto{
  Username = user.UserName,
  Token = _TokenService.CreateToken(user)
};
} 


private async Task<bool> UserExists(string username)
{

  return await _context.Users.AnyAsync(x=> x.UserName == username);
}


    }
}