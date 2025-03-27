using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SnowMemoria.Pages
{
    public class MangaReaderPageModel : PageModel
    {
        /// <summary>
        /// 获取或设置漫画的唯一标识符
        /// </summary>
        [BindProperty(Name = "mangaid", SupportsGet = true)]
        public string MangaID { get; set; } = string.Empty;


        public IActionResult OnGet()
        {
            return Page();
        }
    }
}
