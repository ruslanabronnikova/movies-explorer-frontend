import React from 'react';
import unsuccses from '../../images/unsuccses.svg';
import './InfoTooltip.css'

function InfoTooltip({ isOpen, onClose }) {
  return (
    <div className={`popup ${isOpen ? "popup_opene" : ""}`}>
      <div className="popup__body">
        <img src={unsuccses} alt="Иконка" className='popup__check-img' />
        <p className='popup__check-text'>{'Что-то пошло не так, попробуйте еще раз.'}</p>
        <button type="button"
          className="popup__button popup__button-close animation-button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip