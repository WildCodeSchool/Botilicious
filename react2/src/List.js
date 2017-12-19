import React from 'react';

const List = props => (
  <ul>
    {
      props.items.map((item, index) => <li key={index}>{item}</li>)
    }
  </ul>

    /*  
    <li key={index}>{item}</li> :   on applique a chaque élément de la liste une KEY 
                                        qui correspond à l'index de cet élément. 
    */
    
    // Keys help React identify which items have changed, are added, or are removed. 
    // Keys should be given to the elements inside the array to give the elements a stable identity
);

export default List;