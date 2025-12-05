using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UseCase.Migrations
{
    /// <inheritdoc />
    public partial class linesofcode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Feedbacks",
                newName: "LinesOfCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LinesOfCode",
                table: "Feedbacks",
                newName: "Description");
        }
    }
}
