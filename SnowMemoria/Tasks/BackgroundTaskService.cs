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

using SnowMemoria.Database;
using System.Threading.Tasks.Dataflow;

namespace SnowMemoria.Tasks
{
    /// <summary>
    /// 后台任务服务
    /// </summary>
    public class BackgroundTaskService : IHostedService, IDisposable
    {
        #region
        private readonly Timer _backgroundTimer;
        private readonly List<FileSystemWatcher> _FileSystemWatcherList = [];
        private readonly ActionBlock<FileSystemEventArgs> _fileChangeActionBlock;
        private readonly ActionBlock<RenamedEventArgs> _fileRenamedActionBlock;
        private readonly ILogger<BackgroundTaskService> _logger;
        private readonly IServiceProvider _serviceProvider;
        private readonly MyDbContext _context;
        #endregion

        /// <summary>
        /// 
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="serviceProvider"></param>
        public BackgroundTaskService(ILogger<BackgroundTaskService> logger, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
            _context = serviceProvider.GetRequiredService<MyDbContext>();
            var setting = _context.WebSiteSettings.FirstOrDefault();
            if (setting == null)
            {
                setting = new WebSiteSetting();
                _context.WebSiteSettings.Add(setting);
                _context.SaveChanges();
            }

            foreach (var item in setting.MangaFolders ?? [])
            {
                _FileSystemWatcherList.Add(new FileSystemWatcher
                {
                    Path = Path.GetFullPath(item.Path), // Specify the folder to monitor
                    NotifyFilter = NotifyFilters.FileName | NotifyFilters.LastWrite | NotifyFilters.CreationTime,
                    Filter = "*.*"
                });
            }
            _FileSystemWatcherList.ForEach(x =>
            {
                x.Changed += OnChanged;
                x.Created += OnChanged;
                x.Deleted += OnChanged;
                x.Renamed += OnRenamed;
            });

            _backgroundTimer = new Timer(DoWork, null, TimeSpan.MaxValue, TimeSpan.MaxValue);

            _fileChangeActionBlock = new ActionBlock<FileSystemEventArgs>(async args =>
            {
                
            });
            _fileRenamedActionBlock = new ActionBlock<RenamedEventArgs>(async args =>
            {

            });
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
            _FileSystemWatcherList.ForEach(x => x.EnableRaisingEvents = true);

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
            _FileSystemWatcherList.ForEach(x => x.EnableRaisingEvents = false);
            return Task.CompletedTask;
        }

        /// <summary>
        /// 
        /// </summary>
        public void Dispose()
        {
            _backgroundTimer?.Dispose();
            _FileSystemWatcherList.ForEach(x => x.Dispose());
            GC.SuppressFinalize(this);
        }
    }
}