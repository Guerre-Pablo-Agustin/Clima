const api = {
    key : "7c6df46830535c3e171944f6e56aec95",
    URL : 'https://api.openweathermap.org/data/2.5/weather'
}

//fomulario
const searchform = document.getElementById('search-form')
const searchcity = document.getElementById('city')

//data
const weatherData = document.querySelector('.weather-data');
const fecha = document.querySelector('.fecha');
const ciudad = document.querySelector('.ciudad');
const imgTemp = document.querySelector('.temp-img');
const grados = document.querySelector('.grados');
const estado = document.querySelector('.estado');
const variable = document.querySelector('.variable');


function updateImages(data) {
    const temp = toCelsius(data.main.temp);
    let src = 'images/temp-mid.png';
    if (temp > 26) {
      src = 'images/temp-high.png';
    } else if (temp < 20) {
      src = 'images/temp-low.png';
    }
    imgTemp.src = src;
  }
  

const search = async (query) => {
    try {
        const response = await fetch(`${api.URL}?q=${query}&appid=${api.key}&lang=es`);
        const data = await response.json();
        console.log(data);
        console.log(data.weather);
        weatherData.style.display = 'block';
        ciudad.innerHTML = `${data.name}, ${data.sys.country}`;
        fecha.innerHTML = (new Date()).toLocaleDateString();
        grados.innerHTML = `${toCelsius(data.main.temp)}c`;
        estado.innerHTML = data.weather[0].description;
        variable.innerHTML = `${toCelsius(data.main.temp_min)}c / ${toCelsius(data.main.temp_max)}c`;
        updateImages(data);
        
    } catch (error) {
        console.log(error);
    }
}


function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
  }

const onSubmit = (event) => {
    event.preventDefault()
    search(searchcity.value)
}



searchform.addEventListener('submit', onSubmit, true)