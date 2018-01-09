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

    componentDidMount = () => {
        
        //  obtenir la liste des tags
        fetch('http://localhost:3001/admin/tag')
            // .then(res => res.json())
            .then(tags => {
                console.log('tags is : ', tags);
                this.setState({tags: tags});
                
                
                return tags
            })
            // .then(resultat => {console.log(resultat[1].body);
            //     this.setState({users:resultat[0]});
            //     this.setState({html:resultat[1]})
            
            //   })
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