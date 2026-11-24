
(function () {
    "use strict";

    const token = localStorage.getItem("eventeaseToken");

    const bookingsMessage = document.getElementById("bookingsMessage");
    const bookingsList = document.getElementById("bookingsList");

    // Check login
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // Fetch user's bookings
    fetch("http://localhost:5000/api/bookings/my-bookings", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Unable to fetch bookings");
        }

        return response.json();
    })
    .then(result => {

        bookingsMessage.style.display = "none";

        if (!result.bookings || result.bookings.length === 0) {
            bookingsMessage.style.display = "block";
            bookingsMessage.textContent = "You have not made any bookings yet.";
            return;
        }

        result.bookings.forEach(booking => {

            const card = document.createElement("div");
            card.className = "booking-card";

            const details = [
                ["Booking ID", booking.id],
                ["Event Category", booking.event_category],
                ["Event Date", new Date(booking.event_date).toLocaleDateString("en-IN")],
                ["Guests", booking.guest_count],
                ["Budget", booking.budget],
                ["Location", booking.event_location]
            ];

            const heading = document.createElement("h4");
            heading.textContent = booking.event_name;
            card.appendChild(heading);

            details.forEach(item => {
                const paragraph = document.createElement("p");
                paragraph.className = "booking-info";

                const strong = document.createElement("strong");
                strong.textContent = item[0] + ": ";

                paragraph.appendChild(strong);
                paragraph.appendChild(document.createTextNode(item[1]));

                card.appendChild(paragraph);
            });

           const status = document.createElement("span");
status.className = "booking-status";
status.textContent = "Status: " + booking.status;

card.appendChild(status);

// Show Cancel button only for Pending bookings
if (booking.status === "Pending") {
    const cancelButton = document.createElement("button");

    cancelButton.textContent = "Cancel Booking";
    cancelButton.className = "btn btn-danger btn-sm ms-3";

    cancelButton.addEventListener("click", async function () {

        const confirmCancel = confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmCancel) {
            return;
        }

        cancelButton.disabled = true;
        cancelButton.textContent = "Cancelling...";

        try {
            const response = await fetch(
                "http://localhost:5000/api/bookings/" +
                booking.id + "/cancel",
                {
                    method: "PUT",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            alert("Booking cancelled successfully!");
            window.location.reload();

        } catch (error) {
            alert(error.message);
            cancelButton.disabled = false;
            cancelButton.textContent = "Cancel Booking";
        }
    });

    card.appendChild(cancelButton);
}

bookingsList.appendChild(card);
        });

    })
    .catch(error => {
        console.error("My Bookings Error:", error);
        bookingsMessage.style.display = "block";
        bookingsMessage.textContent =
            "Unable to load bookings. Please try again.";
    });

})();
