namespace GTiHub.Models.EntityModel
{
    public class ProjectTarget : BaseEntity
    {
        public Project Project { get; set; }

        public int ProjectId { get; set; }

        public Target Target { get; set; }

        public int TargetId { get; set; }
    }
}