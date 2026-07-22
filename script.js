const API_KEY = "9b702a6b89b0278738dab62417267c49";
const root = document.getElementById("root");
const img_url = "https://image.tmdb.org/t/p/w500";

function printMovies() {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch movies");
      return res.json();
    })
    .then((data) => {
      const cardsHtml = data.results.map((movie) => {
        const poster = movie.poster_path 
          ? `${img_url}${movie.poster_path}` 
          : 'https://via.placeholder.com/500x750?text=No+Poster';

        return `
          <div class="card">
            <a href="single.html?id=${movie.id}">
              <img src="${poster}" alt="${movie.title}">
            </a>
            <h1>${movie.title}</h1>
          </div>
        `;
      }).join('');

      // Wrap inside .movie-grid wrapper for CSS layout alignment
      root.innerHTML = `
        <h1 class="page-title">Popular Movies</h1>
        <div class="movie-grid">${cardsHtml}</div>
      `;
    })
    .catch((error) => {
      root.innerHTML = `<p style="color: #ef4444; text-align: center;">Error loading movies: ${error.message}</p>`;
    });
}

printMovies();