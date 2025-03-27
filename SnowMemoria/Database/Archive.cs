using System;
using System.ComponentModel.DataAnnotations;

namespace SnowMemoria.Database
{
    /// <summary>
    /// 表示漫画档案
    /// </summary>
    public class Archive
    {
        /// <summary>
        /// 漫画的唯一标识符
        /// </summary>
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        /// <summary>
        /// 漫画名称
        /// </summary>
        public required string ComicName { get; set; }

        /// <summary>
        /// 漫画压缩文件路径
        /// </summary>
        public required string CompressedFilePath { get; set; }

        /// <summary>
        /// 漫画的哈希值
        /// </summary>
        public required string Hash { get; set; }

        /// <summary>
        /// 漫画详细介绍
        /// </summary>
        public string? Description { get; set; }

        /// <summary>
        /// 漫画上传时间
        /// </summary>
        public required DateTime UploadDate { get; set; }

        /// <summary>
        /// 漫画作者
        /// </summary>
        public string? Author { get; set; }

        /// <summary>
        /// 漫画类型
        /// </summary>
        public string? Genre { get; set; }

        /// <summary>
        /// 漫画页数
        /// </summary>
        public int PageCount { get; set; }

        /// <summary>
        /// 漫画封面缩略图路径
        /// </summary>
        public string? CoverThumbnailPath { get; set; }

        /// <summary>
        /// 漫画内容缩略图路径
        /// </summary>
        public string? ContentThumbnailPath { get; set; }
    }
}
