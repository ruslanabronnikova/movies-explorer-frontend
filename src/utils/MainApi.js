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

  updateUser(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._checkResponse)
  }


  getMovie() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  createMovie() {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
    })
      .then(this._checkResponse)
  } //доделать этот запрос надо добить параметры по которым добавлять фильм

  deleteMovieId(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }
}

const api = new MainApi ({
  url: 'https://api.diplombron.nomoreparties.co',
  headers: {
    authorization: `Bearer ${localStorage.getItem('JWT')}`,
    'Content-Type': 'application/json',
  }
})

export default api;