import React from 'react'
import SignInLanguagePanel from '../../Components/SignInLanguagePanel'
import {LanguageContext} from '../../Language/LangPack'
import MsgBox from "../../Components/MsgBox";


export default class SignInAuthPage extends React.Component {
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
       
      var MsgBoxHTML = null;
      if (this.props.modalstate == 'EnterCode')
      {
        MsgBoxHTML = (
        <MsgBox ModalButton="ОТПРАВИТЬ">
          <div>
            <p>На почту {this.props.UserMail ?? ""} было отправлено письмо с кодом.</p>
            <p>Пожалуста, введите код в поле ниже для входа в игру:</p>
            <label htmlFor="CheckMailCode">Код из письма:</label>
            <input type="text" id="CheckMailCode" ></input>
          </div>
        </MsgBox>
         )
      } 
      else if (this.props.modalstate == 'FailCode')
      {
        MsgBoxHTML = (
        <MsgBox ModalButton="ОТПРАВИТЬ">
          <div>
            <p>На почту {this.props.UserMail ?? ""} было отправлено письмо с кодом.</p>
            <p>Неверый код, попробуйте ещё раз</p>
            <label htmlFor="CheckMailCode">Код из письма:</label>
            <input type="text" id="CheckMailCode" value={this.props.OldCode}></input>
          </div>
        </MsgBox>
         )
      } 
          return (
              <LanguageContext.Consumer>
                {(context) =>
                ( 
                  <>
                    <div className='SignInAuth'>

                      <SignInLanguagePanel lang='ru'></SignInLanguagePanel>
                      <div>
                        <div className="SignInAuthWelcome">{context.GetText('signinauth', 'signInAuthTitle')}</div>
                      </div>
                        
                      <div className="LabelInput" >
                        <label htmlFor="inputEMail">{context.GetText('signinauth', 'labelEMail')}</label>
                        <input type="text" name="inputEMail" />
                      </div>
                      <div className="LabelInput" >
                        <label htmlFor="inputDeviceName">{context.GetText('signinauth', 'labelDeviceName')}</label>
                        <input type="text" name="inputDeviceName" />
                      </div>
                    


                    
                      
                      <div className="SignInAuthTip">
                        {context.GetText('signinauth', 'tipFAQ')}
                      </div>

                      <div  className="FooterArea">
                        <button>{context.GetText('signinauth', 'continueButton')}</button>
                      </div>
                    </div>

                    
                    {MsgBoxHTML}
                  </>
                )}
              </LanguageContext.Consumer>
          );
      
    }
  }
  SignInAuthPage.contextType = LanguageContext;
  
  