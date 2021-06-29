const API_KEY = "7e2ceebc492d2ed8e785138de97fb8dc";

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

const showErrorMessage = (cityName, errorMessage) => {
    const html = `<h2 class="error-field">City "${cityName}" ${errorMessage}</h2>`;
    document.querySelector(".error-field").innerHTML = html;
};

const fetchWeather = (cityName) => {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
            cityName +
            "&units=metric&appid=" +
            API_KEY
    )
        .then(handleErrors)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
        .catch((error) => showErrorMessage(cityName, error.message));
};

const displayWeather = (data) => {
    // if (data && data.weather) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    console.log(name, icon, description, temp, humidity, speed);

    document.querySelector(".city").innerText = "Weather in " + name;

    document.querySelector(".icon").src =
        "http://openweathermap.org/img/wn/" + icon + ".png";

    document.querySelector(".description").innerText = description;

    document.querySelector(".temp").innerText = temp + " °C";

    document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";

    document.querySelector(".wind").innerText = "Wind speed: " + speed + " m/s";

    document.querySelector(".weather").classList.remove("loading");
    // }
};

const search = () => {
    const searchableCity = document.querySelector(".search-field").value;
    fetchWeather(searchableCity);
};

document.querySelector(".search button").addEventListener("click", search);

document.querySelector(".search-field").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        search();
    }
});
