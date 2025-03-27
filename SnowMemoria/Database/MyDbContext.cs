using Microsoft.EntityFrameworkCore;

namespace SnowMemoria.Database
{
    /// <summary>
    /// 
    /// </summary>
    public class MyDbContext : DbContext
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="options"></param>
        public MyDbContext(DbContextOptions<MyDbContext> options)
            : base(options)
        {
        }

        /// <summary>
        /// 
        /// </summary>
        public DbSet<UploadedFile> UploadedFiles { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public DbSet<Archive> Archives { get; set; }
    }
}
