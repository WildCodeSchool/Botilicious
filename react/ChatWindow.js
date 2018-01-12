import React, { Component } from 'react';

const axios = require('axios');

// definit l'affichage des vignettes de meesage une fois envoyés
class ChatMessage extends Component {
    render() {
        return (
            <p style={{
                color: 'white',
                backgroundColor: '#5f4548',
                borderRadius: '5px',
                boxShadow: '0 0 6px #B2B2B2',
                display: 'inline-block',
                padding: '10px 18px',
                position: 'relative',
                verticalAlign: 'top',
                marginBottom: '0'
            }}>{this.props.message}
            </p>
        );
    }
};


// definit l'affichage de l'ensemble de l'historique
class ChatMessageHistory extends Component {
    render() {
        var createMessage = function (message, index) {

            // Détermine le style de la liste des messages envoyés
            var liStyles = {
                backgroundColor: '#E2E2E4',
                padding: '1rem',
            };

            return <li style={liStyles}><ChatMessage message={message.message} /></li>
        };

        var ulStyles = {
            listStyle: 'none',
            margin: 0,
            padding: 0,

        };

        return <ul style={ulStyles}>{this.props.messages.map(createMessage)}</ul>;
    }
};


// Englobe l'ensemble des éléments de la fenêtre de chat
class ChatWindow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [{message: 'BONJOUR'}],
            inputText: '',
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var nextMessages = this.state.messages.concat([{ message: this.state.inputText }]);


        this.setState({ messages: nextMessages} );
        console.log(this.state.inputText);
        axios.post('http://localhost:3001/admin/message', {
            message: this.state.inputText



        }).then((response => {
            console.log(response)
            var nextInputText = '';
            this.setState({inputText: ''})
            this.setState({messages: this.state.messages.concat([{ message: response.data.answer }]) });
            console.log(this.state)
        }))
    }

    onChange = (e) => {
        this.setState({
            inputText: e.target.value,
         });

    }



    /** Fonction permettant le scroll down de la fenêtre du chat
     *  à chaque fois qu'un nouveau message est envoyé
     *  La méthode scrollIntoView fait défiler la page de manière à rendre la div vide visible.*/
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {


        var windowStyles = {
            maxHeight: '40em',
            maxWidth: '40em',
            margin: '1rem auto',
            overflowY: 'scroll',
        };

        var formStyles = {
            display: 'flex',
            margin: '1rem auto',
            maxWidth: '40em'
        };

        var inputStyles = {
            height: '30px',
            width: '270px',
            flex: '1 auto',
            boxSizing: 'border-box',
        };

        var btnStyles = {
            color: 'white',
            backgroundColor: '#5f4548',
            border: 'none',
            width: '150px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 'bold',
            fontSize: '0.8em'
        };

        return (
            <div>
                <div id="box">
                    <div style={windowStyles}>
                        <ChatMessageHistory messages={this.state.messages} />

                    </div>
                </div>

                {/* ZONE DE SAISIE DU MESSAGE  */}

                <form style={formStyles} onSubmit={this.handleSubmit}>
                    <input style={inputStyles} type="text" onChange={this.onChange} value={this.state.inputText} />
                    <button style={btnStyles}>Send</button>
                </form>
                {   /* Div vide en bas de la fenêtre de chat
            --> permet de déclencher le scroll down à chaque évenement */ }
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>

            </div>
        );
    }
};

export default ChatWindow;
