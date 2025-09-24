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
    const skillsHeader = document.querySelector('#skillsSection .skills-header');

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

    function ensureManageSkillsButton() {
        if (!skillsHeader) return;
        let btn = document.getElementById('manageSkillsBtn');
        if (!btn) {
            btn = document.createElement('button');
            btn.className = 'btn btn-outline-primary btn-sm';
            btn.id = 'manageSkillsBtn';
            btn.innerHTML = '<i class="fas fa-pen"></i> Manage Skills';
            btn.addEventListener('click', openSkillsPopup);
            skillsHeader.appendChild(btn);
        }
    }

    function removeManageSkillsButton() {
        const btn = document.getElementById('manageSkillsBtn');
        if (btn && btn.parentElement) btn.parentElement.removeChild(btn);
    }

    // Initialize skills from profile
    function initializeSkills() {
        const existingSkills = Array.from(profileSkills.querySelectorAll('.skill-tag:not(.skill-placeholder)'))
            .map(tag => tag.textContent.trim())
            .filter(skill => skill && skill !== 'Add new skill' && skill !== 'Add Your Skill Here');
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
        if (currentSkills.length > 0) {
            profileSkills.innerHTML = currentSkills.map(skill => 
                `<span class=\"skill-tag\">${skill}</span>`
            ).join('');
            ensureManageSkillsButton();
        } else {
            profileSkills.innerHTML = '<div class="skill-placeholder" id="addSkillPlaceholder"><i class="fas fa-plus"></i> Add new skill</div>';
            removeManageSkillsButton();
            const addSkillPlaceholderEl = document.getElementById('addSkillPlaceholder');
            if (addSkillPlaceholderEl) addSkillPlaceholderEl.addEventListener('click', openSkillsPopup);
        }
        closeSkillsPopupFunc();
        
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
    function openSkillsPopup() {
        initializeSkills();
        skillsPopup.classList.add('active');
    }

    if (manageSkillsBtn && skillsPopup) {
        manageSkillsBtn.addEventListener('click', openSkillsPopup);
    }

    // Open popup when clicking placeholder or empty area
    const addSkillPlaceholder = document.getElementById('addSkillPlaceholder');
    if (addSkillPlaceholder) {
        addSkillPlaceholder.addEventListener('click', openSkillsPopup);
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

    // On load: if there are existing skills, show manage button; if only placeholder, remove button
    (function setupInitialSkillsUI() {
        const hasSkillTags = profileSkills && profileSkills.querySelector('.skill-tag:not(.skill-placeholder)');
        const hasPlaceholder = profileSkills && profileSkills.querySelector('#addSkillPlaceholder');
        
        if (hasSkillTags) {
            ensureManageSkillsButton();
        } else if (hasPlaceholder) {
            removeManageSkillsButton();
            const addSkillPlaceholderEl = document.getElementById('addSkillPlaceholder');
            if (addSkillPlaceholderEl) addSkillPlaceholderEl.addEventListener('click', openSkillsPopup);
        }
    })();

    // Observe dynamic changes to skills and auto-toggle Manage button
    if (profileSkills) {
        let skillsUiUpdateTimer;
        const observer = new MutationObserver(() => {
            clearTimeout(skillsUiUpdateTimer);
            skillsUiUpdateTimer = setTimeout(() => {
                const hasSkillTags = profileSkills.querySelector('.skill-tag:not(.skill-placeholder)');
                const hasPlaceholder = profileSkills.querySelector('#addSkillPlaceholder');
                if (hasSkillTags) {
                    ensureManageSkillsButton();
                } else if (hasPlaceholder) {
                    removeManageSkillsButton();
                    const addSkillPlaceholderEl = document.getElementById('addSkillPlaceholder');
                    if (addSkillPlaceholderEl) addSkillPlaceholderEl.addEventListener('click', openSkillsPopup);
                }
            }, 50);
        });
        observer.observe(profileSkills, { childList: true, subtree: true });
    }

    // Function to update skills UI when data is loaded externally
    function updateSkillsUI() {
        const hasSkillTags = profileSkills && profileSkills.querySelector('.skill-tag:not(.skill-placeholder)');
        const hasPlaceholder = profileSkills && profileSkills.querySelector('#addSkillPlaceholder');
        
        if (hasSkillTags) {
            ensureManageSkillsButton();
        } else if (hasPlaceholder) {
            removeManageSkillsButton();
            const addSkillPlaceholderEl = document.getElementById('addSkillPlaceholder');
            if (addSkillPlaceholderEl) addSkillPlaceholderEl.addEventListener('click', openSkillsPopup);
        }
    }

    // Make updateSkillsUI available globally for external calls
    window.updateSkillsUI = updateSkillsUI;

    // ===== Social Links Management =====
    const socialPopup = document.getElementById('socialPopup');
    const closeSocialPopup = document.getElementById('closeSocialPopup');
    const cancelSocial = document.getElementById('cancelSocial');
    const saveSocial = document.getElementById('saveSocial');
    const addSocialLinksPlaceholder = document.getElementById('addSocialLinksPlaceholder');
    const socialLinksGrid = document.getElementById('socialLinksGrid');

    const inputLinkedin = document.getElementById('editLinkedin');
    const inputGithub = document.getElementById('editGithub');
    const inputTwitter = document.getElementById('editTwitter');
    const inputPortfolio = document.getElementById('editPortfolio');

    function openSocialPopup() {
        socialPopup.classList.add('active');
    }

    function closeSocialPopupFunc() {
        socialPopup.classList.remove('active');
    }

    function renderSocialLinks(links) {
        // If all empty -> show placeholder
        const hasAny = Object.values(links).some(v => v && v.trim() !== '');
        if (!hasAny) {
            socialLinksGrid.innerHTML = '<div class="social-placeholder" id="addSocialLinksPlaceholder"><i class="fas fa-plus"></i><span>Add social links</span></div>';
            const ph = document.getElementById('addSocialLinksPlaceholder');
            if (ph) ph.addEventListener('click', openSocialPopup);
            return;
        }

        const items = [];
        if (links.linkedin) items.push(`<a href="${links.linkedin}" target="_blank" rel="noopener" class="social-link"><i class="fab fa-linkedin"></i><span>LinkedIn</span></a>`);
        if (links.github) items.push(`<a href="${links.github}" target="_blank" rel="noopener" class="social-link"><i class="fab fa-github"></i><span>GitHub</span></a>`);
        if (links.portfolio) items.push(`<a href="${links.portfolio}" target="_blank" rel="noopener" class="social-link"><i class="fas fa-globe"></i><span>Portfolio</span></a>`);
        // Add an edit tile to modify later
        items.push('<div class="social-placeholder" id="editSocialLinks"><i class="fas fa-pen"></i><span>Edit</span></div>');
        socialLinksGrid.innerHTML = items.join('');

        const editBtn = document.getElementById('editSocialLinks');
        if (editBtn) editBtn.addEventListener('click', openSocialPopup);
    }

    function saveSocialLinks() {
        const links = {
            linkedin: inputLinkedin.value.trim(),
            github: inputGithub.value.trim(),
            portfolio: inputPortfolio.value.trim()
        };
        renderSocialLinks(links);
        closeSocialPopupFunc();
        if (typeof Swal !== 'undefined') {
            Swal.fire({ icon: 'success', title: 'Social links saved', timer: 1600, showConfirmButton: false });
        }
    }

    if (addSocialLinksPlaceholder) addSocialLinksPlaceholder.addEventListener('click', openSocialPopup);
    if (closeSocialPopup) closeSocialPopup.addEventListener('click', closeSocialPopupFunc);
    if (cancelSocial) cancelSocial.addEventListener('click', closeSocialPopupFunc);
    if (saveSocial) saveSocial.addEventListener('click', saveSocialLinks);

    if (socialPopup) {
        socialPopup.addEventListener('click', function(e) {
            if (e.target === socialPopup) closeSocialPopupFunc();
        });
    }
})();
