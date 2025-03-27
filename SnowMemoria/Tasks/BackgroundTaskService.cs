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

using System.Threading.Tasks.Dataflow;

namespace SnowMemoria.Tasks
{
    /// <summary>
    /// 后台任务服务
    /// </summary>
    public class BackgroundTaskService : IHostedService, IDisposable
    {
        private Timer _backgroundTimer;
        private FileSystemWatcher _fileSystemWatcher;
        private ActionBlock<FileSystemEventArgs> _fileChangeActionBlock;
        private ActionBlock<RenamedEventArgs> _fileRenamedActionBlock;
        private ILogger<BackgroundTaskService> _logger;
        private IServiceProvider _serviceProvider;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="serviceProvider"></param>
        public BackgroundTaskService(ILogger<BackgroundTaskService> logger, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
            _fileChangeActionBlock = new ActionBlock<FileSystemEventArgs>(async args =>
            {

            });
            _fileRenamedActionBlock = new ActionBlock<RenamedEventArgs>(async args =>
            {

            });
            _fileSystemWatcher = _fileSystemWatcher = new FileSystemWatcher
            {
                Path = "path/to/your/folder", // Specify the folder to monitor
                NotifyFilter = NotifyFilters.FileName | NotifyFilters.LastWrite | NotifyFilters.CreationTime,
                Filter = "*.*"
            };
            _fileSystemWatcher.Changed += OnChanged;
            _fileSystemWatcher.Created += OnChanged;
            _fileSystemWatcher.Deleted += OnChanged;
            _fileSystemWatcher.Renamed += OnRenamed;
            
            _backgroundTimer = new Timer(DoWork, null, TimeSpan.MaxValue, TimeSpan.MaxValue);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public Task StartAsync(CancellationToken cancellationToken)
        {
            _backgroundTimer.Change(TimeSpan.Zero, TimeSpan.FromMinutes(5));

            // Start monitoring
            _fileSystemWatcher.EnableRaisingEvents = true;

            return Task.CompletedTask;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="state"></param>
        private void DoWork(object? state)
        {
            // 在这里执行后台任务
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void OnChanged(object sender, FileSystemEventArgs e)
        {
            _fileChangeActionBlock.Post(e);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void OnRenamed(object sender, RenamedEventArgs e)
        {
            _fileRenamedActionBlock.Post(e);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public Task StopAsync(CancellationToken cancellationToken)
        {
            _backgroundTimer?.Change(Timeout.Infinite, 0);
            _fileSystemWatcher.EnableRaisingEvents = false;
            return Task.CompletedTask;
        }

        /// <summary>
        /// 
        /// </summary>
        public void Dispose()
        {
            _backgroundTimer?.Dispose();
            _fileSystemWatcher?.Dispose();
        }
    }
}