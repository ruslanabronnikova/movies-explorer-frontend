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

  const [currentUser, setCurrentUser] = useState({
    name: '', // Имя пользователя
    email: '', // Email пользователя
  });

  // Функция для обновления данных текущего пользователя
  const updateCurrentUser = (newUserData) => {
    setCurrentUser(newUserData);
  };

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
      .then((data) => {
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        // Обновите данные о текущем пользователе и передайте их через контекст
        updateCurrentUser(data);
        // После регистрации выполните авторизацию
        auth.login(email, password)
          .then((loginData) => {
            if (loginData.JWT) {
              localStorage.setItem('JWT', loginData.JWT);
              setIsLoggedIn(true);
              navigate('/movies');
            }
          })
          .catch(() => {
            setInfoPopupCheck(false);
            setInfoPopupCheckOpen(true);
          });
      })
      .catch(() => {
        setInfoPopupCheck(false);
        setInfoPopupCheckOpen(true);
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
              element={isLoggedIn ? <Profile currentUser={currentUser} isLoggedIn={isLoggedIn} /> : <Navigate to="/" />}
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
