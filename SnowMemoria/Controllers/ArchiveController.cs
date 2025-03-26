using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SnowMemoria.Database;
using System;
using System.IO;
using System.Linq;
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
            }

            // Create an instance of UploadedFile and save it to the database
            var uploadedFile = new UploadedFile
            {
                FileName = file.FileName,
                FilePath = filePath,
                FileSize = file.Length,
                UploadDate = DateTime.Now
            };

            _context.UploadedFiles.Add(uploadedFile);
            await _context.SaveChangesAsync();

            return Ok("File uploaded and saved to database successfully.");
        }
    }
}
