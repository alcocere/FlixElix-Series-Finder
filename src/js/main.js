/* eslint-disable indent */
'use strict';

//HTML elements
const formElement = document.querySelector('.js-form');
const searchInput = document.querySelector('.js-search');
const btnElement = document.querySelector('.js-btn');
const showsResult = document.querySelector('.js-tvshows');
const favElements = document.querySelector('.js-list-favorites');

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

//RENDER SHOWS ------------------------------------------------------------------------
function renderShows() {
    const placeholderImg = '//via.placeholder.com/210x295/ffffff/666666/?text=TV';
    let htmlCode = '';
    for (let i = 0; i < series.length; i++) {
        let imgURL = series[i].show.image;
        let idSerie = series[i].show.id;
        let nameSerie = series[i].show.name;
        //agrega la clase de favorito
        isFav(series[i])
            ? htmlCode += `<li class="js__show tvshows tvshows__favorite" id="${idSerie}">`
            : htmlCode += `<li class="js__show tvshows" id="${idSerie}">`;
        htmlCode += '<article>';
        if (imgURL === null) {
            htmlCode += `<img class="tvshows__img"src="${placeholderImg}" title="${nameSerie}" alt="${nameSerie} cover not available"/>`;
        } else {
            htmlCode += `<img src="${imgURL.medium}" alt="Show image" ${nameSerie}" class="tvshows__img"></img>`;
        }
        htmlCode += `<h5 class="tvshows__name">${nameSerie}</h5>`;
        htmlCode += '</article>';
        htmlCode += '</li>';
    }
    showsResult.innerHTML = htmlCode;
    listenFavs();
}

function handleForm(ev) {
    ev.preventDefault();
}
formElement.addEventListener('submit', handleForm);

function handleSearch() {
    getDataFromApi();
}
btnElement.addEventListener('click', handleSearch);

//regresa el ID de la serie
function isFav(serie) {
    return !!favSeries.find(favorite => favorite.show.id === serie.show.id);
}

// FAVS - funcion que regresa la serie clicada --------------------------------------------------------------------------------
const selectedFavs = (ev) => {
    const selectedSerie = parseInt(ev.currentTarget.id);
    //consigue el nombre y id de se series donde se hace click
    let clickedShow = series.find((item) => selectedSerie === item.show.id);
    let isFavorite = favSeries.findIndex((item) => selectedSerie === item.show.id);
    //Revisa si el item ya existe en la lista de favoritos, si es -1 es que no existe
    if (isFavorite === -1) {
        //Agrega al array el item seleccionado
        favSeries.push(clickedShow);
    } else {
        favSeries.splice(isFavorite, 1);
        //quita el item del array
    }
    renderFavs();
    renderShows();
};

//LISTENER
function listenFavs() {
    const selectedSeries = document.querySelectorAll('.js__show');
    for (const eachSerie of selectedSeries) {
        eachSerie.addEventListener('click', handleFavs);
    }
}

//RENDER FAVS--------------------------------------------------------------------------
function renderFavs() {
    if (favSeries.length === 0) {
        favElements.innerHTML = '';
        return;
    }

    const placeholderImg = '//via.placeholder.com/210x295/ffffff/666666/?text=TV';
    let htmlCode = '';
    for (let i = 0; i < favSeries.length; i++) {
        let imgURL = favSeries[i].show.image;
        let idSerie = favSeries[i].show.id;
        let nameSerie = favSeries[i].show.name;
        htmlCode += `<li class="favSection js__show" id="${idSerie}">`;
        htmlCode += '<article>';

        if (imgURL === null) {
            htmlCode += `<img class="favSection__img"src="${placeholderImg}" title="${nameSerie}" alt="${nameSerie} cover not available"/>`;
        } else {
            htmlCode += `<img src="${imgURL.medium}" alt="Show image" ${nameSerie}" class="favSection__img"></img>`;
        }
        htmlCode += `<h5 class="favSection__name">${nameSerie}</h5>`;
        htmlCode += '<button class="favSection__removebtn"><i class="far fa-trash-alt icon"></i></button>';
        htmlCode += '</article>';
        htmlCode += '</li >';
    }
    favElements.innerHTML = htmlCode;
    setInLocalStorage();
    listenFavs();
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
resetBtn.addEventListener('click', resetFavorites);

//HANDLE FAVS--------------------------------------------------------------------------
function handleFavs(ev) {
    selectedFavs(ev);
    renderFavs();
    renderShows();
}