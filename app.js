const wrapper = document.querySelector('.wrapper');
const inputPart = document.querySelector('.input-part');
const infoTxt = document.querySelector('.info-txt');
const inputField = document.querySelector('input');

inputField.addEventListener('keyup', e => {
    if (e.key == 'Enter' && inputField.value != '') {
        requestApi(inputField.value);
    }
});

function requestApi(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b34f67a5a92dd5e00d4c0c1a36452a4&lang=pt_br`;
    fetch(api)
    .then(response => console.log(response.json()));
}