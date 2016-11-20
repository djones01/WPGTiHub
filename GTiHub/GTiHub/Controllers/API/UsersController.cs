namespace GTiHub.Controllers.API
{
    #region

    using System.Collections.Generic;
    using System.Linq;

    using GTiHub.Models.EntityModel;

    using Microsoft.AspNetCore.Mvc;

    #endregion

    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly GTiHubContext _dbContext;

        public UsersController(GTiHubContext _dbContext)
        {
            this._dbContext = _dbContext;
        }

        // DELETE api/Users/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = this._dbContext.Users.FirstOrDefault(x => x.UserId == id);
            if (user == null) return this.NotFound();

            this._dbContext.Users.Remove(user);
            this._dbContext.SaveChanges();
            return new NoContentResult();
        }

        // GET: api/Users
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return this._dbContext.Users.ToList();
        }

        // GET api/Users/5
        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult Get(int id)
        {
            var user = this._dbContext.Users.FirstOrDefault(x => x.UserId == id);
            if (user == null) return this.NotFound();

            return new ObjectResult(user);
        }

        // POST api/Users
        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            if (user == null) return this.BadRequest();

            this._dbContext.Users.Add(user);
            this._dbContext.SaveChanges();
            return this.CreatedAtRoute("GetUser", new { id = user.UserId }, user);
        }

        // PUT api/Users/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User user)
        {
            if ((user == null) || (user.UserId != id)) return this.BadRequest();

            var updatedUser = this._dbContext.Users.FirstOrDefault(x => x.UserId == id);

            if (updatedUser == null) return this.NotFound();

            updatedUser.FirstName = user.FirstName;
            updatedUser.LastName = user.LastName;
            updatedUser.Title = user.Title;
            updatedUser.Email = user.Email;
            updatedUser.Phone = user.Phone;
            updatedUser.Salt = user.Salt;
            updatedUser.Hash = user.Hash;
            updatedUser.UserProjectSecs = user.UserProjectSecs;

            this._dbContext.SaveChanges();

            return new NoContentResult();
        }
    }
}