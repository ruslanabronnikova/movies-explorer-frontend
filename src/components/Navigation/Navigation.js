import React from 'react';

import './Navigatin.css'

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className='navigation__container'>
        <li className='navigation__name'>
          Фильмы
        </li>
        <li className='navigation__name'>
          Сохранённые фильмы
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;