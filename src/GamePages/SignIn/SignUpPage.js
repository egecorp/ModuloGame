import React from 'react'
import SignInLanguagePanel from '../../Components/SignInLanguagePanel'
import {LanguageContext} from '../../Language/LangPack'
import MsgBox from "../../Components/MsgBox";
import HeadNavigation from '../../Components/HeadNavigation'

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
			<div className="Content">
				<div className="WarningIcon"></div>
				<p className="Title">Пользователь с таким ником уже существует.</p>
				<p>Возможно, Вы уже были зарегистрированы в Modulo.</p>
				<a href="#">{this.currentContext.GetText('signin.modal.AlreadyExists', 'goauth')}</a>
			</div>
		</MsgBox>
		)
	} 
	else if (this.props.modalstate === 'Success')
	{
		MsgBoxHTML = (
		<MsgBox ModalButton="Продолжить">
			<div>
				<p className="Title">Благодарим за регистрацию!</p>
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
					<HeadNavigation>
						<button className="ButtonBack"></button>

						<p className="HeadNavigationTitle">{context.GetText('signup', 'signUpTitle')}</p>

						<SignInLanguagePanel lang='ru'></SignInLanguagePanel>
					</HeadNavigation>

					<div className="SignUp">
						<p class="GeneralSubtitle">Данные для регистрации:</p>

						<form>
							<div className="LabelInput">
								<label htmlFor="inputNicName">{context.GetText('signup', 'labelNicName')}</label>
								<input type="text" name="inputNicName" placeholder="Введите ник..." />
							</div>

							<div className="LabelInput" >
								<label htmlFor="inputEMail">{context.GetText('signup', 'labelEMail')}</label>
								<input type="text" name="inputEMail" placeholder="Введите e-mail..." />
							</div>

							<div className="LabelInput" >
								<label htmlFor="inputCountry">{context.GetText('signup', 'labelCountry')}</label>
								<select name="inputCountry" placeholder="Выберите страну...">
									{Array.from(context.GetDictionary('country').entries()).map(x => <option key={x[0]} value={x[0]}>{x[1]}</option>)}
									{/*context.GetDictionary('country')  */}
								</select>
							</div>

							<div className="LabelInput" >
								<label htmlFor="inputPhone">{context.GetText('signup', 'labelPhone')}</label>
								<input type="tel" name="inputPhone" placeholder="+7 (XXX) XXX-XX-XX" />
							</div>

							<div className="LabelInput" >
								<label htmlFor="inputDOB">{context.GetText('signup', 'labelDOB')}</label>
								<input type="date" name="inputDOB" placeholder="дд.мм.гггг" />
							</div>
						</form>
					</div>

					<div className="FooterArea">
						<p class="AdditionalTip">{context.GetText('signup', 'tipConditionBegin')}<span>{context.GetText('signup', 'tipConditionLink')}</span>{context.GetText('signup', 'tipConditionEnd')}</p>

						<button>{context.GetText('signin', 'continueButton')}</button>
					</div>

					{MsgBoxHTML}
					
				</>
				)}
			</LanguageContext.Consumer>
		);
	}
}

SignUpPage.contextType = LanguageContext;