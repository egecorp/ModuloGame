import React from 'react'


export default class GameStartRandomPage extends React.Component {
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
                  Идёт поиск игрока
              </div>
          );
      
    }
  }
  
  