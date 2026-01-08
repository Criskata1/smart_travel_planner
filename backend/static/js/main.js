import { fetchDestinations, fetchWeather } from './api.js';

const citySelect = document.getElementById("city-select");
const destinationsList = document.getElementById("destinations-list");
const weatherInfo = document.getElementById("weather-info");

// 📍 Списък с градове
const cities = [
    "Paris", "London", "Rome", "Berlin", "Barcelona",
    "Tokyo", "Bangkok", "Singapore", "Dubai", "Beijing",
    "New York", "Los Angeles", "Toronto", "Mexico City", "Sydney",
    "Cape Town", "Cairo", "Moscow", "Istanbul", "Rio de Janeiro"
];

// ➕ Добавяме градовете в падащото меню
cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
});

// 🗺️ Инициализация на картата
const map = L.map('map', {
    zoomControl: true,
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    scrollWheelZoom: true
}).setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

// Маркери
let currentMarkers = [];

function addMarkers(destinations) {
    currentMarkers.forEach(marker => map.removeLayer(marker));
    currentMarkers = [];

    destinations.forEach(d => {
        const marker = L.marker([d.lat, d.lon]).addTo(map)
            .bindPopup(`<b>${d.name}</b><br>${d.type}`);
        currentMarkers.push(marker);
    });
}

// 🌤️ Рендер на времето
function renderWeather(weatherData) {
    if (!weatherData || weatherData.error) {
        weatherInfo.innerHTML = `<p>Weather data not available</p>`;
        weatherInfo.style.background = "linear-gradient(120deg, #aaa, #ccc)";
        return;
    }

    const temp = weatherData.temperature;
    const desc = weatherData.description.toLowerCase();

    let icon = "☀️";
    let bg = "linear-gradient(120deg, #0078d7, #0094ff)";
    if (desc.includes("rain")) { icon = "🌧️"; bg = "linear-gradient(120deg, #4e7ab5, #7395b7)"; }
    if (desc.includes("snow")) { icon = "❄️"; bg = "linear-gradient(120deg, #a0c4ff, #dbe9ff)"; }
    if (desc.includes("cloud")) { icon = "⛅"; bg = "linear-gradient(120deg, #999999, #cccccc)"; }
    if (desc.includes("storm")) { icon = "🌩️"; bg = "linear-gradient(120deg, #555, #888)"; }

    weatherInfo.style.background = bg;
    weatherInfo.innerHTML = `
        <div class="weather-box">
            <div class="weather-icon">${icon}</div>
            <div class="weather-details">
                <h3>${weatherData.city}</h3>
                <p>${temp}°C - ${weatherData.description}</p>
            </div>
        </div>
    `;
}

// 🚀 Зареждане на град
async function loadCityData(city) {
    if (!city) return;

    destinationsList.innerHTML = "<p>Loading destinations...</p>";
    weatherInfo.innerHTML = "<p>Loading weather...</p>";

    // Дестинации
    const destData = await fetchDestinations(city);
    if (destData.destinations && destData.destinations.length > 0) {
        destinationsList.innerHTML = "";
        destData.destinations.forEach(d => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `<h3>${d.name}</h3><p>${d.location}</p>`;
            destinationsList.appendChild(card);
        });

        addMarkers(destData.destinations);

        // 🎯 Плавно преместване на картата
        const first = destData.destinations[0];
        map.flyTo([first.lat, first.lon], 11, {
            animate: true,
            duration: 1.8
        });
    } else {
        destinationsList.innerHTML = "<p>No destinations found</p>";
    }

    // Време
    const weatherData = await fetchWeather(city);
    renderWeather(weatherData);
}

// 🧭 Автоматично зареждане при избор
citySelect.addEventListener("change", (e) => {
    const city = e.target.value;
    loadCityData(city);
});

// 🎲 Random City Button
const randomBtn = document.getElementById("random-city-btn");

randomBtn.addEventListener("click", () => {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    citySelect.value = randomCity;
    loadCityData(randomCity);
});
