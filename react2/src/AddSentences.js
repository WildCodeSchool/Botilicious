import React, { Component } from 'react';

import List from './List';
import Split from './Split';


class AddSentences extends Component {

    constructor(props) {
        super(props);

        this.state = {

            // Valeur de départ permettant l'ajout de phrases et le stockage de celles ci 
            //sous forme de liste 
            term: '',   //   term to store what we passing as a value to our input
            items: [],  //   items to store every value which we passing to our todo list
        };
    }


    // Stocke la valeur saisie par l'utilisateur dans 'term'
    onChange = (event) => {
        this.setState({ term: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            term: '',
            items: [...this.state.items, this.state.term],
        });
    }

    render() {
        return (
            <div>
                
                {/* FORMULAIRE POUR LA SAISIE DE PHRASES */}
                
                <form className="App" onSubmit={this.onSubmit}>
                    <input value={this.state.term} onChange={this.onChange} />
                    <button>Submit</button>
                </form>

                {/* AFFICHE LES PHRASES SAISIES SOUS FORME DE LISTE */}
                
                <List items={this.state.items} />

                {/* 1- DIVISE LES PHRASES EN MOTS
                    2- AFFICHE LA LISTE DES MOTS ET UNE LISTE DE TAG POUR CHAQU'UN D'EUX  */}
                <Split items={this.state.items} />

            </div>
        );
    }

}


export default AddSentences;