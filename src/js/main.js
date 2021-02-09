/* eslint-disable indent */
'use strict';

//HTML elements
const formElement = document.querySelector('.js-form');
const searchInput = document.querySelector('.js-search');
const btnElement = document.querySelector('.js-btn');
const showsResult = document.querySelector('.js-tvshows');
const favElements = document.querySelector('.js-list-favorites');

// Array que se llenara una vez que la api regrese los datos buscados
let series = [];
let favSeries = [];

//SEARCH API TVMaze -------------------------------------------------------------------
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

function handleSearch() {
    getDataFromApi();
}

//RENDER SHOWS ------------------------------------------------------------------------
function renderShows() {
    let htmlCode = '';

    for (let i = 0; i < series.length; i++) {
        let imgURL = series[i].show.image;
        let idSerie = series[i].show.id;
        htmlCode += `<li class="js-show" id="${idSerie}">`;
        htmlCode += '<div class="js__show--container">';

        if (imgURL === null) {
            htmlCode += `<img class="js__show--img"src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" title="${series[i].show.name}" alt="${series[i].show.name} cover not available"/>`;
        } else {
            htmlCode += `<img src="${imgURL.medium}" alt="Show image" ${series[i].show.name}" class="js-show-img"></img>`;
        }
        htmlCode += `<h5 class="js__show--name">${series[i].show.name}</h5>`;
        htmlCode += '</div>';
        htmlCode += `</li>`;
    }
    showsResult.innerHTML = htmlCode;
    listenFavs();
}

function handleForm(ev) {
    ev.preventDefault();
}

//FAVS --------------------------------------------------------------------------------

const handleFavs = (ev) => {
    const selectedSerie = parseInt(ev.currentTarget.id);
    // console.log(event.currentTarget.id);
    //consigue el nombre y id de se series donde se hace click
    let clickedShow = series.find((item) => selectedSerie === item.show.id);
    let isFavorite = favSeries.findIndex((item) => selectedSerie === item.show.id);
    //revisa si el item ya existe en el array de favoritos
    if (isFavorite === -1) {
        //agrega al array el item seleccionado
        favSeries.push(clickedShow);
    } else {
        //quita el item del array
        favSeries.splice(isFavorite, 1);
    }
    //cambiar color de fondo serie seleccionada
    if (selectedSerie.classList.contains('favorite__item--list')) {
        selectedSerie.classList.add('favorite__item--list');
    } else {
        selectedSerie.classList.remove('favorite__item--list');
    }
    favElements.innerHTML = '';

    listenFavs();
};


function listenFavs() {
    const selectedSeries = document.querySelectorAll('.js-show');
    for (const eachSerie of selectedSeries) {
        eachSerie.addEventListener('click', handleFavs);
    }
}

formElement.addEventListener('submit', handleForm);
btnElement.addEventListener('click', handleSearch);