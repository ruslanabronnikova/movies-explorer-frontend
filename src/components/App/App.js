import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

//Все роуты
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import MoviesCards from '../MoviesCardList/MoviesCards';
import Profile from '../Profile/Profile';
import NotFound from '../NotFoundMistake/NotFound';
import Preloader from '../Preloader/Preloader';


// Все что связано с авторизацией и регистрацией 
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Login from '../Login/Login';
import Register from '../Register/Register';
import api from '../../utils/MainApi';
import * as auth from '../../utils/AuthApi'
import InfoTooltip from '../InfoToolTip/InfoTooltip';

import CurrentUserContext from '../../contexts/CurrentUserContext';


const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();
  const [infoPopupCheckOpen, setInfoPopupCheckOpen] = useState(false)
  const [infoPopupCheck, setInfoPopupCheck] = useState(false)

  React.useEffect(() => {
    setIsLoading(false);
  }, []);


  function closeAllPopups() {
    setInfoPopupCheckOpen(false);
  }

  function handleReg({ name, email, password }) {
    auth.register(name, email, password)
      .then(() => {
        // После успешной регистрации, устанавливаем флаг авторизации в localStorage
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        setInfoPopupCheck(false)
        setInfoPopupCheckOpen(true)
      });
  }

  function handleLog({ email, password }) {
    auth.login(email, password)
      .then((data) => {
        debugger
        if (data.JWT) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('JWT', data.JWT);
          setIsLoggedIn(true);
          navigate("/movies");
        }
        console.log(data);
      })
      .catch(() => {
        setInfoPopupCheck(false)
        setInfoPopupCheckOpen(true)
      });
  }

  function checkToken() {
    const token = localStorage.getItem('JWT');
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            navigate("/movies");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    checkToken()
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        {isLoading ? (
          <Preloader />
        ) : (
          <Routes>
            <Route path={'/'} element={<Main />} />

            {/* Используем условия для защиты маршрутов */}
            <Route
              path={'/movies'}
              element={isLoggedIn ? <MoviesCards /> : <Navigate to="/" />}
            />
            <Route
              path={'/saved-movies'}
              element={isLoggedIn ? <SavedMovies /> : <Navigate to="/" />}
            />
            <Route
              path={'/profile'}
              element={isLoggedIn ? <Profile /> : <Navigate to="/" />}
            />

            <Route path={'*'} element={<NotFound />} />
            <Route path={'/signin'} element={<Login onLog={handleLog} />} />
            <Route path={'/signup'} element={<Register onReg={handleReg} />} />
          </Routes>
        )}
        <InfoTooltip isOpen={infoPopupCheckOpen} onClose={closeAllPopups} onStatus={infoPopupCheck} />
      </CurrentUserContext.Provider>
    </>
  )
}

export default App;
