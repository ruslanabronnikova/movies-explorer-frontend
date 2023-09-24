class MoviesApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getMovies() {
    return fetch(this._url, {
      // Замените _baseUrl на _url
      headers: this._headers,
    }).then((res) => this._checkResponse(res)); // Замените _checkServerResponse на _checkResponse
  }
}

const apiMovie = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    // authorization: `Bearer ${localStorage.getItem('JWT')}`,
    'Content-Type': 'application/json',
  },
});

export default apiMovie;
