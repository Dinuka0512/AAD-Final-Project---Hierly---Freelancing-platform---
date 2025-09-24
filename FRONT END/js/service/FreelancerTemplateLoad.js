let token = localStorage.getItem("key");
let userName = $("#userName");
let profileName = $("#profileName");
let profileTitle = $("#profileTitle");
let userEmail = $("#userEmail");
let profileImage = $("#profileAvatar");
let editAvatarPreview = $("#editAvatarPreview");
let profilePic = $("#profilePic");
let hourlyRateSection = $("#hourlyRateSection");
let hourlyRate = $("#profileHourlyRate");
let bioSection = $("#bioSection");
let profileBio = $("#profileBio");
let profileSkills = $("#profileSkills");

reloadPage();
function reloadPage(){
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/TemplateUser/load',
        dataType: 'json',
        headers: {"Authorization": `Bearer ${token}`},
        contentType: 'application/json',
        success: function (data) {
            if(data.data.role === "Freelancer"){
                //FREELANCER DATA LOAD
                freelancersDataLoad(data);
            }else{
                //NOT THE FREELANCER
                Swal.fire({
                    icon: 'error',
                    title: 'Access Denied',
                    text: 'Only freelancers can access this page.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // optional: redirect after alert
                    window.location.href = "login.html";
                });
            }
        },
        error: function (data) {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text: 'Try again, Login or Sign up Again!!!..',
                confirmButtonText: 'OK'
            }).then(() => {
                // optional: redirect after alert
                window.location.href = "signup.html";
            });
        }
    })
}
function freelancersDataLoad(data) {
    console.log(data);

    userName.html(data.data.name);
    profileName.html(data.data.name);
    profileTitle.html(data.data.title);
    userEmail.html(data.data.email);

    //SET PROFILE PIC ----------------------------
    if(data.data.profilePicture === null){
        //set the default picture
        profileImage.attr("src", "../assets/images/TempUser.png");
        profilePic.attr("src", "../assets/images/TempUser.png");
        editAvatarPreview.attr("src", "../assets/images/TempUser.png");
    }else{
        //need to load the default picture
        profileImage.attr("src", data.data.profilePicture);
        profilePic.attr("src", data.data.profilePicture);
        editAvatarPreview.attr("src", data.data.profilePicture);
    }

    //SET HIERLY RATE ----------------------
    if(data.data.hourlyRate === 0.0){
        hourlyRateSection.hide();
    }else{
        hourlyRateSection.show();
        hourlyRate.html(data.data.hourlyRate);
    }

    //SET BIO---------------------------------
    if(data.data.bio === null){
        bioSection.hide();
    }else{
        bioSection.show();
        profileBio.html(data.data.bio);
    }

    //SET SOCIAL MEDIA LINKS------------------
    const socialLinksGrid = $("#socialLinksGrid"); // make sure this exists in HTML
    socialLinksGrid.html(""); // clear previous links

    if(data.data.linkedInLink){
        socialLinksGrid.append(`<a href="${data.data.linkedInLink}" target="_blank" class="social-link"><i class="fab fa-linkedin"></i> LinkedIn</a> `);
    }
    if(data.data.gitHubLink){
        socialLinksGrid.append(`<a href="${data.data.gitHubLink}" target="_blank" class="social-link"><i class="fab fa-github"></i> GitHub</a> `);
    }
    if(data.data.websiteLink){
        socialLinksGrid.append(`<a href="${data.data.websiteLink}" target="_blank" class="social-link"><i class="fas fa-globe"></i> Portfolio</a>`);
    }

    socialLinksGrid.append('<div class="social-placeholder" id="editSocialLinks"><i class="fas fa-pen"></i><span>Edit</span></div>');

    // Add click event to the Edit button
    $("#editSocialLinks").off('click').on('click', openSocialPopup);

    profileSkills.html(""); // clear first
    data.data.skills.forEach(skill => {
        profileSkills.append(`<span class="skill-tag">${skill}</span>`);
    });

}
function openSocialPopup() {
    socialPopup.classList.add('active');
}

let saveBtn = $("#publishChanges");
saveBtn.on("click", function () {
    updateUserProfile();
});


//IMAGE UPLOAD
const editAvatarInput = document.getElementById("editAvatarInput");

// When user chooses a file
editAvatarInput.addEventListener("change", function() {
    const file = this.files[0]; // get the selected file
    if (file) {
        if(file.type === "image/jpeg" || file.type === "image/png") {
            //PNG OR JPG only
            const formData = new FormData();
            formData.append("file", file); // 'file' should match your backend param name

            $.ajax({
                type: "POST",
                url: 'http://localhost:8080/TemplateUser/updateProfilePicture',
                headers: {"Authorization": `Bearer ${token}`},
                data: formData,
                processData: false,  // important
                contentType: false,  // important
                success: function (data) {
                    console.log("Uploaded:", data);
                    reloadPage();
                },
                error: function(err) {
                    console.error(err);
                }
            });
        }
    }
});




function updateUserProfile() {
    // get values at the time of click
    let txtName = $("#editDisplayName").val();
    let txtBio = $("#editBio").val();
    let txtHourlyRate = $("#editHourlyRate").val();

    // build URL properly with &
    let url = "http://localhost:8080/TemplateUser/update"
        + "?name=" + encodeURIComponent(txtName)
        + "&bio=" + encodeURIComponent(txtBio)
        + "&hourlyRate=" + encodeURIComponent(txtHourlyRate);

    console.log(url);

    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        headers: {"Authorization": `Bearer ${token}`},
        contentType: 'application/json',
        success: function (data) {
            console.log("Update Success:", data);
            Swal.fire("Success","Profile updated successfully!", "success").then(
                reloadPage
            );
        },
        error: function (err) {
            console.log("Update Error:", err);
            Swal.fire("Error", "Could not update profile", "error");
        }
    });
}


//UPDATE THE USER SKILLS
var btnSaveSkill = $("#saveSkills");
btnSaveSkill.on("click", function () {
    var skills = [];
    $("#skillsContainer .skill-item span").each(function () {
        skills.push($(this).text().trim());
    });

    console.log(skills); // 👉 ["JavaScript", "java"]
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/TemplateUser/updateSkills",
        dataType: "json",
        headers: {"Authorization": `Bearer ${token}`},
        contentType: 'application/json',
        data: JSON.stringify(skills),
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    })
})

//UPDATE SOCIAL MEDIA LINKS
var txtLinkedIn = $("#editLinkedin");
var txtGithub = $("#editGithub");
var websiteLink = $("#editPortfolio");
var btnSaveLinks = $("#saveSocial");
btnSaveLinks.on("click", function () {
    var url = "http://localhost:8080/TemplateUser/updateSocialLinks" +
        "?linkedIn=" + encodeURIComponent(txtLinkedIn.val()) +
        "&github=" + encodeURIComponent(txtGithub.val()) +
        "&website=" + encodeURIComponent(websiteLink.val());


    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        headers: {"Authorization": `Bearer ${token}`},
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
        },
        error: function (err) {
            console.log(err);
        }
    })
})