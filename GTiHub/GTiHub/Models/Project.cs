namespace GTiHub.Models.EntityModel
{
    #region

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    #endregion

    public class Project : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProjectId { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string Project_Type { get; set; }

        public  Client Client { get; set; }
        public int ClientId { get; set; }
        public  ICollection<ProjectMap> ProjectMaps { get; set; }
        public  ICollection<ProjectSource> ProjectSources { get; set; }
        public  ICollection<ProjectTarget> ProjectTargets { get; set; }
        public  ICollection<UserProjectSec> UserProjectSecs { get; set; }
    }
}