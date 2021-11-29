
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';
import Main from './Components/Main';
import Header from './Components/Header';
import { titleContext } from './Contexts/titleContext';


const App =() => {

  const [title, setTitle] = useState("Aeropuertos");
  const titleData = {
    title: title,
    setTitle: setTitle
  }

  return (
    <>
      <BrowserRouter>
      <titleContext.Provider value={titleData}>
        <Header />
        <Main />
      </titleContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
