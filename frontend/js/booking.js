
(function () {
    "use strict";
    // Automatically fill logged-in user's details
const savedUser = localStorage.getItem("eventeaseUser");

if (savedUser) {
    const user = JSON.parse(savedUser);

    const fullNameField = document.getElementById("fullName");
    const emailField = document.getElementById("email");
    const mobileField = document.getElementById("mobile");

    if (fullNameField) {
        fullNameField.value = user.full_name || "";
    }

    if (emailField) {
        emailField.value = user.email || "";
    }

    if (mobileField) {
        mobileField.value = user.mobile || "";
    }
}

    window.submitEventEaseBooking = async function (form, eventData) {
        const token = localStorage.getItem("eventeaseToken");

        if (!token) {
            alert("Please login first to submit your booking.");
            window.location.href = "login.html";
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Saving Booking...";

        const bookingData = {
            event_id: new URLSearchParams(window.location.search).get("id"),
            event_name: form.elements.eventName.value.trim(),
            event_category: form.elements.eventCategory.value.trim(),
            guest_count: Number(form.elements.guestCount.value),
            event_date: form.elements.eventDate.value,
            budget: form.elements.budget.value,
            event_location: form.elements.eventLocation.value.trim(),
            requirements: form.elements.requirements.value.trim()
        };

        try {
            const response = await fetch("http://localhost:5000/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(bookingData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Booking could not be saved");
            }

            document.getElementById("bookingIntro").hidden = true;
            form.hidden = true;

            const confirmation = document.getElementById("bookingConfirmation");
            confirmation.hidden = false;

            confirmation.querySelector("h2").textContent =
                "Your booking has been submitted successfully!";

            document.getElementById("confirmationThanks").textContent =
                "Thank you, " + form.elements.fullName.value.trim() +
                ". Your booking ID is #" + result.bookingId + ".";

            const paragraphs = confirmation.querySelectorAll("p");

            if (paragraphs[2]) {
                paragraphs[2].textContent =
                    "Your booking has been saved to your EventEase account.";
            }

            const summary = document.getElementById("confirmationSummary");
            summary.textContent = "";

            const details = [
                ["Event", bookingData.event_name],
                ["Date", bookingData.event_date],
                ["Guests", bookingData.guest_count],
                ["Budget", bookingData.budget],
                ["Location", bookingData.event_location],
                ["Status", "Pending"]
            ];

            details.forEach(function (item) {
                const dt = document.createElement("dt");
                const dd = document.createElement("dd");

                dt.textContent = item[0];
                dd.textContent = item[1];

                summary.appendChild(dt);
                summary.appendChild(dd);
            });

        } catch (error) {
            console.error("Booking error:", error);
            alert(error.message);
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    };

})();
