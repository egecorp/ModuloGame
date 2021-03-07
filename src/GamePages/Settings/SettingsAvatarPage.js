import React from 'react'

import {LanguageContext} from '../../Language/LangPack'


export default class SettingsAvatarPage extends React.Component {
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
                  <p className='GeneralSubtitle'>
                    {context.GetText('signinanonim', 'labelYourNicName')} <span>anonim6045</span>
                  </p>
                    
                  <div className='SignInAnonimImage'>
                    <img src="/img/avatar/1/boy.1.png" alt="Anonim"></img>
                  </div>

                  <p className="SignInAnonimTip" >
                    {context.GetText('signinanonim', 'tipCannotChooseImg')}
                  </p>

                  <p className="SignInAnonimSignUp" >
                    {context.GetText('signinanonim', 'linkGoToSignUp')}
                  </p>

                  <p className="SignInAnonimTipCondition" >
                  {context.GetText('signinanonim', 'tipCondition')}
                  </p>
                 

                  <div  className="FooterArea">
                    <button>{context.GetText('signinanonim', 'continueButton')}</button>
                  </div>
                </div>
                )}
              </LanguageContext.Consumer>
          );
      
    }
  }
  SettingsAvatarPage.contextType = LanguageContext;
  
  