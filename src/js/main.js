/* eslint-disable indent */
'use strict';

//HTML elements
const searchInput = document.querySelector('.js-search');
const showsResult = document.querySelector('.js-tvshows');

// Array que se llenara una vez que la api regrese los datos buscados
let series = [];

//API TVMaze
function getDataFromApi() {
    fetch(`http://api.tvmaze.com/search/shows?q=${'girls'}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            series = data;

            renderShows();
        });
}

function renderShows() {
    let htmlCode = '';
    for (let i = 0; i < series.length; i++) {

        htmlCode += `<li class="js-show">`;
        htmlCode += `<h5 class="js-show-name">${series[i].show.name}</h5>`;
        htmlCode += `<img src="" ${series[i].show.name}" class="js-show-img/>`;
        htmlCode += `</li>`;
    }
    showsResult.innerHTML = htmlCode;
}

function handleSearch() {
}

searchInput.addEventListener('keyup', handleSearch);

getDataFromApi();

