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

    // ===== Multiple files preview/remove =====
    const filesInput = document.getElementById('projectFiles');
    const filesList = document.getElementById('projectFilesList');
    const MAX_FILES = 10;
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    let selectedFiles = [];

    function renderFiles() {
        if (!filesList) return;
        filesList.innerHTML = '';
        selectedFiles.forEach((f, idx) => {
            const item = document.createElement('div');
            item.className = 'file-item';
            item.innerHTML = `<div class="meta"><i class="fas fa-paperclip"></i><span>${f.name}</span><small>(${Math.ceil(f.size/1024)} KB)</small></div>`;
            const actions = document.createElement('div');
            actions.className = 'actions';
            const remove = document.createElement('button');
            remove.className = 'file-remove';
            remove.textContent = 'Remove';
            remove.addEventListener('click', function() {
                selectedFiles.splice(idx, 1);
                renderFiles();
            });
            actions.appendChild(remove);
            item.appendChild(actions);
            filesList.appendChild(item);
        });
    }

    if (filesInput) {
        filesInput.addEventListener('change', function() {
            const chosen = Array.from(this.files || []);
            for (const f of chosen) {
                if (selectedFiles.length >= MAX_FILES) { alert('Maximum 10 files allowed.'); break; }
                if (f.size > MAX_SIZE) { alert(`${f.name} exceeds 5MB limit and was skipped.`); continue; }
                selectedFiles.push(f);
            }
            this.value = '';
            renderFiles();
        });
    }

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
