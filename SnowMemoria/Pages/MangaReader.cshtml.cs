using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SnowMemoria.Models;

namespace SnowMemoria.Pages
{
    public class MangaReaderModel : PageModel
    {
        /// <summary>
        /// 网站信息
        /// </summary>
        public WebSiteModel WebSite { get; set; }

        /// <summary>
        /// 页面标题
        /// </summary>
        public string PageTitle { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [BindProperty(SupportsGet = true, Name = "MangaID")]
        public string? MangaID { get; set; }

        public void OnGet()
        {
        }
    }
}
