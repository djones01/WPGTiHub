namespace GTiHub.Models.EntityModel
{
    #region

    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    #endregion

    public class User : BaseEntity
    {
        public User()
        {
            this.UserProjectSecs = new List<UserProjectSec>();
        }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string Hash { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public string Salt { get; set; }

        public string Title { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        public ICollection<UserProjectSec> UserProjectSecs { get; set; }
    }
}