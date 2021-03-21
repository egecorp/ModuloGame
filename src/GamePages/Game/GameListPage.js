import React from 'react'


export default class GameListPage extends React.Component {
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
                  Список игр
              </div>
          );
      
    }
  }
  
  