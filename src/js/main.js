/* eslint-disable indent */
'use strict';

//HTML elements
const searchInput = document.querySelector('.js-search');
const showsResult = document.querySelector('.js-tvshows');
const btnElement = document.querySelector('.js-btn');
const formElement = document.querySelector('.js-form');

// Array que se llenara una vez que la api regrese los datos buscados
let series = [];

//API TVMaze
const getDataFromApi = () => {
    const urlApi = '//api.tvmaze.com/search/shows?q=';
    const userSearch = searchInput.value;
    fetch(`${urlApi} + ${userSearch}`)
        .then(response => response.json())
        .then(data => {
            series = data;

            renderShows();
        });
};

function renderShows() {
    let htmlCode = '';

    for (let i = 0; i < series.length; i++) {
        let imgURL = series[i].show.image.medium;
        htmlCode += `<li class="js-show">`;
        htmlCode += `<h5 class="js-show-name">${series[i].show.name}</h5>`;
        htmlCode += `<img src="${imgURL}" alt="Show image" ${series[i].show.name}" class="js-show-img"></img>`;
        htmlCode += `</li>`;
    }
    showsResult.innerHTML = htmlCode;
}
btnElement.addEventListener('click', getDataFromApi);

function handleSearch(ev) {
    ev.preventDefault();
    console.log(searchInput.value);
    getDataFromApi();
}


formElement.addEventListener('submit', handleSearch);
searchInput.addEventListener('keyup', handleSearch);



