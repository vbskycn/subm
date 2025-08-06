// 目录生成和导航功能
class TableOfContents {
    constructor() {
        this.tocList = document.getElementById('tocList');
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.mainContent = document.getElementById('mainContent');
        this.headings = [];
        this.tocItems = [];
        this.currentSection = null;
        
        this.init();
    }
    
    init() {
        this.generateTOC();
        this.setupEventListeners();
        this.setupScrollSpy();
        this.setupResponsive();
    }
    
    // 生成目录
    generateTOC() {
        const content = this.mainContent.querySelector('.page-content');
        if (!content) return;
        
        // 获取所有标题
        this.headings = Array.from(content.querySelectorAll('h1, h2, h3, h4, h5, h6'))
            .filter(heading => heading.textContent.trim() !== '');
        
        if (this.headings.length === 0) {
            this.tocList.innerHTML = '<li class="toc-item"><span class="toc-link">暂无目录</span></li>';
            return;
        }
        
        // 为每个标题添加ID
        this.headings.forEach((heading, index) => {
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }
        });
        
        // 生成目录HTML
        const tocHTML = this.buildTOCHTML(this.headings);
        this.tocList.innerHTML = tocHTML;
        
        // 保存目录项引用
        this.tocItems = Array.from(this.tocList.querySelectorAll('.toc-link'));
    }
    
    // 构建目录HTML
    buildTOCHTML(headings) {
        let html = '';
        let currentLevel = 0;
        
        headings.forEach((heading, index) => {
            const level = parseInt(heading.tagName.charAt(1));
            const text = heading.textContent.trim();
            const id = heading.id;
            
            // 处理层级缩进
            if (level > currentLevel) {
                html += '<ul>';
            } else if (level < currentLevel) {
                const diff = currentLevel - level;
                for (let i = 0; i < diff; i++) {
                    html += '</ul>';
                }
            }
            
            html += `
                <li class="toc-item">
                    <a href="#${id}" class="toc-link" data-level="${level}" data-index="${index}">
                        ${this.escapeHtml(text)}
                    </a>
                </li>
            `;
            
            currentLevel = level;
        });
        
        // 关闭剩余的ul标签
        while (currentLevel > 0) {
            html += '</ul>';
            currentLevel--;
        }
        
        return html;
    }
    
    // 设置事件监听器
    setupEventListeners() {
        // 目录链接点击事件
        this.tocList.addEventListener('click', (e) => {
            if (e.target.classList.contains('toc-link')) {
                e.preventDefault();
                const href = e.target.getAttribute('href');
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    this.scrollToElement(targetElement);
                    this.updateActiveLink(e.target);
                }
            }
        });
        
        // 侧边栏切换按钮
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }
        
        // 点击外部关闭侧边栏
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!this.sidebar.contains(e.target) && !this.sidebarToggle.contains(e.target)) {
                    this.closeSidebar();
                }
            }
        });
    }
    
    // 设置滚动监听
    setupScrollSpy() {
        if (this.headings.length === 0) return;
        
        const observerOptions = {
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const headingId = entry.target.id;
                    const tocLink = this.tocList.querySelector(`[href="#${headingId}"]`);
                    if (tocLink) {
                        this.updateActiveLink(tocLink);
                    }
                }
            });
        }, observerOptions);
        
        this.headings.forEach(heading => {
            observer.observe(heading);
        });
    }
    
    // 设置响应式功能
    setupResponsive() {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        
        const handleResize = (e) => {
            if (e.matches) {
                this.closeSidebar();
            } else {
                this.openSidebar();
            }
        };
        
        mediaQuery.addListener(handleResize);
        handleResize(mediaQuery);
    }
    
    // 滚动到指定元素
    scrollToElement(element) {
        const offset = 100; // 顶部偏移量
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    // 更新活动链接
    updateActiveLink(activeLink) {
        // 移除所有活动状态
        this.tocItems.forEach(item => {
            item.classList.remove('active', 'current');
        });
        
        // 添加活动状态
        activeLink.classList.add('active', 'current');
        
        // 确保活动项在视图中
        this.scrollToActiveItem(activeLink);
    }
    
    // 滚动到活动项
    scrollToActiveItem(activeItem) {
        const sidebar = this.sidebar;
        const itemRect = activeItem.getBoundingClientRect();
        const sidebarRect = sidebar.getBoundingClientRect();
        
        if (itemRect.top < sidebarRect.top || itemRect.bottom > sidebarRect.bottom) {
            activeItem.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
    
    // 切换侧边栏
    toggleSidebar() {
        this.sidebar.classList.toggle('open');
        this.updateToggleButton();
    }
    
    // 打开侧边栏
    openSidebar() {
        this.sidebar.classList.add('open');
        this.updateToggleButton();
    }
    
    // 关闭侧边栏
    closeSidebar() {
        this.sidebar.classList.remove('open');
        this.updateToggleButton();
    }
    
    // 更新切换按钮状态
    updateToggleButton() {
        if (!this.sidebarToggle) return;
        
        const spans = this.sidebarToggle.querySelectorAll('span');
        if (this.sidebar.classList.contains('open')) {
            // 汉堡菜单变为X
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            // X变为汉堡菜单
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // HTML转义
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new TableOfContents();
});

// 平滑滚动到锚点
document.addEventListener('DOMContentLoaded', () => {
    // 处理页面加载时的锚点
    if (window.location.hash) {
        setTimeout(() => {
            const element = document.querySelector(window.location.hash);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    }
    
    // 处理所有内部链接的平滑滚动
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (link && link.href.includes(window.location.pathname)) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // 更新URL
                history.pushState(null, null, link.getAttribute('href'));
            }
        }
    });
});

// 键盘快捷键支持
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K 切换侧边栏
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const toc = window.tableOfContents;
        if (toc) {
            toc.toggleSidebar();
        }
    }
    
    // ESC 关闭侧边栏
    if (e.key === 'Escape') {
        const toc = window.tableOfContents;
        if (toc && window.innerWidth <= 768) {
            toc.closeSidebar();
        }
    }
});

// 将实例保存到全局变量以便调试
window.tableOfContents = null;
document.addEventListener('DOMContentLoaded', () => {
    window.tableOfContents = new TableOfContents();
}); 