using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using _31241027164_PhamLeBaoNgoc.Models;

namespace _31241027164_PhamLeBaoNgoc.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public DbSet<ShippingDetail> ShippingDetails { get; set; }
    public DbSet<Movie> Movies { get; set; }
    public DbSet<Genre> Genres { get; set; }
    public DbSet<ChiTietHoaDon> ChiTietHoaDons { get; set; }
    public DbSet<HoaDon> HoaDons { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
}