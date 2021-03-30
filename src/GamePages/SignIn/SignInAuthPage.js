import React from 'react'
import SignInLanguagePanel from '../../Components/SignInLanguagePanel'
import {LanguageContext} from '../../Language/LangPack'
import MsgBox from "../../Components/MsgBox"
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
	this.currentContext = context;

	//this.changeItemState = this.changeItemState.bind(this);
	}

render() {
		var MsgBoxHTML = null;

		if (this.props.modalstate === 'EnterCode')
		{
			MsgBoxHTML = (
				<MsgBox ModalButton={this.currentContext.GetText('common', 'popupButtonSend')}>
					<div className="Content">
						<p>
							<span>
								{this.currentContext.GetText('signin.modal.MailCode', 'text_1_Start')}
								<b>{this.props.UserMail ?? ""}</b>
								{this.currentContext.GetText('signin.modal.MailCode', 'text_1_End')}
							</span>

							<span>{this.currentContext.GetText('signin.modal.MailCode', 'text_2')}</span>
						</p>
					</div>

					<form className="MailCode">
						<label htmlFor="CheckMailCode">{this.currentContext.GetText('signin.modal.MailCode', 'formLabel')}</label>
						<input type="text" className="InPopup" placeholder={this.currentContext.GetText('signin.modal.MailCode', 'formPlaceholderCode')}></input>
					</form>
				</MsgBox>
			)
		} 
		else if (this.props.modalstate === 'FailCode')
		{
			MsgBoxHTML = (
				<MsgBox ModalButton={this.currentContext.GetText('common', 'popupButtonSend')}>
					<div className="Content">
						<p>
							<span>
								{this.currentContext.GetText('signin.modal.MailCode', 'text_1_Start')}
								<b>{this.props.UserMail ?? ""}</b>
								{this.currentContext.GetText('signin.modal.MailCode', 'text_1_End')}
							</span>

							<span className="Error">{this.currentContext.GetText('signin.modal.MailCode', 'formError')}</span>
						</p>
					</div>

					<form className="MailCode">
						<label htmlFor="CheckMailCode">{this.currentContext.GetText('signin.modal.MailCode', 'formLabel')}</label>
						<input type="text" className="InPopup" id="CheckMailCode" value={this.props.OldCode} placeholder={this.currentContext.GetText('signin.modal.MailCode', 'formPlaceholderCode')}></input>
					</form>
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

							<p className="HeadNavigationTitle">{context.GetText('signinauth', 'labelWindow')}</p>

							<SignInLanguagePanel lang="ru"></SignInLanguagePanel>
						</HeadNavigation>

						<div className="SignInAuth">
							<p className="GeneralSubtitle">{context.GetText('signinauth', 'sublabelWindow')}</p>

							<form>
								<div className="LabelInput">
									<label htmlFor="inputEMail">{context.GetText('signinauth', 'formLabelEMail')}</label>
									<input type="text" className="General" name="inputEMail" placeholder={context.GetText('signinauth', 'formPlaceholderEMail')} /> 
								</div>

								<div className="LabelInput">
									<label htmlFor="inputDeviceName">{context.GetText('signinauth', 'formLabelDeviceName')}</label>
									<input type="text" className="General" name="inputDeviceName" placeholder={context.GetText('signinauth', 'formPlaceholderDeviceName')} />
								</div>
							</form>

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