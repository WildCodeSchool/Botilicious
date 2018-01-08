import React, { Component } from 'react';

import List from './List';
import Split from './Split';
import SelectTag from './SelectTag';


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
        this.setState({ term: event.target.value })
    }

    // allowSubmit = (event) => {
    //     if (this.state.term === '')
    // }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            term: '',
            items: [...this.state.items, this.state.term],
            visible: true,  /*  ici this.state.visible sera egal à true 
                                uniquement lorsqu'une phrase aura été soumise */
        });
      

    }


    render() {
        
    /*  On definit un variable 'split' 
            SI this.state.visible est true 
            ALORS la varaible 'split' affiche le composant < Split/>
            SINON la variable solit n'afiche rien  */

        let split;
        if (this.state.visible) {
            split = <Split items={this.state.items} />;
        } else {
            split = '';
        }

        return (
            <div>

                {/* FORMULAIRE POUR LA SAISIE DE PHRASES */}

                <form className="App" onSubmit={this.onSubmit}>
                    <input value={this.state.term} onChange={this.onChange} />
                    <button >Submit</button>
                </form>

                {/* AFFICHE LES PHRASES SAISIES SOUS FORME DE LISTE */}

                <List items={this.state.items} />

                {/* APPEL LA VARIABLE SPLIT (cf. render ci dessus)
                    CELLE CI CONTIENT LE COMPOSANT <Split /> */}
                { split }

            </div>
        );
    }

}


export default AddSentences;