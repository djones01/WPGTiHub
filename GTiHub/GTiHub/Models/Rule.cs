namespace GTiHub.Models.EntityModel
{
    #region

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    #endregion

    public class Rule : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RuleId { get; set; }
        public string Rule_Value { get; set; }
        public string Alt_Value { get; set; }
        public string Rule_Operation { get; set; }
         
        public  ICollection<RuleSourceField> RuleSourceFields { get; set; }

        public  TargetField TargetField { get; set; }
        public int TargetFieldId { get; set; }

        public  Transformation Transformation { get; set; }
        public int TransformationId { get; set; }           
    }
}