// Freelancers Page JavaScript

// Sample freelancer data
const freelancersData = [
    {
        id: 1,
        name: "Nimal Perera",
        title: "Full Stack Developer",
        avatar: "../assets/images/men1.jpeg",
        rating: 5.0,
        reviews: 127,
        hourlyRate: 45,
        description: "Experienced full-stack developer with 5+ years in React, Node.js, and Python. Specialized in building scalable web applications and APIs.",
        skills: ["React", "Node.js", "Python", "MongoDB", "AWS"],
        stats: {
            onTime: "98%",
            earned: "$12k+",
            projects: "50+"
        },
        online: true,
        category: "Web Development",
        experience: "Expert",
        availability: "Available Now"
    },
    {
        id: 2,
        name: "Kumari Silva",
        title: "Graphic Designer",
        avatar: "../assets/images/girl.jpeg",
        rating: 4.9,
        reviews: 89,
        hourlyRate: 35,
        description: "Creative graphic designer specializing in brand identity, logo design, and marketing materials. Passionate about creating visually stunning designs.",
        skills: ["Photoshop", "Illustrator", "InDesign", "Branding", "UI/UX"],
        stats: {
            onTime: "100%",
            earned: "$8k+",
            projects: "35+"
        },
        online: true,
        category: "Graphic Design",
        experience: "Intermediate",
        availability: "Available This Week"
    },
    {
        id: 3,
        name: "Rajith Fernando",
        title: "Content Writer",
        avatar: "../assets/images/men.jpeg",
        rating: 4.8,
        reviews: 156,
        hourlyRate: 25,
        description: "Professional content writer with expertise in SEO, blog writing, and copywriting. Creating engaging content that drives results.",
        skills: ["SEO Writing", "Blog Posts", "Copywriting", "Technical Writing", "Editing"],
        stats: {
            onTime: "95%",
            earned: "$15k+",
            projects: "80+"
        },
        online: false,
        category: "Content Writing",
        experience: "Expert",
        availability: "Available Next Week"
    }
];

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeFilters();
    initializeSorting();
    initializeCardInteractions();
    updateResultCount();
});

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box .btn');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchTerm = document.querySelector('.search-box input').value.toLowerCase();
    const cards = document.querySelectorAll('.freelancer-card');
    
    cards.forEach(card => {
        const name = card.querySelector('h4').textContent.toLowerCase();
        const title = card.querySelector('.title').textContent.toLowerCase();
        const description = card.querySelector('.description').textContent.toLowerCase();
        const skills = Array.from(card.querySelectorAll('.skill-tag')).map(tag => tag.textContent.toLowerCase());
        
        const matches = name.includes(searchTerm) || 
                       title.includes(searchTerm) || 
                       description.includes(searchTerm) ||
                       skills.some(skill => skill.includes(searchTerm));
        
        card.style.display = matches ? 'block' : 'none';
    });
    
    updateResultCount();
}

// Filter functionality
function initializeFilters() {
    const filterSelects = document.querySelectorAll('.filter-panel select');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', applyFilters);
    });
}

function applyFilters() {
    const categoryFilter = document.querySelector('.filter-panel select:nth-child(1)').value;
    const experienceFilter = document.querySelector('.filter-panel select:nth-child(2)').value;
    const rateFilter = document.querySelector('.filter-panel select:nth-child(3)').value;
    const availabilityFilter = document.querySelector('.filter-panel select:nth-child(4)').value;
    
    const cards = document.querySelectorAll('.freelancer-card');
    
    cards.forEach(card => {
        let show = true;
        
        // Apply filters based on data attributes or content
        // This is a simplified version - in a real app, you'd have data attributes
        
        if (categoryFilter !== 'All Categories') {
            // Check if card matches category
            const cardCategory = getCardCategory(card);
            if (cardCategory !== categoryFilter) {
                show = false;
            }
        }
        
        if (experienceFilter !== 'Any Experience') {
            // Check experience level
            const cardExperience = getCardExperience(card);
            if (!matchesExperience(cardExperience, experienceFilter)) {
                show = false;
            }
        }
        
        if (rateFilter !== 'Any Rate') {
            // Check hourly rate
            const cardRate = getCardRate(card);
            if (!matchesRate(cardRate, rateFilter)) {
                show = false;
            }
        }
        
        card.style.display = show ? 'block' : 'none';
    });
    
    updateResultCount();
}

// Helper functions for filtering
function getCardCategory(card) {
    // Extract category from card content
    const skills = Array.from(card.querySelectorAll('.skill-tag')).map(tag => tag.textContent);
    if (skills.some(skill => ['React', 'Node.js', 'Python'].includes(skill))) {
        return 'Web Development';
    } else if (skills.some(skill => ['Photoshop', 'Illustrator', 'Branding'].includes(skill))) {
        return 'Graphic Design';
    } else if (skills.some(skill => ['SEO Writing', 'Blog Posts', 'Copywriting'].includes(skill))) {
        return 'Content Writing';
    }
    return 'Other';
}

function getCardExperience(card) {
    const title = card.querySelector('.title').textContent;
    if (title.includes('Senior') || title.includes('Expert')) {
        return 'Expert';
    } else if (title.includes('Junior') || title.includes('Entry')) {
        return 'Entry Level';
    }
    return 'Intermediate';
}

function getCardRate(card) {
    const rateText = card.querySelector('.rate').textContent;
    return parseInt(rateText.replace('$', ''));
}

function matchesExperience(cardExp, filterExp) {
    if (filterExp === 'Any Experience') return true;
    return cardExp === filterExp;
}

function matchesRate(cardRate, filterRate) {
    if (filterRate === 'Any Rate') return true;
    
    switch (filterRate) {
        case '$5 - $25':
            return cardRate >= 5 && cardRate <= 25;
        case '$25 - $50':
            return cardRate >= 25 && cardRate <= 50;
        case '$50 - $100':
            return cardRate >= 50 && cardRate <= 100;
        case '$100+':
            return cardRate >= 100;
        default:
            return true;
    }
}

// Sorting functionality
function initializeSorting() {
    const sortSelect = document.querySelector('.sort-options select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', applySorting);
    }
}

function applySorting() {
    const sortBy = document.querySelector('.sort-options select').value;
    const container = document.getElementById('freelancersContainer');
    const cards = Array.from(container.children);
    
    cards.sort((a, b) => {
        switch (sortBy) {
            case 'Rating':
                const ratingA = parseFloat(a.querySelector('.rating span').textContent.match(/\d+\.\d+/)[0]);
                const ratingB = parseFloat(b.querySelector('.rating span').textContent.match(/\d+\.\d+/)[0]);
                return ratingB - ratingA;
                
            case 'Hourly Rate (Low to High)':
                const rateA = parseInt(a.querySelector('.rate').textContent.replace('$', ''));
                const rateB = parseInt(b.querySelector('.rate').textContent.replace('$', ''));
                return rateA - rateB;
                
            case 'Hourly Rate (High to Low)':
                const rateA2 = parseInt(a.querySelector('.rate').textContent.replace('$', ''));
                const rateB2 = parseInt(b.querySelector('.rate').textContent.replace('$', ''));
                return rateB2 - rateA2;
                
            case 'Experience':
                const expA = getCardExperience(a);
                const expB = getCardExperience(b);
                const expOrder = { 'Expert': 3, 'Intermediate': 2, 'Entry Level': 1 };
                return expOrder[expB] - expOrder[expA];
                
            default: // Relevance
                return 0;
        }
    });
    
    // Re-append sorted cards
    cards.forEach(card => container.appendChild(card));
}

// Card interactions
function initializeCardInteractions() {
    const viewButtons = document.querySelectorAll('.btn-outline-primary');
    const hireButtons = document.querySelectorAll('.btn-success');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.freelancer-card');
            const name = card.querySelector('h4').textContent;
            showNotification(`Viewing ${name}'s profile...`, 'info');
        });
    });
    
    hireButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.freelancer-card');
            const name = card.querySelector('h4').textContent;
            showNotification(`Initiating hire process for ${name}...`, 'success');
        });
    });
}

// Update result count
function updateResultCount() {
    const visibleCards = document.querySelectorAll('.freelancer-card[style*="display: block"], .freelancer-card:not([style*="display: none"])');
    const resultCount = document.getElementById('resultCount');
    
    if (resultCount) {
        resultCount.textContent = visibleCards.length;
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}); 