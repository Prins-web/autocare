const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const trigger = window.innerHeight - 100;

    if (cardTop < trigger) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});

// Mobile menu toggle
function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("show");
}

// FAQ Accordion with + / −
document.querySelectorAll(".faq-question").forEach(q => {
  q.addEventListener("click", () => {
    const item = q.parentElement;

    document.querySelectorAll(".faq-item").forEach(i => {
      if (i !== item) {
        i.classList.remove("active");
        i.querySelector(".icon").textContent = "+";
      }
    });

    item.classList.toggle("active");
    const icon = item.querySelector(".icon");
    icon.textContent = item.classList.contains("active") ? "−" : "+";
  });
});

// ADMIN DASHBOARD FUNCTIONS

function loadBookings() {
  const table = document.getElementById("bookingTable");
  if (!table) return;

  const bookings = JSON.parse(localStorage.getItem("autocare_bookings")) || [];
  table.innerHTML = "";

  bookings.forEach((b, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${b.city}</td>
        <td>${b.vehicle}</td>
        <td>${b.service}</td>
        <td>${b.time}</td>
        <td>
          <button onclick="deleteBooking(${index})">Delete</button>
        </td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

function deleteBooking(index) {
  let bookings = JSON.parse(localStorage.getItem("autocare_bookings")) || [];
  bookings.splice(index, 1);
  localStorage.setItem("autocare_bookings", JSON.stringify(bookings));
  loadBookings();
}

function clearAll() {
  if (confirm("Are you sure you want to delete all bookings?")) {
    localStorage.removeItem("autocare_bookings");
    loadBookings();
  }
}

// WHATSAPP BOOKING

const whatsappNumber = "91046900032"; // change this

document.getElementById("whatsappBtn").addEventListener("click", function () {

  const service = document.querySelector(".booking-card select:nth-of-type(2)")?.value || "Car Service";
  const city = document.querySelector(".booking-card input")?.value || "Not specified";

  const message = `Hello AutoCare 👋%0A
I want to book a service.%0A
📍 City: ${city}%0A
🚗 Service: ${service}%0A
Please contact me.`;

  const url = `https://wa.me/${whatsappNumber}?text=${message}`;
  this.href = url;
});
