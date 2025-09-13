import Validation from "../util/Validations.js";

let token = localStorage.getItem("key");
let userName = $("#userName");
let profileName = $("#profileName");
let profileTitle = $("#profileTitle");
let userEmail = $("#userEmail");
let profileImage = $("#profileAvatar");
let profilePic = $("#profilePic");
let hourlyRateSection = $("#hourlyRateSection");
let hourlyRate = $("#profileHourlyRate");
let bioSection = $("#bioSection");
let profileBio = $("#profileBio");
let profileSkills = $("#profileSkills");
let skillsSection = $("#skillsSection");
let socialLinksSection = $("#socialLinksSection");

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
    }else{
        //need to load the default picture
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

    //SET SKILLS------------------------------
    if(data.data.skills === null){
        skillsSection.hide();
    }else{
        skillsSection.show();
        let skillsHtml = "";

        // If your skills are in an array
        data.data.skills.forEach(skill => {
            skillsHtml += `<span class="skill-tag">${skill}</span>`;
        });

        // Set inside profileSkills div
        profileSkills.html(skillsHtml);
    }

    //SET SOCIAL MEDIA LINKS------------------
    if(data.data.portfolioMediaLinks === null){
        socialLinksSection.hide();
    }else{
        socialLinksSection.show();
        ///.........
    }
}


let txtName = $("#editDisplayName");
let txtBio = $("#editBio");
let txtHourlyRate = $("#editHourlyRate");
let saveBtn = $("#publishChanges");

saveBtn.on("click", function () {
    if(!Validation.isValidUserName(txtName.value)){
        Swal.fire({
            icon: 'warning',
            title: 'Invalid Username',
            html: "Username can't have numbers or symbols<br>Only letters allowed"
        });
        return;
    }

    updateUserProfile();
})

function updateUserProfile() {
    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/TemplateUser/update?name='+txtName.val()+'bio=' + txtBio.val()+'hourlyRate=' + hourlyRate.val(),
        dataType: 'json',
        headers: {"Authorization": `Bearer ${token}`},
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    })
}