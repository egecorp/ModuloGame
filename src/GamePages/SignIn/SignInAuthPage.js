import React from 'react'
import SignInLanguagePanel from '../../Components/SignInLanguagePanel'
import {LanguageContext} from '../../Language/LangPack'
import MsgBox from "../../Components/MsgBox";
import HeadNavigation from '../../Components/HeadNavigation'


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
      if (this.props.modalstate === 'EnterCode')
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
      else if (this.props.modalstate === 'FailCode')
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
							<HeadNavigation>
								<button className="ButtonBack"></button>

								<p className="HeadNavigationTitle">Вход в аккаунт</p>

								<SignInLanguagePanel lang='ru'></SignInLanguagePanel>
							</HeadNavigation>

							<div className='SignInAuth'>
								<p className="GeneralSubtitle">{context.GetText('signinauth', 'signInAuthTitle')}</p>

								<div className="LabelInput">
									<label htmlFor="inputEMail">{context.GetText('signinauth', 'labelEMail')}</label>
									<input type="text" name="inputEMail" placeholder="Введите e-mail..." /> 
								</div>

								<div className="LabelInput">
									<label htmlFor="inputDeviceName">{context.GetText('signinauth', 'labelDeviceName')}</label>
									<input type="text" name="inputDeviceName" placeholder="Название вашего устройства..." />
								</div>

								<div className="UserTip">
									<p>{context.GetText('signinauth', 'tipFAQ')}</p>
								</div>
							</div>

							<div className="FooterArea">
								<button>{context.GetText('signinauth', 'continueButton')}</button>
							</div>

							{MsgBoxHTML}
                  </>
                )}
              </LanguageContext.Consumer>
          );
      
    }
  }
  SignInAuthPage.contextType = LanguageContext;
  
  