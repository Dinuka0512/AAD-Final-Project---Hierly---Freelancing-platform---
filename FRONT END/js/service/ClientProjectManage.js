import Validation from "../util/Validations.js";
var token = localStorage.getItem("key");
$(document).ready(function () {
    const txtProjTitle = $("#projectTitle");
    const txtProjDesc = $("#projectDesc");
    const txtProjBudjet = $("#projectBudget");
    const btnSubmit = $("#btnPost");
    const fileInput = document.getElementById("projectFiles"); // native input
    const fileListDiv = $("#projectFilesList");

    const MAX_FILES = 10;
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    let selectedFiles = [];

    // Render selected files with remove button
    function renderFiles() {
        fileListDiv.empty();
        if (selectedFiles.length === 0) {
            fileListDiv.append("<p>No files selected</p>");
            return;
        }

        selectedFiles.forEach((file, idx) => {
            const fileItem = $(`
                <div class="file-item">
                    <span>${file.name} (${(file.size / 1024).toFixed(2)} KB)</span>
                    <button type="button" class="file-remove">Remove</button>
                </div>
            `);
            fileItem.find(".file-remove").on("click", function () {
                selectedFiles.splice(idx, 1);
                renderFiles();
            });
            fileListDiv.append(fileItem);
        });
    }

    // File input change
    fileInput.addEventListener("change", function () {
        const files = Array.from(this.files);

        files.forEach((file) => {
            if (selectedFiles.length >= MAX_FILES) {
                alert("Maximum 10 files allowed.");
                return;
            }
            if (file.size > MAX_SIZE) {
                alert(`${file.name} exceeds 5MB limit and was skipped.`);
                return;
            }
            selectedFiles.push(file);
        });

        renderFiles();
    });

    // Form submit
    btnSubmit.on("click", function (e) {
        e.preventDefault();

        // Validation
        if (!Validation.isNotNull(txtProjTitle.val())) {
            alert("Enter the Project Title");
            return;
        }
        if (!Validation.isNotNull(txtProjDesc.val())) {
            alert("Enter the Project Description");
            return;
        }
        if (!Validation.isDouble(txtProjBudjet.val())) {
            alert(
                "Enter the Project Budget\n- Budget Can't be Null\n- Budget Must be a Number"
            );
            return;
        }
        if (selectedFiles.length === 0) {
            alert("Please select at least one file");
            return;
        }

        // Prepare FormData
        const formData = new FormData();
        formData.append("title", txtProjTitle.val());
        formData.append("description", txtProjDesc.val());
        formData.append("budget", txtProjBudjet.val());
        selectedFiles.forEach((file, idx) => {
            formData.append("files", file);
        });

        // Send to server (example)
        $.ajax({
            url: "http://localhost:8080/project/PostProject",
            type: "POST",
            data: formData,
            headers: {"Authorization": `Bearer ${token}`},
            processData: false,
            contentType: false,
            success: function (res) {
                alert("Project posted successfully!");
                // Clear form & files
                txtProjTitle.val("");
                txtProjDesc.val("");
                txtProjBudjet.val("");
                selectedFiles = [];
                renderFiles();
            },
            error: function (err) {
                console.error(err);
                alert("Failed to post project.");
            },
        });
    });

    // Initial render
    renderFiles();
});
