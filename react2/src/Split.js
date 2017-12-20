import React from 'react';
import SelectTag from './SelectTag';


const Split = props => (

  <ul>
    {
      props.items.map((item, index, bouleen) => 
      
      <li key={index}>
      
        {item}
        
        <SelectTag />

      </li>)
    }

    
  </ul>

  // <ul>
  //   {

  //     props.items.toString().split(" ")
  //     //props.items.split("")
  //     //props.items.map(word => word.split().map((f) => <li>{f}</li>) )

  //     // let output = sentences.map(e => e.split(' ').map(f => <span style= {style}> {f} </span>));
  //   }
  // </ul>

);

console.log(Split.props);


export default Split;