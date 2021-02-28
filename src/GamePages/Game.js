import React from 'react'

import PageHolder from './PageHolder.js'


export default class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          currentPage: 'Hello'
          
      };
      this.handleChangePage = this.handleChangePage.bind(this);

    }
  
    Pages = [   'Hello', 
                'SignIn', 
                'SignIn:Anonim', 
                'SignIn:SignIn', 
                'SignIn:SignIn:EnterCode',
                'SignIn:SignIn:FailCode',
                'SignIn:SignUp', 
                'SignIn:SignUp:AlreadyExists', 
                'SignIn:SignUp:Success', 
                'Game:GameList', 
                'Game:GameStart', 
                'Game:FindRandom', 
                'Game:FindBot', 
                'Game:FindUser', 
                'Settings:Settings', 
                'Settings:Avatar', 
                'ConditionPage'];
    
    handleChangePage(event) {
        this.setState(state => ({
            currentPage: event.target.value
        }));
      }

    render() {

        return ( 
        <div className='Game'> 
            <PageHolder currentPage={this.state.currentPage}></PageHolder>
            <div className="AdHolder"> 
                <select onChange={this.handleChangePage}>
                    {this.Pages.map(x=> <option key={x} value={x}>{x}</option>)}
                </select>
            </div>
        </div>
        );
      
    }
  }
  
  