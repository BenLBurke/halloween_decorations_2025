// Replace this with your Google Apps Script Web App URL
const SUBMIT_URL = "https://script.google.com/macros/s/AKfycb-your-url/exec";

// Initialize Leaflet map
const map = L.map("map").setView([40, -95], 4); // Centered on US

// Tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Handle map clicks
map.on("click", async function (e) {
  const { lat, lng } = e.latlng;

  // Drop pin
  L.marker([lat, lng]).addTo(map);

  // Data to send
  const data = { lat, lng };

  try {
    await fetch(SUBMIT_URL, {
      method: "POST",
      mode: "no-cors",  // 👈 Important for GAS
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    alert("🎉 Location submitted! It will appear once approved.");
  } catch (err) {
    console.error("Submission error:", err);
    alert("⚠️ Error submitting location.");
  }
});
