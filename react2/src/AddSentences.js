import React, { Component } from 'react';

import List from './List';
import Split from './Split';
import SelectTag from './SelectTag';

const axios = require('axios');

class AddSentences extends Component {

    constructor(props) {
        super(props);

        this.state = {

            // Valeur de départ permettant l'ajout de phrases et le stockage de celles ci 
            //sous forme de liste 
            term: '',   //   term to store what we passing as a value to our input
            items: [],  //   items to store every value which we passing to our todo list
            tags: [],
            keywords: [],
        };
    }


    // Stocke la valeur saisie par l'utilisateur dans 'term'
    onChange = (event) => {
        this.setState({ term: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            term: '',
            items: [...this.state.items, this.state.term],
            visible: true,  /*  ici this.state.visible sera egal à true 
                                uniquement lorsqu'une phrase aura été soumise */
        });
    }
    componentDidMount = () => {
        //  obtenir le contenu de la table tags
       
        Promise.all([
            axios.get('http://localhost:3001/admin/tag'),
            axios.get('http://localhost:3001/admin/keyword')
        ]) 
        
    //  {
    //         mode: 'no-cors'
    //     })
            // .then(res => {
            //     console.log(res);
            //     res.json()
            // })

            // results : reponse requètes axios : renvoie un tableau avec les tags (results[0]) 
            // puis les keywords (results[1])
            .then(results => {
                
                this.setState({ 
                    tags: results[0],
                    keywords: results[1] });
                console.log('tags is : ', this.state.tags, 'keywords is : ', this.state.keywords);

                return results
            })
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

                <List items={this.state.items}/>

                {/* APPEL LA VARIABLE SPLIT (cf. render ci dessus)
                    CELLE CI CONTIENT LE COMPOSANT <Split /> */}
                {split}

            </div>
        );
    }

}


export default AddSentences;