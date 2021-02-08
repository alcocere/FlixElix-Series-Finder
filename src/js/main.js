'use strict';
//HTML elements
const searchInput = document.querySelector('.js-search');

// Array que se llenara una vez que la api regrese los datos buscados
let series = [];

//API TVMaze
function getDataFromApi() {
    fetch(`http://api.tvmaze.com/search/shows?q=${'show'}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            series = data;
        });
}
getDataFromApi();

