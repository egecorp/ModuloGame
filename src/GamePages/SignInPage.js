import React from 'react'
import SignInLanguagePanel from '../Components/SignInLanguagePanel'
import CheckBox from '../Components/CheckBox';
import {LanguageContext} from '../Language/LangPack'


export default class SignInPage extends React.Component {
    constructor(props, context) {
      super(props);
      this.state = {
          currentLogin: 'Hello', 
          currentToken: 'Token',

          selectedItem: null,
          checkedItem: null,
          tipText: context.GetText('signin', 'typeDefaultTipText')
      };

      this.changeItemState = this.changeItemState.bind(this);
    }
  
    changeItemState(checkBoxName, isSetSelected, isSetChecked)
    {
      this.setState(oldState => ({
        selectedItem: (isSetSelected ? checkBoxName : oldState.selectedItem),
        checkedItem: (isSetChecked ? checkBoxName : oldState.checkedItem)
      }));

      if (isSetSelected)
      {
        switch(checkBoxName)
        {
          case 'anonim':
            this.setState(oldState => ({ tipText: this.context.GetText('signin', 'typeAnonimTipText') }));
            break;
          case 'signup':
            this.setState(oldState => ({ tipText: this.context.GetText('signin', 'typeSignUpTipText') }));
            break;
          case 'signin':
            this.setState(oldState => ({ tipText: this.context.GetText('signin', 'typeSignInTipText') }));
            break;
          default:
            this.setState(oldState => ({ tipText: this.context.GetText('signin', 'typeDefaultTipText') }));
        }
      }
      
    }

    render() {
       
      
          return (
              <LanguageContext.Consumer>
                {(context) =>
                ( 
                <div className='SignIn'>

                  <SignInLanguagePanel lang='ru'></SignInLanguagePanel>
                  <div>
                    <div className="Welcome">{context.GetText('signin', 'welcomeIn')}</div>
                    <div className="WelcomeModulo">Modulo</div>
                  </div>
                    
                    <CheckBox 
                      changeItemState={this.changeItemState} 
                      checkName="anonim" 
                      IsChecked={this.state.checkedItem==="anonim"} 
                      IsSelected={this.state.selectedItem==="anonim"} 
                      title={context.GetText('signin', 'typeAnonimTitle')}></CheckBox>
                    <CheckBox 
                      changeItemState={this.changeItemState} 
                      checkName="signup" 
                      IsChecked={this.state.checkedItem==="signup"} 
                      IsSelected={this.state.selectedItem==="signup"} 
                      title={context.GetText('signin', 'typeSignUpTitle')}></CheckBox>
                    <CheckBox
                      changeItemState={this.changeItemState} 
                      checkName="signin" 
                      IsChecked={this.state.checkedItem==="signin"} 
                      IsSelected={this.state.selectedItem==="signin"} 
                      title={context.GetText('signin', 'typeSignInTitle')}></CheckBox>
                    <div></div>

                    <div className="SignInTip">
                      <div>{this.state.tipText}</div>
                    </div>
                    <div  className="NextButtonArea">
                      <button>{context.GetText('signin', 'continueButton')}</button>
                    </div>
                </div>
                )}
              </LanguageContext.Consumer>
          );
      
    }
  }
  SignInPage.contextType = LanguageContext;
  
  