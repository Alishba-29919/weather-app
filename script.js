// API Key 
const apiKey = "2d57b330281f9f58cfbcb2e68e27cb1c"; 

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");

async function fetchWeather(city) {
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    //UI loading state
    document.querySelector("#city-name").textContent = "Searching...";
    
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
        // Debugging line
        console.log("Fetching from:", url); 

        const response = await fetch(url);
        const data = await response.json();

        console.log("API Response:", data); 

        if (data.cod === "404") {
            alert("City Not Found!Check the spelling.");
            document.querySelector("#city-name").textContent = "Not Found";
            return;
        }

        if (data.cod === 401) {
            alert("Invalid API Key! maybe wrong and maybe not active.");
            return;
        }

        // Update UI Elements
        document.querySelector("#city-name").textContent = data.name;
        document.querySelector("#temp-value").textContent = Math.round(data.main.temp);
        document.querySelector("#weather-desc").textContent = data.weather[0].description;
        document.querySelector("#humidity").textContent = data.main.humidity + "%";
        document.querySelector("#wind").textContent = data.wind.speed + " m/s";

        // Background Color Change
        const glow = document.querySelector(".bg-glow");
        if(data.main.temp > 25) {
            glow.style.background = "radial-gradient(circle, #ff5f6d 0%, transparent 70%)";
        } else {
            glow.style.background = "radial-gradient(circle, #00f2fe 0%, transparent 70%)";
        }

    } catch (error) {
        console.error("Error found:", error);
        alert("Internet connection or API problem.");
    }
}

// handle click and enter 
searchBtn.addEventListener("click", () => fetchWeather(cityInput.value.trim()));

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") fetchWeather(cityInput.value.trim());
});

// Default start
window.onload = () => fetchWeather("Lahore");