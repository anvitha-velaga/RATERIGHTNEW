using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UseCase.Migrations
{
    /// <inheritdoc />
    public partial class changed1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Admins_Logins_LoginModelId",
                table: "Admins");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Logins_LoginModelId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Logins");

            migrationBuilder.DropIndex(
                name: "IX_Users_LoginModelId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Admins_LoginModelId",
                table: "Admins");

            migrationBuilder.AddColumn<int>(
                name: "LoginId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LoginId",
                table: "Admins",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UsersLogin",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersLogin", x => x.UserId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_LoginId",
                table: "Users",
                column: "LoginId");

            migrationBuilder.CreateIndex(
                name: "IX_Admins_LoginId",
                table: "Admins",
                column: "LoginId");

            migrationBuilder.AddForeignKey(
                name: "FK_Admins_UsersLogin_LoginId",
                table: "Admins",
                column: "LoginId",
                principalTable: "UsersLogin",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_UsersLogin_LoginId",
                table: "Users",
                column: "LoginId",
                principalTable: "UsersLogin",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Admins_UsersLogin_LoginId",
                table: "Admins");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_UsersLogin_LoginId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "UsersLogin");

            migrationBuilder.DropIndex(
                name: "IX_Users_LoginId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Admins_LoginId",
                table: "Admins");

            migrationBuilder.DropColumn(
                name: "LoginId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LoginId",
                table: "Admins");

            migrationBuilder.CreateTable(
                name: "Logins",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logins", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_LoginModelId",
                table: "Users",
                column: "LoginModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Admins_LoginModelId",
                table: "Admins",
                column: "LoginModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Admins_Logins_LoginModelId",
                table: "Admins",
                column: "LoginModelId",
                principalTable: "Logins",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Logins_LoginModelId",
                table: "Users",
                column: "LoginModelId",
                principalTable: "Logins",
                principalColumn: "Id");
        }
    }
}
