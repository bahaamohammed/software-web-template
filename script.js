function toggleCategories() {
    const overlay = document.getElementById('categoriesOverlay');
    if (overlay.style.display === 'block') {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close overlay when clicking outside content
document.addEventListener('click', function(event) {
    const overlay = document.getElementById('categoriesOverlay');
    const overlayContent = document.querySelector('.overlay-content');
    if (event.target === overlay) {
        toggleCategories();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const navContent = document.querySelector('.nav-content');
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    
    // Check if buttons need to be shown
    function checkScrollButtons() {
        const isScrollable = navContent.scrollWidth > navContent.clientWidth;
        
        prevBtn.classList.toggle('hidden', navContent.scrollLeft <= 0);
        nextBtn.classList.toggle('hidden', 
            navContent.scrollLeft >= navContent.scrollWidth - navContent.clientWidth);
            
        // Hide buttons if content doesn't need scrolling
        if (!isScrollable) {
            prevBtn.classList.add('hidden');
            nextBtn.classList.add('hidden');
        }
    }

    // Scroll when clicking buttons
    prevBtn.addEventListener('click', () => {
        navContent.scrollBy({
            left: -200,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        navContent.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    });

    // Monitor scrolling to update button states
    navContent.addEventListener('scroll', checkScrollButtons);
    window.addEventListener('resize', checkScrollButtons);
    
    // Initial check
    checkScrollButtons();

    // Default search data
    const sampleData = [
        { title: "Adobe Photoshop 2024", category: "Graphics & Design" },
        { title: "Windows 11 Pro", category: "Operating System" },
        { title: "Microsoft Office 2024", category: "Office & PDF" },
        { title: "Visual Studio Code", category: "Developer Tools" },
        { title: "Avast Antivirus", category: "Security" },
        { title: "FL Studio", category: "Audio & Music" },
        { title: "Call of Duty", category: "PC Games" },
        { title: "Adobe Premiere Pro", category: "Video Editors" }
    ];

    // Categories data
    const categories = {
        windows: [
            { name: "Security Software", count: 245 },
            { name: "Design Software", count: 189 },
            { name: "Audio Software", count: 156 },
            { name: "Video Software", count: 203 },
            { name: "Internet Software", count: 167 }
        ],
        mac: [
            { name: "Productivity Apps", count: 134 },
            { name: "Development Apps", count: 98 },
            { name: "Design Apps", count: 145 }
        ]
    };

    // Premium plans
    const premiumPlans = [
        {
            name: "Monthly",
            price: "9.99$",
            features: ["Unlimited Downloads", "24/7 Support", "Ad-free"]
        },
        {
            name: "Annual",
            price: "99.99$",
            features: ["Unlimited Downloads", "24/7 Support", "Ad-free", "20% Discount", "Exclusive Content"]
        }
    ];

    // Create modals
    createModals();
    
    // Enable categories and premium buttons
    const categoriesBtn = document.querySelector('.categories-btn');
    const premiumBtn = document.querySelector('.premium-btn');
    
    categoriesBtn.addEventListener('click', showCategoriesModal);
    premiumBtn.addEventListener('click', showPremiumModal);

    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            closeAllModals();
        }
    });

    // Close with Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    function createModals() {
        // Create categories modal
        const categoriesModal = document.createElement('div');
        categoriesModal.className = 'modal-overlay categories-modal';
        categoriesModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Categories</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="categories-tabs">
                        <button class="tab-btn active" data-tab="windows">Windows</button>
                        <button class="tab-btn" data-tab="mac">Mac</button>
                    </div>
                    <div class="categories-list"></div>
                </div>
            </div>
        `;

        // Create premium modal
        const premiumModal = document.createElement('div');
        premiumModal.className = 'modal-overlay premium-modal';
        premiumModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Subscribe to Premium</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="premium-plans">
                        ${premiumPlans.map(plan => `
                            <div class="plan-card">
                                <h4>${plan.name}</h4>
                                <div class="price">${plan.price}</div>
                                <ul>
                                    ${plan.features.map(feature => `
                                        <li>${feature}</li>
                                    `).join('')}
                                </ul>
                                <button class="subscribe-btn">Subscribe Now</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(categoriesModal);
        document.body.appendChild(premiumModal);

        // Enable close buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', closeAllModals);
        });

        // Enable tabs in categories modal
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabName = this.dataset.tab;
                showCategoriesList(tabName);
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    function showCategoriesModal() {
        closeAllModals();
        const modal = document.querySelector('.categories-modal');
        modal.style.display = 'flex';
        showCategoriesList('windows'); // Show Windows categories by default
    }

    function showPremiumModal() {
        closeAllModals();
        const modal = document.querySelector('.premium-modal');
        modal.style.display = 'flex';
    }

    function showCategoriesList(type) {
        const categoriesList = document.querySelector('.categories-list');
        categoriesList.innerHTML = categories[type].map(cat => `
            <div class="category-item">
                <span>${cat.name}</span>
                <span class="count">${cat.count}</span>
            </div>
        `).join('');
    }

    function closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.style.display = 'none';
        });
    }

    // Enable quick search with Ctrl + K
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-container input');
            searchInput.focus();
            showSearchOverlay();
        }

        // Close search with Escape
        if (e.key === 'Escape') {
            hideSearchOverlay();
        }
    });

    // Create search overlay
    const searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-overlay';
    searchOverlay.innerHTML = `
        <div class="search-results">
            <div class="results-header">Search Results</div>
            <div class="results-list"></div>
            <div class="search-tips">
                <div>↑↓ to navigate</div>
                <div>Enter to select</div>
                <div>Esc to close</div>
            </div>
        </div>
    `;
    document.body.appendChild(searchOverlay);

    // Enable live search
    const searchInput = document.querySelector('.search-container input');
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        if (query.length > 0) {
            showSearchResults(query);
        } else {
            hideSearchOverlay();
        }
    });

    function showSearchResults(query) {
        const results = sampleData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query)
        );

        const resultsList = document.querySelector('.results-list');
        resultsList.innerHTML = results.map(item => `
            <div class="search-result-item">
                <div class="result-title">${item.title}</div>
                <div class="result-category">${item.category}</div>
            </div>
        `).join('');

        showSearchOverlay();
    }

    function showSearchOverlay() {
        searchOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function hideSearchOverlay() {
        searchOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
