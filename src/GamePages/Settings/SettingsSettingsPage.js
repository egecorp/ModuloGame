import React from 'react'

import {LanguageContext} from '../../Language/LangPack'


export default class SettingsSettingsPage extends React.Component {
    constructor(props, context) {
      super(props);
      this.state = {
          currentLogin: 'Hello', 
          currentToken: 'Token',

          selectedItem: null,
          checkedItem: null
      };

      //this.changeItemState = this.changeItemState.bind(this);

    }
  
    render() {
       
      
          return (
              <LanguageContext.Consumer>
                {(context) =>
                ( 
                  
                <div className='SignInAnonim'>

                  
                  <div className='SignInNicName'>
                    {context.GetText('signinanonim', 'labelYourNicName')} <span>anonim6045</span>
                  </div>
                    
                  <div className='SignInAnonimImage'>
                    <img src="/img/avatar/1/boy.1.png" alt="Anonim"></img>
                  </div>

                  <div className="SignInAnonimTip" >
                    {context.GetText('signinanonim', 'tipCannotChooseImg')}
                  </div>

                  <div className="SignInAnonimSignUp" >
                    {context.GetText('signinanonim', 'linkGoToSignUp')}
                  </div>

                  <div className="SignInAnonimTipCondition" >
                  {context.GetText('signinanonim', 'tipCondition')}
                  </div>
                 

                  <div  className="NextButtonArea">
                    <button>{context.GetText('signinanonim', 'continueButton')}</button>
                  </div>
                </div>
                )}
              </LanguageContext.Consumer>
          );
      
    }
  }
  SettingsSettingsPage.contextType = LanguageContext;
  
  