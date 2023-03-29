const wrapper = document.querySelector('.wrapper');
const inputPart = document.querySelector('.input-part');
const infoTxt = document.querySelector('.info-txt');
const inputField = document.querySelector('input');
const locationBtn = document.querySelector('button');

let api;

inputField.addEventListener('keyup', e => {
    if (e.key == 'Enter' && inputField.value != '') {
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener('click', () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert('Seu navegador não suporta a geolocalização.')
    }
})

function onSuccess(position) {
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5b34f67a5a92dd5e00d4c0c1a36452a4`;
    fetchData();
}

function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add('error');
}

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b34f67a5a92dd5e00d4c0c1a36452a4&lang=pt_br`;
    fetchData();
}

function fetchData() {
    infoTxt.innerText = 'Obtendo informações do clima...';
    infoTxt.classList.add('pending');
    fetch(api)
    .then(response => response.json())
    .then(result => weatherDetails(result));
}

function weatherDetails(info) {
    if(info.cod == '404') {
        infoTxt.innerText = `${inputField.value} não é uma cidade válida`
        infoTxt.classList.replace('pending', 'error')
    } else {
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        
        infoTxt.classList.remove('pending', 'error');
        wrapper.classList.add('active');
        console.log(info);
    }
}