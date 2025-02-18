async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "e623c2e49237f0d24fd2f188941f7196"; // Corrected API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const weatherInfo = document.getElementById("weatherInfo");

    if (!city) {
        weatherInfo.innerHTML = `<p>Please enter a city name!</p>`;
        weatherInfo.style.display = "block";
        weatherInfo.style.backgroundColor = "#dc3545"; 
        weatherInfo.style.border = "2px solid #a71d2a";
        return;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.cod === 200) {
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            weatherInfo.innerHTML = `
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                <p><strong>Condition:</strong> ${description}</p>
                <img src="${icon}" alt="Weather icon">
            `;

            weatherInfo.style.display = "block";
            weatherInfo.style.backgroundColor = "#007BFF";
            weatherInfo.style.border = "2px solid #0056b3";
        } else {
            weatherInfo.innerHTML = `<p>City not found!</p>`;
            weatherInfo.style.display = "block";
            weatherInfo.style.backgroundColor = "#dc3545";
            weatherInfo.style.border = "2px solid #a71d2a";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        weatherInfo.innerHTML = `<p>Error fetching data!</p>`;
        weatherInfo.style.display = "block";
        weatherInfo.style.backgroundColor = "#dc3545";
        weatherInfo.style.border = "2px solid #a71d2a";
    }
}
