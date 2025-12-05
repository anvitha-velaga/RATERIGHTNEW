using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UseCase.Migrations
{
    /// <inheritdoc />
    public partial class feedbacksubmitmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Feedbacks");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Feedbacks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MentorName",
                table: "Feedbacks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OpenQueries",
                table: "Feedbacks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Queries",
                table: "Feedbacks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Week",
                table: "Feedbacks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "MentorName",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "OpenQueries",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "Queries",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "Week",
                table: "Feedbacks");

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Feedbacks",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
