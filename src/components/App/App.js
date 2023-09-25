import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

//Все роуты
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import MoviesCards from '../MoviesCards/MoviesCards';
import Profile from '../Profile/Profile';
import NotFound from '../NotFoundMistake/NotFound';
import Preloader from '../Preloader/Preloader';

// Все что связано с авторизацией и регистрацией
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Login from '../Login/Login';
import Register from '../Register/Register';
import api from '../../utils/MainApi';
import apiMovie from '../../utils/MoviesApi';
import * as auth from '../../utils/AuthApi';
import InfoTooltip from '../InfoToolTip/InfoTooltip';

import { UserProvider } from '../../contexts/UserProvider';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('JWT'));
  const [allMovies, setAllMovies] = useState([]);
  const [isSavedReceived, setIsSavedReceived] = useState(false); 

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: '', // Имя пользователя
    email: '', // Email пользователя
  });

  // Функция для обновления данных текущего пользователя
  const updateCurrentUser = (newUserData) => {
    setCurrentUser(newUserData);
  };

  const navigate = useNavigate();
  const [infoPopupCheckOpen, setInfoPopupCheckOpen] = useState(false);
  const [infoPopupCheck, setInfoPopupCheck] = useState(false);

  React.useEffect(() => {
    setIsLoading(localStorage.getItem('JWT'));
  }, []);

  function closeAllPopups() {
    setInfoPopupCheckOpen(false);
  }

  function handleReg({ name, email, password }) {
    debugger
    auth.register(name, email, password).then((data) => {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      // Обновите данные о текущем пользователе и передайте их через контекст
      updateCurrentUser(data);
      // После регистрации выполните авторизацию
      auth
        .login(email, password)
        .then((loginData) => {
          if (loginData.JWT) {
            localStorage.setItem('JWT', loginData.JWT);
            setIsLoggedIn(true);
            navigate('/movies');
          }
        })
        .catch((error) => {
          setInfoPopupCheck(false);
          setInfoPopupCheckOpen(true);
          console.error('Произошла ошибка при регистрации', error)
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  }

  function handleLog({ email, password }) {
    auth
      .login(email, password)
      .then((data) => {
        if (data.JWT) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('JWT', data.JWT);
          setIsLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((error) => {
        setInfoPopupCheck(false);
        setInfoPopupCheckOpen(true);
        console.error('Произошла ошибка при входе', error);
      })
      .finally(() => {
        setIsSubmitting(false); // Устанавливаем состояние отправки в false после завершения запроса
        setIsLoading(false);
      });
  }

  function checkToken() {
    const token = localStorage.getItem('JWT');
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
        })
        .catch((error) => {
          console.error('Произошла ошибка при проверке токена', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function getSavedMovies() {
    let savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    if (!savedMovies && !isSavedReceived) {
      api
        .getMovies()
        .then((data) => {
          setIsSavedReceived(true);
          savedMovies = data;
        })
        .catch((error) => {
          console.error('Ошибка при получении фильмов:', error);
        });
    }
    return Promise.resolve(savedMovies);
  }

  function getAllMovies() {
    let movies = allMovies;
    if (allMovies.length === 0) {
      apiMovie
        .getMovies()
        .then((data) => {
          movies = data;
          setAllMovies(data);
        })
        .catch((error) => {
          console.error('Ошибка при получении фильмов:', error);
        });
    }
    return Promise.resolve(movies);
  }

  function handleLogout() {
    // Очистка данных из локального хранилища и сброс состояния
    localStorage.removeItem('JWT');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setCurrentUser({
      name: '',
      email: '',
    });
    navigate('/'); // Перенаправление на главную страницу после выхода
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <UserProvider>
        {isLoading ? (
          <Preloader />
        ) : (
          <Routes>
            <Route path={'/'} element={<Main />} />

            {/* Добавляем проверку на isLoggedIn перед роутами для страниц регистрации и входа */}
            {isLoggedIn ? (
              <>
                <Route path="/signin" element={<Navigate to="/movies" />} />
                <Route path="/signup" element={<Navigate to="/movies" />} />
              </>
            ) : (
              <>
                <Route path="/signin" element={<Login onLog={handleLog} />} />
                <Route path="/signup" element={<Register onReg={handleReg} />} />
              </>
            )}

            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={MoviesCards}
                  isLoggedIn={isLoggedIn}
                  getSavedMovies={getSavedMovies}
                  getAllMovies={getAllMovies}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn} getSavedMovies={getSavedMovies} />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={(props) => <Profile {...props} handleLogout={handleLogout} />}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route path={'*'} element={<NotFound />} />
          </Routes>
        )}
        <InfoTooltip
          isOpen={infoPopupCheckOpen}
          onClose={closeAllPopups}
          onStatus={infoPopupCheck}
        />
      </UserProvider>
    </>
  );
};

export default App;
