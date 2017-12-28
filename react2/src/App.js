import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AddSentences from './AddSentences';
// import TagAllWords from './TagAllWords';
// Composant permettant d'afficher sur la page les phrases saisies sous forme de liste 
import List from './List';
import Split from './Split';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /*  INTERVIENT DANS LA COMMUNICATION ENTRE LES 2 SERVEURS
          Setting an initial state at the top: an empty users array will prevent 
          the this.state.users.map from blowing up before the users are loaded. */
      users: [],

    };
  }

  // PERMET LA COMUNICATION ENTRE LES DEUX SERVEURS (react et express)
  componentDidMount() {
    fetch('http://localhost:3001/admin/message')
      .then(res => res.json())
      .then(users => {
        console.log(users);
        this.setState({ users })
      })
  }

  // Lors de la soumission, affiche la phrase saisie sous forme 
  // de liste sous le champs input
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      term: '',
      items: [...this.state.items, this.state.term],
      split: [...this.state.items.toString().split(" ")],
    });
    console.log("toto");
    console.log("this.state.items : ", this.state.items)
    console.log("term : ", this.state.term)

    console.log("toString : ", this.state.items.toString().split(" "))

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
