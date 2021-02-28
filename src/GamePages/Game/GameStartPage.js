import React from 'react'


export default class GameStartPage extends React.Component {
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
                  Новая игра
              </div>
          );
      
    }
  }
  
  