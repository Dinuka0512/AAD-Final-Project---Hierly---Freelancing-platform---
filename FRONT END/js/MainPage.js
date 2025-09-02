// NAVIGATION MENU FUNCTIONALITY
const menuBar = document.getElementById('menuBar');
const menuIcon = document.getElementById('menuIcon');

menuBar.addEventListener('click', () => {
    // Toggle icon
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-xmark');
    menuIcon.classList.toggle('active');

    var smallNav = document.getElementById('menuSmall');
    if (menuIcon.classList.contains('fa-bars')) {
        //CLOSE
        smallNav.style.display = 'none';
    } else {
        //MENU
        smallNav.style.display = 'block';
    }
});

// SMOOTH SCROLLING FOR NAVIGATION LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const smallNav = document.getElementById('menuSmall');
            if (smallNav.style.display === 'block') {
                smallNav.style.display = 'none';
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('active');
            }
        }
    });
});

// ENHANCED SEARCH FUNCTIONALITY
const searchInput = document.getElementById('textSearch');
const searchButton = document.querySelector('.search-btn');
const searchSuggestions = document.getElementById('searchSuggestions');
const suggestionItems = document.querySelectorAll('.suggestion-item');
const inputGroup = document.querySelector('.search-container .input-group');

// Show suggestions when input is focused
searchInput.addEventListener('focus', function() {
    searchSuggestions.classList.add('show');
});

// Hide suggestions when clicking outside
document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
        searchSuggestions.classList.remove('show');
    }
});

// Handle suggestion item clicks
suggestionItems.forEach(item => {
    item.addEventListener('click', function() {
        const service = this.getAttribute('data-service');
        searchInput.value = service;
        searchSuggestions.classList.remove('show');
        
        // Add searching animation
        inputGroup.classList.add('searching');
        
        // Simulate search
        setTimeout(() => {
            performSearch(service);
            inputGroup.classList.remove('searching');
        }, 1000);
    });
});

// Enhanced search button functionality
searchButton.addEventListener('click', function() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        inputGroup.classList.add('searching');
        setTimeout(() => {
            performSearch(searchTerm);
            inputGroup.classList.remove('searching');
        }, 1000);
    } else {
        // Show suggestions if input is empty
        searchSuggestions.classList.add('show');
        searchInput.focus();
    }
});

// Allow Enter key to trigger search
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            inputGroup.classList.add('searching');
            setTimeout(() => {
                performSearch(searchTerm);
                inputGroup.classList.remove('searching');
            }, 1000);
        }
    }
});

// Search input typing
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    // Filter suggestions based on input
    suggestionItems.forEach(item => {
        const serviceName = item.getAttribute('data-service').toLowerCase();
        if (serviceName.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Show/hide suggestions based on input
    if (searchTerm.length > 0) {
        searchSuggestions.classList.add('show');
    } else {
        searchSuggestions.classList.add('show');
    }
});

// Perform search function
function performSearch(searchTerm) {
    // Create a more engaging search experience
    const searchResults = [
        { service: 'Web Development', count: 45, avgRating: 4.8 },
        { service: 'Graphic Design', count: 32, avgRating: 4.9 },
        { service: 'Content Writing', count: 28, avgRating: 4.7 },
        { service: 'Mobile Development', count: 23, avgRating: 4.8 },
        { service: 'Digital Marketing', count: 19, avgRating: 4.6 },
        { service: 'Photography', count: 15, avgRating: 4.9 }
    ];
    
    const result = searchResults.find(item => 
        item.service.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (result) {
        // Show success message and scroll to services
        showSearchResult(result);
        setTimeout(() => {
            document.getElementById('services').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 1500);
    } else {
        // Show no results message
        showNoResults(searchTerm);
    }
}

// Show search results
function showSearchResult(result) {
    const message = `Found ${result.count} freelancers for "${result.service}" with average rating of ${result.avgRating}⭐`;
    
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.className = 'search-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Show no results
function showNoResults(searchTerm) {
    const message = `No exact matches found for "${searchTerm}". Try browsing our services below.`;
    
    const notification = document.createElement('div');
    notification.className = 'search-notification no-results';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// CONTACT FORM HANDLING
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const firstName = this.querySelector('input[placeholder="First Name"]').value;
        const lastName = this.querySelector('input[placeholder="Last Name"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!firstName || !lastName || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// SCROLL EFFECTS
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navigationBar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#1a1a1a';
        navbar.style.backdropFilter = 'none';
    }
});

// ANIMATION ON SCROLL
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .step-card, .review-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// STATS COUNTER ANIMATION
function animateStats() {
    const stats = document.querySelectorAll('.stat-item h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '') + 
                             (stat.textContent.includes('%') ? '%' : '');
        }, 30);
    });
}

// Trigger stats animation when hero section is visible
const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.getElementById('home');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// ENHANCED MOBILE MENU CLOSE ON CLICK OUTSIDE
document.addEventListener('click', function(e) {
    const smallNav = document.getElementById('menuSmall');
    const menuBar = document.getElementById('menuBar');
    
    if (smallNav.style.display === 'block' && 
        !smallNav.contains(e.target) && 
        !menuBar.contains(e.target)) {
        
        smallNav.style.display = 'none';
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('active');
    }
});

// LOADING ANIMATION
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});