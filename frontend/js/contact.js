
(function () {
    "use strict";

    const contactForm = document.getElementById("contactForm");
    const contactStatus = document.getElementById("contactStatus");

    if (!contactForm) return;

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const data = {
            full_name: document.getElementById("contactName").value.trim(),
            email: document.getElementById("contactEmail").value.trim(),
            mobile: document.getElementById("contactPhone").value.trim(),
            message: document.getElementById("contactMessage").value.trim()
        };

        contactStatus.textContent = "Sending...";

        try {
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Message could not be sent");
            }

            contactStatus.textContent = result.message;
            contactStatus.style.color = "#28a745";
            contactForm.reset();

        } catch (error) {
            contactStatus.textContent = error.message;
            contactStatus.style.color = "#dc3545";
        }
    });

})();
