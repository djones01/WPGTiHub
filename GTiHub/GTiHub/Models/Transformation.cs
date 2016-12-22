namespace GTiHub.Models.EntityModel
{
    #region

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    #endregion

    public class Transformation : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TransformationId { get; set; }      
        public string Description { get; set; }

        public  Map Map { get; set; }
        public int MapId { get; set; }
        public  Rule Rule { get; set; }
        public  ICollection<Condition> Conditions { get; set; }
    }
}