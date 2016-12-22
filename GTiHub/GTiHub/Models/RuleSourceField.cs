namespace GTiHub.Models.EntityModel
{
    #region

    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    #endregion

    public class RuleSourceField : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RuleSourceFieldId { get; set; }
        public string Prepend { get; set; }
        public string Append { get; set; }
        public string Custom_Format { get; set; }
        public int SeqNum { get; set; }

        public  Rule Rule { get; set; }
        public int RuleId { get; set; }

        public  SourceField SourceField { get; set; }
        public int SourceFieldId { get; set; }
    }
}