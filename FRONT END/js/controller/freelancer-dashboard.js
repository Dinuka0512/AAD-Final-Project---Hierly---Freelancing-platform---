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
    if (toggle && sidebar) {
        toggle.addEventListener('click', function () {
            sidebar.classList.toggle('open');
        });
    }

    // Logout simply clears token if present and returns to login
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            try { localStorage.removeItem('key'); } catch (_) {}
            window.location.href = '../html/login.html';
        });
    }

    // Optional: prevent form submit and just log values
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Profile changes are not saved in this static preview.');
        });
    }

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

