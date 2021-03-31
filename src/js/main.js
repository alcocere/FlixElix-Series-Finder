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
            setInLocalStorage();
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
        let showTime = series[i].show.schedule.time;

        if (isFav(series[i])) {
            htmlCode += `<li class="js__show js__show_favorite" id="${idSerie}">`;

        } else {
            htmlCode += `<li class="js__show" id="${idSerie}">`;

        }
        htmlCode += '<div class="js__show--container">';

        if (imgURL === null) {
            htmlCode += `<img class="js__show--img"src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" title="${series[i].show.name}" alt="${series[i].show.name} cover not available"/>`;
        } else {
            htmlCode += `<img src="${imgURL.medium}" alt="Show image" ${series[i].show.name}" class="js__show--img"></img>`;
        }
        htmlCode += `<h5 class="js__show--name">${series[i].show.name}</h5>`;
        htmlCode += `<p class="js__show--time">${showTime}</p>`;
        htmlCode += '</div>';
        htmlCode += `</li>`;
    }
    showsResult.innerHTML = htmlCode;
    listenFavs();
}

function handleForm(ev) {
    ev.preventDefault();
}

function isFav(serie) {
    return !!favSeries.find(favorite => favorite.show.id === serie.show.id);
}

//FAVS --------------------------------------------------------------------------------
const selectedFavs = (ev) => {
    const selectedSerie = parseInt(ev.currentTarget.id);
    //console.log(event.currentTarget.id);
    //consigue el nombre y id de se series donde se hace click
    let clickedShow = series.find((item) => selectedSerie === item.show.id);
    let isFavorite = favSeries.findIndex((item) => selectedSerie === item.show.id);
    //revisa si el item ya existe en la lista de favoritos, si es -1 es que no existe
    if (isFavorite === -1) {
        //agrega al array el item seleccionado
        favSeries.push(clickedShow);
    } else {
        favSeries.splice(isFavorite, 1);
        //quita el item del array
    }
};

function listenFavs() {
    const selectedSeries = document.querySelectorAll('.js__show');
    for (const eachSerie of selectedSeries) {
        eachSerie.addEventListener('click', handleFavs);
    }
}

//RENDER FAVS--------------------------------------------------------------------------
function renderFavs() {
    let htmlCode = '';

    for (let i = 0; i < favSeries.length; i++) {
        let imgURL = favSeries[i].show.image;
        let idSerie = favSeries[i].show.id;
        htmlCode += `<li class="js__favshow" id="${idSerie}">`;
        htmlCode += '<div class="js__favshow--container">';

        if (imgURL === null) {
            htmlCode += `<img class="js__favshow--img"src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" title="${favSeries[i].show.name}" alt="${favSeries[i].show.name} cover not available"/>`;
        } else {
            htmlCode += `<img src="${imgURL.medium}" alt="Show image" ${favSeries[i].show.name}" class="js__favshow--img"></img>`;
        }
        htmlCode += `<h5 class="js__favshow--name">${favSeries[i].show.name}</h5>`;
        htmlCode += '</div>';
        htmlCode += `</li>`;
    }
    favElements.innerHTML = htmlCode;
    setInLocalStorage();
}

// LOCAL STORAGE ----------------------------------------------------------------------
function setInLocalStorage() {
    const stringFavorites = JSON.stringify(favSeries);
    localStorage.setItem('favSeries', stringFavorites);
}

function getFromLocalStorage() {
    const localStorageFavorites = localStorage.getItem('favSeries');
    if (localStorageFavorites === null) {
        getDataFromApi();
    } else {
        const arrayFavSeries = JSON.parse(localStorageFavorites);
        favSeries = arrayFavSeries;

        renderFavs();
    }
}
getFromLocalStorage();


//RESET FAVORITES----------------------------------------------------------------------
const resetBtn = document.querySelector('.js-resetBtn');
const resetFavorites = () => {
    favSeries = [];
    localStorage.removeItem('favSeries');
    renderFavs();
    renderShows();
};

//HANDLE FAVS--------------------------------------------------------------------------
function handleFavs(ev) {
    selectedFavs(ev);
    renderFavs();
    renderShows();
}

resetBtn.addEventListener('click', resetFavorites);
formElement.addEventListener('submit', handleForm);
btnElement.addEventListener('click', handleSearch);


