
(function () {
    "use strict";

    const token = localStorage.getItem("eventeaseToken");

    const profileStatus = document.getElementById("profileStatus");
    const profileDetails = document.getElementById("profileDetails");

    // Check login
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // Fetch profile from backend
    fetch("http://localhost:5000/api/users/profile", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Unable to fetch profile");
        }

        return response.json();
    })
    .then(result => {
        const user = result.user;

        document.getElementById("userId").textContent = user.id;
        document.getElementById("fullName").textContent = user.full_name;
        document.getElementById("email").textContent = user.email;
        document.getElementById("mobile").textContent = user.mobile;

        document.getElementById("createdAt").textContent =
            new Date(user.created_at).toLocaleDateString("en-IN");

        profileStatus.style.display = "none";
        profileDetails.style.display = "block";
    })
    .catch(error => {
        console.error(error);
        profileStatus.textContent = "Unable to load profile. Please login again.";
    });

})();
