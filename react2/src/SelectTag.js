// import React from 'react';
import React, { Component } from 'react';
import { log } from 'util';

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

    handleOptionSelect = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value,
        });
        console.log('OPTION = ', this.state.selectedOption, 'EVENT = ', changeEvent.target.value);

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
            // .then(results => 
                
                // this.setState({ 
                //     tags: results[0].data.Tags,
                //     keywords: results[1].data.Keywords }));
            .then(results => {
                
                this.setState({ 
                    tags: results[0].data.Tags,
                    keywords: results[1].data.Keywords });
                console.log('tags is : ', this.state.tags, 'keywords is : ', this.state.keywords);

                // return results
            })
    }

    handleFormSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();

        // Affiche le tag séléctionné pour chaque mot de la phrase 
        console.log('For the word : "' + this.props.item + '" You have selected the tag : ', this.state.selectedOption);

        // Affiche l'index correspondant à chaque mots de la phrase 
        console.log('index of : "' + this.props.item + '" is : ' + this.props.index);


        //var self = this;
       let myTag = this.state.tags.find(element => element.text == this.state.selectedOption).id;
       console.log(myTag);
        axios.post('http://localhost:3001/admin/keyword', {
                keywords:[
                    { 
                text: this.props.item,
                // tag: this.state.selectedOption,
                TagId: myTag
                    }
                ]
                // name: this.state.selectedOption
                // { keywords : [ {text:'test1', TagId:1}, {text:'toto1', TagId:2} ] }

            
        })
            // .then(function (response) {
            //     return response.json()
            // })
            .then(function (data) {
                console.log('BOB : ', data, ' BOB');
            });




    }
    // myclick = () => {
    //     console.log(this.state.tags[0].text);
    // }


    render() {
        return (


            <div className='listTag'>
            {/* <button onClick={this.myclick}>Click</button> */}
                <form onSubmit={this.handleFormSubmit}>

                {this.state.tags.map((tag, i) =>  
                    <label 
                    key =   {tag.id}>

                        <input 
                            key     =   {tag.id} 
                            type    =   "radio" 
                            value   =   {tag.text} 
                            checked =   {this.state.selectedOption === tag.text} 
                            onChange=   {this.handleOptionSelect} />
                    
                    {tag.text}
                    </label>)}

                <label>
                    <input key='null' type="radio" value='null' checked={this.state.selectedOption == 'null'} onChange={this.handleOptionSelect} />
                    Aucun
                </label>
                
                <button type="submit">Save</button>

                </form>
            </div>



        );
    }

}




export default SelectTag;