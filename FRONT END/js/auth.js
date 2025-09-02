// Authentication Pages JavaScript

// Password Toggle Functionality
function initializePasswordToggle() {
    const toggleButtons = document.querySelectorAll('#togglePassword');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Password Strength Checker
function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 8) {
        strength += 25;
    } else {
        feedback.push('At least 8 characters');
    }
    
    // Uppercase check
    if (/[A-Z]/.test(password)) {
        strength += 25;
    } else {
        feedback.push('One uppercase letter');
    }
    
    // Lowercase check
    if (/[a-z]/.test(password)) {
        strength += 25;
    } else {
        feedback.push('One lowercase letter');
    }
    
    // Number check
    if (/\d/.test(password)) {
        strength += 25;
    } else {
        feedback.push('One number');
    }
    
    // Special character check (bonus)
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        strength += 10;
    }
    
    return { strength: Math.min(strength, 100), feedback };
}

// Update Password Strength UI
function updatePasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-fill');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthBar || !strengthText) return;
    
    const result = checkPasswordStrength(password);
    
    // Remove existing classes
    strengthBar.classList.remove('weak', 'fair', 'good', 'strong');
    
    // Add appropriate class and update width
    if (result.strength <= 25) {
        strengthBar.classList.add('weak');
        strengthText.textContent = 'Weak';
    } else if (result.strength <= 50) {
        strengthBar.classList.add('fair');
        strengthText.textContent = 'Fair';
    } else if (result.strength <= 75) {
        strengthBar.classList.add('good');
        strengthText.textContent = 'Good';
    } else {
        strengthBar.classList.add('strong');
        strengthText.textContent = 'Strong';
    }
}

// User Type Selection
function initializeUserTypeSelection() {
    const userTypeCards = document.querySelectorAll('.user-type-card');
    const freelancerFields = document.getElementById('freelancerFields');
    
    userTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            userTypeCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Show/hide freelancer fields
            if (this.dataset.type === 'freelancer') {
                freelancerFields.style.display = 'block';
            } else {
                freelancerFields.style.display = 'none';
            }
        });
    });
}

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });
    
    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showFieldError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    // Password confirmation validation (for signup)
    const passwordInput = form.querySelector('#password');
    const confirmPasswordInput = form.querySelector('#confirmPassword');
    
    if (passwordInput && confirmPasswordInput) {
        if (passwordInput.value !== confirmPasswordInput.value) {
            showFieldError(confirmPasswordInput, 'Passwords do not match');
            isValid = false;
        }
    }
    
    // Phone validation
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput && phoneInput.value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            showFieldError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        }
    }
    
    return isValid;
}

// Show Field Error
function showFieldError(input, message) {
    clearFieldError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '0.25rem';
    
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#dc3545';
}

// Clear Field Error
function clearFieldError(input) {
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    input.style.borderColor = '#555';
}

// Show Success Message
function showSuccessMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.querySelector('.auth-form');
    form.parentNode.insertBefore(alertDiv, form);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Show Error Message
function showErrorMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.querySelector('.auth-form');
    form.parentNode.insertBefore(alertDiv, form);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Login Form Handler
function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm('loginForm')) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Simulate login process
            showSuccessMessage('Logging in... Please wait.');
            
            // Here you would typically make an API call
            setTimeout(() => {
                // Simulate successful login
                showSuccessMessage('Login successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }, 2000);
        }
    });
}

// Signup Form Handler
function initializeSignupForm() {
    const signupForm = document.getElementById('signupForm');
    if (!signupForm) return;
    
    // Password strength monitoring
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm('signupForm')) {
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                password: document.getElementById('password').value,
                userType: document.querySelector('.user-type-card.active')?.dataset.type || 'client',
                skills: document.getElementById('skills')?.value || '',
                experience: document.getElementById('experience')?.value || '',
                hourlyRate: document.getElementById('hourlyRate')?.value || '',
                termsAccepted: document.getElementById('termsAccepted').checked,
                newsletter: document.getElementById('newsletter').checked
            };
            
            // Simulate signup process
            showSuccessMessage('Creating your account... Please wait.');
            
            // Here you would typically make an API call
            setTimeout(() => {
                // Simulate successful signup
                showSuccessMessage('Account created successfully! Welcome to Hierly.');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            }, 3000);
        }
    });
}

// Social Login Handlers
function initializeSocialLogin() {
    const googleBtn = document.querySelector('.btn-outline-dark[data-provider="google"]');
    const facebookBtn = document.querySelector('.btn-outline-dark[data-provider="facebook"]');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showSuccessMessage('Redirecting to Google...');
            // Implement Google OAuth
        });
    }
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showSuccessMessage('Redirecting to Facebook...');
            // Implement Facebook OAuth
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePasswordToggle();
    initializeUserTypeSelection();
    initializeLoginForm();
    initializeSignupForm();
    initializeSocialLogin();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

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