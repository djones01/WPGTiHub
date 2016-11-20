namespace GTiHub.Controllers.API
{
    #region

    using System.Collections.Generic;
    using System.Linq;

    using GTiHub.Models.EntityModel;

    using Microsoft.AspNetCore.Mvc;

    #endregion

    [Route("api/[controller]")]
    public class SourcesController : Controller
    {
        private readonly GTiHubContext _dbContext;

        public SourcesController(GTiHubContext _dbContext)
        {
            this._dbContext = _dbContext;
        }

        // DELETE api/Sources/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var source = this._dbContext.Sources.FirstOrDefault(x => x.SourceId == id);
            if (source == null) return this.NotFound();

            this._dbContext.Sources.Remove(source);
            this._dbContext.SaveChanges();
            return new NoContentResult();
        }

        // GET: api/Sources
        [HttpGet]
        public IEnumerable<Source> Get()
        {
            return this._dbContext.Sources.ToList();
        }

        // GET api/Sources/5
        [HttpGet("{id}", Name = "GetSource")]
        public IActionResult Get(int id)
        {
            var source = this._dbContext.Sources.FirstOrDefault(x => x.SourceId == id);
            if (source == null) return this.NotFound();

            return new ObjectResult(source);
        }

        // GET api/values/5
        [HttpGet("GetSourceFieldsbySource/{id}")]
        public IEnumerable<SourceField> GetSourceFieldsBySource(int id)
        {
            return this._dbContext.SourceFields.Where(x => x.SourceId == id).OrderBy(x => x.SeqNum).ToList();
        }

        // POST api/Sources
        [HttpPost]
        public IActionResult Post([FromBody] Source source)
        {
            if (source == null) return this.BadRequest();

            if (!this.ModelState.IsValid) return this.BadRequest(this.ModelState);

            this._dbContext.Sources.Add(source);
            this._dbContext.SaveChanges();
            return this.CreatedAtRoute("GetSource", new { id = source.SourceId }, source);
        }

        // PUT api/Sources/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Source source)
        {
            if ((source == null) || (source.SourceId != id)) return this.BadRequest();

            var updatedSource = this._dbContext.Sources.FirstOrDefault(x => x.SourceId == id);

            if (updatedSource == null) return this.NotFound();

            updatedSource.Name = source.Name;
            updatedSource.Description = source.Description;
            updatedSource.Effective_Date = source.Effective_Date;
            updatedSource.Active = source.Active;
            updatedSource.ProjectSources = source.ProjectSources;
            updatedSource.SourceFields = source.SourceFields;

            this._dbContext.SaveChanges();

            return new NoContentResult();
        }
    }
}