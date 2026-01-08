import { fetchDestinations } from "./api.js";

/* =====================
   DOM ELEMENTS
===================== */
const loadBtn = document.getElementById("load-destinations-btn");
const citySelect = document.getElementById("city-select-itinerary");
const availablePanel = document.getElementById("available-destinations");
const typeFilter = document.getElementById("type-filter");
const itineraryControls = document.querySelector(".itinerary-controls");

/* =====================
   MAP SETUP
===================== */
let map = null;
let mapMarkers = [];

const mapContainer = document.getElementById("map");
if (mapContainer && window.L) {
  map = L.map("map").setView([48.8566, 2.3522], 3);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);
}

/* =====================
   DRAG & DROP HANDLERS
===================== */
export function allowDrop(ev) {
  ev.preventDefault();
}

export function drag(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id);
}

export function drop(ev) {
  ev.preventDefault();
  const id = ev.dataTransfer.getData("text/plain");
  const dragged = document.getElementById(id);
  if (!dragged) return;

  const dropZone = ev.target.closest(".day-destinations");
  if (!dropZone) return;

  dropZone.appendChild(dragged);
}

/* =====================
   POPULATE CITY SELECT
===================== */
async function loadCities() {
  // Since your api.js does not provide a fetchCities function,
  // you can hardcode or dynamically populate here if you want.
  const cities = [
    "Paris", "London", "Rome", "Berlin", "Barcelona",
    "Tokyo", "Bangkok", "Singapore", "Dubai", "Beijing",
    "New York", "Los Angeles", "Toronto", "Mexico City",
    "Sydney", "Rio de Janeiro", "Cairo", "Cape Town", "Moscow"
  ];

  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
}

/* =====================
   LOAD DESTINATIONS
===================== */
async function loadDestinations() {
  const city = citySelect?.value;
  const type = typeFilter?.value;

  if (!city) {
    alert("Please select a city");
    return;
  }

  availablePanel.innerHTML = "<p>Loading destinations...</p>";
  clearMapMarkers();

  let data;
  try {
    data = await fetchDestinations(city);
  } catch (err) {
    availablePanel.innerHTML = "<p class='error'>Failed to load destinations</p>";
    return;
  }

  const destinations = data.destinations || [];

  if (destinations.length === 0) {
    availablePanel.innerHTML = "<p>No destinations found</p>";
    return;
  }

  availablePanel.innerHTML = "";

  destinations.forEach((d, index) => {
    if (type && d.type && d.type !== type) return;

    const card = document.createElement("div");
    card.className = "card draggable-card";
    card.id = `dest-${index}`;
    card.draggable = true;
    card.addEventListener("dragstart", drag);

    card.innerHTML = `
      <h4>${d.name}</h4>
      <p>${d.location || ""}</p>
    `;

    availablePanel.appendChild(card);
    addMarkerToMap(d);
  });
}

/* =====================
   SAVE / LOAD ITINERARY TO LOCAL STORAGE
===================== */
function saveItinerary() {
  const days = document.querySelectorAll(".day-card");
  const itinerary = {};

  days.forEach((day) => {
    const dayNum = day.dataset.day;
    const cards = day.querySelectorAll(".draggable-card");

    itinerary[dayNum] = Array.from(cards).map((card) => ({
      name: card.querySelector("h4")?.textContent || "",
      location: card.querySelector("p")?.textContent || "",
    }));
  });

  localStorage.setItem("myItinerary", JSON.stringify(itinerary));
  alert("Itinerary saved");
}

function loadItinerary() {
  const raw = localStorage.getItem("myItinerary");
  if (!raw) return;

  const itinerary = JSON.parse(raw);

  Object.keys(itinerary).forEach((dayNum) => {
    const container = document.querySelector(
      `.day-card[data-day="${dayNum}"] .day-destinations`
    );
    if (!container) return;

    container.innerHTML = "";

    itinerary[dayNum].forEach((d, index) => {
      const card = document.createElement("div");
      card.className = "card draggable-card";
      card.id = `saved-${dayNum}-${index}`;
      card.draggable = true;
      card.addEventListener("dragstart", drag);

      card.innerHTML = `
        <h4>${d.name}</h4>
        <p>${d.location}</p>
      `;

      container.appendChild(card);
    });
  });
}

/* =====================
   BUTTONS SETUP
===================== */
if (itineraryControls) {
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save Itinerary";
  saveBtn.addEventListener("click", saveItinerary);

  const loadBtn2 = document.createElement("button");
  loadBtn2.textContent = "Load Itinerary";
  loadBtn2.addEventListener("click", loadItinerary);

  itineraryControls.appendChild(saveBtn);
  itineraryControls.appendChild(loadBtn2);
}

/* =====================
   MAP HELPERS
===================== */
function addMarkerToMap(d) {
  if (!map) return;

  const lat = d.lat ?? 48.8566 + Math.random() * 0.1;
  const lng = d.lon ?? 2.3522 + Math.random() * 0.1;

  const marker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`<b>${d.name}</b><br>${d.location || ""}`);

  mapMarkers.push(marker);
}

function clearMapMarkers() {
  if (!map) return;
  mapMarkers.forEach((m) => map.removeLayer(m));
  mapMarkers = [];
}

/* =====================
   EVENT LISTENERS
===================== */
if (loadBtn) {
  loadBtn.addEventListener("click", loadDestinations);
}

/* =====================
   INITIALIZATION
===================== */
loadCities();
