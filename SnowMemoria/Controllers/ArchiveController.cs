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

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SnowMemoria.Database;
using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace SnowMemoria.Controllers
{
    public class ArchiveController : Controller
    {
        private readonly string _targetFolderPath = "path/to/your/folder"; // Specify the folder to save uploaded files
        private readonly MyDbContext _context;

        public ArchiveController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            string HashStr = string.Empty;

            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            // Validate file format
            var allowedExtensions = new[] { ".zip", ".rar" };
            var fileExtension = Path.GetExtension(file.FileName).ToLower();
            if (!allowedExtensions.Contains(fileExtension))
            {
                return BadRequest("Invalid file format. Only compressed files are allowed.");
            }

            // Save the file to the specified folder
            var filePath = Path.Combine(_targetFolderPath, file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
                HashStr = BitConverter.ToString(SHA256.HashData(stream));
            }

            // Create an instance of UploadedFile and save it to the database
            var uploadedFile = new UploadedFile
            {
                FileName = file.FileName,
                FilePath = filePath,
                FileSize = file.Length,
                UploadDate = DateTime.Now,
                Hash = HashStr
            };

            _context.UploadedFiles.Add(uploadedFile);
            await _context.SaveChangesAsync();

            return Ok("File uploaded and saved to database successfully.");
        }
    }
}
