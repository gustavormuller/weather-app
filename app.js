const wrapper = document.querySelector('.wrapper');
const inputPart = document.querySelector('.input-part');
const infoTxt = document.querySelector('.info-txt');
const inputField = document.querySelector('input');
const locationBtn = document.querySelector('button');

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
    let api = ``;
}

function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add('erro');
}

function requestApi(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b34f67a5a92dd5e00d4c0c1a36452a4&lang=pt_br`;
    infoTxt.innerText = 'Obtendo informações do clima...';
    infoTxt.classList.add('pending');
    fetch(api)
    .then(response => response.json())
    .then(result => weatherDetails(result));
}

function weatherDetails(info) {
    console.log(info);
}