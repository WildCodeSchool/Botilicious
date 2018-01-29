import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddSentences from './AddSentences';

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
  // Promise.all(
    // [
    //   fetch('http://localhost:3001/admin/message')
    //   .then(res => res.json())
    //   .then(users => {
    //     console.log(users);
    //     return users
    //   }), 
     
    // ] 
  // )

}

  render() {
    return (
      <div className="App">
       
        {/* COMPOSANT QUI PERMET LA SAISIE DE PHRASE DANS UN CHAMPS INPUT */  }
        <AddSentences />

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
