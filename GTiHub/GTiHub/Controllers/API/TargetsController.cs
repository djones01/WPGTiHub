namespace GTiHub.Controllers.API
{
    #region

    using System.Collections.Generic;
    using System.Linq;

    using GTiHub.Models.EntityModel;

    using Microsoft.AspNetCore.Mvc;

    #endregion

    [Route("api/[controller]")]
    public class TargetsController : Controller
    {
        private readonly GTiHubContext _dbContext;

        public TargetsController(GTiHubContext _dbContext)
        {
            this._dbContext = _dbContext;
        }

        // DELETE api/Targets/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var target = this._dbContext.Targets.FirstOrDefault(x => x.TargetId == id);
            if (target == null) return this.NotFound();

            this._dbContext.Targets.Remove(target);
            this._dbContext.SaveChanges();
            return new NoContentResult();
        }

        // GET: api/Targets
        [HttpGet]
        public IEnumerable<Target> Get()
        {
            return this._dbContext.Targets.ToList();
        }

        // GET api/Targets/5
        [HttpGet("{id}", Name = "GetTarget")]
        public IActionResult Get(int id)
        {
            var target = this._dbContext.Targets.FirstOrDefault(x => x.TargetId == id);
            if (target == null) return this.NotFound();

            return new ObjectResult(target);
        }

        // GET api/values/5
        [HttpGet("GetTargetFieldsbyTarget/{id}")]
        public IEnumerable<TargetField> GetTargetFieldsByTarget(int id)
        {
            return this._dbContext.TargetFields.Where(x => x.TargetId == id).OrderBy(x => x.SeqNum).ToList();
        }

        // POST api/Targets
        [HttpPost]
        public IActionResult Post([FromBody] Target target)
        {
            if (target == null) return this.BadRequest();

            this._dbContext.Targets.Add(target);
            this._dbContext.SaveChanges();
            return this.CreatedAtRoute("GetTarget", new { id = target.TargetId }, target);
        }

        // PUT api/Targets/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Target target)
        {
            if ((target == null) || (target.TargetId != id)) return this.BadRequest();

            var updatedTarget = this._dbContext.Targets.FirstOrDefault(x => x.TargetId == id);

            if (updatedTarget == null) return this.NotFound();

            updatedTarget.Name = target.Name;
            updatedTarget.Description = target.Description;
            updatedTarget.Effective_Date = target.Effective_Date;
            updatedTarget.Active = target.Active;
            updatedTarget.ProjectTargets = target.ProjectTargets;
            updatedTarget.TargetFields = target.TargetFields;

            this._dbContext.SaveChanges();

            return new NoContentResult();
        }
    }
}