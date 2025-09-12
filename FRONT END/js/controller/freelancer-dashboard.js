// Minimal dashboard interactions without AJAX or auth checks
(function () {
    function setActive(sectionId) {
        document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        const link = document.querySelector(`.nav-link[data-target="${sectionId}"]`);
        const sec = document.getElementById(sectionId);
        if (link) link.classList.add('active');
        if (sec) sec.classList.add('active');
    }

    document.querySelectorAll('.nav-link').forEach(a => {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            if (target) setActive(target);
        });
    });

    // Mobile sidebar toggle
    const toggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.admin-sidebar');
    const mainContent = document.querySelector('.admin-main');
    
    if (toggle && sidebar) {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            sidebar.classList.toggle('open');
            toggle.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    if (mainContent && sidebar) {
        mainContent.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                toggle.classList.remove('active');
            }
        });
    }
    
    // Close sidebar on window resize if screen becomes larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
            toggle.classList.remove('active');
        }
    });

    // Logout simply clears token if present and returns to login
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            try { localStorage.removeItem('key'); } catch (_) {}
            window.location.href = '../html/login.html';
        });
    }

    // Profile management with popup
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfilePopup = document.getElementById('editProfilePopup');
    const closeEditPopup = document.getElementById('closeEditPopup');
    const cancelEdit = document.getElementById('cancelEdit');
    const publishChanges = document.getElementById('publishChanges');

    // Load profile data from localStorage
    function loadProfileData() {
        try {
            const dataRaw = localStorage.getItem('freelancer_profile');
            if (dataRaw) {
                const data = JSON.parse(dataRaw);
                updateProfileDisplay(data);
            }
        } catch (_) {}
    }

    // Update profile display with data
    function updateProfileDisplay(data) {
        const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
        const setHtml = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
        
        setText('profileName', data.displayName || 'Dinuka Lakmal');
        setText('profileTitle', data.title || 'Full Stack Developer');
        setText('profileHourlyRate', `$${data.hourlyRate || 45}/hr`);
        setText('profileBio', data.bio || 'Experienced full-stack developer with 5+ years in React, Node.js, and Python. Specialized in building scalable web applications and APIs.');
        
        // Update skills display
        if (data.skills && data.skills.length > 0) {
            const skillsHtml = data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
            setHtml('profileSkills', skillsHtml);
        }
        
        // Update social links
        const socialLinks = {
            'profileLinkedin': data.linkedin,
            'profileGithub': data.github,
            'profileTwitter': data.twitter,
            'profilePortfolio': data.portfolio
        };
        
        Object.entries(socialLinks).forEach(([id, url]) => {
            const el = document.getElementById(id);
            if (el) {
                if (url) {
                    el.href = url;
                    el.style.display = 'flex';
                } else {
                    el.style.display = 'none';
                }
            }
        });
    }

    // Open edit popup
    if (editProfileBtn && editProfilePopup) {
        editProfileBtn.addEventListener('click', function() {
            // Load current data into edit form
            try {
                const dataRaw = localStorage.getItem('freelancer_profile');
                if (dataRaw) {
                    const data = JSON.parse(dataRaw);
                    const set = (id, val) => { const el = document.getElementById(id); if (el && val != null) el.value = val; };
                    set('editDisplayName', data.displayName);
                    set('editBio', data.bio);
                    set('editHourlyRate', data.hourlyRate);
                    set('editSkills', (data.skills || []).join(', '));
                    set('editLinkedin', data.linkedin);
                    set('editGithub', data.github);
                    set('editTwitter', data.twitter);
                    set('editPortfolio', data.portfolio);
                }
            } catch (_) {}
            
            editProfilePopup.classList.add('active');
        });
    }

    // Close edit popup
    function closePopup() {
        if (editProfilePopup) {
            editProfilePopup.classList.remove('active');
        }
    }

    if (closeEditPopup) {
        closeEditPopup.addEventListener('click', closePopup);
    }

    if (cancelEdit) {
        cancelEdit.addEventListener('click', closePopup);
    }

    // Publish changes
    if (publishChanges) {
        publishChanges.addEventListener('click', function() {
            const get = (id) => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
            const hourlyRate = parseFloat(get('editHourlyRate'));
            
            if (Number.isNaN(hourlyRate) || hourlyRate < 0) {
                alert('Please enter a valid hourly rate (>= 0).');
                return;
            }
            
            const skills = get('editSkills').split(',').map(s => s.trim()).filter(Boolean);
            const payload = {
                displayName: get('editDisplayName'),
                bio: get('editBio'),
                hourlyRate,
                skills,
                linkedin: get('editLinkedin') || '',
                github: get('editGithub') || '',
                twitter: get('editTwitter') || '',
                portfolio: get('editPortfolio') || '',
                rating: 4.8 // Fixed rating as per requirements
            };
            
            try {
                localStorage.setItem('freelancer_profile', JSON.stringify(payload));
                updateProfileDisplay(payload);
                closePopup();
                alert('Profile updated successfully!');
            } catch (_) {
                alert('Could not save profile locally.');
            }
        });
    }

    // Load profile data on page load
    loadProfileData();

    // Avatar preview handling
    const input = document.getElementById('avatarInput');
    const preview = document.getElementById('avatarPreview');
    const resetBtn = document.getElementById('avatarReset');
    const defaultSrc = preview ? preview.src : '';

    if (input && preview) {
        input.addEventListener('change', function () {
            const file = this.files && this.files[0];
            if (!file) return;
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file.');
                this.value = '';
                return;
            }
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert('Image must be less than 2MB.');
                this.value = '';
                return;
            }
            const url = URL.createObjectURL(file);
            preview.src = url;
        });
    }

    if (resetBtn && preview) {
        resetBtn.addEventListener('click', function () {
            preview.src = defaultSrc;
            if (input) input.value = '';
        });
    }
})();

