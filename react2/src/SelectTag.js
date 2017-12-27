// import React from 'react';
import React, { Component } from 'react';

class SelectTag extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: 'option1',
        };
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        })
    }


    handleFormSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();

        console.log('You have selected:', this.state.selectedOption);
    }

    render() {
        return (

            <form onSubmit={this.handleFormSubmit}>

                <label>
                    <input type="radio" value="weather" checked={this.state.selectedOption === 'weather'} onChange={this.handleOptionChange} /> 
                    Weather
                </label>

                <label>
                  <input type="radio" value="city" checked={this.state.selectedOption === 'city'} onChange={this.handleOptionChange}/>
                  City
                </label>

                <label>
                  <input type="radio" value="null" checked={this.state.selectedOption === 'null'} onChange={this.handleOptionChange}/>
                  Null
                </label>

                <button type="submit">Save</button>

            </form>

        );
    }

}

export default SelectTag;