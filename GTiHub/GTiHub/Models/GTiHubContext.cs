namespace GTiHub.Models.EntityModel
{
    #region

    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Http;
    using Microsoft.EntityFrameworkCore;

    #endregion

    public class GTiHubContext : DbContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GTiHubContext(DbContextOptions<GTiHubContext> options, IHttpContextAccessor httpContextAccessor)
            : base(options)
        {
            this._httpContextAccessor = httpContextAccessor;
        }

        public DbSet<Client> Clients { get; set; }

        public DbSet<Condition> Conditions { get; set; }

        public DbSet<Map> Maps { get; set; }

        public DbSet<ProjectMap> ProjectMaps { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<ProjectSource> ProjectSources { get; set; }

        public DbSet<ProjectTarget> ProjectTargets { get; set; }

        public DbSet<Rule> Rules { get; set; }

        public DbSet<RuleSourceField> RuleSourceFields { get; set; }

        public DbSet<SourceField> SourceFields { get; set; }

        public DbSet<Source> Sources { get; set; }

        public DbSet<TargetField> TargetFields { get; set; }

        public DbSet<Target> Targets { get; set; }

        public DbSet<Transformation> Transformations { get; set; }

        public DbSet<UserProjectSec> UserProjectSecs { get; set; }

        public DbSet<User> Users { get; set; }

        private ISession _session => this._httpContextAccessor.HttpContext.Session;

        public override int SaveChanges()
        {
            this.LogCreationAndUser();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            this.LogCreationAndUser();
            return await base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProjectMap>().HasKey(t => new { t.ProjectId, t.MapId });
            modelBuilder.Entity<ProjectSource>().HasKey(t => new { t.ProjectId, t.SourceId });
            modelBuilder.Entity<ProjectTarget>().HasKey(t => new { t.ProjectId, t.TargetId });
        }

        private void LogCreationAndUser()
        {
            var entities =
                this.ChangeTracker.Entries()
                    .Where(
                        x =>
                            x.Entity is BaseEntity
                            && ((x.State == EntityState.Added) || (x.State == EntityState.Modified)));

            var currentUser = !string.IsNullOrEmpty(this._session.GetString("CurrentUser"))
                                  ? this._session.GetString("CurrentUser")
                                  : "Anonymous";

            foreach (var entity in entities)
            {
                if (entity.State == EntityState.Added)
                {
                    ((BaseEntity)entity.Entity).Creation_Date = DateTime.UtcNow;
                    ((BaseEntity)entity.Entity).Created_By = currentUser;
                }

                ((BaseEntity)entity.Entity).Date_Modified = DateTime.UtcNow;
                ((BaseEntity)entity.Entity).Modified_By = currentUser;
            }
        }
    }
}