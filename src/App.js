import React, { useState } from 'react';
import NavApp from './Componentes/ComponentesNavApp/NavApp.jsx';
import './Componentes/styles.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Componentes/Login/Login.jsx';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice.jsx';

function App() {

const user = useSelector(selectUser);

  return (
     <>
     {user ? <NavApp /> :  <Login />}
     </>
  );
}

export default App;