namespace GTiHub.Models.EntityModel
{
    #region

    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    #endregion

    public class Map : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MapId { get; set; }
        public bool Active { get; set; }
        public string Description { get; set; }
        public DateTime Effective_Date { get; set; }

        public  ICollection<ProjectMap> ProjectMaps { get; set; }
        public  ICollection<Transformation> Transformations { get; set; }
    }
}