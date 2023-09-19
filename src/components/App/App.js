import React, { useState, useEffect } from 'react';
import {Route, Routes} from "react-router-dom";
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import MoviesCards from '../MoviesCardList/MoviesCards';
import Profile from '../Profile/Profile';
import NotFound from '../NotFoundMistake/NotFound';
import Preloader from '../Preloader/Preloader';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Login from '../Login/Login';
import Register from '../Register/Register';


const App = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
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
    </>
  )
}

export default App;
