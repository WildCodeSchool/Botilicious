import React, { Component } from 'react';


// definit l'affichage des vignettes de meesage une fois envoyés
class ChatMessage extends Component {
    render() {
       return(
          <p style={{
    
            backgroundColor:'rgb(77, 175, 111)',
            borderRadius: '5px',
            boxShadow:'0 0 6px #B2B2B2',
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
       var createMessage = function(message, index) {
          
            // Détermine le style de la liste des messages envoyés
            var liStyles = {
                backgroundColor: '#E2E2E4',
                padding: '1rem',                  
            };
          
          return <li style={liStyles}><ChatMessage message={message.message}  /></li>
       };
          
        var ulStyles = {
            listStyle: 'none',
            margin: 0,
            padding: 0,
           
        };
        
       return <ul style={ulStyles}>{this.props.messages.map(createMessage)}</ul>;
    }
 };   

// MESSAGE AFFICHÉS PAR DEFAUT DANS LE CHAT 
 var MESSAGES = [
    { message: 'Hi Josh'},
    { message: 'How are you?'}                                    
 ];

 

// Englobe l'ensemble des éléments de la fenêtre de chat 
 class ChatWindow extends Component {
    constructor(props){
        super(props);
    
    this.state = {
          messages: MESSAGES,
          inputText: '', 
       }; 
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var nextMessages = this.state.messages.concat([{ message: this.state.inputText, timestamp: 'Thursday' }]);
        var nextInputText = '';
       
        this.setState({ messages: nextMessages, inputText: nextInputText}, );
    }
    
    onChange = (e) => {
       this.setState({inputText: e.target.value});
    }


    
    /** Fonction permettant le scroll down de la fenêtre du chat 
     *  à chaque fois qu'un nouveau message est envoyé  
     *  La méthode scrollIntoView fait défiler la page de manière à rendre la div vide visible.*/
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }
    
    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {

    
       var windowStyles = {  
        maxHeight: '30em',
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
            backgroundColor: 'rgb(77, 175, 111)',
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
       
                {   /* Div vide en bas de la fenêtre de chat 
                    --> permet de déclencher le scroll down à chaque évenement */ }
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div> 
                </div>
            </div>

            {/* ZONE DE SAISIE DU MESSAGE  */}

            <form style={formStyles} onSubmit={this.handleSubmit}>
                <input style={inputStyles} type="text" onChange={this.onChange} value={this.state.inputText} />
                <button style={btnStyles}>Send</button>
            </form>

        </div>
       );
    }
 };

 export default ChatWindow;
 
