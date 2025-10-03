// const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdgCImO8bsN1qFCY5fLMp_eDY78W65N6Imcxs_-5SSS8iZc3g/formResponse";

// // Initialize map
// let map = L.map("map").setView([39.5, -98.35], 4); // Center on USA
// let marker = null;

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
// }).addTo(map);

// // Click map to drop a pin
// map.on("click", function (e) {
//   if (marker) {
//     map.removeLayer(marker);
//   }
//   marker = L.marker(e.latlng).addTo(map);
//   marker.bindPopup("🎃 Selected location").openPopup();
// });

// // Handle submission
// document.getElementById("submitBtn").addEventListener("click", async function () {
//   if (!marker) {
//     alert("Please click on the map to drop a pin first!");
//     return;
//   }

//   const description = document.getElementById("description").value.trim();
//   const submittedBy = document.getElementById("submittedBy").value.trim();

//   if (!description || !submittedBy) {
//     alert("Please fill in all fields.");
//     return;
//   }

//   const lat = marker.getLatLng().lat;
//   const lng = marker.getLatLng().lng;

//   // Build FormData to match Google Form fields
//   const formData = new FormData();
//   formData.append("entry.1642471479", description); // Description
//   formData.append("entry.1671409061", submittedBy); // Submitted by
//   formData.append("entry.645736728", lat);          // Latitude
//   formData.append("entry.418865114", lng);          // Longitude

//   try {
//     await fetch(FORM_URL, {
//       method: "POST",
//       mode: "no-cors", // Required by Google Forms
//       body: formData
//     });

//     alert("Location submitted successfully!");
//     document.getElementById("description").value = "";
//     document.getElementById("submittedBy").value = "";

//     // Optionally remove the marker after submission
//     map.removeLayer(marker);
//     marker = null;

//   } catch (err) {
//     console.error("Submission failed:", err);
//     alert("Error connecting to Google Form.");
//   }
// });
