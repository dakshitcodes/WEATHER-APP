document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "eb8347c374f23c0bf4311219e2df216c"; // env variables

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if(city === "") return; // !city

        // as soon as we have the city, we want to make
        // a web request create a method to do this 
        // fetch data and display data

        // it may throw error
        // server/database is always in another continent

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch(error) {
            showError();
        }

    })

    async function fetchWeatherData(city){
        // gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;


        const response = await fetch(url);
        console.log(typeof response)
        console.log("RESPONSE", response)

        if(!response.ok){
            throw new Error("City not found")
        }
        const data = await response.json()
        return data
    }

    function displayWeatherData(data){
        // display
        console.log(data);
        const {name, main, weather} = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

        // unlock the display
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add("hidden");

    }

    function showError(){
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

});
