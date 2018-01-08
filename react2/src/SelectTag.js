// import React from 'react';
import React, { Component } from 'react';

class SelectTag extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: 'null',
        };
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        })
    }


    handleFormSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();

        // Affiche le tag séléctionné pour chaque mot de la phrase 
        console.log('For the word : "' + this.props.item + '" You have selected the tag : ', this.state.selectedOption);
        
        // Affiche l'index correspondant à chaque mots de la phrase 
        console.log('index of : "' + this.props.item + '" is : ' + this.props.index);
    
        //var self = this;
        fetch('http://localhost:3001/admin/tag', {
            method: 'POST',
            data: {
                text: 'TOTO',
                // name: this.state.selectedOption
                
            }
        })
            // .then(function (response) {
            //     return response.json()
            // })
            .then(function (data) {
                console.log('BOB : ' + data + ' BOB') ;
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
                    <input type="radio" value="null" checked={this.state.selectedOption === 'null'} onChange={this.handleOptionChange} />
                    Null
                </label>

                <button type="submit">Save</button>
            </form>
        </div>



        );
    }

}




export default SelectTag;