import React from 'react';
import SignInLanguagePanel from '../../Components/SignInLanguagePanel';
import {LanguageContext} from '../../Language/LangPack';
import MsgBox from "../../Components/MsgBox";
import HeadNavigation from '../../Components/HeadNavigation';


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
				<LanguageContext.Consumer>
				{(context) =>
				( 
					<MsgBox ModalButton={context.GetText('common', 'popupButtonSend')}>
						<div className="Content">
							<p>
								<span>
									{context.GetText('signin.modal.MailCode', 'text_1_Start')}
									<b>{this.props.UserMail ?? ""}</b>
									{context.GetText('signin.modal.MailCode', 'text_1_End')}
								</span>

								<span>{context.GetText('signin.modal.MailCode', 'text_2')}</span>
							</p>
						</div>

						<form className="MailCode">
							<label htmlFor="CheckMailCode">{context.GetText('signin.modal.MailCode', 'formLabel')}</label>
							<input type="text" className="InPopup" placeholder={context.GetText('signin.modal.MailCode', 'formPlaceholderCode')}></input>
						</form>
					</MsgBox>
				)}
				</LanguageContext.Consumer>
			)
		} 
		else if (this.props.modalstate === 'FailCode')
		{
			MsgBoxHTML = (
				<LanguageContext.Consumer>
				{(context) =>
				( 
					<MsgBox ModalButton={context.GetText('common', 'popupButtonSend')}>
						<div className="Content">
							<p>
								<span>
									{context.GetText('signin.modal.MailCode', 'text_1_Start')}
									<b>{this.props.UserMail ?? ""}</b>
									{context.GetText('signin.modal.MailCode', 'text_1_End')}
								</span>

								<span className="Error">{context.GetText('signin.modal.MailCode', 'formError')}</span>
							</p>
						</div>

						<form className="MailCode">
							<label htmlFor="CheckMailCode">{context.GetText('signin.modal.MailCode', 'formLabel')}</label>
							<input type="text" className="InPopup" id="CheckMailCode" value={this.props.OldCode} placeholder={context.GetText('signin.modal.MailCode', 'formPlaceholderCode')}></input>
						</form>
					</MsgBox>
				)}
				</LanguageContext.Consumer>
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