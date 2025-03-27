using System;
using System.ComponentModel.DataAnnotations;

namespace SnowMemoria.Database
{
    /// <summary>
    /// 表示上传的文件
    /// </summary>
    public class UploadedFile
    {
        /// <summary>
        /// 文件的唯一标识符
        /// </summary>
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        /// <summary>
        /// 文件名
        /// </summary>
        public required string FileName { get; set; }

        /// <summary>
        /// 文件路径
        /// </summary>
        public required string FilePath { get; set; }

        /// <summary>
        /// 文件大小（以字节为单位）
        /// </summary>
        public required long FileSize { get; set; }

        /// <summary>
        /// 文件的哈希值
        /// </summary>
        public required string Hash { get; set; }

        /// <summary>
        /// 文件上传日期
        /// </summary>
        public required DateTime UploadDate { get; set; }
    }
}
