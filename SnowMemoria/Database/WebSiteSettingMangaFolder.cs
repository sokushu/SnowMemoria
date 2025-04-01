using System.ComponentModel.DataAnnotations;

namespace SnowMemoria.Database
{
    public class WebSiteSettingMangaFolder
    {
        [Key]
        public string ID { get; set; } = Guid.NewGuid().ToString();

        public required string Path { get; set; }
    }
}
