// Admin Dashboard JavaScript

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCharts();
    initializeSearch();
    initializeTableActions();
    initializeSettings();
    showSection('dashboard');
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
}

// Show/hide sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section, #dashboard');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        
        // If it's dashboard, show the dashboard section
        if (sectionId === 'dashboard') {
            document.querySelector('.dashboard-section').style.display = 'block';
        }
    }
}

// Initialize charts
function initializeCharts() {
    // User Growth Chart
    const userGrowthCtx = document.getElementById('userGrowthChart');
    if (userGrowthCtx) {
        new Chart(userGrowthCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'New Users',
                    data: [120, 190, 300, 500, 200, 300],
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#b0b0b0'
                        },
                        grid: {
                            color: '#404040'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#b0b0b0'
                        },
                        grid: {
                            color: '#404040'
                        }
                    }
                }
            }
        });
    }
    
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue ($)',
                    data: [12000, 19000, 30000, 50000, 20000, 45000],
                    backgroundColor: [
                        'rgba(40, 167, 69, 0.8)',
                        'rgba(32, 201, 151, 0.8)',
                        'rgba(40, 167, 69, 0.8)',
                        'rgba(32, 201, 151, 0.8)',
                        'rgba(40, 167, 69, 0.8)',
                        'rgba(32, 201, 151, 0.8)'
                    ],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#b0b0b0'
                        },
                        grid: {
                            color: '#404040'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#b0b0b0'
                        },
                        grid: {
                            color: '#404040'
                        }
                    }
                }
            }
        });
    }
}

// Search functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('.search-box input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const table = this.closest('.content-card').querySelector('table tbody');
            
            if (table) {
                const rows = table.querySelectorAll('tr');
                
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
            }
        });
    });
}

// Table actions
function initializeTableActions() {
    // Edit buttons
    const editButtons = document.querySelectorAll('.btn-outline-primary');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const userName = row.querySelector('h6')?.textContent || 'User';
            showNotification(`Editing ${userName}...`, 'info');
        });
    });
    
    // Delete buttons
    const deleteButtons = document.querySelectorAll('.btn-outline-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const userName = row.querySelector('h6')?.textContent || 'User';
            
            if (confirm(`Are you sure you want to delete ${userName}?`)) {
                showNotification(`${userName} deleted successfully`, 'success');
                row.remove();
            }
        });
    });
    
    // Suspend buttons
    const suspendButtons = document.querySelectorAll('.btn-outline-warning');
    suspendButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const userName = row.querySelector('h6')?.textContent || 'User';
            
            if (confirm(`Are you sure you want to suspend ${userName}?`)) {
                showNotification(`${userName} suspended successfully`, 'warning');
                this.textContent = 'Unsuspend';
                this.classList.remove('btn-outline-warning');
                this.classList.add('btn-outline-success');
            }
        });
    });
}

// Settings functionality
function initializeSettings() {
    const settingsForms = document.querySelectorAll('.settings-card form');
    
    settingsForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Settings saved successfully!', 'success');
        });
    });
}

// Filter functionality
function initializeFilters() {
    const filterSelects = document.querySelectorAll('.filter-options select');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            const filterValue = this.value;
            const table = this.closest('.content-card').querySelector('table tbody');
            
            if (table) {
                const rows = table.querySelectorAll('tr');
                
                rows.forEach(row => {
                    const statusCell = row.querySelector('.badge');
                    if (statusCell) {
                        const status = statusCell.textContent;
                        row.style.display = filterValue === 'All Status' || status === filterValue ? '' : 'none';
                    }
                });
            }
        });
    });
}

// Report generation
function initializeReports() {
    const reportButtons = document.querySelectorAll('.report-card .btn');
    
    reportButtons.forEach(button => {
        button.addEventListener('click', function() {
            const reportName = this.closest('.report-card').querySelector('h4').textContent;
            showNotification(`Generating ${reportName}...`, 'info');
            
            // Simulate report generation
            setTimeout(() => {
                showNotification(`${reportName} generated successfully!`, 'success');
            }, 2000);
        });
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 4000);
}

// Export functionality
function initializeExports() {
    const exportButtons = document.querySelectorAll('.card-actions .btn');
    
    exportButtons.forEach(button => {
        button.addEventListener('click', function() {
            const chartTitle = this.closest('.chart-card').querySelector('h4').textContent;
            showNotification(`Exporting ${chartTitle}...`, 'info');
            
            // Simulate export
            setTimeout(() => {
                showNotification(`${chartTitle} exported successfully!`, 'success');
            }, 1500);
        });
    });
}

// Real-time updates simulation
function initializeRealTimeUpdates() {
    // Simulate real-time activity updates
    setInterval(() => {
        const activityList = document.querySelector('.activity-list');
        if (activityList) {
            const activities = [
                {
                    icon: 'fas fa-user-plus',
                    title: 'New User Registration',
                    description: 'A new freelancer joined the platform',
                    time: 'Just now'
                },
                {
                    icon: 'fas fa-check-circle',
                    title: 'Project Completed',
                    description: 'A project was successfully completed',
                    time: '2 minutes ago'
                },
                {
                    icon: 'fas fa-credit-card',
                    title: 'Payment Processed',
                    description: 'A payment was successfully processed',
                    time: '5 minutes ago'
                }
            ];
            
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            
            // Add new activity to the top
            const newActivity = document.createElement('div');
            newActivity.className = 'activity-item';
            newActivity.innerHTML = `
                <div class="activity-icon">
                    <i class="${randomActivity.icon}"></i>
                </div>
                <div class="activity-content">
                    <h5>${randomActivity.title}</h5>
                    <p>${randomActivity.description}</p>
                    <span class="activity-time">${randomActivity.time}</span>
                </div>
            `;
            
            activityList.insertBefore(newActivity, activityList.firstChild);
            
            // Remove old activities if too many
            const activitiesToRemove = activityList.children.length - 5;
            for (let i = 0; i < activitiesToRemove; i++) {
                activityList.removeChild(activityList.lastChild);
            }
        }
    }, 30000); // Update every 30 seconds
}

// Stats animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-content h3');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            
            if (stat.textContent.includes('$')) {
                stat.textContent = '$' + Math.floor(currentValue).toLocaleString();
            } else {
                stat.textContent = Math.floor(currentValue).toLocaleString();
            }
        }, 50);
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCharts();
    initializeSearch();
    initializeTableActions();
    initializeSettings();
    initializeFilters();
    initializeReports();
    initializeExports();
    initializeRealTimeUpdates();
    
    // Animate stats on page load
    setTimeout(animateStats, 1000);
    
    // Show dashboard by default
    showSection('dashboard');
});

// Mobile sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.admin-sidebar');
    sidebar.classList.toggle('open');
}

// Add mobile menu button if needed
if (window.innerWidth <= 768) {
    const navbar = document.querySelector('.admin-navbar');
    const menuButton = document.createElement('button');
    menuButton.className = 'btn btn-outline-light d-md-none';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.onclick = toggleSidebar;
    
    navbar.insertBefore(menuButton, navbar.firstChild);
}

// Loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}); 