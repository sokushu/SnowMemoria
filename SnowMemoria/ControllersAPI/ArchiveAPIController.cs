// MIT License
//
// Copyright(c) 2025 小莕菜
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

using Microsoft.AspNetCore.Mvc;
using SnowMemoria.Database;
using SnowMemoria.Models;

namespace SnowMemoria.ControllersAPI
{
    [Route("/api/archive")]
    [ApiController]
    public class ArchiveAPIController : Controller
    {
        private readonly MyDbContext _context;

        public ArchiveAPIController(MyDbContext context)
        {
            _context = context;
        }

        [Route("manga/{id}")]
        [HttpGet]
        public IActionResult Manga(string id)
        {
#if LOCALSERVERRELEASE || LOCALSERVERDEBUG
            // 本地单用户使用，直接读取压缩包
            var archives = _context.Archives.Where(x => x.Id == id).FirstOrDefault();
            if (archives == null)
            {
                return NotFound();
            }
            else
            {
                return Json(new Manga
                {
                    Title = archives.ComicName,
                    Chapter = "",
                    Pages = new List<MangaPage>(),
                });
            }
#else
            // 服务器使用，从数据库中读取
            var manga = _context.Manga.FirstOrDefault(m => m.Id == id);
            if (manga == null)
            {
                return NotFound();
            }
            return Json(manga);
#endif
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

        [HttpGet]
        [Route("manga/{id}/{picid}")]
        public IActionResult GetFile(string id, string picid)
        {
            var dirInfo = Directory.CreateDirectory("TestManga");
            string img = Path.Combine(dirInfo.FullName, id, picid);
            if (System.IO.File.Exists(img))
            {
                return File(System.IO.File.ReadAllBytes(img), "image/jpeg");
            }
            return NotFound();
        }
    }
}
