namespace GTiHub.Models.EntityModel
{
    #region

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    #endregion

    public class SourceField : BaseEntity
    {
        public SourceField(string name, string datatype, bool active, int seqnum)
        {
            this.Name = name;
            this.Datatype = datatype;
            this.Active = active;
            this.SeqNum = seqnum;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SourceFieldId { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
        public string Datatype { get; set; }
        public int SeqNum { get; set; }

        public  ICollection<Condition> Conditions { get; set; }    
        public  ICollection<RuleSourceField> RuleSourceFields { get; set; }

        public  Source Source { get; set; }
        public int SourceId { get; set; }
    }
}