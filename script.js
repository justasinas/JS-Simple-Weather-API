const today = new Date();
const hour = today.getHours();

const inputField = document.getElementById('city__Input');
const box = document.querySelector('.weather-box');

inputField.addEventListener('keyup', (e) => {
    
    if(e.code === 'Enter') {
        e.preventDefault();
        let city = inputField.value;

        const xhr = new XMLHttpRequest();
        xhr.open('GET',`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3f50f81f82282b49e04967bcc335c7fa`);

        xhr.onreadystatechange = function() {
            let output = "";
            if(this.status === 200 && this.readyState === 4) {
                let data = JSON.parse(this.responseText);
                output = `
                <h2>${data.name}</h2>
                <div class="weather">
                    <p class="degrees">${Math.round(data.main.temp)}<span class="celcius">C</span></p>
                    <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" height="100" width="100"/>
                    <p>${data.weather[0].main}</p>
                    <p>${data.weather[0].description}</p>
                </div>`
                box.innerHTML = output;
            } else if(this.status === 404) {
                output = `<p>Cant find city :(</p>`
                box.innerHTML = output;
            }
        }
        xhr.send();
    }
});