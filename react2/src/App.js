import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AddSentences from './AddSentences';

// Composant permettant d'afficher sur la page les phrases saisies sous forme de liste 
// import List from './List';
// import Split from './Split';

// var __html = require('../../views/chatbot/chatbotEdit.pug');
// var pug = { __html: __html };

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /*  INTERVIENT DANS LA COMMUNICATION ENTRE LES 2 SERVEURS
          Setting an initial state at the top: an empty users array will prevent 
          the this.state.users.map from blowing up before the users are loaded. */
      users: [],
      html: "",

    };
  }

  // PERMET LA COMUNICATION ENTRE LES DEUX SERVEURS (react et express)
  componentDidMount() {
  Promise.all(
    [
      fetch('http://localhost:3001/admin/message')
      .then(res => res.json())
      .then(users => {
        console.log(users);
        return users
      }), 
      fetch('http://localhost:3001/admin/chatbotEdit')
      // .then(res => res.json())
      .then(users => {
        console.log(users);
        return users.text()
      })
    ] 
  )
  .then(resultat => {console.log(resultat[1].body);
    this.setState({users:resultat[0]});
    this.setState({html:resultat[1]})

  })
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        {/* COMPOSANT QUI PERMET LA SAISIE DE PHRASE DANS UN CHAMPS INPUT */  }
        <AddSentences />

        <div dangerouslySetInnerHTML={{__html:this.state.html}} />
        {/* <TagAllWords /> */}

        
        {/* COMPOSANT QUI PERMET L'AFFICHAGE DES PHRASES SOUS FORME DE LISTE EN DESSOUS DU INPUT */}
        {/* <List items={this.state.items} /> */}

        {/* COMPOSANT QUI PERMET DE SPLITTER LA PHRASE ET D'AFFICHER CHACUN DES MOTS EN DESSOUS */}
        {/* <Split items={this.state.items.toString().split(" ")} /> */}


        {/* A VOIR SI JE PEUX RETIRER LES LIGNES CI DESSOUS : je ne sais pas 
        si la cohabitation des deux serveurs fonctionnera toujours */}
        {/* <div>{this.state.users[0].id}</div> */}
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }
}

export default App;
