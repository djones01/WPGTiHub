namespace GTiHub.Models.EntityModel
{
    #region

    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    #endregion

    public class Target : BaseEntity
    {
        public Target()
        {
            this.ProjectTargets = new List<ProjectTarget>();
            this.TargetFields = new List<TargetField>();
        }

        public bool Active { get; set; }

        public string Description { get; set; }

        public DateTime Effective_Date { get; set; }

        public string Name { get; set; }

        public ICollection<ProjectTarget> ProjectTargets { get; set; }

        public ICollection<TargetField> TargetFields { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TargetId { get; set; }
    }
}