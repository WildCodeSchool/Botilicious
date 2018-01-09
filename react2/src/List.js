import React, { Component } from 'react';


let listStyle = {
  listStyleType: 'none',
}


 

class List extends Component { 

  render() {
    return (
      <ul style={listStyle}>
        {
          this.props.items.map((item, index) => <li key={index}>{item}</li>)


        }
      </ul>
    )
  }
}

export default List;