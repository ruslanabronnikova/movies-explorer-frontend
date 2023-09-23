class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  updateUser({name, email}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        email
      })
    })
      .then(this._checkResponse)
  }

  getMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }
  
  createMovie(movieData) {
    console.log(movieData)
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: movieData.country,
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        image: `${"https://api.nomoreparties.co"}${movieData.image.url}`,
        trailerLink: movieData.trailerLink,
        thumbnail: `${"https://api.nomoreparties.co"}${movieData.image.formats.thumbnail.url}` ,
        movieId: movieData.id,
        nameRU: movieData.nameRU || movieData.nameEN,
        nameEN: movieData.nameEN || movieData.nameRU,
      }),
    })
      .then(this._checkResponse)
  }
  

  deleteMovieId(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }
  
}

const api = new MainApi ({
  // url: 'https://api.diplombron.nomoreparties.co',
  url: 'http://localhost:3000',
  headers: {
    authorization: `Bearer ${localStorage.getItem('JWT')}`,
    'Content-Type': 'application/json',
  }
})

export default api;