(function(){
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

    // Static preview: intercept forms
    const postForm = document.getElementById('postProjectForm');
    if (postForm) {
        postForm.addEventListener('submit', function(e){
            e.preventDefault();
            alert('Project posting is disabled in this static preview.');
        });
    }

    // Multiple files preview/remove (static)
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
            remove.addEventListener('click', function(){
                selectedFiles.splice(idx, 1);
                renderFiles();
            });
            actions.appendChild(remove);
            item.appendChild(actions);
            filesList.appendChild(item);
        });
    }

    if (filesInput) {
        filesInput.addEventListener('change', function(){
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

    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e){
            e.preventDefault();
            alert('Profile changes are not saved in this static preview.');
        });
    }

    // Avatar preview handling for client profile
    const input = document.getElementById('clientAvatarInput');
    const preview = document.getElementById('clientAvatarPreview');
    const resetBtn = document.getElementById('clientAvatarReset');
    const defaultSrc = preview ? preview.src : '';
    if (input && preview) {
        input.addEventListener('change', function(){
            const file = this.files && this.files[0];
            if (!file) return;
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file.');
                this.value = '';
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                alert('Image must be less than 2MB.');
                this.value = '';
                return;
            }
            const url = URL.createObjectURL(file);
            preview.src = url;
        });
    }
    if (resetBtn && preview) {
        resetBtn.addEventListener('click', function(){
            preview.src = defaultSrc;
            if (input) input.value = '';
        });
    }
})();


