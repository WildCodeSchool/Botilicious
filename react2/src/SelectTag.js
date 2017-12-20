// import React from 'react';
import React, { Component } from 'react';

class SelectTag extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: 'option 1',

        };
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        })
    }

    // onChange = (event) => {
    //     this.setState({ tag: event.target.value });
    // }

    // Lors de la soumission, affiche la phrase saisie sous forme 
    // de liste sous le champs input


    handleFormSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();

        console.log('You have selected:', this.state.selectedOption);
    }


    // onSubmit = (event) => {
    //     event.preventDefault();
    //     this.setState({
    //         tag: [...this.state.tag],
    //     });
    //     console.log("toto");
    //     console.log("this.state.items : ", this.state.items)
    //     console.log("term : ", this.state.term)
    //     //alert(typeof this.state.items);
    //     console.log("toString : ", this.state.items.toString().split(" "))

    // }


    render() {
        return (

            <form onSubmit={this.handleFormSubmit}>
              
                <button type="button" value="option 1" onClick={this.state.selectedOption === 'option 1'} onChange={this.handleOptionChange}></button>
                 
                <button type="button" value="option 2" onClick={this.state.selectedOption === 'option 2'} onChange={this.handleOptionChange}></button>
                       
                
                   
                <button type="button" value="option 3" onClick={this.state.selectedOption === 'option 3'} onChange={this.handleOptionChange}></button>

                    
               
                <button type="submit">Save</button>
            </form>







            /* // <div onChange={this.state.value} name="taglist" form="tagform">
            //     <button onClick={this.state.value} id="1" value="city">City</button>
            //     <button value="country">Country</button>
            //     <button value="weather">Weathe</button>
            //     <button value="temperature">Temperature</button>
            // </div> */



            /* COMPOSANT QUI PERMET L'AFFICHAGE DES PHRASES SOUS FORME DE LISTE EN DESSOUS DU INPUT */
            /* <List items={this.state.items} /> */


            /* <Split items={this.state.items.toString().split(" ")} /> */
        );
    }

}




// const SelectTag = props => (

//      <select value ={this.state.tag} name="taglist" form="tagform">
//          <option value="city">City</option>
//          <option value="country">Country</option>
//          <option value="weather">Weather</option>
//          <option value="temperature">Temperature</option>
//      </select>

// )





export default SelectTag;