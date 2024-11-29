using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Kullanıcı> kullanıcılar { get; set; }
    public DbSet<Araç> araçlar { get; set; }
    public DbSet<İlan> ilanlar { get; set; }
}
