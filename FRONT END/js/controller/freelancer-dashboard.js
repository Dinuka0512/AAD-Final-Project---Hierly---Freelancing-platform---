// Dashboard interactions with edit profile popup (no update logic)
(function () {
    function setActive(sectionId) {
        document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        const link = document.querySelector(`.nav-link[data-target="${sectionId}"]`);
        const sec = document.getElementById(sectionId);
        if (link) link.classList.add('active');
        if (sec) sec.classList.add('active');
    }

    // Navigation switching
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

    // ===== Edit Profile Popup (only open/close, no save) =====
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfilePopup = document.getElementById('editProfilePopup');
    const closeEditPopup = document.getElementById('closeEditPopup');
    const cancelEdit = document.getElementById('cancelEdit');

    function closePopup() {
        if (editProfilePopup) {
            editProfilePopup.classList.remove('active');
        }
    }

    if (editProfileBtn && editProfilePopup) {
        editProfileBtn.addEventListener('click', function() {
            editProfilePopup.classList.add('active');
        });
    }

    if (closeEditPopup) {
        closeEditPopup.addEventListener('click', closePopup);
    }

    if (cancelEdit) {
        cancelEdit.addEventListener('click', closePopup);
    }

    // ===== Skills Management =====
    const manageSkillsBtn = document.getElementById('manageSkillsBtn');
    const skillsPopup = document.getElementById('skillsPopup');
    const closeSkillsPopup = document.getElementById('closeSkillsPopup');
    const cancelSkills = document.getElementById('cancelSkills');
    const skillInput = document.getElementById('skillInput');
    const addSkillBtn = document.getElementById('addSkillBtn');
    const saveSkillsBtn = document.getElementById('saveSkills');
    const skillsContainer = document.getElementById('skillsContainer');
    const skillSuggestions = document.getElementById('skillSuggestions');
    const profileSkills = document.getElementById('profileSkills');

    // Common skills suggestions
    const commonSkills = [
        'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Angular', 'Vue.js',
        'HTML', 'CSS', 'TypeScript', 'PHP', 'Laravel', 'Django', 'Flask',
        'MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'AWS', 'Azure', 'Docker',
        'Kubernetes', 'Git', 'Linux', 'REST API', 'GraphQL', 'Microservices',
        'Machine Learning', 'Data Science', 'AI', 'Blockchain', 'Web3',
        'UI/UX Design', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator',
        'Project Management', 'Agile', 'Scrum', 'DevOps', 'CI/CD',
        'Mobile Development', 'React Native', 'Flutter', 'iOS', 'Android',
        'Backend Development', 'Frontend Development', 'Full Stack',
        'Database Design', 'System Architecture', 'Cloud Computing',
        'Cybersecurity', 'Testing', 'QA', 'Automation', 'Selenium'
    ];

    let currentSkills = [];
    let filteredSuggestions = [];

    // Initialize skills from profile
    function initializeSkills() {
        const existingSkills = Array.from(profileSkills.querySelectorAll('.skill-tag'))
            .map(tag => tag.textContent.trim());
        currentSkills = [...existingSkills];
        renderSkills();
    }

    // Render skills in the popup
    function renderSkills() {
        skillsContainer.innerHTML = '';
        
        if (currentSkills.length === 0) {
            skillsContainer.innerHTML = '<div class="empty-skills">No skills added yet. Add some skills to get started!</div>';
            return;
        }

        currentSkills.forEach((skill, index) => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item';
            skillElement.innerHTML = `
                <span>${skill}</span>
                <button class="skill-remove" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            skillsContainer.appendChild(skillElement);
        });

        // Add event listeners to remove buttons
        skillsContainer.querySelectorAll('.skill-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeSkill(index);
            });
        });
    }

    // Add a new skill
    function addSkill(skillName) {
        const trimmedSkill = skillName.trim();
        if (trimmedSkill && !currentSkills.includes(trimmedSkill)) {
            currentSkills.push(trimmedSkill);
            renderSkills();
            skillInput.value = '';
            hideSuggestions();
        }
    }

    // Remove a skill
    function removeSkill(index) {
        currentSkills.splice(index, 1);
        renderSkills();
    }

    // Show suggestions
    function showSuggestions() {
        const inputValue = skillInput.value.toLowerCase().trim();
        if (inputValue.length < 2) {
            hideSuggestions();
            return;
        }

        filteredSuggestions = commonSkills.filter(skill => 
            skill.toLowerCase().includes(inputValue) && 
            !currentSkills.includes(skill)
        ).slice(0, 8);

        if (filteredSuggestions.length > 0) {
            skillSuggestions.innerHTML = filteredSuggestions.map(skill => 
                `<div class="suggestion-item" data-skill="${skill}">${skill}</div>`
            ).join('');
            skillSuggestions.style.display = 'block';

            // Add event listeners to suggestions
            skillSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', function() {
                    const skill = this.getAttribute('data-skill');
                    addSkill(skill);
                });
            });
        } else {
            hideSuggestions();
        }
    }

    // Hide suggestions
    function hideSuggestions() {
        skillSuggestions.style.display = 'none';
    }

    // Save skills to profile
    function saveSkills() {
        profileSkills.innerHTML = currentSkills.map(skill => 
            `<span class="skill-tag">${skill}</span>`
        ).join('');
        closeSkillsPopup();
        
        // Show success message
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'success',
                title: 'Skills Updated!',
                text: 'Your skills have been updated successfully.',
                timer: 2000,
                showConfirmButton: false
            });
        }
    }

    // Close skills popup
    function closeSkillsPopupFunc() {
        if (skillsPopup) {
            skillsPopup.classList.remove('active');
            // Reset to current profile skills
            initializeSkills();
        }
    }

    // Event listeners
    if (manageSkillsBtn && skillsPopup) {
        manageSkillsBtn.addEventListener('click', function() {
            initializeSkills();
            skillsPopup.classList.add('active');
        });
    }

    if (closeSkillsPopup) {
        closeSkillsPopup.addEventListener('click', closeSkillsPopupFunc);
    }

    if (cancelSkills) {
        cancelSkills.addEventListener('click', closeSkillsPopupFunc);
    }

    if (addSkillBtn && skillInput) {
        addSkillBtn.addEventListener('click', function() {
            addSkill(skillInput.value);
        });
    }

    if (skillInput) {
        skillInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkill(skillInput.value);
            }
        });

        skillInput.addEventListener('input', showSuggestions);
        skillInput.addEventListener('blur', function() {
            // Delay hiding suggestions to allow clicking on them
            setTimeout(hideSuggestions, 200);
        });
    }

    if (saveSkillsBtn) {
        saveSkillsBtn.addEventListener('click', saveSkills);
    }

    // Close popup when clicking outside
    if (skillsPopup) {
        skillsPopup.addEventListener('click', function(e) {
            if (e.target === skillsPopup) {
                closeSkillsPopupFunc();
            }
        });
    }
})();
