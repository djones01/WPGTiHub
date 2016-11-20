namespace GTiHub.Controllers.API
{
    #region

    using System.Collections.Generic;
    using System.Linq;

    using GTiHub.Models.EntityModel;

    using Microsoft.AspNetCore.Mvc;

    #endregion

    [Route("api/[controller]")]
    public class ConditionsController : Controller
    {
        private readonly GTiHubContext _dbContext;

        public ConditionsController(GTiHubContext _dbContext)
        {
            this._dbContext = _dbContext;
        }

        // DELETE api/Conditions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var condition = this._dbContext.Conditions.FirstOrDefault(x => x.ConditionId == id);
            if (condition == null) return this.NotFound();

            this._dbContext.Conditions.Remove(condition);
            this._dbContext.SaveChanges();
            return new NoContentResult();
        }

        // GET: api/Conditions
        [HttpGet]
        public IEnumerable<Condition> Get()
        {
            return this._dbContext.Conditions.ToList();
        }

        // GET api/Conditions/5
        [HttpGet("{id}", Name = "GetCondition")]
        public IActionResult Get(int id)
        {
            var condition = this._dbContext.Conditions.FirstOrDefault(x => x.ConditionId == id);
            if (condition == null) return this.NotFound();

            return new ObjectResult(condition);
        }

        // POST api/Conditions
        [HttpPost]
        public IActionResult Post([FromBody] Condition condition)
        {
            if (condition == null) return this.BadRequest();

            this._dbContext.Conditions.Add(condition);
            this._dbContext.SaveChanges();
            return this.CreatedAtRoute("GetCondition", new { id = condition.ConditionId }, condition);
        }

        // PUT api/Conditions/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Condition condition)
        {
            if ((condition == null) || (condition.ConditionId != id)) return this.BadRequest();

            var updatedCondition = this._dbContext.Conditions.FirstOrDefault(x => x.ConditionId == id);

            if (updatedCondition == null) return this.NotFound();

            updatedCondition.Left_Paren = condition.Left_Paren;
            updatedCondition.Operation = condition.Operation;
            updatedCondition.Cond_Value = condition.Cond_Value;
            updatedCondition.Right_Paren = condition.Right_Paren;
            updatedCondition.SourceField = condition.SourceField;
            updatedCondition.Transformation = condition.Transformation;

            this._dbContext.SaveChanges();

            return new NoContentResult();
        }
    }
}