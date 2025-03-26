using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SnowMemoria.Models;

namespace SnowMemoria.ControllersAPI
{
    [Route("/api/archive")]
    [ApiController]
    public class ArchiveAPIController : Controller
    {
        [Route("upload/{id}")]
        [HttpGet]
        public IActionResult Manga(string id)
        {
            string mangaDir;
            var dir = Directory.CreateDirectory("TestManga");
            if (Directory.Exists(mangaDir = Path.Combine(dir.FullName, id)))
            {
                List<MangaPage> pages = new List<MangaPage>();
                foreach (var file in Directory.GetFiles(mangaDir))
                {
                    pages.Add(new MangaPage
                    {
                        Id = pages.Count + 1,
                        Url = $"/api/archive/pic/{Path.GetFileName(mangaDir)}/{Path.GetFileName(file)}",
                        IsSpread = false
                    });
                }
                return Json(new Manga
                {
                    Chapter = "",
                    Pages = pages,
                    Title = dir.Name,
                });
            }
            return NotFound();
        }

        [Route("pic/{dir}/{id}")]
        public IActionResult GetFile(string dir, string id)
        {
            var dirInfo = Directory.CreateDirectory("TestManga");
            string img = Path.Combine(dirInfo.FullName, dir, id);
            if (System.IO.File.Exists(img))
            {
                return File(System.IO.File.ReadAllBytes(img), "image/jpeg");
            }
            return NotFound();
        }
    }
}
