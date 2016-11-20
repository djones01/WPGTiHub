namespace GTiHub.Controllers.API
{
    #region

    using System.Collections.Generic;
    using System.Linq;

    using GTiHub.Models.EntityModel;

    using Microsoft.AspNetCore.Mvc;

    #endregion

    [Route("api/[controller]")]
    public class ClientsController : Controller
    {
        private readonly GTiHubContext _dbContext;

        public ClientsController(GTiHubContext _dbContext)
        {
            this._dbContext = _dbContext;
        }

        // DELETE api/Clients/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var client = this._dbContext.Clients.FirstOrDefault(x => x.ClientId == id);
            if (client == null) return this.NotFound();

            this._dbContext.Clients.Remove(client);
            this._dbContext.SaveChanges();
            return new NoContentResult();
        }

        // GET: api/Clients
        [HttpGet]
        public IEnumerable<Client> Get()
        {
            return this._dbContext.Clients.ToList();
        }

        // GET api/Clients/5
        [HttpGet("{id}", Name = "GetClient")]
        public IActionResult Get(int id)
        {
            var client = this._dbContext.Clients.FirstOrDefault(x => x.ClientId == id);
            if (client == null) return this.NotFound();

            return new ObjectResult(client);
        }

        // POST api/Clients
        [HttpPost]
        public IActionResult Post([FromBody] Client client)
        {
            if (client == null) return this.BadRequest();

            this._dbContext.Clients.Add(client);
            this._dbContext.SaveChanges();
            return this.CreatedAtRoute("GetClient", new { id = client.ClientId }, client);
        }

        // PUT api/Clients/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Client client)
        {
            if ((client == null) || (client.ClientId != id)) return this.BadRequest();

            var updatedClient = this._dbContext.Clients.FirstOrDefault(x => x.ClientId == id);

            if (updatedClient == null) return this.NotFound();

            updatedClient.Name = client.Name;
            updatedClient.Industry = client.Industry;

            this._dbContext.SaveChanges();

            return new NoContentResult();
        }
    }
}