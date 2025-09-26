(function() {
    // ===== Navigation =====
    function setActive(sectionId) {
        document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        const link = document.querySelector(`.nav-link[data-target="${sectionId}"]`);
        const sec = document.getElementById(sectionId);
        if (link) link.classList.add('active');
        if (sec) sec.classList.add('active');
    }

    document.querySelectorAll('.nav-link').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            if (target) setActive(target);
        });
    });

    // ===== Profile Edit Popup =====
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfilePopup = document.getElementById('editProfilePopup');
    const closeEditPopup = document.getElementById('closeEditPopup');
    const cancelEdit = document.getElementById('cancelEdit');

    function closeEditProfilePopup() {
        if (editProfilePopup) editProfilePopup.classList.remove('active');
    }

    if (editProfileBtn && editProfilePopup) {
        editProfileBtn.addEventListener('click', function() {
            editProfilePopup.classList.add('active');
        });
    }

    if (closeEditPopup) closeEditPopup.addEventListener('click', closeEditProfilePopup);
    if (cancelEdit) cancelEdit.addEventListener('click', closeEditProfilePopup);
    if (editProfilePopup) {
        editProfilePopup.addEventListener('click', function(e) {
            if (e.target === editProfilePopup) closeEditProfilePopup();
        });
    }

    // ===== Avatar Preview / Reset =====
    const editInput = document.getElementById('editAvatarInput');
    const editPreview = document.getElementById('editAvatarPreview');
    const editResetBtn = document.getElementById('editAvatarReset');
    const editDefaultSrc = editPreview ? editPreview.src : '';

    if (editResetBtn && editPreview) {
        editResetBtn.addEventListener('click', function() {
            editPreview.src = editDefaultSrc;
            if (editInput) editInput.value = '';
            const mainPreview = document.getElementById('clientAvatarPreview');
            if (mainPreview) mainPreview.src = editDefaultSrc;
        });
    }
})();
