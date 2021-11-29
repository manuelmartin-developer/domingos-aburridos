
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';
import Main from './Components/Main';
import Header from './Components/Header';


const App =() => {

  return (
    <>
      <BrowserRouter>
      <Header />
        <Main />
      </BrowserRouter>
    </>
  );
}

export default App;
