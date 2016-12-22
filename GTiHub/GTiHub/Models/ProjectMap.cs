namespace GTiHub.Models.EntityModel
{
    public class ProjectMap : BaseEntity
    {
        public  Map Map { get; set; }

        public int MapId { get; set; }

        public  Project Project { get; set; }

        public int ProjectId { get; set; }
    }
}