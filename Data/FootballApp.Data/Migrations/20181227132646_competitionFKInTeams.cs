using Microsoft.EntityFrameworkCore.Migrations;

namespace FootballApp.Data.Migrations
{
    public partial class competitionFKInTeams : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompetitionId",
                table: "Teams",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Teams_CompetitionId",
                table: "Teams",
                column: "CompetitionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_Competitions_CompetitionId",
                table: "Teams",
                column: "CompetitionId",
                principalTable: "Competitions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teams_Competitions_CompetitionId",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Teams_CompetitionId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "CompetitionId",
                table: "Teams");
        }
    }
}
