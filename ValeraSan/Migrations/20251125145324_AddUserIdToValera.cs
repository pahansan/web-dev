using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ValeraSan.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToValera : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Valeras",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Valeras_UserId",
                table: "Valeras",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Valeras_Users_UserId",
                table: "Valeras",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Valeras_Users_UserId",
                table: "Valeras");

            migrationBuilder.DropIndex(
                name: "IX_Valeras_UserId",
                table: "Valeras");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Valeras");
        }
    }
}
