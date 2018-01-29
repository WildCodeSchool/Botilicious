import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ChatWindow from './ChatWindow';
import registerServiceWorker from './registerServiceWorker';

// AFFICHAGE DE LA FENÊTRE DE CHAT : fichier ChatWindow.js
if(document.getElementById('example')){
  ReactDOM.render(<ChatWindow />,document.getElementById('example'));
}

// AFFICHAGE DES COMPOSANTS POUR L'AJOT DE PHRASES ET LE TAG DE MOTS : fichier App.js
if(document.getElementById('test')){
  ReactDOM.render(<App />, document.getElementById('test'));
}
