// import React from 'react';
import React, { Component } from 'react';

const axios = require('axios');


class SelectTag extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: 'null',
            tags: [],
            keywords: [],
        };
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        })
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

    handleFormSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();

        // Affiche le tag séléctionné pour chaque mot de la phrase 
        console.log('For the word : "' + this.props.item + '" You have selected the tag : ', this.state.selectedOption);

        // Affiche l'index correspondant à chaque mots de la phrase 
        console.log('index of : "' + this.props.item + '" is : ' + this.props.index);

        //var self = this;
        fetch('http://localhost:3001/admin/keyword', {
            method: 'POST',
            data: {
                text: 'TOTO',
                TagId: 1,
                // name: this.state.selectedOption

            }
        })
            // .then(function (response) {
            //     return response.json()
            // })
            .then(function (data) {
                console.log('BOB : ', data, ' BOB');
            });




    }


    render() {
        return (


            <div className='listTag'>

                <form onSubmit={this.handleFormSubmit}>
                    <label>
                        <input type="radio" value="weather" checked={this.state.selectedOption === 'weather'} onChange={this.handleOptionChange} />
                        Weather
                </label>

                    <label>
                        <input type="radio" value="city" checked={this.state.selectedOption === 'city'} onChange={this.handleOptionChange} />
                        City
                </label>

                    <label>
                        <input type="radio" value="null" checked={this.props.tags} onChange={this.handleOptionChange} />
                        Null
                </label>

                    <button type="submit">Save</button>
                </form>
            </div>



        );
    }

}




export default SelectTag;