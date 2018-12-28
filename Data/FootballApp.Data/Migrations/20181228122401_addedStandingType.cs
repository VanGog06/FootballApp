using Microsoft.EntityFrameworkCore.Migrations;

namespace FootballApp.Data.Migrations
{
    public partial class addedStandingType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Standings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Standings");
        }
    }
}
