/* ==========================================
   SMART AGRICULTURE WEBSITE
   JavaScript Program
========================================== */


/* ==========================================
   1. FARMER LOGIN DEMO
========================================== */

function showLogin() {

    let farmerName = prompt("Enter Farmer Name:");

    if (farmerName === null) {
        return;
    }

    farmerName = farmerName.trim();

    if (farmerName === "") {
        alert("Please enter your name!");
        return;
    }

    alert("Welcome to Smart Agriculture, " + farmerName + " 🌱");

}


/* ==========================================
   2. WEATHER FORECAST
   Uses Open-Meteo API
========================================== */

async function getWeather() {

    const cityInput = document.getElementById("city");
    const result = document.getElementById("weather-result");

    const city = cityInput.value.trim();

    if (city === "") {
        result.innerHTML = "<p>Please enter your city or village!</p>";
        return;
    }

    result.innerHTML = "<p>Loading weather information...</p>";

    try {

        // Find city coordinates
        const geoResponse = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(city) +
            "&count=1&language=en&format=json"
        );

        if (!geoResponse.ok) {
            throw new Error("Location service unavailable");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            result.innerHTML = "<p>Location not found. Try another city.</p>";
            return;
        }

        const location = geoData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        // Get weather forecast
        const weatherResponse = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=" +
            latitude +
            "&longitude=" +
            longitude +
            "&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m"
        );

        if (!weatherResponse.ok) {
            throw new Error("Weather service unavailable");
        }

        const weatherData = await weatherResponse.json();

        const current = weatherData.current;

        result.innerHTML = `
            <h3>Weather in ${location.name}</h3>

            <p>🌡 Temperature:
                ${current.temperature_2m} °C
            </p>

            <p>💧 Humidity:
                ${current.relative_humidity_2m} %
            </p>

            <p>🌧 Precipitation:
                ${current.precipitation} mm
            </p>

            <p>💨 Wind Speed:
                ${current.wind_speed_10m} km/h
            </p>
        `;

    } catch (error) {

        result.innerHTML = `
            <p>Unable to load weather.</p>
            <p>Please check your internet connection.</p>
        `;

        console.error(error);

    }

}


/* ==========================================
   3. CROP RECOMMENDATION
========================================== */

function recommendCrop() {

    const soil = document.getElementById("soil").value;
    const season = document.getElementById("season").value;

    const result = document.getElementById("crop-result");

    if (soil === "" || season === "") {

        result.innerHTML =
            "<p>Please select soil type and season!</p>";

        return;
    }

    let crops = [];

    // Educational example recommendations
    if (season === "kharif") {

        if (soil === "alluvial" || soil === "clay") {
            crops = ["Rice", "Maize"];
        } else {
            crops = ["Maize", "Millets"];
        }

    } else if (season === "rabi") {

        if (soil === "loamy" || soil === "alluvial") {
            crops = ["Wheat", "Mustard", "Pulses"];
        } else {
            crops = ["Mustard", "Pulses"];
        }

    } else if (season === "summer") {

        crops = ["Green Gram", "Vegetables", "Maize"];

    }

    result.innerHTML = `
        <h3>🌾 Suggested Crops</h3>

        <p>${crops.join(", ")}</p>

        <small>
            Suggestions are educational examples.
            Confirm suitability with local agricultural experts
            and soil test results.
        </small>
    `;

}


/* ==========================================
   4. FERTILIZER CALCULATOR
========================================== */

function calculateFertilizer() {

    const land = Number(document.getElementById("land").value);

    const fertilizerType =
        document.getElementById("fertilizer-type").value;

    const result =
        document.getElementById("fertilizer-result");

    if (land <= 0 || !Number.isFinite(land)) {

        result.innerHTML =
            "<p>Please enter a valid land area!</p>";

        return;
    }

    if (fertilizerType === "") {

        result.innerHTML =
            "<p>Please select fertilizer type!</p>";

        return;
    }

    const fertilizerNames = {
        urea: "Urea",
        dap: "DAP",
        potash: "Potash"
    };

    result.innerHTML = `
        <h3>🧪 Fertilizer Calculation</h3>

        <p>Land Area: ${land} acres</p>

        <p>Selected Fertilizer:
            ${fertilizerNames[fertilizerType]}
        </p>

        <p>
            Please enter the recommended fertilizer rate
            from your soil test or agricultural expert
            to calculate the required quantity.
        </p>
    `;

}


/* ==========================================
   5. IRRIGATION SCHEDULE
   Save data using LocalStorage
========================================== */

function saveIrrigation() {

    const date =
        document.getElementById("irrigation-date").value;

    const time =
        document.getElementById("irrigation-time").value;

    const result =
        document.getElementById("irrigation-result");

    if (date === "" || time === "") {

        result.innerHTML =
            "<p>Please select date and time!</p>";

        return;
    }

    const schedule = {
        date: date,
        time: time
    };

    // Save schedule
    localStorage.setItem(
        "irrigationSchedule",
        JSON.stringify(schedule)
    );

    result.innerHTML = `
        <h3>💧 Irrigation Schedule Saved</h3>

        <p>Date: ${date}</p>

        <p>Time: ${time}</p>

        <p>Schedule saved in this browser.</p>
    `;

}


/* ==========================================
   6. MARKET PRICE DEMO
========================================== */

function checkMarketPrice() {

    const crop =
        document.getElementById("crop-name").value;

    const result =
        document.getElementById("market-result");

    if (crop === "") {

        result.innerHTML =
            "<p>Please select a crop!</p>";

        return;
    }

    const cropNames = {
        rice: "Rice",
        wheat: "Wheat",
        maize: "Maize",
        tomato: "Tomato",
        potato: "Potato"
    };

    result.innerHTML = `
        <h3>🌾 ${cropNames[crop]}</h3>

        <p>
            Live market price is not connected yet.
        </p>

        <p>
            Please check the local mandi or official
            agricultural market website for today's price.
        </p>
    `;

}


/* ==========================================
   7. CONTACT FORM
========================================== */

document.getElementById("contact-form")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("farmer-name").value.trim();

        const email =
            document.getElementById("farmer-email").value.trim();

        const message =
            document.getElementById("farmer-message").value.trim();

        if (name === "" || email === "" || message === "") {

            alert("Please fill all fields!");
            return;

        }

        alert(
            "Thank you, " + name +
            "! Your message has been recorded in this demo."
        );

        this.reset();

    });


/* ==========================================
   8. WEBSITE WELCOME MESSAGE
========================================== */

function changeLanguage(lang) {

    if (lang === "or") {
        document.documentElement.lang = "or";
        alert("ଓଡ଼ିଆ ଭାଷା ଚୟନ କରାଗଲା");
    } 
    else {
        document.documentElement.lang = "en";
        alert("English language selected");
    }

}