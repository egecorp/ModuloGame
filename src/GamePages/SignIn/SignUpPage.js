import React from 'react'
import SignInLanguagePanel from '../../Components/SignInLanguagePanel'
import {LanguageContext} from '../../Language/LangPack'
import MsgBox from "../../Components/MsgBox";

export default class SignUpPage extends React.Component {
    constructor(props, context) {
      super(props);
      this.state = {
          currentLogin: 'Hello', 
          currentToken: 'Token',

          selectedItem: null,
          checkedItem: null
      };
      this.currentContext = context;
      //this.changeItemState = this.changeItemState.bind(this);

    }
  
    render() {
       
      
      var MsgBoxHTML = null;
      if (this.props.modalstate === 'AlreadyExists')
      {
        MsgBoxHTML = (
        <MsgBox ModalButton={this.currentContext.GetText('signin.modal.AlreadyExists', 'continueButton')}>
          <div>
            <div className='WarningIcon'></div>
            <p className='BoldTitle'>Пользователь с таким ником уже существует.</p>
            <p>Возможно, Вы уже были зарегистрированы в Modulo</p>
            <p>{this.currentContext.GetText('signin.modal.AlreadyExists', 'goauth')}</p>
          </div>
        </MsgBox>
         )
      } 
      else if (this.props.modalstate === 'Success')
      {
        MsgBoxHTML = (
        <MsgBox ModalButton="Продолжить">
          <div>
            <p className='BoldTitle'>Благодарим за регистрацию!</p>
            <p>Для подтверждения Вашего почтового ящика и получения полных возможностей акаунта перейдите по ссылке в письме </p>
          </div>
        </MsgBox>
         )
      } 
      {this.currentContext.GetText('signin.modal.AlreadyExists', 'title')}
      {this.currentContext.GetText('signin.modal.AlreadyExists', 'text')}
      
          return (
              <LanguageContext.Consumer>
                {(context) =>
                ( 
                <>
                  <div className='SignUp'>

                    <SignInLanguagePanel lang='ru'></SignInLanguagePanel>
                    <div>
                      <div className="SignUpWelcome">{context.GetText('signup', 'signUpTitle')}</div>
                    </div>
                      
                    <div className="LabelInput" >
                      <label htmlFor="inputNicName">{context.GetText('signup', 'labelNicName')}</label>
                      <input type="text" name="inputNicName" />
                    </div>
                    <div className="LabelInput" >
                      <label htmlFor="inputEMail">{context.GetText('signup', 'labelEMail')}</label>
                      <input type="text" name="inputEMail" />
                    </div>
                    <div className="LabelInput" >
                      <label htmlFor="inputCountry">{context.GetText('signup', 'labelCountry')}</label>
                      <select  name="inputCountry">
                        {Array.from(context.GetDictionary('country').entries()).map(x => <option key={x[0]} value={x[0]}>{x[1]}</option>)}
                        {/*context.GetDictionary('country')  */}
                      </select>
                    </div>
                    <div className="LabelInput" >
                      <label htmlFor="inputPhone">{context.GetText('signup', 'labelPhone')}</label>
                      <input type="tel" placeholder='+7(XXX)XXX-XX-XX' name="inputPhone" />
                    </div>
                    <div className="LabelInput" >
                      <label htmlFor="inputDOB">{context.GetText('signup', 'labelDOB')}</label>
                      <input type="date" name="inputDOB" />
                    </div>
                    
                    <div className="SignUpTip">
                        {this.currentContext.GetText('signup', 'tipConditionBegin')}
                          <span style={{fontSize:"25px"}}>{this.currentContext.GetText('signup', 'tipConditionLink')}</span>
                        {this.currentContext.GetText('signup', 'tipConditionEnd')}
                    </div>
                    <div  className="FooterArea">
                      <button>{context.GetText('signin', 'continueButton')}</button>
                    </div>
                  </div>

                  {MsgBoxHTML}
                  
                </>
                )}
              </LanguageContext.Consumer>
          );
      
    }
  }
  SignUpPage.contextType = LanguageContext;
  
  