using Microsoft.EntityFrameworkCore;
using LibraryManagementApi.Models;

namespace LibraryManagementApi.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options) { }

        public DbSet<Book> Books { get; set; }
    }
}
