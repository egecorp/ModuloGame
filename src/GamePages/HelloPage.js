import React from 'react'


export default class HelloPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          currentLogin: 'Hello', 
          currentToken: 'Token',
      };
    }
  
    render() {
        
       
      
          return (
              <div>
                  Hello Modulo world
              </div>
          );
      
    }
  }
  
  