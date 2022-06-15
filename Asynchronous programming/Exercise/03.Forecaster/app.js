function attachEvents() {

    const location = document.getElementById('location');
    const forecast = document.getElementById('forecast');
    const current = document.getElementById('current');
    const upcoming = document.getElementById('upcoming');
    document.getElementById('submit').addEventListener('click', displayWeather);


    async function displayWeather(event) {

        const locationName = location.value;
        const locationCode = await getLocation(locationName);
        const currentForecast = await getCurrentForecast(locationCode);
        const futureForecast = await getFutureForecast(locationCode);

        let symbolsObj = {
            "Sunny": "&#x2600",
            "Partly sunny": "&#x26C5",
            'Overcast': "&#x2601",
            'Rain': "&#x2614",
            'Degrees': "&#176",
            'London': 'London, UK',
            'New York': 'New York, USA',
            'Barcelona': 'Barcelona, Spain'
        }

        forecast.style.display='block';
        let currentSymbol=symbolsObj[currentForecast.condition];
        let currentDegrees=`${currentForecast.low}${symbolsObj['Degrees']}/${currentForecast.high}${symbolsObj['Degrees']}`;
        current.innerHTML=`<div class = "label">Current conditions</div>
        <div class="forecasts">
        <span class = "condition symbol">${currentSymbol}</span>
        <span class="condition">
        <span class ="forecast-data">${symbolsObj[locationName]}</span>
        <span class="forecast-data">${currentDegrees}</span>
        <span class="forecast-data">${currentForecast.condition}</span>
        </span></div>`;

        let day1symbol=symbolsObj[futureForecast[0].condition];
        let day2symbol=symbolsObj[futureForecast[1].condition];
        let day3symbol=symbolsObj[futureForecast[2].condition];
        let day1Degrees=`${futureForecast[0].low}${symbolsObj['Degrees']}/${futureForecast[0].high}${symbolsObj['Degrees']}`;
        let day2Degrees=`${futureForecast[1].low}${symbolsObj['Degrees']}/${futureForecast[1].high}${symbolsObj['Degrees']}`;
        let day3Degrees=`${futureForecast[2].low}${symbolsObj['Degrees']}/${futureForecast[2].high}${symbolsObj['Degrees']}`;
        
        upcoming.innerHTML=
        `<div class="label">Three-day forecast</div>
        <div class = "forecast-info">
        <span class= "upcoming">
        <span class="symbol">${day1symbol}</span>
        <span class="forecast-data">${day1Degrees}</span>
        <span class="forecast-data">${futureForecast[0].condition}</span>
        </span>
        <span class= "upcoming">
        <span class="symbol">${day2symbol}</span>
        <span class="forecast-data">${day2Degrees}</span>
        <span class="forecast-data">${futureForecast[1].condition}</span>
        </span>
        <span class= "upcoming">
        <span class="symbol">${day3symbol}</span>
        <span class="forecast-data">${day3Degrees}</span>
        <span class="forecast-data">${futureForecast[2].condition}</span>
        </span></div>`

    }


}

attachEvents();

async function getLocation(location) {
    try{
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';
    const res = await fetch(url);
    const data = await res.json();
    const locationObj = data.filter(e => e.name == location)[0];
    return locationObj.code;}
    catch(error){ handleError();}
}

async function getCurrentForecast(code) {
    try{
    const url = 'http://localhost:3030/jsonstore/forecaster/today/' + code;
    const res = await fetch(url);
    const data = await res.json();
    return data.forecast;}
    catch(error){handleError();}
}

async function getFutureForecast(code) {
    try{
    const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code;
    const res = await fetch(url);
    const data = await res.json();
    return data.forecast;}
    catch(error){handleError();}
}

function handleError(){
    document.getElementById('forecast').innerHTML=`<div class = "label">Error</div>`;
}