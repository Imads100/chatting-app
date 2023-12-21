using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Buggy : ControllerBase
    {
        private readonly DataContext _context;

        public Buggy(DataContext context)
        {
           _context = context; 
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> Get_secret()
        {
            return "Secret text";
        }


        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _context.Users.Find(-1);

            if(thing == null)
            return NotFound();

            return Ok(thing);
        }


        
        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var thing = _context.Users.Find(-1);
            var thingRouter = thing.ToString();

            return thingRouter;
        }

        
        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return  BadRequest("This was Not a good request!!");
        }

        
    }
}