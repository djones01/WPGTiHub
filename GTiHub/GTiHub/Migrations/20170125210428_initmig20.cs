using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GTiHub.Migrations
{
    public partial class initmig20 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    ClientId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Created_By = table.Column<string>(nullable: true),
                    Creation_Date = table.Column<DateTime>(nullable: true),
                    Date_Modified = table.Column<DateTime>(nullable: true),
                    Industry = table.Column<string>(nullable: true),
                    Modified_By = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.ClientId);
                });

            migrationBuilder.CreateTable(
                name: "Maps",
                columns: table => new
                {
                    MapId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Active = table.Column<bool>(nullable: false),
                    Created_By = table.Column<string>(nullable: true),
                    Creation_Date = table.Column<DateTime>(nullable: true),
                    Date_Modified = table.Column<DateTime>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Effective_Date = table.Column<DateTime>(nullable: false),
                    Modified_By = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Maps", x => x.MapId);
                });

            migrationBuilder.CreateTable(
                name: "Sources",
                columns: table => new
                {
                    SourceId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Active = table.Column<bool>(nullable: false),
                    Created_By = table.Column<string>(nullable: true),
                    Creation_Date = table.Column<DateTime>(nullable: true),
                    Date_Modified = table.Column<DateTime>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Effective_Date = table.Column<DateTime>(nullable: false),
                    Modified_By = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sources", x => x.SourceId);
                });

            migrationBuilder.CreateTable(
                name: "Targets",
                columns: table => new
                {
                    TargetId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Active = table.Column<bool>(nullable: false),
                    Created_By = table.Column<string>(nullable: true),
                    Creation_Date = table.Column<DateTime>(nullable: true),
                    Date_Modified = table.Column<DateTime>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Effective_Date = table.Column<DateTime>(nullable: false),
                    Modified_By = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Targets", x => x.TargetId);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    ProjectId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClientId = table.Column<int>(nullable: false),
                    Created_By = table.Column<string>(nullable: true),
                    Creation_Date = table.Column<DateTime>(nullable: true),
                    Date_Modified = table.Column<DateTime>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Modified_By = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Project_Type = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.ProjectId);
                    table.ForeignKey(
                        name: "FK_Projects_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "ClientId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClientId = table.Column<int>(nullable: true),
                    Created_By = table.Column<string>(nullable: true),
                    Creation_Date = table.Column<DateTime>(nullable: true),
                    Date_Modified = table.Column<DateTime>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    Hash = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Modified_By = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    Salt = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Users_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "ClientId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Transformations",
                columns: table => new
                {
                    TransformationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Created_By = table.Column<string>(nullable: true),
                    Creation_Date = table.Column<DateTime>(nullable: true),
                    Date_Modified = table.Column<DateTime>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    MapId = table.Column<int>(nullable: false),
                    Modified_By = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transformations", x => x.TransformationId);
                    table.ForeignKey(
                        name: "FK_Transformations_Maps_MapId",
                        column: x => x.MapId,
                        principalTable: "Maps",
                        principalColumn: "MapId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SourceFields",
                columns: table => new
                {
                    SourceFieldId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Active = table.Column<bool>(nullable: false),
                    Created_By = table.Column<string>(nullable: true),
                    Creation_Date = table.Column<DateTime>(nullable: true),
                    Datatype = table.Column<string>(nullable: true),
                    Date_Modified = table.Column<DateTime>(nullable: true),
                    Modified_By = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    SeqNum = table.Column<int>(nullable: false),
                    SourceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SourceFields", x => x.SourceFieldId);
                    table.ForeignKey(
                        name: "FK_SourceFields_Sources_SourceId",
                        column: x => x.SourceId,
                        principalTable: "Sources",
                        principalColumn: "SourceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TargetFields",
                columns: table => new
                {
                    TargetFieldId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Active = table.Column<bool>(nullable: false),
                    Created_By = table.Column<string>(nullable: true),
                    Creation_Date = table.Column<DateTime>(nullable: true),
                    Datatype = table.Column<string>(nullable: true),
                    Date_Modified = table.Column<DateTime>(nullable: true),
                    Modified_By = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    SeqNum = table.Column<int>(nullable: false),
                    TargetId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TargetFields", x => x.TargetFieldId);
                    table.ForeignKey(
                        name: "FK_TargetFields_Targets_TargetId",
                        column: x => x.TargetId,
                        principalTable: "Targets",
                        principalColumn: "TargetId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectMaps",
                columns: table => new
                {
                    ProjectId = table.Column<int>(nullable: false),
                    MapId = table.Column<int>(nullable: false),
                    Created_By = table.Column<string>(nullable: true),
                    Creation_Date = table.Column<DateTime>(nullable: true),
                    Date_Modified = table.Column<DateTime>(nullable: true),
                    Modified_By = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectMaps", x => new { x.ProjectId, x.MapId });
                    table.ForeignKey(
                        name: "FK_ProjectMaps_Maps_MapId",
                        column: x => x.MapId,
                        principalTable: "Maps",
                        principalColumn: "MapId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectMaps_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ProjectId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectSources",
                columns: table => new
                {
                    ProjectId = table.Column<int>(nullable: false),
                    SourceId = table.Column<int>(nullable: false),
                    Created_By = table.Column<string>(nullable: true),
                    Creation_Date = table.Column<DateTime>(nullable: true),
                    Date_Modified = table.Column<DateTime>(nullable: true),
                    Modified_By = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectSources", x => new { x.ProjectId, x.SourceId });
                    table.ForeignKey(
                        name: "FK_ProjectSources_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ProjectId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectSources_Sources_SourceId",
                        column: x => x.SourceId,
                        principalTable: "Sources",
                        principalColumn: "SourceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectTargets",
                columns: table => new
                {
                    ProjectId = table.Column<int>(nullable: false),
                    TargetId = table.Column<int>(nullable: false),
                    Created_By = table.Column<string>(nullable: true),
                    Creation_Date = table.Column<DateTime>(nullable: true),
                    Date_Modified = table.Column<DateTime>(nullable: true),
                    Modified_By = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTargets", x => new { x.ProjectId, x.TargetId });
                    table.ForeignKey(
                        name: "FK_ProjectTargets_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ProjectId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectTargets_Targets_TargetId",
                        column: x => x.TargetId,
                        principalTable: "Targets",
                        principalColumn: "TargetId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserProjectSecs",
                columns: table => new
                {
                    UserProjSecId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Access_Level = table.Column<int>(nullable: false),
                    Active_On_Project = table.Column<bool>(nullable: false),
                    Added_Date = table.Column<DateTime>(nullable: false),
                    Created_By = table.Column<string>(nullable: true),
                    Creation_Date = table.Column<DateTime>(nullable: true),
                    Date_Modified = table.Column<DateTime>(nullable: true),
                    Modified_By = table.Column<string>(nullable: true),
                    ProjectId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProjectSecs", x => x.UserProjSecId);
                    table.ForeignKey(
                        name: "FK_UserProjectSecs_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ProjectId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserProjectSecs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Conditions",
                columns: table => new
                {
                    ConditionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Chain_Operation = table.Column<string>(nullable: true),
                    Cond_Value = table.Column<string>(nullable: true),
                    Created_By = table.Column<string>(nullable: true),
                    Creation_Date = table.Column<DateTime>(nullable: true),
                    Date_Modified = table.Column<DateTime>(nullable: true),
                    Left_Paren = table.Column<string>(nullable: true),
                    Modified_By = table.Column<string>(nullable: true),
                    Operation = table.Column<string>(nullable: true),
                    Right_Paren = table.Column<string>(nullable: true),
                    SeqNum = table.Column<int>(nullable: false),
                    SourceFieldId = table.Column<int>(nullable: false),
                    TransformationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conditions", x => x.ConditionId);
                    table.ForeignKey(
                        name: "FK_Conditions_SourceFields_SourceFieldId",
                        column: x => x.SourceFieldId,
                        principalTable: "SourceFields",
                        principalColumn: "SourceFieldId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Conditions_Transformations_TransformationId",
                        column: x => x.TransformationId,
                        principalTable: "Transformations",
                        principalColumn: "TransformationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rules",
                columns: table => new
                {
                    RuleId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Alt_Value = table.Column<string>(nullable: true),
                    Created_By = table.Column<string>(nullable: true),
                    Creation_Date = table.Column<DateTime>(nullable: true),
                    Date_Modified = table.Column<DateTime>(nullable: true),
                    Modified_By = table.Column<string>(nullable: true),
                    Rule_Operation = table.Column<string>(nullable: true),
                    Rule_Value = table.Column<string>(nullable: true),
                    TargetFieldId = table.Column<int>(nullable: false),
                    TransformationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rules", x => x.RuleId);
                    table.ForeignKey(
                        name: "FK_Rules_TargetFields_TargetFieldId",
                        column: x => x.TargetFieldId,
                        principalTable: "TargetFields",
                        principalColumn: "TargetFieldId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rules_Transformations_TransformationId",
                        column: x => x.TransformationId,
                        principalTable: "Transformations",
                        principalColumn: "TransformationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RuleSourceFields",
                columns: table => new
                {
                    RuleSourceFieldId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Append = table.Column<string>(nullable: true),
                    Created_By = table.Column<string>(nullable: true),
                    Creation_Date = table.Column<DateTime>(nullable: true),
                    Custom_Format = table.Column<string>(nullable: true),
                    Date_Modified = table.Column<DateTime>(nullable: true),
                    Modified_By = table.Column<string>(nullable: true),
                    Prepend = table.Column<string>(nullable: true),
                    RuleId = table.Column<int>(nullable: false),
                    SeqNum = table.Column<int>(nullable: false),
                    SourceFieldId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RuleSourceFields", x => x.RuleSourceFieldId);
                    table.ForeignKey(
                        name: "FK_RuleSourceFields_Rules_RuleId",
                        column: x => x.RuleId,
                        principalTable: "Rules",
                        principalColumn: "RuleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RuleSourceFields_SourceFields_SourceFieldId",
                        column: x => x.SourceFieldId,
                        principalTable: "SourceFields",
                        principalColumn: "SourceFieldId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Conditions_SourceFieldId",
                table: "Conditions",
                column: "SourceFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_Conditions_TransformationId",
                table: "Conditions",
                column: "TransformationId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ClientId",
                table: "Projects",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectMaps_MapId",
                table: "ProjectMaps",
                column: "MapId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectSources_SourceId",
                table: "ProjectSources",
                column: "SourceId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTargets_TargetId",
                table: "ProjectTargets",
                column: "TargetId");

            migrationBuilder.CreateIndex(
                name: "IX_Rules_TargetFieldId",
                table: "Rules",
                column: "TargetFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_Rules_TransformationId",
                table: "Rules",
                column: "TransformationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RuleSourceFields_RuleId",
                table: "RuleSourceFields",
                column: "RuleId");

            migrationBuilder.CreateIndex(
                name: "IX_RuleSourceFields_SourceFieldId",
                table: "RuleSourceFields",
                column: "SourceFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_SourceFields_SourceId",
                table: "SourceFields",
                column: "SourceId");

            migrationBuilder.CreateIndex(
                name: "IX_TargetFields_TargetId",
                table: "TargetFields",
                column: "TargetId");

            migrationBuilder.CreateIndex(
                name: "IX_Transformations_MapId",
                table: "Transformations",
                column: "MapId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_ClientId",
                table: "Users",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProjectSecs_ProjectId",
                table: "UserProjectSecs",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProjectSecs_UserId",
                table: "UserProjectSecs",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Conditions");

            migrationBuilder.DropTable(
                name: "ProjectMaps");

            migrationBuilder.DropTable(
                name: "ProjectSources");

            migrationBuilder.DropTable(
                name: "ProjectTargets");

            migrationBuilder.DropTable(
                name: "RuleSourceFields");

            migrationBuilder.DropTable(
                name: "UserProjectSecs");

            migrationBuilder.DropTable(
                name: "Rules");

            migrationBuilder.DropTable(
                name: "SourceFields");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "TargetFields");

            migrationBuilder.DropTable(
                name: "Transformations");

            migrationBuilder.DropTable(
                name: "Sources");

            migrationBuilder.DropTable(
                name: "Clients");

            migrationBuilder.DropTable(
                name: "Targets");

            migrationBuilder.DropTable(
                name: "Maps");
        }
    }
}
