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
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TargetId { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
        public string Description { get; set; }
        public DateTime Effective_Date { get; set; }

        public  ICollection<ProjectTarget> ProjectTargets { get; set; }
        public  ICollection<TargetField> TargetFields { get; set; }       
    }
}