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

using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace SnowMemoria.Tasks
{
    public class BackgroundTaskService : IHostedService, IDisposable
    {
        private Timer _timer;
        private FileSystemWatcher _fileSystemWatcher;

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromMinutes(1));

            // Initialize FileSystemWatcher
            _fileSystemWatcher = new FileSystemWatcher
            {
                Path = "path/to/your/folder", // Specify the folder to monitor
                NotifyFilter = NotifyFilters.FileName | NotifyFilters.LastWrite | NotifyFilters.CreationTime,
                Filter = "*.*"
            };

            // Subscribe to events
            _fileSystemWatcher.Changed += OnChanged;
            _fileSystemWatcher.Created += OnChanged;
            _fileSystemWatcher.Deleted += OnChanged;
            _fileSystemWatcher.Renamed += OnRenamed;

            // Start monitoring
            _fileSystemWatcher.EnableRaisingEvents = true;

            return Task.CompletedTask;
        }

        private void DoWork(object? state)
        {
            // 在这里执行后台任务
        }

        private void OnChanged(object sender, FileSystemEventArgs e)
        {
            // Handle file change event
            Console.WriteLine($"File {e.ChangeType}: {e.FullPath}");
        }

        private void OnRenamed(object sender, RenamedEventArgs e)
        {
            // Handle file rename event
            Console.WriteLine($"File Renamed from {e.OldFullPath} to {e.FullPath}");
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            _fileSystemWatcher?.Dispose();
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
            _fileSystemWatcher?.Dispose();
        }
    }
}