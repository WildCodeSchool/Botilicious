import React from 'react';
import SelectTag from './SelectTag';


const ulStyle = {
  fontFamily: 'Sniglet cursive',
  border: 'solid black 1px',
  maxWidth: '90%',
  // boxSizing: 'border-box',
  paddingLeft: '0px',
  marginLeft: '0%',
  marginTop: '2%',
};

const eachWordStyle = {
  borderRight: 'solid black 1px',
  borderLeft: 'solid black 1px',
  maxWidth: '90%',
  minWidth: '150px',
  fontWeight: 'normal',
  fontSize: '20px',



};



const Split = props => (
 
  
  //  1 - SPLIT LA PHRASE EN MOTS PUIS REALISE UN MAP SUR CHAQUE MOTS

  //  2 - POUR CHAQUE MOTS LE MAP : CRÉER UN TABLEAU CONTEANT LE MOT EN QUESTION ET 
  //      UN ENSEMBLE DE BOUTON RADIO POUR SELECTIONNER LE TAG SOUHAITÉ 
  //      (cf.composant 'SelectTag')


  <ul style={ulStyle}>
    {
      props.items.toString().split(" ").map((item, index) => {
        //if ((' ', '.', ',', ';', '-').indexOf(item) === -1) {

        if ((' ', '.', ',', ';', '-').indexOf(item) === -1 && item !== '') {
          return <table key={index} >

            <tbody>
              <tr>

                <td style={eachWordStyle}>
                  {item} {/* MOT DE LA PHRASE  */}
                </td>

                <td>

                  {/* AFFICHE LES PROPOSITIONS DE TAG POUR CHAQUE MOT DE LA PHRASE */}
                  <SelectTag  
                    item     = {item} 
                    index    = {index}
                  />

                  {/* On export 'item" et 'index' comme propriété dans le composant 'SelectTag' 
                    cela nous permet de les utiliser dans ce composant -->
                    cf.console.log du 'handleFormSubmit' */}

                </td>

              </tr>
            </tbody>

          </table>
        } else return console.log("ERROR");

      })


    }

  </ul>

);



export default Split;