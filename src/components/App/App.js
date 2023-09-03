import React, { useState, useEffect } from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import './App.css'

const App = () => {

  return (
    <div className='page'>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App