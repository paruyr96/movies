const film = document.getElementById('film');
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const API_KEY = "9b702a6b89b0278738dab62417267c49";
const img_url = "https://image.tmdb.org/t/p/w500";

function printSingle() {
  if (!movieId) {
    film.innerHTML = `
      <h1>No Movie Selected</h1>
      <a href="index.html" class="back-btn">← Back to Movies</a>
    `;
    return;
  }

  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
    .then((res) => {
      if (!res.ok) throw new Error("Movie dynamic details failed to load.");
      return res.json();
    })
    .then((movie) => {
      const poster = movie.poster_path 
        ? `${img_url}${movie.poster_path}` 
        : 'https://via.placeholder.com/500x750?text=No+Poster';

      film.innerHTML = `
        <a href="index.html" class="back-btn">← Back to Movies</a>
        
        <div class="movie-details">
          <img class="movie-poster" src="${poster}" alt="${movie.title}">
          
          <div class="movie-info">
            <h1>${movie.title}</h1>
            ${movie.tagline ? `<p class="tagline">"${movie.tagline}"</p>` : ''}
            
            <div class="meta-group">
              <span class="badge">Status: ${movie.status}</span>
              <span class="badge">Release: ${movie.release_date}</span>
              <span class="badge">Rating: ⭐ ${movie.vote_average.toFixed(1)}</span>
            </div>

            <h3 class="overview-title">Overview</h3>
            <p class="overview">${movie.overview || "No overview available."}</p>
          </div>
        </div>
      `;
    })
    .catch((error) => {
      film.innerHTML = `
        <a href="index.html" class="back-btn">← Back to Movies</a>
        <p>Error: ${error.message}</p>
      `;
    });
}

printSingle();
