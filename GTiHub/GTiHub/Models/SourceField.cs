namespace GTiHub.Models.EntityModel
{
    #region

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    #endregion

    public class SourceField : BaseEntity
    {
        public SourceField()
        {
            this.Conditions = new List<Condition>();
            this.RuleSourceFields = new List<RuleSourceField>();
        }

        public SourceField(string name, string datatype, bool active, int seqnum)
        {
            this.Name = name;
            this.Datatype = datatype;
            this.Active = active;
            this.SeqNum = seqnum;
            this.Conditions = new List<Condition>();
            this.RuleSourceFields = new List<RuleSourceField>();
        }

        public bool Active { get; set; }

        [ForeignKey("SourceFieldId")]
        public ICollection<Condition> Conditions { get; set; }

        public string Datatype { get; set; }

        public string Name { get; set; }

        [ForeignKey("SourceFieldId")]
        public ICollection<RuleSourceField> RuleSourceFields { get; set; }

        public int SeqNum { get; set; }

        public virtual Source Source { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SourceFieldId { get; set; }

        public int SourceId { get; set; }
    }
}