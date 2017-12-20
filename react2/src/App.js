import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Composant permettant d'afficher sur la page les phrases saisies sous forme de liste 
import List from './List';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /*  INTERVIENT DANS LA COMMUNICATION ENTRE LES 2 SERVEURS
          Setting an initial state at the top: an empty users array will prevent 
          the this.state.users.map from blowing up before the users are loaded. */
      users: [],

      // Valeur de départ permettant l'ajout de phrases et le stockage de celles ci 
      //sous forme de liste 
      term: '',   //   term to store what we passing as a value to our input
      items: [],   //   items to store every value which we passing to our todo list
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
  ///////// Evenements associés au champs input pour l'ajout de phrases //////////

  // Stocke la valeur saisie par l'utilisateur dans 'term'
  onChange = (event) => {
    this.setState({ term: event.target.value });
  }

  // Lors de la soumission, affiche la phrase saisie sous forme 
  // de liste sous le champs input
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      term: '',
      items: [...this.state.items, this.state.term]
    });
    console.log("toto");
    console.log([this.state.items[0], this.state.items[2]]);
    console.log("items : ", this.state.items)
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

        <form className="App" onSubmit={this.onSubmit}>
          {/* CAHMPS INPUT POUR LA SAISIE DE PHRASES */}
          <input value={this.state.term} onChange={this.onChange} />
          <button>Submit</button>
        </form>

        {/* COMPOSANT QUI PERMET L'AFFICHAGE DES PHRASES SOUS FORME DE LISTE EN DESSOUS DU INPUT */}
        <List items={this.state.items} />

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
