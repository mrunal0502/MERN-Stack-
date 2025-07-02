const weatherForm = document.querySelector(".weatherForm");

const cityInput = document.querySelector(".cityInput");

const card = document.querySelector(".card");

const apiKey = "b5a48d358694a056882e357c91ce7c6d";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiURL);

  if (!response.ok) {
    throw new Error("could not fetch weather data");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}C`;
  humidDisplay.textContent = `Humidity : ${humidity}`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);
  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidDisplay.classList.add("humidDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈"; // Thunderstorm
    case weatherId >= 300 && weatherId < 400:
      return "🌧"; // Drizzle
    case weatherId >= 500 && weatherId < 600:
      return "🌦"; // Rain
    case weatherId >= 600 && weatherId < 700:
      return "❄"; // Snow
    case weatherId >= 700 && weatherId < 800:
      return "🌫"; // Atmosphere (Mist, Smoke, etc.)
    case weatherId === 800:
      return "☀"; // Clear
    case weatherId > 800 && weatherId < 900:
      return "☁"; // Clouds
    default:
      return "🌈"; // Default fallback
  }
}

function displayError(message) {
  const error = document.createElement("p");
  error.textContent = message;
  error.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(error);
}
