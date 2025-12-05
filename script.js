// Get your free API key from https://www.weatherapi.com/
const API_KEY = "YOUR_WEATHERAPI_KEY_HERE";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const errorText = document.getElementById("error");

const weatherCard = document.getElementById("weather-card");
const cityNameEl = document.getElementById("city-name");
const descEl = document.getElementById("description");
const tempEl = document.getElementById("temperature");
const extraEl = document.getElementById("extra");

// Button click
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }
  getWeather(city);
});

// Enter key
cityInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

async function getWeather(city) {
  clearError();

  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
    city
  )}&aqi=no`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Unable to fetch weather right now. Try again later.");
    }

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error.message || "City not found.");
    }

    renderWeather(data);
  } catch (err) {
    showError(err.message);
    weatherCard.classList.add("hidden");
  }
}

function renderWeather(data) {
  const cityName = `${data.location.name}, ${data.location.country}`;
  const description = data.current.condition.text;
  const temp = Math.round(data.current.temp_c);
  const feelsLike = Math.round(data.current.feelslike_c);
  const humidity = data.current.humidity;

  cityNameEl.textContent = cityName;
  descEl.textContent = description;
  tempEl.textContent = `${temp}°C`;
  extraEl.textContent = `Feels like ${feelsLike}°C • Humidity ${humidity}%`;

  weatherCard.classList.remove("hidden");
}

function showError(message) {
  errorText.textContent = message;
}

function clearError() {
  errorText.textContent = "";
}
