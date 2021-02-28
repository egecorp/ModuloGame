import React from 'react'


export default class GameStartUserPage extends React.Component {
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
                  Выберите пользователя
              </div>
          );
      
    }
  }
  
  