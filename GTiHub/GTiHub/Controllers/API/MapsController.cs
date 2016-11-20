namespace GTiHub.Controllers.API
{
    #region

    using System.Collections.Generic;
    using System.Linq;

    using GTiHub.Models.EntityModel;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    #endregion

    [Route("api/[controller]")]
    public class MapsController : Controller
    {
        private readonly GTiHubContext _dbContext;

        public MapsController(GTiHubContext _dbContext)
        {
            this._dbContext = _dbContext;
        }

        // DELETE api/Maps/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var map = this._dbContext.Maps.FirstOrDefault(x => x.MapId == id);
            if (map == null) return this.NotFound();

            this._dbContext.Maps.Remove(map);
            this._dbContext.SaveChanges();
            return new NoContentResult();
        }

        // GET: api/Maps
        [HttpGet]
        public IEnumerable<Map> Get()
        {
            return this._dbContext.Maps.ToList();
        }

        // GET api/Maps/5
        [HttpGet("{id}", Name = "GetMap")]
        public IActionResult Get(int id)
        {
            var map = this._dbContext.Maps.FirstOrDefault(x => x.MapId == id);
            if (map == null) return this.NotFound();

            return new ObjectResult(map);
        }

        [HttpGet("GetMapTransforms/{id}")]
        public IEnumerable<Transformation> GetMapTransforms(int id)
        {
            return
                this._dbContext.Transformations.Where(x => x.MapId == id)
                    .Include(transform => transform.Rule)
                    .Include(transform => transform.Conditions)
                    .ToList();
        }

        // GET api/Maps/MapSources/5
        [HttpGet("MapSources/{id}")]
        public IEnumerable<Source> MapSources(int id)
        {
            var mapTransforms =
                this._dbContext.Transformations.Where(x => x.MapId == id)
                    .Include(transform => transform.Conditions)
                    .ThenInclude(condition => condition.SourceField)
                    .ThenInclude(sourceField => sourceField.Source)
                    .Include(transform => transform.Rule)
                    .ThenInclude(rule => rule.RuleSourceFields)
                    .ThenInclude(ruleSourceField => ruleSourceField.SourceField)
                    .ThenInclude(sourceField => sourceField.Source)
                    .ToList();
            var sourcesInMap = new List<Source>();
            if (mapTransforms != null)
                foreach (var transform in mapTransforms)
                {
                    // Check conditions
                    foreach (var condition in transform.Conditions) if (!sourcesInMap.Any(x => condition.SourceField.Source.SourceId == x.SourceId)) sourcesInMap.Add(condition.SourceField.Source);

                    // Check rulesourcefields
                    foreach (var ruleSourceField in transform.Rule.RuleSourceFields) if (!sourcesInMap.Any(x => ruleSourceField.SourceField.Source.SourceId == x.SourceId)) sourcesInMap.Add(ruleSourceField.SourceField.Source);
                }

            // Why do I need to do this for it to work????
            foreach (var source in sourcesInMap) source.SourceFields = null;

            return sourcesInMap;
        }

        // POST api/Maps
        [HttpPost]
        public IActionResult Post([FromBody] Map map)
        {
            if (map == null) return this.BadRequest();

            foreach (var transform in map.Transformations)
            {
                foreach (var condition in transform.Conditions)
                {
                    condition.SourceFieldId = condition.SourceField.SourceFieldId;
                    condition.SourceField = null;
                }

                foreach (var ruleSourceField in transform.Rule.RuleSourceFields)
                {
                    ruleSourceField.SourceFieldId = ruleSourceField.SourceField.SourceFieldId;
                    ruleSourceField.SourceField = null;
                }

                transform.Rule.TargetFieldId = transform.Rule.TargetField.TargetFieldId;
                transform.Rule.TargetField = null;
            }

            this._dbContext.Maps.Add(map);
            this._dbContext.SaveChanges();
            return this.CreatedAtRoute("GetMap", new { id = map.MapId }, map);
        }

        // PUT api/Maps/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Map map)
        {
            if ((map == null) || (map.MapId != id)) return this.BadRequest();

            var updatedMap = this._dbContext.Maps.FirstOrDefault(x => x.MapId == id);

            if (updatedMap == null) return this.NotFound();

            updatedMap.Description = map.Description;
            updatedMap.Effective_Date = map.Effective_Date;
            updatedMap.Active = map.Active;
            updatedMap.ProjectMaps = map.ProjectMaps;
            updatedMap.Transformations = map.Transformations;

            this._dbContext.SaveChanges();

            return new NoContentResult();
        }
    }
}