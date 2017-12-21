import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ChatWindow from './ChatWindow';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();

// AFFICHAGE DE LA FENÊTRE DE CHAT : fichier ChatWindow.js
ReactDOM.render(<ChatWindow />,document.getElementById('example'));
