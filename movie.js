let form = document.querySelector("#movie");
let movieSearchable = document.querySelector('.movies-searchable')
let buttonElement = document.querySelector('#search');
const url = "http://www.omdbapi.com/?i=tt3896198&apikey=45ddf1ee&s=";
const apiKey = "45ddf1ee";

function grabNA(mov) {
  if(mov.Poster !== 'N/A') { return `<p></p>`; }
} 

function movieSection(movies) {
 
  console.log(movies.imdbID);
  return movies.filter(grabNA).map((movie) =>  {
     document.onclick = function (event) {
    
    const target = event.target;
    if(target.tagName.toLowerCase() == 'img'){
     window.open('https://www.imdb.com/title/' + movie.imdbID + '/', '_blank');
    }
    
  }
    return `<div class="movies">
    <p class='click'><i>Click on image to visit on IMDB</i></p>
    <img src=${movie.Poster} />
    <p class="name">${movie.Title}<br>${movie.Year}</p>
    </div>`}).join(''); 
   
}


function createMovieContainer(movies) {
  const movieElement = document.createElement('div');
  movieElement.setAttribute('class', 'movie');
  const movieTemplate = document.createElement('section');
  movieTemplate.setAttribute('class', 'section');
  movieElement.appendChild(movieTemplate);
  movieTemplate.innerHTML = movieSection(movies);
  /*const movieTemplate = `<section class="section">
              ${movieSection(movies)}
              </section>
  `;
  movieElement.innerHtml = movieTemplate;*/
  return movieElement;
}

function renderMoviesSearch(res) {
  movieSearchable.innerHTML = '';
  if (res.Response == "False") alert('Molim vas unesite ispravno ime filma!');
  const movies = res.Search;
  const movieBlock = createMovieContainer(movies);
  movieSearchable.appendChild(movieBlock);
  console.log(res);
}


buttonElement.onclick = function (event) {
  let value = form.value;

  let newUrl = url + value;
  event.preventDefault();
  
  fetch(newUrl)
    .then(res => res.json())
    .then(renderMoviesSearch)
    .catch(e => console.log(e.message))

    form.value = '';
}

