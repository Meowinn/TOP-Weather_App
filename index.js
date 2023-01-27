const searchInput = document.querySelector('#searchInput');
const okBtn = document.querySelector('#okBtn');
const weatherDiv = document.querySelector('#weatherDiv');
const dataMain = document.querySelector('#dataMain');
const headerBtn = document.querySelector('#headerBtn');

function render(data) {
    console.log(data);
    const dataContainer = document.createElement('div');
    const countryDiv = document.createElement('div');
    const dateDiv = document.createElement('div');
    const tempContainer = document.createElement('div');
    const iconTemp = document.createElement('div');
    const iconWrapper = document.createElement('div');
    const feelsContainer = document.createElement('div');
    const weatherIcon = document.createElement('img');
    const weatherMain = document.createElement('div');
    const tempDiv = document.createElement('div');
    const feelsDiv = document.createElement('div');
    const humidDiv = document.createElement('div');
    const windDiv = document.createElement('div');
    const tempSpan = document.createElement('span');
    const humidSpan = document.createElement('span');
    const windSpan = document.createElement('span');

    const toggleWrapper = document.createElement('div');
    const labelToggle = document.createElement('label');
    const sliderInput = document.createElement('input');
    const spanSlider = document.createElement('span');
    const spanClass = document.createElement('span');


    toggleWrapper.setAttribute('id', 'toggleWrapper');
    labelToggle.classList.add('toggle');
    sliderInput.setAttribute('type', 'checkbox');
    spanSlider.classList.add('slider');
    spanClass.classList.add('labels');

    spanClass.dataset.on = "°C";
    spanClass.dataset.off = "°F";

    dataContainer.setAttribute('id', 'dataContainer');
    countryDiv.classList.add('countryDiv');

    tempContainer.classList.add('tempContainer');
    iconTemp.classList.add('iconTemp');
    iconWrapper.classList.add('iconWrapper');
    feelsContainer.classList.add('feelsContainer');

    dateDiv.classList.add('dateDiv');
    weatherIcon.classList.add('weatherIcon');
    weatherMain.classList.add('weatherMain');
    tempDiv.classList.add('tempDiv')
    feelsDiv.classList.add('feelsDiv');
    humidDiv.classList.add('humidDiv');
    windDiv.classList.add('windDiv');

    let tempC = Math.round(data.main.temp - 273.15);
    let tempF = Math.floor((tempC * 1.8) + 32);
    let feelsC = Math.round(data.main.feels_like - 273.15);
    let feelsF = Math.floor((feelsC * 1.8) + 32);
    
    let weatherDescrip = data.weather[0].description;
    let capital = weatherDescrip.slice(0, 1).toUpperCase();
    let rest = weatherDescrip.slice(1, weatherDescrip.length);

    weatherIcon.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png';

    let d = new Date();
    let localTime = d.getTime();
    let localOffset = d.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    let localDate = utc + (1000 * data.timezone);
    let finalDate = new Date(localDate);

    countryDiv.textContent = data.name + ", " + data.sys.country;
    dateDiv.textContent = finalDate.toLocaleString();
    weatherMain.textContent = capital + rest;
    tempDiv.textContent = tempC + '°C';
    feelsDiv.textContent = 'Feels like: ';

    tempSpan.textContent = feelsC + '°C';

    humidDiv.textContent = `Humidity: `;

    humidSpan.textContent = `${data.main.humidity}%`;

    windDiv.textContent = `Wind: `;

    windSpan.textContent = `${data.wind.speed}k/m`;
    
    dataContainer.appendChild(countryDiv);
    dataContainer.appendChild(dateDiv);
    dataContainer.appendChild(tempContainer);
    tempContainer.appendChild(iconTemp);
    tempContainer.appendChild(feelsContainer)
    iconTemp.appendChild(iconWrapper);
    iconWrapper.appendChild(weatherIcon)
    iconWrapper.appendChild(tempDiv);
    iconTemp.appendChild(weatherMain);
    feelsContainer.appendChild(feelsDiv);
    feelsDiv.appendChild(tempSpan);
    feelsContainer.appendChild(humidDiv);
    humidDiv.appendChild(humidSpan);
    feelsContainer.appendChild(windDiv);
    windDiv.appendChild(windSpan);

    weatherDiv.appendChild(dataContainer); 
    
    weatherDiv.appendChild(toggleWrapper);
    toggleWrapper.appendChild(labelToggle);

    labelToggle.appendChild(sliderInput);
    labelToggle.appendChild(spanSlider);
    labelToggle.appendChild(spanClass);

    toggleFunc(sliderInput, tempDiv, tempC, tempF, tempSpan, feelsC, feelsF);
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
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Error! No location found';
        errorDiv.style.color = "red";
        errorDiv.style.fontSize = "1.6rem";
        weatherDiv.appendChild(errorDiv);
    });
    
    })

searchInput.addEventListener('keyup', function(event){
    if(event.keyCode === 13) {
        okBtn.click();
    }
})

headerBtn.addEventListener('click', () => {
    location.reload();
})

function toggleFunc(slider, x, y, z, a, b, c) {

    slider.addEventListener('click', ()=> {
        if(slider.checked == true) {
            x.textContent = z + '°F';
            console.log('switched to farenheit');
            a.textContent = c + '°F';

        }else {
            x.textContent = y + '°C';
            a.textContent = b + '°C';
        }
    })
}





