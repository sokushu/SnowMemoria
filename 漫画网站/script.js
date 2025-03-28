// 模拟漫画数据
const comicsData = {
    latest: [
        {
            id: 1,
            title: "龙珠超",
            author: "鸟山明",
            cover: "Cover.png",
            tags: ["热血", "战斗", "冒险"],
            updateTime: "2023-09-15"
        },
        {
            id: 2,
            title: "一拳超人",
            author: "ONE",
            cover: "Cover.png",
            tags: ["搞笑", "战斗", "超能力"],
            updateTime: "2023-09-14"
        },
        {
            id: 3,
            title: "进击的巨人",
            author: "谏山创",
            cover: "Cover.png",
            tags: ["悬疑", "恐怖", "战斗"],
            updateTime: "2023-09-10"
        },
        {
            id: 4,
            title: "鬼灭之刃",
            author: "吾峠呼世晴",
            cover: "Cover.png",
            tags: ["热血", "剑术", "历史"],
            updateTime: "2023-09-08"
        },
        {
            id: 5,
            title: "间谍过家家",
            author: "远藤达哉",
            cover: "Cover.png",
            tags: ["搞笑", "家庭", "动作"],
            updateTime: "2023-09-05"
        },
        {
            id: 6,
            title: "海贼王",
            author: "尾田荣一郎",
            cover: "Cover.png",
            tags: ["冒险", "友情", "战斗"],
            updateTime: "2023-09-01"
        },
        {
            id: 7,
            title: "名侦探柯南",
            author: "青山刚昌",
            cover: "Cover.png",
            tags: ["推理", "悬疑", "犯罪"],
            updateTime: "2023-08-28"
        },
        {
            id: 8,
            title: "咒术回战",
            author: "芥见下下",
            cover: "Cover.png",
            tags: ["奇幻", "战斗", "超能力"],
            updateTime: "2023-08-25"
        },
        {
            id: 17,
            title: "黑执事",
            author: "枢梁",
            cover: "Cover.png",
            tags: ["奇幻", "悬疑", "历史"],
            updateTime: "2023-08-20"
        },
        {
            id: 18,
            title: "青之驱魔师",
            author: "加藤和惠",
            cover: "Cover.png",
            tags: ["奇幻", "动作", "校园"],
            updateTime: "2023-08-18"
        },
        {
            id: 19,
            title: "辉夜大小姐想让我告白",
            author: "赤坂アカ",
            cover: "Cover.png",
            tags: ["恋爱", "校园", "搞笑"],
            updateTime: "2023-08-15"
        },
        {
            id: 20,
            title: "五等分的新娘",
            author: "春場ねぎ",
            cover: "Cover.png",
            tags: ["恋爱", "校园", "后宫"],
            updateTime: "2023-08-10"
        }
    ],
    random: [
        {
            id: 9,
            title: "钢之炼金术师",
            author: "荒川弘",
            cover: "Cover.png",
            tags: ["奇幻", "冒险", "科幻"],
            updateTime: "2023-07-20"
        },
        {
            id: 10,
            title: "东京喰种",
            author: "石田翠",
            cover: "Cover.png",
            tags: ["恐怖", "超能力", "悬疑"],
            updateTime: "2023-06-15"
        },
        {
            id: 11,
            title: "死亡笔记",
            author: "大场鸫",
            cover: "Cover.png",
            tags: ["悬疑", "心理", "超自然"],
            updateTime: "2023-05-10"
        },
        {
            id: 12,
            title: "约定的梦幻岛",
            author: "白井カイウ",
            cover: "Cover.png",
            tags: ["惊悚", "悬疑", "冒险"],
            updateTime: "2023-04-05"
        },
        {
            id: 13,
            title: "食戟之灵",
            author: "附田祐斗",
            cover: "Cover.png",
            tags: ["美食", "竞技", "校园"],
            updateTime: "2023-03-20"
        },
        {
            id: 14,
            title: "排球少年",
            author: "古馆春一",
            cover: "Cover.png",
            tags: ["体育", "热血", "友情"],
            updateTime: "2023-02-15"
        },
        {
            id: 15,
            title: "灌篮高手",
            author: "井上雄彦",
            cover: "Cover.png",
            tags: ["体育", "校园", "热血"],
            updateTime: "2023-01-10"
        },
        {
            id: 16,
            title: "境界触发者",
            author: "葦原大介",
            cover: "Cover.png",
            tags: ["科幻", "战斗", "异世界"],
            updateTime: "2022-12-25"
        },
        {
            id: 21,
            title: "转生成蜘蛛又怎样",
            author: "馬場翁",
            cover: "Cover.png",
            tags: ["异世界", "奇幻", "冒险"],
            updateTime: "2022-11-20"
        },
        {
            id: 22,
            title: "无职转生",
            author: "理不尽な孫の手",
            cover: "Cover.png",
            tags: ["异世界", "奇幻", "冒险"],
            updateTime: "2022-10-15"
        },
        {
            id: 23,
            title: "关于我转生成史莱姆这件事",
            author: "伏瀬",
            cover: "Cover.png",
            tags: ["异世界", "奇幻", "冒险"],
            updateTime: "2022-09-10"
        },
        {
            id: 24,
            title: "工作细胞",
            author: "清水茜",
            cover: "Cover.png",
            tags: ["科普", "搞笑", "拟人"],
            updateTime: "2022-08-05"
        }
    ]
};

// DOM 元素
const comicsList = document.getElementById('comicsList');
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');
const scrollComicsList = document.getElementById('scrollComicsList').querySelector('.scroll-comics');
const scrollSectionSelect = document.getElementById('scrollSectionSelect');
const refreshScrollBtn = document.getElementById('refreshScrollBtn');

// 分页相关变量
const ITEMS_PER_PAGE = 12; // 每页显示的漫画数量
let currentPage = 1; // 当前页码
let totalPages = 1; // 总页数

// DOM 元素 - 添加分页控件相关引用
const pageNumbers = document.getElementById('pageNumbers');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const currentPageSpan = document.getElementById('currentPage');
const totalPagesSpan = document.getElementById('totalPages');

// 当前选中的分类和视图模式
let currentScrollCategory = 'latest'; // 只保留滚动栏目的分类变量
let isGridView = true;

// 渲染横向滚动漫画列表
function renderScrollComics() {
    // 清空现有的漫画列表
    scrollComicsList.innerHTML = '';
    
    // 根据当前分类获取数据
    const comics = comicsData[currentScrollCategory];
    
    // 循环创建漫画条目（显示最多20个）
    const maxComics = Math.min(comics.length, 20);
    for (let i = 0; i < maxComics; i++) {
        const comic = comics[i];
        
        // 创建漫画项元素
        const comicItem = document.createElement('div');
        comicItem.className = 'scroll-comic-item';
        
        // 创建漫画封面图片
        const cover = document.createElement('img');
        cover.src = comic.cover;
        cover.alt = comic.title;
        cover.className = 'scroll-comic-cover';
        
        // 创建漫画标题
        const title = document.createElement('div');
        title.className = 'scroll-comic-title';
        title.textContent = comic.title;
        
        // 组合漫画项
        comicItem.appendChild(cover);
        comicItem.appendChild(title);
        
        // 添加点击事件 - 可以跳转到漫画详情页
        comicItem.addEventListener('click', function() {
            alert(`您点击了《${comic.title}》，即将跳转到详情页...`);
            // 这里可以添加导航到详情页的代码
        });
        
        // 添加漫画项到列表
        scrollComicsList.appendChild(comicItem);
    }
}

// 渲染漫画列表 - 已移除分类选择功能，添加分页功能
function renderComics() {
    // 清空现有的漫画列表
    comicsList.innerHTML = '';
    
    // 使用固定的"latest"分类
    const comics = comicsData.latest;
    
    // 计算总页数
    totalPages = Math.ceil(comics.length / ITEMS_PER_PAGE);
    
    // 更新UI中的总页数
    totalPagesSpan.textContent = totalPages;
    currentPageSpan.textContent = currentPage;
    
    // 确保当前页码有效
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;
    
    // 计算当前页的数据范围
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, comics.length);
    const pageComics = comics.slice(startIndex, endIndex);
    
    // 设置视图类名
    comicsList.className = isGridView ? 'comics-grid' : 'comics-list';
    
    // 移除之前可能存在的所有浮动元素
    cleanupFloatingElements();
    
    // 更新分页按钮状态
    updatePaginationButtons();
    
    // 渲染页码
    renderPageNumbers();
    
    // 循环创建漫画条目 - 只渲染当前页的内容
    pageComics.forEach(comic => {
        // 创建漫画项元素
        const comicItem = document.createElement('div');
        comicItem.className = 'comic-item';
        comicItem.dataset.id = comic.id; // 存储漫画ID用于识别
        
        // 创建漫画封面图片
        const cover = document.createElement('img');
        cover.src = comic.cover;
        cover.alt = comic.title;
        cover.className = 'comic-cover';
        
        // 创建漫画信息容器
        const info = document.createElement('div');
        info.className = 'comic-info';
        
        if (isGridView) {
            // 网格视图(缩略图模式)
            
            // 漫画标题
            const title = document.createElement('h3');
            title.className = 'comic-title';
            title.textContent = comic.title;
            
            // 在网格视图下仅显示标题
            info.appendChild(title);
        } else {
            // 列表视图(表单样式) - 单行紧凑布局
            
            // 漫画标题
            const title = document.createElement('h3');
            title.className = 'comic-title';
            title.textContent = comic.title;
            
            // 漫画作者（可点击）
            const author = document.createElement('span');
            author.className = 'comic-author';
            author.textContent = comic.author;
            author.title = "查看该作者的所有作品";
            author.addEventListener('click', function(e) {
                e.stopPropagation(); // 阻止点击事件冒泡
                alert(`您点击了作者：${comic.author}，即将显示该作者的所有作品...`);
                // 这里可以添加导航到作者页面的代码
            });
            
            // 更新时间
            const updateTime = document.createElement('span');
            updateTime.className = 'comic-update';
            updateTime.textContent = comic.updateTime;
            
            // 标签容器
            const tags = document.createElement('div');
            tags.className = 'comic-tags';
            
            // 添加可点击标签
            comic.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'comic-tag';
                tagSpan.textContent = tag;
                tagSpan.title = `查看更多${tag}类漫画`;
                tagSpan.addEventListener('click', function(e) {
                    e.stopPropagation(); // 阻止点击事件冒泡
                    alert(`您点击了标签：${tag}，即将显示更多${tag}类漫画...`);
                    // 这里可以添加导航到标签页面的代码
                });
                tags.appendChild(tagSpan);
            });
            
            // 组合单行紧凑布局
            info.appendChild(title);
            info.appendChild(author);
            info.appendChild(updateTime);
            info.appendChild(tags);
        }
        
        // 组合漫画项
        comicItem.appendChild(cover);
        comicItem.appendChild(info);
        
        // 添加点击事件 - 可以跳转到漫画详情页
        comicItem.addEventListener('click', function() {
            alert(`您点击了《${comic.title}》，即将跳转到详情页...`);
            // 这里可以添加导航到详情页的代码
        });
        
        // 添加漫画项到列表
        comicsList.appendChild(comicItem);
    });
    
    // 在渲染完所有漫画后创建浮动元素
    if (!isGridView) {
        // 为列表视图(表单样式)创建浮动缩略图
        pageComics.forEach(comic => {
            const preview = document.createElement('img');
            preview.src = comic.cover;
            preview.alt = `${comic.title} 预览`;
            preview.className = 'comic-preview';
            preview.dataset.id = comic.id;
            preview.style.display = 'none'; // 初始隐藏
            document.body.appendChild(preview);
        });
        
        // 添加鼠标进入/离开事件处理
        const comicItems = document.querySelectorAll('.comics-list .comic-item');
        comicItems.forEach(item => {
            const comicId = item.dataset.id;
            
            item.addEventListener('mouseenter', function() {
                const preview = document.querySelector(`.comic-preview[data-id="${comicId}"]`);
                if (preview) {
                    preview.style.display = 'block';
                    // 立即更新位置，避免闪烁
                    updateFloatingPosition(preview);
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const preview = document.querySelector(`.comic-preview[data-id="${comicId}"]`);
                if (preview) {
                    preview.style.display = 'none';
                }
            });
        });
    } else {
        // 为网格视图(缩略图模式)创建浮动详细信息
        pageComics.forEach(comic => {
            const floatingInfo = document.createElement('div');
            floatingInfo.className = 'floating-info';
            floatingInfo.dataset.id = comic.id;
            floatingInfo.style.display = 'none'; // 初始隐藏
            
            // 添加漫画标题
            const floatingTitle = document.createElement('p');
            floatingTitle.className = 'floating-title';
            floatingTitle.textContent = comic.title;
            
            // 添加详细信息
            const floatingAuthor = document.createElement('p');
            floatingAuthor.textContent = `作者: ${comic.author}`;
            
            const floatingUpdate = document.createElement('p');
            floatingUpdate.textContent = `更新: ${comic.updateTime}`;
            
            // 添加标签
            const floatingTags = document.createElement('div');
            floatingTags.className = 'comic-tags';
            
            comic.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'comic-tag';
                tagSpan.textContent = tag;
                floatingTags.appendChild(tagSpan);
            });
            
            floatingInfo.appendChild(floatingTitle);
            floatingInfo.appendChild(floatingAuthor);
            floatingInfo.appendChild(floatingUpdate);
            floatingInfo.appendChild(floatingTags);
            
            document.body.appendChild(floatingInfo);
            
            // 保留旧的悬停信息（用于移动设备）
            const comicItem = document.querySelector(`.comic-item[data-id="${comic.id}"]`);
            if (comicItem) {
                const hoverInfo = document.createElement('div');
                hoverInfo.className = 'comic-hover-info';
                
                const hoverAuthor = document.createElement('p');
                hoverAuthor.textContent = `作者: ${comic.author}`;
                
                const hoverUpdate = document.createElement('p');
                hoverUpdate.textContent = `更新: ${comic.updateTime}`;
                
                const hoverTags = document.createElement('div');
                hoverTags.className = 'comic-tags';
                
                comic.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'comic-tag';
                    tagSpan.textContent = tag;
                    hoverTags.appendChild(tagSpan);
                });
                
                hoverInfo.appendChild(hoverAuthor);
                hoverInfo.appendChild(hoverUpdate);
                hoverInfo.appendChild(hoverTags);
                
                comicItem.appendChild(hoverInfo);
            }
        });
        
        // 添加鼠标进入/离开事件处理
        const comicItems = document.querySelectorAll('.comics-grid .comic-item');
        comicItems.forEach(item => {
            const comicId = item.dataset.id;
            
            item.addEventListener('mouseenter', function(e) {
                const floatingInfo = document.querySelector(`.floating-info[data-id="${comicId}"]`);
                if (floatingInfo) {
                    floatingInfo.style.display = 'block';
                    // 立即更新位置，避免闪烁
                    updateFloatingPosition(floatingInfo, e.clientX, e.clientY);
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const floatingInfo = document.querySelector(`.floating-info[data-id="${comicId}"]`);
                if (floatingInfo) {
                    floatingInfo.style.display = 'none';
                }
            });
        });
    }
}

// 渲染页码
function renderPageNumbers() {
    pageNumbers.innerHTML = '';
    
    // 确定显示的页码范围 (最多显示5个页码)
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);
    
    // 调整起始页码，确保始终显示5个页码（如果总页数足够）
    if (endPage - startPage < 4 && totalPages > 4) {
        startPage = Math.max(endPage - 4, 1);
    }
    
    // 添加第一页按钮（如果需要）
    if (startPage > 1) {
        addPageNumber(1);
        if (startPage > 2) {
            addPageEllipsis();
        }
    }
    
    // 添加页码按钮
    for (let i = startPage; i <= endPage; i++) {
        addPageNumber(i);
    }
    
    // 添加最后一页按钮（如果需要）
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            addPageEllipsis();
        }
        addPageNumber(totalPages);
    }
}

// 添加页码按钮
function addPageNumber(pageNum) {
    const pageButton = document.createElement('div');
    pageButton.className = `page-number ${pageNum === currentPage ? 'active' : ''}`;
    pageButton.textContent = pageNum;
    pageButton.addEventListener('click', () => {
        if (pageNum !== currentPage) {
            currentPage = pageNum;
            renderComics();
        }
    });
    pageNumbers.appendChild(pageButton);
}

// 添加省略号
function addPageEllipsis() {
    const ellipsis = document.createElement('div');
    ellipsis.className = 'page-number ellipsis';
    ellipsis.textContent = '...';
    ellipsis.style.cursor = 'default';
    ellipsis.style.pointerEvents = 'none';
    pageNumbers.appendChild(ellipsis);
}

// 更新分页按钮状态
function updatePaginationButtons() {
    prevPageBtn.disabled = currentPage <= 1;
    nextPageBtn.disabled = currentPage >= totalPages;
}

// 更新浮动元素位置的辅助函数
function updateFloatingPosition(element, mouseX, mouseY) {
    if (!mouseX || !mouseY) {
        // 如果没有提供鼠标坐标，使用当前鼠标位置
        mouseX = lastMouseX;
        mouseY = lastMouseY;
    }
    
    const offsetX = 20; // 横向偏移量
    
    // 确保浮动元素不会超出视口
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let posX = mouseX + offsetX;
    let posY = mouseY - element.offsetHeight / 2; // 垂直居中
    
    // 如果右侧空间不足，显示在左侧
    if (posX + element.offsetWidth > viewportWidth - 20) {
        posX = mouseX - element.offsetWidth - offsetX;
    }
    
    // 如果纵向空间不足，调整位置
    if (posY < 10) {
        posY = 10;
    } else if (posY + element.offsetHeight > viewportHeight - 10) {
        posY = viewportHeight - element.offsetHeight - 10;
    }
    
    element.style.left = posX + 'px';
    element.style.top = posY + 'px';
}

// 记录上次鼠标位置的变量
let lastMouseX = 0;
let lastMouseY = 0;

// 鼠标移动事件处理 - 更新浮动元素位置
document.addEventListener('mousemove', function(e) {
    // 更新记录的鼠标位置
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    
    // 更新所有可见的浮动缩略图位置
    const visiblePreviews = Array.from(document.querySelectorAll('.comic-preview')).filter(p => p.style.display === 'block');
    visiblePreviews.forEach(preview => {
        updateFloatingPosition(preview, e.clientX, e.clientY);
    });
    
    // 更新所有可见的浮动详细信息位置
    const visibleInfos = Array.from(document.querySelectorAll('.floating-info')).filter(i => i.style.display === 'block');
    visibleInfos.forEach(info => {
        updateFloatingPosition(info, e.clientX, e.clientY);
    });
});

// 视图切换时清理浮动元素
function cleanupFloatingElements() {
    // 清除所有浮动缩略图
    const floatingPreviews = document.querySelectorAll('.comic-preview');
    floatingPreviews.forEach(preview => {
        preview.remove();
    });
    
    // 清除所有浮动信息
    const floatingInfos = document.querySelectorAll('.floating-info');
    floatingInfos.forEach(info => {
        info.remove();
    });
}

// 模拟API刷新数据
function refreshData() {
    return new Promise((resolve) => {
        // 显示加载动画
        scrollComicsList.innerHTML = '<div style="text-align: center; width: 100%;"><i class="fas fa-spinner fa-spin fa-2x"></i><p>正在加载...</p></div>';
        
        // 模拟API延迟
        setTimeout(() => {
            // 随机打乱当前分类的漫画顺序
            const comics = [...comicsData[currentScrollCategory]];
            for (let i = comics.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [comics[i], comics[j]] = [comics[j], comics[i]];
            }
            
            // 更新数据
            comicsData[currentScrollCategory] = comics;
            resolve();
        }, 800);
    });
}

// 初始化页面
function init() {
    // 渲染初始漫画列表
    renderComics();
    renderScrollComics();
    
    // 移除了详细条目分类选择的监听代码
    
    // 监听滚动栏目分类选择变化
    scrollSectionSelect.addEventListener('change', function() {
        currentScrollCategory = this.value;
        renderScrollComics();
    });
    
    // 监听刷新按钮点击
    refreshScrollBtn.addEventListener('click', function() {
        refreshData().then(() => {
            renderScrollComics();
        });
    });
    
    // 监听网格视图按钮点击
    gridViewBtn.addEventListener('click', function() {
        if (!isGridView) {
            cleanupFloatingElements(); // 清理浮动元素
            isGridView = true;
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            renderComics();
        }
    });
    
    // 监听列表视图按钮点击
    listViewBtn.addEventListener('click', function() {
        if (isGridView) {
            cleanupFloatingElements(); // 清理浮动元素
            isGridView = false;
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            renderComics();
        }
    });
    
    // 监听分页按钮点击
    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderComics();
        }
    });
    
    nextPageBtn.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            renderComics();
        }
    });
    
    // 给用户名添加点击事件（可选）
    const username = document.querySelector('.username');
    if (username) {
        username.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            const dropdown = this.nextElementSibling;
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // 点击页面其他地方关闭用户下拉菜单
    document.addEventListener('click', function() {
        const dropdown = document.querySelector('.user-profile .dropdown-content');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
