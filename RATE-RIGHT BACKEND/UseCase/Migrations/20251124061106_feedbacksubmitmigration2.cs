using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UseCase.Migrations
{
    /// <inheritdoc />
    public partial class feedbacksubmitmigration2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdminComment",
                table: "Feedbacks");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UsersLogin",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "UsersLogin",
                newName: "UserId");

            migrationBuilder.AddColumn<string>(
                name: "AdminComment",
                table: "Feedbacks",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
