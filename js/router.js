class Router {
    constructor() {
        this.routes = {
            '/': 'home',
            '/home': 'home',
            '/dota2': 'dota2',
            '/csgo2': 'csgo2',
            '/valorant': 'valorant',
            '/league': 'league',
            '/fortnite': 'fortnite',
            '/overwatch': 'overwatch',
            '/pubg': 'pubg',
            '/about': 'about',
            '/contacts': 'contacts',
            '/news': 'news',
            '/tournaments': 'tournaments',
            '/streams': 'streams',
            '/merchandise': 'merchandise'
        };
        
        this.currentPage = 'home';
        this.init();
    }

    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            this.navigateToPage(window.location.pathname);
        });

        // Handle initial route
        this.navigateToPage(window.location.pathname);
    }

    navigateToPage(path) {
        const pageName = this.routes[path] || 'home';
        
        // Update URL without page reload
        if (window.location.pathname !== path) {
            window.history.pushState({}, '', path);
        }
        
        // Update navigation
        this.updateNavigation(pageName);
        
        // Show the page
        this.showPage(pageName);
        
        this.currentPage = pageName;
    }

    updateNavigation(activePage) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current page link
        const activeLink = document.querySelector(`[href="/${activePage}"]`) || 
                          document.querySelector(`[href="#${activePage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    showPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show the target page
        const targetPage = document.getElementById(pageName);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Trigger page change event
        window.dispatchEvent(new CustomEvent('pageChange', { detail: { page: pageName } }));
    }

    // Public method to navigate programmatically
    navigate(path) {
        this.navigateToPage(path);
    }
}

export default Router;
