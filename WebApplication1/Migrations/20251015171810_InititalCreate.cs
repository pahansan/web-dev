using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApplication1.Migrations
{
    /// <inheritdoc />
    public partial class InititalCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Valeras",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Health = table.Column<int>(type: "INTEGER", nullable: false),
                    Mana = table.Column<int>(type: "INTEGER", nullable: false),
                    Happiness = table.Column<int>(type: "INTEGER", nullable: false),
                    Tiredness = table.Column<int>(type: "INTEGER", nullable: false),
                    Money = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Valeras", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Valeras");
        }
    }
}
