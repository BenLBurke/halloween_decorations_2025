// Replace this with your Google Apps Script Web App URL
const SUBMIT_URL = "https://script.google.com/macros/s/AKfycbwNFOd_RfX0T5NoU3pvR_Hxa6Z4GNiiJ_5G_ZG1iR2maalIG7zy_SrRWh2bWr-vDzkX/exec";
const APPROVED_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1Y-3NoSteQyXVngyVBqFtunjvAii3Bl1b1iQdUDxtLDNZf4F6QUHXSgUCeJRv8R0Qsud0Hole2WU9/pub?gid=1228576273&single=true&output=csv";

// Initialize map
const map = L.map("map").setView([40, -95], 4); // center on USA

// Add tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Track last clicked location
let lastClicked = null;

// Load approved locations from sheet
async function loadApproved() {
  try {
    const response = await fetch(APPROVED_CSV_URL);
    const text = await response.text();
    const rows = text.split("\n").slice(1); // skip header

    rows.forEach(row => {
      if (!row.trim()) return;
      const cols = row.split(",");

      const lat = parseFloat(cols[1]);
      const lng = parseFloat(cols[2]);
      const description = cols[3] || "No description";
      const submittedBy = cols[4] || "Anonymous";

      if (!isNaN(lat) && !isNaN(lng)) {
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`<b>${description}</b><br/>Submitted by: ${submittedBy}`);
      }
    });
  } catch (err) {
    console.error("Error loading approved locations:", err);
  }
}
loadApproved();

// Map click to drop a pin
map.on("click", function (e) {
  lastClicked = e.latlng;
  alert("📍 Pin dropped! Now fill in the description and name, then hit Submit.");
});

// Handle form submission
document.getElementById("submissionForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  if (!lastClicked) {
    alert("Click on the map first to drop a pin!");
    return;
  }

  const description = document.getElementById("description").value.trim();
  const submittedBy = document.getElementById("submittedBy").value.trim();

  const data = {
    lat: lastClicked.lat,
    lng: lastClicked.lng,
    description,
    submittedBy
  };

  try {
    await fetch(SUBMIT_URL, {
      method: "POST",
      mode: "no-cors",  // allows Google Apps Script to accept request
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    alert("🎉 Location submitted! It will appear once approved.");
    document.getElementById("submissionForm").reset();
    lastClicked = null;
  } catch (err) {
    console.error("Submission error:", err);
    alert("⚠️ Error submitting location.");
  }
});

let clickMarker = null;

map.on("click", function (e) {
  lastClicked = e.latlng;

  // Remove previous marker if it exists
  if (clickMarker) map.removeLayer(clickMarker);

  clickMarker = L.marker([lastClicked.lat, lastClicked.lng], { draggable: true })
    .addTo(map)
    .bindPopup("Your selected location")
    .openPopup();

  // Update coordinates if marker dragged
  clickMarker.on("dragend", (event) => {
    lastClicked = event.target.getLatLng();
  });

  alert("📍 Pin dropped! Now fill in the description and name, then hit Submit.");
});


