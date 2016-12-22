namespace GTiHub.Models.EntityModel
{
    public class ProjectSource : BaseEntity
    {
        public  Project Project { get; set; }

        public int ProjectId { get; set; }

        public  Source Source { get; set; }

        public int SourceId { get; set; }
    }
}