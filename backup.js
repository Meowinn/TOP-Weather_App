const searchInput = document.querySelector('#searchInput');
const okBtn = document.querySelector('#okBtn');
const weatherDiv = document.querySelector('#weatherDiv');


function render(data) {
    console.log(data);
    const dataContainer = document.createElement('div');
    const countryDiv = document.createElement('div');
    const weatherMain = document.createElement('div');
    const tempDiv = document.createElement('div');
    const feelsDiv = document.createElement('div');
    const humidDiv = document.createElement('div');
    
    dataContainer.setAttribute('id', 'dataContainer');

    let tempC = Math.round(data.main.temp - 273.15);
    let feelsC = Math.round(data.main.feels_like - 273.15);
    
    let weatherDescrip = data.weather[0].description;
    let capital = weatherDescrip.slice(0, 1).toUpperCase();
    let rest = weatherDescrip.slice(1, weatherDescrip.length);
    

    countryDiv.textContent = data.name + ", " + data.sys.country;
    weatherMain.textContent = capital + rest;
    tempDiv.textContent = tempC + '°C';
    feelsDiv.textContent = feelsC + '°C';
    humidDiv.textContent = `Humidity: ${data.main.humidity}%`;

    
    dataContainer.appendChild(countryDiv);
    dataContainer.appendChild(weatherMain);
    dataContainer.appendChild(tempDiv);
    dataContainer.appendChild(feelsDiv);
    dataContainer.appendChild(humidDiv);

    
    weatherDiv.appendChild(dataContainer);
}


okBtn.addEventListener('click', () => {
    let keyword = searchInput.value;
    weatherDiv.innerHTML = '';

    async function getWeather(){
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + keyword + '&APPID=9bcda1c754c1ea8b61933e28ef04566d', {mode: 'cors'});
        const weatherData = await response.json();

        render(weatherData);
    }

    getWeather().catch(err => {
        weatherDiv.innerHTML = 'Error! No location found'
    });

    if(document.body.contains(document.querySelector('#dataContainer'))){
        weatherDiv.removeChild(weatherDiv.firstElementChild);
    }

})

searchInput.addEventListener('keyup', function(event){
    if(event.keyCode === 13) {
        okBtn.click();
    }
})