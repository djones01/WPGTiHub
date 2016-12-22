namespace GTiHub.Models.EntityModel
{
    #region

    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    #endregion

    public class Source : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SourceId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        public DateTime Effective_Date { get; set; }
       
        public  ICollection<ProjectSource> ProjectSources { get; set; }
        public  ICollection<SourceField> SourceFields { get; set; }      
    }
}