using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SnowMemoria.Pages
{
    public class MangaReaderPageModel : PageModel
    {
        [BindProperty(Name = "id", SupportsGet = true)]
        public string Id { get; set; } = string.Empty;
        public void OnGet()
        {
        }
    }
}
