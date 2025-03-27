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
