import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';




import { HelloWorld } from './contracts/helloworld';
import { Identity } from './contracts/identity';
import { sha256, toByteString } from 'scrypt-ts';

// var artifact = require('./artifact/src/contracts/helloworld.json');

var artifact1 = require('./artifact/identity.json');

// HelloWorld.loadArtifact(artifact);

Identity.loadArtifact(artifact1);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

/* <BrowserRouter basename="/admin"> */
<App />,
// </BrowserRouter>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();