/**
 * 漫画阅读器
 */
class MangaReader {
    /**
     * 阅读模式：单页模式
     */
    static MODE_SINGLE = 'single';
    /**
     * 阅读模式：双页模式
     */
    static MODE_DOUBLE = 'double';
    /**
     * 阅读模式：连续模式
     */
    static MODE_CONTINUOUS = 'continuous';
    /**
     * 阅读方向：从左到右
     */
    static DIRECTION_LTR = 'ltr';
    /**
     * 阅读方向：从右到左
     */
    static DIRECTION_RTL = 'rtl';
    /**
     * 存储Key：阅读模式
     */
    static KEY_MODE = 'MODE';
    /**
     * 存储Key：阅读方向
     */
    static KEY_DIRECTION = 'MODEDIRECTION';

    /**
     * 初始化
     */
    constructor() {
        this.GetLocalStorage = (key, defVal) => {
            var value = localStorage.getItem(key);
            if (value) {
                return value;
            } else {
                localStorage.setItem(key, defVal);
                return defVal;
            }
        };
        this.SaveLocalStorage = (key, value) => {
            localStorage.setItem(key, value);
            return value;
        };

        /**
         * 默认单页模式
         */
        this.currentMode = this.GetLocalStorage(MangaReader.KEY_MODE, MangaReader.MODE_SINGLE);
        /**
         * 默认从右到左阅读（漫画常用）
         */
        this.readingDirection = this.GetLocalStorage(MangaReader.KEY_DIRECTION, MangaReader.DIRECTION_RTL);
        /**
         * 跨页调整状态
         */
        this.spreadsAdjusted = false; 
        /**
         * 漫画数据
         */
        this.mangaData = null; 
        /**
         * 当前页索引
         */
        this.currentPageIndex = 0;
        /**
         * 漫画容器
         */
        this.container = document.getElementById('reader-container');
        /**
         * 信息栏可见状态
         */
        this.barsVisible = true;
        /**
         * 鼠标自动隐藏功能
         */
        this.mouseTimeout = null;
        this.hideMouseCursor = () => {
            this.container.style.cursor = 'none';
            document.body.classList.add('no-cursor');
        };
        this.showMouseCursor = () => {
            this.container.style.cursor = 'auto';
            document.body.classList.remove('no-cursor');
            
            // 重置计时器
            if (this.mouseTimeout) {
                clearTimeout(this.mouseTimeout);
            }
            
            // 设置计时器，2秒后隐藏鼠标
            this.mouseTimeout = setTimeout(() => {
                this.hideMouseCursor();
            }, 2000);
        };
        // 初始化鼠标移动监听
        this.container.addEventListener('mousemove', () => {
            this.showMouseCursor();
        });
        // 当信息栏显示时保持鼠标可见
        this.container.addEventListener('mouseenter', () => {
            this.showMouseCursor();
        });
        // 离开阅读区域时恢复光标
        this.container.addEventListener('mouseleave', () => {
            clearTimeout(this.mouseTimeout);
            this.showMouseCursor();
        });
        /**
         * 上一页
         */
        this.prevPageFunction = () => {
            if (this.currentMode === MangaReader.MODE_SINGLE) {
                if (this.currentPageIndex > 0) {
                    this.currentPageIndex--;
                    this.updateUI();
                }
            } 
            else if (this.currentMode === MangaReader.MODE_DOUBLE) {
                // 双页模式下根据情况减少索引
                if (this.currentPageIndex > 0) {
                    const prevPage = this.mangaData.pages[this.currentPageIndex - 1];
                    this.currentPageIndex = prevPage.isSpread && !this.spreadsAdjusted ? 
                        this.currentPageIndex - 1 : this.currentPageIndex - 2;
                    this.currentPageIndex = Math.max(0, this.currentPageIndex);
                    this.updateUI();
                }
            }
            else if (this.currentMode === MangaReader.MODE_CONTINUOUS) {
                if (this.currentPageIndex > 0) {
                    this.currentPageIndex--;
                    this.updateUI();
                }
            }
        };
        
        /**
         * 下一页
         */
        this.nextPageFunction = () => {
            const totalPages = this.mangaData.pages.length;
        
            if (this.currentMode === MangaReader.MODE_SINGLE) {
                if (this.currentPageIndex < totalPages - 1) {
                    this.currentPageIndex++;
                    this.updateUI();
                }
            } 
            else if (this.currentMode === MangaReader.MODE_DOUBLE) {
                // 双页模式下根据情况增加索引
                if (this.currentPageIndex < totalPages - 1) {
                    const currentPage = this.mangaData.pages[this.currentPageIndex];
                    const increment = (currentPage.isSpread && !this.spreadsAdjusted) ? 1 : 2;
                    this.currentPageIndex = Math.min(totalPages - 1, this.currentPageIndex + increment);
                    this.updateUI();
                }
            }
            else if (this.currentMode === MangaReader.MODE_CONTINUOUS) {
                if (this.currentPageIndex < totalPages - 1) {
                    this.currentPageIndex++;
                    this.updateUI();
                }
            }
        };
        this.initEventListeners();
        this.fetchMangaData();
    }
    /**
     * 初始化事件监听器
     */
    initEventListeners() {
        // 模式切换按钮
        document.getElementById('single-mode').addEventListener('click', () => this.changeMode(MangaReader.MODE_SINGLE));
        document.getElementById('double-mode').addEventListener('click', () => this.changeMode(MangaReader.MODE_DOUBLE));
        document.getElementById('continuous-mode').addEventListener('click', () => this.changeMode(MangaReader.MODE_CONTINUOUS));
        
        // 阅读方向切换按钮
        document.getElementById('ltr-mode').addEventListener('click', () => this.changeDirection(MangaReader.DIRECTION_LTR));
        document.getElementById('rtl-mode').addEventListener('click', () => this.changeDirection(MangaReader.DIRECTION_RTL));
        
        // 翻页按钮
        document.getElementById('prev-button').addEventListener('click', () => this.prevPage());
        document.getElementById('next-button').addEventListener('click', () => this.nextPage());
        
        // 跨页调整
        document.getElementById('toggle-spread').addEventListener('click', () => this.toggleSpread());
        
        // 键盘导航 - 修改为根据阅读方向调整
        document.addEventListener('keydown', (e) => {
            // 根据阅读方向调整左右键的行为
            if (this.readingDirection === MangaReader.DIRECTION_LTR) {
                if (e.key === 'ArrowLeft') this.prevPage();
                if (e.key === 'ArrowRight') this.nextPage();
            } else {
                if (e.key === 'ArrowRight') this.prevPage();
                if (e.key === 'ArrowLeft') this.nextPage();
            }
        });
        
        // 点击容器中心区域显示/隐藏信息栏
        this.container.addEventListener('click', (e) => {
            // 仅当点击在中心区域时才触发显示/隐藏
            const containerRect = this.container.getBoundingClientRect();
            const centerWidth = containerRect.width * 0.6; // 中心60%的区域
            const centerHeight = containerRect.height * 0.6; // 中心60%的区域
            const centerX = containerRect.left + containerRect.width / 2;
            const centerY = containerRect.top + containerRect.height / 2;
            
            // 计算点击位置与中心的距离
            const clickX = e.clientX;
            const clickY = e.clientY;
            
            // 判断点击是否在中心区域
            if (Math.abs(clickX - centerX) < centerWidth / 2 && 
                Math.abs(clickY - centerY) < centerHeight / 2) {
                this.toggleBars();
            }
        });
        
        // 滚轮事件处理
        this.container.addEventListener('wheel', (e) => {
            // 连续模式下不拦截滚轮事件，让系统滚动条正常工作
            if (this.currentMode === MangaReader.MODE_CONTINUOUS) {
                return;
            }
            
            if (e.deltaY > 0) this.nextPageFunction();
            else if (e.deltaY < 0) this.prevPageFunction();
        });

        // 添加返回主页按钮事件监听
        document.getElementById('home-button').addEventListener('click', () => this.returnToHome());
        
        // 添加帮助按钮事件监听
        document.getElementById('help-button').addEventListener('click', () => this.showHelp());
        document.getElementById('close-help').addEventListener('click', () => this.closeHelp());
        
        // 点击帮助弹窗外部区域关闭弹窗
        document.getElementById('help-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'help-overlay') {
                this.closeHelp();
            }
        });

        // 显示选项菜单按钮
        const optionsMenuButton = document.getElementById('options-menu-button');
        const optionsMenu = document.getElementById('options-menu');
        optionsMenuButton.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            optionsMenu.classList = '';
            const isActive = optionsMenuButton.classList.toggle('active');
            optionsMenu.style.display = isActive ? 'flex' : 'none';
        });

        // 点击页面其他地方时隐藏菜单
        document.addEventListener('click', () => {
            optionsMenuButton.classList.remove('active');
            optionsMenu.style.display = 'none';
        });
    }
    /**
     * 从API获取漫画数据
     */
    async fetchMangaData() {
        try {
            // 这里应替换为实际的API接口
            // const response = await fetch('https://your-manga-api.com/manga/123');
            // this.mangaData = await response.json();
            
            // 模拟数据，实际应用中应从API获取
            this.mangaData = {
                title: "示例漫画",
                chapter: "第1章",
                pages: Array.from({length: 9}, (_, i) => ({
                    id: i + 1,
                    // 使用file协议加载本地图片
                    url: `file:///D:/Documents/Github/SnowMemoria/新建文件夹/MangaReader/Manga/000${i+1}.jpg`,
                    isSpread: false // 每5页有一个跨页
                }))
            };
            
            this.updateUI();
            this.showBars(); // 初始显示信息栏
            
            // 初始时如果是连续模式，隐藏翻页按钮
            if (this.currentMode === MangaReader.MODE_CONTINUOUS) {
                document.getElementById('prev-button').style.display = 'none';
                document.getElementById('next-button').style.display = 'none';
            }
        } catch (error) {
            console.error('获取漫画数据失败:', error);
            alert('获取漫画数据失败，请刷新页面重试');
        }
    }

    // 更新UI
    updateUI() {
        if (!this.mangaData) return;
        
        document.getElementById('manga-title').textContent = this.mangaData.title;
        document.getElementById('chapter-info').textContent = this.mangaData.chapter;
        document.getElementById('total-pages').textContent = this.mangaData.pages.length;
        let pageindexRange = '';
        if (this.currentMode === MangaReader.MODE_DOUBLE && !this.mangaData.pages[this.currentPageIndex].isSpread) {
            let showindex = -1;
            if (!this.spreadsAdjusted) {
                showindex = 0;
            }
            if (this.currentPageIndex + showindex < 0) {
                pageindexRange = `${this.currentPageIndex + showindex + 2}`
            }
            else if (this.currentPageIndex + showindex + 1 === this.mangaData.pages.length){
                pageindexRange = `${this.currentPageIndex + showindex + 1}`
            } else {
                pageindexRange = `${this.currentPageIndex + showindex + 1} - ${this.currentPageIndex + showindex + 2}`
            }
        } else {
            pageindexRange = `${this.currentPageIndex + 1}`;
        }
        document.getElementById('current-page').textContent = pageindexRange;
        this.renderPages();
    }

    // 渲染页面
    renderPages() {
        this.container.innerHTML = '';
        
        if (this.currentMode === MangaReader.MODE_SINGLE) {
            const page = this.mangaData.pages[this.currentPageIndex];
            const img = document.createElement('img');
            img.src = page.url;
            img.alt = `Page ${this.currentPageIndex + 1}`;
            img.className = 'manga-page';
            this.container.appendChild(img);
        } 
        else if (this.currentMode === MangaReader.MODE_DOUBLE) {
            let pageIndex = this.currentPageIndex;
            
            // 检查当前页是否为跨页
            const currentPage = this.mangaData.pages[pageIndex];
            if (currentPage && currentPage.isSpread) {
                // 如果是跨页，则仅显示当前页
                const img = document.createElement('img');
                img.src = currentPage.url;
                img.alt = `Page ${pageIndex + 1}`;
                img.className = 'manga-page';
                img.style.maxWidth = '100%'; // 让跨页占据全宽
                img.style.minHeight = '100%';
                
                const wrapper = document.createElement('div');
                wrapper.style.display = 'flex';
                wrapper.style.justifyContent = 'center';
                wrapper.style.alignItems = 'center';
                wrapper.style.height = '100%';
                wrapper.style.width = '100%';
                
                wrapper.appendChild(img);
                this.container.appendChild(wrapper);
                return; // 提前返回，不执行后续双页显示代码
            }

            let index = -1;
            if (!this.spreadsAdjusted) {
                index = 0;
            }
            
            // 获取要显示的两页
            let pagesToShow = [];
            for (let i = 0 + index; i < 2 + index; i++) {
                if (pageIndex + i < this.mangaData.pages.length && pageIndex + i >= 0) {
                    pagesToShow.push({
                        page: this.mangaData.pages[pageIndex + i],
                        index: pageIndex + i
                    });
                }
            }
            
            // 创建包装容器使页面聚拢在中央
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.justifyContent = 'center';
            wrapper.style.alignItems = 'center';
            wrapper.style.height = '100%';
            wrapper.style.width = '100%';
            wrapper.style.maxWidth = '100%';
            
            // 根据阅读方向排序页面
            if (this.readingDirection === MangaReader.DIRECTION_RTL) {
                pagesToShow.reverse();
            }
            
            // 显示页面
            pagesToShow.forEach((item, idx) => {
                const img = document.createElement('img');
                img.src = item.page.url;
                img.alt = `Page ${item.index + 1}`;
                img.className = 'manga-page';
                
                // 添加对应的定位类
                if (this.readingDirection === MangaReader.DIRECTION_LTR) {
                    img.classList.add(idx === 0 ? 'ltr-left' : 'ltr-right');
                } else {
                    img.classList.add(idx === 0 ? 'rtl-right' : 'rtl-left');
                }
                
                wrapper.appendChild(img);
            });
            
            this.container.appendChild(wrapper);
        } 
        else if (this.currentMode === MangaReader.MODE_CONTINUOUS) {
            // 连续模式显示所有页面
            this.mangaData.pages.forEach((page, index) => {
                // 为每个图片创建包装容器
                const wrapper = document.createElement('div');
                wrapper.style.width = '100%';
                wrapper.style.textAlign = 'center';
                wrapper.style.marginBottom = '20px';
                
                const img = document.createElement('img');
                img.src = page.url;
                img.alt = `Page ${index + 1}`;
                img.className = 'manga-page';
                
                // 如果是跨页，设置最大宽度为100%
                if (page.isSpread) {
                    img.style.maxWidth = '100%';
                }
                
                img.style.minWidth = '70%';

                wrapper.appendChild(img);
                this.container.appendChild(wrapper);

                // 滚动到当前页
                if (index === this.currentPageIndex) {
                    setTimeout(() => {
                        img.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            });
        }
    }

    // 切换阅读模式
    changeMode(mode) {
        this.currentMode = this.SaveLocalStorage(MangaReader.KEY_MODE, mode);
        
        // 更新按钮状态
        document.querySelectorAll('.control-button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${mode}-mode`).classList.add('active');
        
        // 更新容器类
        this.container.className = '';
        this.container.classList.add(`${mode}-page-mode`);
        
        // 在连续模式下隐藏翻页按钮，其他模式显示
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');
        const directionToggle = document.getElementById('direction-toggle');
        const toggleSpread = document.getElementById('toggle-spread');
        const pageInfo = document.getElementById('page-info');

        if (mode === MangaReader.MODE_CONTINUOUS) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
            directionToggle.style.display = 'none';
            toggleSpread.style.display = 'none';
            pageInfo.style.display = 'none';
        } else {
            if (mode === MangaReader.MODE_SINGLE){
                prevButton.style.display = 'block';
                nextButton.style.display = 'block';
                directionToggle.style.display = 'inline-flex';
                toggleSpread.style.display = 'none';
                pageInfo.style.display = 'block';

                // this.container.style.overflow = 'hidden';
                // document.body.style.overflow = 'hidden';
            }else{
                prevButton.style.display = 'block';
                nextButton.style.display = 'block';
                directionToggle.style.display = 'inline-flex';
                toggleSpread.style.display = 'block';
                pageInfo.style.display = 'block';

                // this.container.style.overflow = 'hidden';
                // document.body.style.overflow = 'hidden';
            }
        }
        
        this.updateUI();
    }

    // 上一页
    prevPage() {
        if (this.readingDirection === MangaReader.DIRECTION_RTL && this.currentMode != MangaReader.MODE_CONTINUOUS) {
            this.nextPageFunction();
        } else {
            this.prevPageFunction();
        }
    }

    // 下一页
    nextPage() {
        if (this.readingDirection === MangaReader.DIRECTION_RTL && this.currentMode != MangaReader.MODE_CONTINUOUS) {
            this.prevPageFunction();
        } else {
            this.nextPageFunction();
        }
    }

    // 切换跨页调整
    toggleSpread() {
        this.spreadsAdjusted = !this.spreadsAdjusted;
        document.getElementById('toggle-spread').classList.toggle('active', this.spreadsAdjusted);
        this.updateUI();
    }

    // 显示信息栏
    showBars() {
        const topBar = document.getElementById('top-bar');
        topBar.classList.remove('hidden');
        this.barsVisible = true;
    }
    
    // 隐藏信息栏
    hideBars() {
        const topBar = document.getElementById('top-bar');
        topBar.classList.add('hidden');
        this.barsVisible = false;
    }
    
    /**
     * 切换信息栏显示/隐藏
     */
    toggleBars() {
        if (this.barsVisible) {
            this.hideBars();
        } else {
            this.showBars();
        }
    }
    /**
     * 切换阅读方向
     * @param {阅读的方向} direction 
     */
    changeDirection(direction) {
        this.readingDirection = this.SaveLocalStorage(MangaReader.KEY_DIRECTION, direction);
        
        // 更新按钮状态
        document.querySelectorAll('.direction-button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${direction}-mode`).classList.add('active');
        
        this.renderPages();
    }
    /**
     * 返回主页按钮
     */
    returnToHome() {
        // 确认是否返回主页
        if (confirm('确定要返回主页吗？当前阅读进度将不会保存。')) {
            // 可以替换为实际的主页URL
            window.location.href = 'index.html'; // 或其他主页路径
        }
    }
    /**
     * 显示帮助弹窗
     */
    showHelp() {
        const helpOverlay = document.getElementById('help-overlay');
        helpOverlay.classList.add('active');
        
        // 防止滚动条滚动
        document.body.style.overflow = 'hidden';
    }
    /**
     * 关闭帮助弹窗
     */
    closeHelp() {
        const helpOverlay = document.getElementById('help-overlay');
        helpOverlay.classList.remove('active');
        
        // 恢复滚动条
        document.body.style.overflow = '';
    }
}
