using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Context;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public DbSet<CodeFragment> CodeFragments { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        // add customizations after calling base...
        base.OnModelCreating(builder);
    }
}