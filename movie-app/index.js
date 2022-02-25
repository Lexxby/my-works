const API_KEY = '4deecd2da6e7027609242cf48e363abf';
const URL_VIDE_DB = 'https://api.themoviedb.org/3/discover/movie';
const IMG_URL = 'http://image.tmdb.org/t/p/w300/';
let lang = 'ru';
let url = `${URL_VIDE_DB}?api_key=${API_KEY}&language=${lang}`;
const container = document.querySelector('.container');

document.querySelector('input').addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
    event.preventDefault();
  }
  if (event.target.value === '') {
    url = `${URL_VIDE_DB}?api_key=${API_KEY}&language=${lang}`;
  } else {
    url = `https://api.themoviedb.org/3/search/movie?api_key=4deecd2da6e7027609242cf48e363abf&language=ru&query=${event.target.value}`;
  }
  container.innerHTML = '';
  getData();
});

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  showData(data);
}
getData();

function showData(data) {
  if (data.results.length > 0) {
    data.results
      .filter((data) => data.poster_path)
      .map((data) => {
        const movie = document.createElement('div');
        movie.classList.add('movie');

        const movieImg = document.createElement('div');
        movieImg.classList.add('movieImg');

        const img = document.createElement('img');
        img.src = IMG_URL + data.poster_path;

        const rating = document.createElement('span');
        rating.classList.add('rating');
        if (data.vote_average < 5) {
          rating.classList.add('red');
        } else if (data.vote_average >= 5 && data.vote_average < 8) {
          rating.classList.add('orange');
        } else if (data.vote_average >= 8) {
          rating.classList.add('green');
        }
        rating.textContent = data.vote_average;

        const movieTitle = document.createElement('h3');
        movieTitle.textContent = data.title;

        const movieDescription = document.createElement('div');
        movieDescription.classList.add('movie-description');
        movieDescription.textContent = data.overview;

        const releaseDate = document.createElement('div');
        releaseDate.classList.add('release-date');
        releaseDate.textContent = `Дата выхода: ${data.release_date}`;

        movieImg.append(img);
        movie.append(movieImg);
        movie.append(movieTitle);
        movie.append(movieDescription);
        movieDescription.prepend(releaseDate);
        movie.append(rating);
        container.append(movie);
      });
  } else {
    const loading = document.createElement('h1');
    loading.textContent = 'Ничего не нашли....';
    container.append(loading);
  }
}
