// Replace with your deployed Google Apps Script Web App URL
const SUBMIT_URL = "YOUR_APPS_SCRIPT_WEB_APP_URL";

let map = L.map("map").setView([39.5, -98.35], 4); // Center on USA
let marker = null;

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

// Click map to drop a pin
map.on("click", function (e) {
  if (marker) {
    map.removeLayer(marker);
  }
  marker = L.marker(e.latlng).addTo(map);
  marker.bindPopup("Selected location").openPopup();
});

// Handle submission
document.getElementById("submitBtn").addEventListener("click", async function () {
  if (!marker) {
    alert("Please click on the map to drop a pin first!");
    return;
  }

  const description = document.getElementById("description").value.trim();
  const submittedBy = document.getElementById("submittedBy").value.trim();

  if (!description || !submittedBy) {
    alert("Please fill in all fields.");
    return;
  }

  const data = {
    lat: marker.getLatLng().lat,
    lng: marker.getLatLng().lng,
    description,
    submittedBy,
  };

  try {
    const response = await fetch(SUBMIT_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      alert("Location submitted successfully!");
      document.getElementById("description").value = "";
      document.getElementById("submittedBy").value = "";
    } else {
      alert("Error submitting location. Please try again.");
    }
  } catch (err) {
    console.error("Submission failed:", err);
    alert("Error connecting to server.");
  }
});
