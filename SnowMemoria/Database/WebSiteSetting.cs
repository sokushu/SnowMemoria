using System.ComponentModel.DataAnnotations;

namespace SnowMemoria.Database
{
    public class WebSiteSetting
    {
        /// <summary>
        /// 
        /// </summary>
        [Key]
        public string ID { get; set; } = Guid.NewGuid().ToString();

        /// <summary>
        /// 
        /// </summary>
        public string? WebSiteName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public List<WebSiteSettingMangaFolder>? MangaFolders { get; set; }
    }
}
