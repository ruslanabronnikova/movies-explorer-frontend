import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import MoviesCards from '../MoviesCardList/MoviesCards';
import Profile from '../Profile/Profile';
import NotFound from '../NotFoundMistake/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Preloader from '../Preloader/Preloader';
import './App.css';

const App = () => {

  const [isLoading, setIsLoading] = React.useState(true); // Создайте состояние isLoading

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <section className="promo">
      {isLoading ? (
        <Preloader />
      ) : (
        <Routes>
          <Route path={'/'} element={<Main />} />
          <Route path={'/movies'} element={<MoviesCards />} />
          <Route path={'/saved-movies'} element={<SavedMovies />} />
          <Route path={'/profile'} element={<Profile />} />
          <Route path={'*'} element={<NotFound />} />
          <Route path={'/signin'} element={<Login />} />
          <Route path={'/signup'} element={<Register />} />
        </Routes>
      )}
    </section>
  )
}

export default App;
