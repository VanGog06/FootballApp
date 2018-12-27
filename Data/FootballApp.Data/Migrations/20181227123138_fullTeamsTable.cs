using Microsoft.EntityFrameworkCore.Migrations;

namespace FootballApp.Data.Migrations
{
    public partial class fullTeamsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Teams",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ClubColors",
                table: "Teams",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Founded",
                table: "Teams",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Venue",
                table: "Teams",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Website",
                table: "Teams",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "ClubColors",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "Founded",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "Venue",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "Website",
                table: "Teams");
        }
    }
}
