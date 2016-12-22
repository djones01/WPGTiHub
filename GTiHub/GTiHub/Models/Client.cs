namespace GTiHub.Models.EntityModel
{
    #region

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    #endregion

    public class Client : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ClientId { get; set; }
        public string Industry { get; set; }
        public string Name { get; set; }

        public  ICollection<Project> Projects { get; set; }
        public  ICollection<User> Users { get; set; }
    }
}