const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdgCImO8bsN1qFCY5fLMp_eDY78W65N6Imcxs_-5SSS8iZc3g/viewform?usp=pp_url";
entry.1671409061=ben&entry.1642471479=downtown+waxhaw&entry.567850449=123+waxhaw&entry.645736728=123&entry.418865114=-123
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

  const lat = marker.getLatLng().lat;
  const lng = marker.getLatLng().lng;

  // Build FormData to match Google Form fields
  const formData = new FormData();
  formData.append("entry.1642471479", description); // Description field
  formData.append("entry.1671409061", submittedBy); // Submitted by field
  formData.append("entry.645736728", lat);         // Lat field
  formData.append("entry.418865114", lng);         // Lng field

  try {
    await fetch(FORM_URL, {
      method: "POST",
      mode: "no-cors", // Required by Google Forms
      body: formData
    });

    alert("Location submitted successfully!");
    document.getElementById("description").value = "";
    document.getElementById("submittedBy").value = "";
  } catch (err) {
    console.error("Submission failed:", err);
    alert("Error connecting to Google Form.");
  }
});


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
