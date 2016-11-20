﻿namespace GTiHub.Models.EntityModel
{
    #region

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    #endregion

    public class TargetField : BaseEntity
    {
        public TargetField()
        {
            this.Rules = new List<Rule>();
        }

        public bool Active { get; set; }

        public string Datatype { get; set; }

        public string Name { get; set; }

        public ICollection<Rule> Rules { get; set; }

        public int SeqNum { get; set; }

        public Target Target { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TargetFieldId { get; set; }

        public int TargetId { get; set; }
    }
}