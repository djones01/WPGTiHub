namespace GTiHub.Controllers.API
{
    #region

    using System.Collections.Generic;
    using System.Linq;

    using GTiHub.Models.EntityModel;

    using Microsoft.AspNetCore.Mvc;

    #endregion

    [Route("api/[controller]")]
    public class ProjectsController : Controller
    {
        private readonly GTiHubContext _dbContext;

        public ProjectsController(GTiHubContext _dbContext)
        {
            this._dbContext = _dbContext;
        }

        // DELETE api/Projects/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var project = this._dbContext.Projects.FirstOrDefault(x => x.ProjectId == id);
            if (project == null) return this.NotFound();

            this._dbContext.Projects.Remove(project);
            this._dbContext.SaveChanges();
            return new NoContentResult();
        }

        // GET: api/Projects
        [HttpGet]
        public IEnumerable<Project> Get()
        {
            return this._dbContext.Projects.ToList();
        }

        // GET api/Projects/5
        [HttpGet("{id}", Name = "GetProject")]
        public IActionResult Get(int id)
        {
            var project = this._dbContext.Projects.FirstOrDefault(x => x.ProjectId == id);
            if (project == null) return this.NotFound();

            return new ObjectResult(project);
        }

        // POST api/Projects
        [HttpPost]
        public IActionResult Post([FromBody] Project project)
        {
            if (project == null) return this.BadRequest();

            this._dbContext.Projects.Add(project);
            this._dbContext.SaveChanges();
            return this.CreatedAtRoute("GetProject", new { id = project.ProjectId }, project);
        }

        // PUT api/Projects/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Project project)
        {
            if ((project == null) || (project.ProjectId != id)) return this.BadRequest();

            var updatedProject = this._dbContext.Projects.FirstOrDefault(x => x.ProjectId == id);

            if (updatedProject == null) return this.NotFound();

            updatedProject.Name = project.Name;
            updatedProject.Description = project.Description;
            updatedProject.Project_Type = project.Project_Type;
            updatedProject.Client = project.Client;
            updatedProject.ProjectMaps = project.ProjectMaps;
            updatedProject.ProjectSources = project.ProjectSources;
            updatedProject.ProjectTargets = project.ProjectTargets;
            updatedProject.UserProjectSecs = project.UserProjectSecs;

            this._dbContext.SaveChanges();

            return new NoContentResult();
        }
    }
}