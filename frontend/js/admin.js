
(function () {
    "use strict";

    const token = localStorage.getItem("eventeaseToken");
    const adminLogout = document.getElementById("adminLogout");

if (adminLogout) {
    adminLogout.addEventListener("click", function () {
        localStorage.removeItem("eventeaseToken");
        localStorage.removeItem("eventeaseUser");
        window.location.href = "login.html";
    });
}


    const adminMessage = document.getElementById("adminMessage");
    const adminBookings = document.getElementById("adminBookings");

    const bookingSearch = document.getElementById("bookingSearch");
    const bookingFilter = document.getElementById("bookingFilter");

    const totalBookingsEl = document.getElementById("totalBookings");
    const pendingBookingsEl = document.getElementById("pendingBookings");
    const confirmedBookingsEl = document.getElementById("confirmedBookings");
    const rejectedBookingsEl = document.getElementById("rejectedBookings");

    let allBookings = [];
    let allUsers = [];
    const contactMessageStatus = document.getElementById("contactMessageStatus");
const adminContactMessages = document.getElementById("adminContactMessages");
const adminUsers = document.getElementById("adminUsers");
const userMessage = document.getElementById("userMessage");
const userSearch = document.getElementById("userSearch");
const recentActivity = document.getElementById("recentActivity");
const recentActivityStatus = document.getElementById("recentActivityStatus");
const eventForm = document.getElementById("eventForm");
const eventMessage = document.getElementById("eventMessage");
const adminEvents = document.getElementById("adminEvents");

const eventCategoryFilter = document.getElementById("eventCategoryFilter");

    if (!token) {
        window.location.href = "login.html";
        return;
    }
    const loggedInUser = JSON.parse(
    localStorage.getItem("eventeaseUser") || "{}"
);

if (loggedInUser.role !== "admin") {
    alert("Access denied. Admin only.");
    window.location.href = "index.html";
    return;
}

    async function loadBookingStats() {
        try {
            const response = await fetch("http://localhost:5000/api/admin/stats", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Unable to load statistics");
            }

            const stats = result.stats;

            totalBookingsEl.textContent = stats.totalBookings || 0;
            pendingBookingsEl.textContent = stats.pendingBookings || 0;
            confirmedBookingsEl.textContent = stats.confirmedBookings || 0;
            rejectedBookingsEl.textContent = stats.rejectedBookings || 0;

        } catch (error) {
            console.error("Statistics error:", error);
        }
    }

    async function loadBookings() {
        try {
            const response = await fetch("http://localhost:5000/api/admin/bookings", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Unable to load bookings");
            }

            allBookings = result.bookings || [];
            renderBookings();

        } catch (error) {
            console.error("Admin error:", error);
            adminMessage.textContent = error.message;
        }
    }

async function loadContactMessages() {
    try {
        const response = await fetch(
            "http://localhost:5000/api/admin/contact-messages",
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to load contact messages");
        }

        adminContactMessages.innerHTML = "";

        const messages = result.messages || [];

        if (messages.length === 0) {
            contactMessageStatus.textContent = "No contact messages found.";
            return;
        }

        contactMessageStatus.textContent = "";

        messages.forEach(function (message) {
            const card = document.createElement("div");
            card.className = "admin-card";

            const details = [
                ["Name", message.full_name],
                ["Email", message.email],
                ["Mobile", message.mobile],
                ["Message", message.message],
                ["Received", new Date(message.created_at).toLocaleString("en-IN")]
            ];

           details.forEach(function (item) {
    const paragraph = document.createElement("p");
    paragraph.textContent = item[0] + ": " + item[1];
    card.appendChild(paragraph);
});

// Delete button
const deleteButton = document.createElement("button");

deleteButton.textContent = "Delete Message";
deleteButton.className = "btn btn-danger btn-sm mt-2";

deleteButton.addEventListener("click", function () {
    deleteContactMessage(message.id, deleteButton);
});

card.appendChild(deleteButton);

adminContactMessages.appendChild(card);
        });

    } catch (error) {
        contactMessageStatus.textContent = error.message;
    }
}
async function deleteContactMessage(messageId, button) {
    if (!confirm("Are you sure you want to delete this contact message?")) {
        return;
    }

    button.disabled = true;

    try {
        const response = await fetch(
            "http://localhost:5000/api/admin/contact-messages/" + messageId,
            {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to delete contact message");
        }

        alert("Contact message deleted successfully!");
        await loadContactMessages();

    } catch (error) {
        alert(error.message);
        button.disabled = false;
    }
}

async function createEvent(event) {
    event.preventDefault();

    const editEventId = document.getElementById("editEventId").value;

    const eventData = {
        event_name: document.getElementById("eventName").value.trim(),
        category: document.getElementById("eventCategory").value,
        description: document.getElementById("eventDescription").value.trim(),
        price: document.getElementById("eventPrice").value || 0,
        image_url: document.getElementById("eventImage").value.trim(),
        location: document.getElementById("eventLocation").value.trim()
    };

    const isEditing = editEventId !== "";

    try {
        const response = await fetch(
            isEditing
                ? "http://localhost:5000/api/events/" + editEventId
                : "http://localhost:5000/api/events",
            {
                method: isEditing ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(eventData)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to save event");
        }

        eventMessage.textContent = isEditing
            ? "Event updated successfully!"
            : "Event added successfully!";

        eventMessage.style.color = "green";

        eventForm.reset();
        document.getElementById("editEventId").value = "";
        document.getElementById("eventSubmitBtn").textContent = "Add Event";
        document.getElementById("cancelEditBtn").style.display = "none";

        await loadEvents();

    } catch (error) {
        eventMessage.textContent = error.message;
        eventMessage.style.color = "red";
    }
}

async function loadEvents() {
    try {
        const response = await fetch("http://localhost:5000/api/events");
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to load events");
        }

        adminEvents.innerHTML = "";

        const events = result.events || [];
        const searchText = eventSearch
    ? eventSearch.value.toLowerCase().trim()
    : "";
    const selectedCategory = eventCategoryFilter
    ? eventCategoryFilter.value.toLowerCase().trim()
    : "";

const filteredEvents = events.filter(function (event) {
    const matchesSearch =
        (event.event_name || "").toLowerCase().includes(searchText) ||
        (event.category || "").toLowerCase().includes(searchText);

    const matchesCategory =
        !selectedCategory ||
        (event.category || "").toLowerCase().trim() === selectedCategory;

    return matchesSearch && matchesCategory;
});

        if (filteredEvents.length === 0) {
            adminEvents.textContent = "No events added yet.";
            return;
        }

        filteredEvents.forEach(function (event) {
            const card = document.createElement("div");
            card.className = "admin-card mb-3";

            const heading = document.createElement("h5");
            heading.textContent = event.event_name;

            const category = document.createElement("p");
            category.textContent = "Category: " + event.category;

            const price = document.createElement("p");
            price.textContent = "Price: ₹" + event.price;

            const location = document.createElement("p");
            location.textContent = "Location: " + (event.location || "Not specified");

            card.appendChild(heading);
            card.appendChild(category);
            card.appendChild(price);
            card.appendChild(location);

// Edit Button
const editButton = document.createElement("button");
editButton.textContent = "Edit";
editButton.className = "btn btn-warning btn-sm me-2";

editButton.addEventListener("click", function () {
    editEvent(event);
});

// Delete Button
const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.className = "btn btn-danger btn-sm";

deleteButton.addEventListener("click", function () {
    deleteEvent(event.id);
});

card.appendChild(editButton);
card.appendChild(deleteButton);

adminEvents.appendChild(card);
        });

    } catch (error) {
        adminEvents.textContent = error.message;
    }
}
// Edit Event

function editEvent(event) {
    document.getElementById("editEventId").value = event.id;

    document.getElementById("eventName").value = event.event_name;
    document.getElementById("eventCategory").value = event.category;
    document.getElementById("eventDescription").value = event.description || "";
    document.getElementById("eventPrice").value = event.price || 0;
    document.getElementById("eventImage").value = event.image_url || "";
    document.getElementById("eventLocation").value = event.location || "";

    document.getElementById("eventSubmitBtn").textContent = "Update Event";

    document.getElementById("cancelEditBtn").style.display = "inline-block";

    document.getElementById("manageEvents").scrollIntoView({
        behavior: "smooth"
    });
}
// Delete Event
async function deleteEvent(eventId) {
    const confirmDelete = confirm("Are you sure you want to delete this event?");

    if (!confirmDelete) return;

    try {
        const response = await fetch("http://localhost:5000/api/events/" + eventId, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to delete event");
        }

        alert("Event deleted successfully!");
        loadEvents();

    } catch (error) {
        alert(error.message);
    }
}
async function loadUsers() {
    try {
        const response = await fetch("http://localhost:5000/api/admin/users", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to load users");
        }

        allUsers = result.users || [];
        renderUsers();

    } catch (error) {
        console.error("Users error:", error);
        userMessage.textContent = error.message;
    }
}
async function loadRecentActivity() {
    try {
        const response = await fetch(
            "http://localhost:5000/api/admin/recent-activity",
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to load recent activity");
        }

        recentActivity.innerHTML = "";

        const activities = result.activities || [];

        if (activities.length === 0) {
            recentActivityStatus.textContent = "No recent activity found.";
            return;
        }

        recentActivityStatus.textContent = "";

        activities.forEach(function (activity) {
            const card = document.createElement("div");
            card.className = "admin-card";

            const heading = document.createElement("h6");
            heading.textContent = activity.activity_type;
            card.appendChild(heading);

            const description = document.createElement("p");
            description.textContent = activity.description;
            card.appendChild(description);

            const date = document.createElement("small");
            date.textContent = new Date(activity.created_at).toLocaleString("en-IN");
            card.appendChild(date);

            recentActivity.appendChild(card);
        });

    } catch (error) {
        console.error("Recent activity error:", error);
        recentActivityStatus.textContent = error.message;
    }
}
async function updateUserRole(userId, newRole, button) {
    if (!confirm("Are you sure you want to change this user's role to " + newRole + "?")) {
        return;
    }

    button.disabled = true;

    try {
        const response = await fetch(
            "http://localhost:5000/api/admin/users/" + userId + "/role",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({ role: newRole })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to update user role");
        }

        alert("User role updated successfully!");
        await loadUsers();

    } catch (error) {
        alert(error.message);
        button.disabled = false;
    }
}
function renderUsers() {
    const searchText = userSearch.value.toLowerCase().trim();

    const filteredUsers = allUsers.filter(function (user) {
        return (user.full_name || "").toLowerCase().includes(searchText) ||
               (user.email || "").toLowerCase().includes(searchText);
    });

    adminUsers.innerHTML = "";

    if (filteredUsers.length === 0) {
        userMessage.textContent = allUsers.length === 0
            ? "No users found."
            : "No matching users found.";
        return;
    }

    userMessage.textContent = "";

    filteredUsers.forEach(function (user) {
        const row = document.createElement("tr");

        const details = [
            user.id,
            user.full_name,
            user.email,
            user.mobile,
            user.role,
            new Date(user.created_at).toLocaleDateString("en-IN")
        ];

        details.forEach(function (value) {
            const cell = document.createElement("td");
            cell.textContent = value || "";
            row.appendChild(cell);
        });
        const actionCell = document.createElement("td");

const viewButton = document.createElement("button");
viewButton.textContent = "View Details";
viewButton.className = "btn btn-warning btn-sm";

viewButton.addEventListener("click", function () {
    alert(
        "User Details\n\n" +
        "ID: " + user.id + "\n" +
        "Name: " + user.full_name + "\n" +
        "Email: " + user.email + "\n" +
        "Mobile: " + user.mobile + "\n" +
        "Role: " + user.role + "\n" +
        "Registered: " + new Date(user.created_at).toLocaleDateString("en-IN")
    );
});

actionCell.appendChild(viewButton);
const loggedInUser = JSON.parse(
    localStorage.getItem("eventeaseUser") || "{}"
);
const roleButton = document.createElement("button");

roleButton.textContent = user.role === "admin"
    ? "Make User"
    : "Make Admin";
    if (user.id === loggedInUser.id) {
    roleButton.disabled = true;
    roleButton.textContent = "Current Admin";
}

roleButton.className = "btn btn-secondary btn-sm ms-2";

roleButton.addEventListener("click", function () {
    const newRole = user.role === "admin" ? "user" : "admin";
    updateUserRole(user.id, newRole, roleButton);
});

actionCell.appendChild(roleButton);
row.appendChild(actionCell);

        adminUsers.appendChild(row);
    });
}
    function renderBookings() {
        const searchText = bookingSearch.value.toLowerCase().trim();
        const selectedStatus = bookingFilter.value;

        const filteredBookings = allBookings.filter(function (booking) {
            const matchesSearch =
                (booking.full_name || "").toLowerCase().includes(searchText) ||
                (booking.email || "").toLowerCase().includes(searchText);

            const matchesStatus =
                selectedStatus === "All" || booking.status === selectedStatus;

            return matchesSearch && matchesStatus;
        });

        adminBookings.textContent = "";

        if (filteredBookings.length === 0) {
            adminMessage.textContent = allBookings.length === 0
                ? "No bookings found."
                : "No matching bookings found.";
            return;
        }

        adminMessage.textContent = "";

        filteredBookings.forEach(function (booking) {
            const card = document.createElement("div");
            card.className = "admin-card";

            const heading = document.createElement("h4");
            heading.className = "admin-title";
            heading.textContent = booking.event_name;
            card.appendChild(heading);

            const details = [
                ["Booking ID", booking.id],
                ["Customer", booking.full_name],
                ["Email", booking.email],
                ["Mobile", booking.mobile],
                ["Category", booking.event_category],
                ["Date", new Date(booking.event_date).toLocaleDateString("en-IN")],
                ["Guests", booking.guest_count],
                ["Budget", booking.budget],
                ["Location", booking.event_location],
                ["Status", booking.status]
            ];

            details.forEach(function (item) {
                const paragraph = document.createElement("p");
                paragraph.textContent = item[0] + ": " + item[1];
                card.appendChild(paragraph);
            });

            if (booking.status === "Pending") {
                ["Confirmed", "Rejected"].forEach(function (status) {
                    const button = document.createElement("button");

                    button.textContent = status;
                    button.className = status === "Confirmed"
                        ? "btn btn-success btn-sm me-2"
                        : "btn btn-danger btn-sm me-2";

                    button.addEventListener("click", function () {
                        updateBookingStatus(booking.id, status, button);
                    });

                    card.appendChild(button);
                });
            }

            adminBookings.appendChild(card);
        });
    }

    bookingSearch.addEventListener("input", renderBookings);
    if (eventSearch) {
    eventSearch.addEventListener("input", loadEvents);
}
if (eventCategoryFilter) {
    eventCategoryFilter.addEventListener("change", loadEvents);
}
    if (eventForm) {
    eventForm.addEventListener("submit", createEvent);
}

const cancelEditBtn = document.getElementById("cancelEditBtn");

if (cancelEditBtn) {
    cancelEditBtn.addEventListener("click", function () {
        eventForm.reset();

        document.getElementById("editEventId").value = "";
        document.getElementById("eventSubmitBtn").textContent = "Add Event";

        cancelEditBtn.style.display = "none";
        eventMessage.textContent = "";
    });
}


loadEvents();
    bookingFilter.addEventListener("change", renderBookings);
    userSearch.addEventListener("input", renderUsers);

    async function updateBookingStatus(bookingId, status, button) {
        if (!confirm("Are you sure you want to mark this booking as " + status + "?")) {
            return;
        }

        button.disabled = true;

        try {
            const response = await fetch(
                "http://localhost:5000/api/admin/bookings/" + bookingId + "/status",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify({ status: status })
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Status update failed");
            }

            alert("Booking status updated successfully!");

            await loadBookings();
            await loadBookingStats();

        } catch (error) {
            alert(error.message);
            button.disabled = false;
        }
    }

    loadBookings();
    loadBookingStats();
    loadContactMessages();
    loadUsers();
    loadRecentActivity();

})();
