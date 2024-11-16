const slotsContainer = document.getElementById("slots-container");
const slotSelect = document.getElementById("slot");
const form = document.getElementById("booking-form");

// Fetch available slots
async function fetchSlots() {
  const response = await fetch("http://localhost:5000/api/slots");
  const slots = await response.json();

  // Tampilkan slot pada halaman
  slotsContainer.innerHTML = "";
  slotSelect.innerHTML = '<option value="">Select a slot</option>';

  slots.forEach((slot) => {
    if (!slot.booked) {
      const slotDiv = document.createElement("div");
      slotDiv.className = "slot";
      slotDiv.innerText = slot.time;
      slotDiv.addEventListener("click", () => {
        slotSelect.value = slot.id;
      });

      slotsContainer.appendChild(slotDiv);

      // Tambahkan opsi ke dropdown
      const option = document.createElement("option");
      option.value = slot.id;
      option.innerText = slot.time;
      slotSelect.appendChild(option);
    }
  });
}

// Submit form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const slotId = slotSelect.value;

  const response = await fetch("http://localhost:5000/api/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: parseInt(slotId), name }),
  });

  if (response.ok) {
    alert("Booking confirmed!");
    fetchSlots(); // Refresh slots
  } else {
    alert("Failed to book slot!");
  }
});

// Load slots on page load
fetchSlots();
