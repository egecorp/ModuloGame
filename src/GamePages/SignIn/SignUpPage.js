import React from 'react';
import SignInLanguagePanel from '../../Components/SignInLanguagePanel';
import {LanguageContext} from '../../Language/LangPack';
import MsgBox from "../../Components/MsgBox";
import HeadNavigation from '../../Components/HeadNavigation';

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
		<MsgBox ModalButton={this.currentContext.GetText('common', 'popupButtonBack')}>
			<div className="Content">
				<div className="WarningIcon"></div>
				<p className="Title">{this.currentContext.GetText('signin.modal.AlreadyExists', 'title')}</p>
				<p>{this.currentContext.GetText('signin.modal.AlreadyExists', 'text')}</p>
				<a href="#">{this.currentContext.GetText('signin.modal.AlreadyExists', 'goAuth')}</a>
			</div>
		</MsgBox>
		)
	} 
	else if (this.props.modalstate === 'Success')
	{
		MsgBoxHTML = (
		<MsgBox ModalButton={this.currentContext.GetText('common', 'popupButtonContinue')}>
			<div className="Content">
				<p className="Title">{this.currentContext.GetText('signin.modal.Success', 'title')}</p>
				<p>{this.currentContext.GetText('signin.modal.Success', 'text')}</p>
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

						<p className="HeadNavigationTitle">{context.GetText('signup', 'labelWindow')}</p>

						<SignInLanguagePanel lang='ru'></SignInLanguagePanel>
					</HeadNavigation>

					<div className="SignUp">
						<p class="GeneralSubtitle">{context.GetText('signup', 'sublabelWindow')}</p>

						<form>
							<div className="LabelInput">
								<label htmlFor="inputNicName">{context.GetText('signup', 'formLabelNicName')}</label>
								<input type="text" className="General" name="inputNicName" placeholder={context.GetText('signup', 'formPlaceholderNicName')} />
							</div>

							<div className="LabelInput">
								<label htmlFor="inputEMail">{context.GetText('signup', 'formLabelEMail')}</label>
								<input type="text" className="General" name="inputEMail" placeholder={context.GetText('signup', 'formPlaceholderEMail')} />
							</div>

							<div className="LabelInput">
								<label htmlFor="inputCountry">{context.GetText('signup', 'formLabelCountry')}</label>
								<select className="General" name="inputCountry" placeholder={context.GetText('signup', 'formPlaceholderCountry')}>
									{Array.from(context.GetDictionary('country').entries()).map(x => <option key={x[0]} value={x[0]}>{x[1]}</option>)}
									{/*context.GetDictionary('country')  */}
								</select>
							</div>

							<div className="LabelInput">
								<label htmlFor="inputPhone">{context.GetText('signup', 'formLabelPhone')}</label>
								<input type="tel" className="General" name="inputPhone" placeholder={context.GetText('signup', 'formPlaceholderPhone')} />
							</div>

							<div className="LabelInput">
								<label htmlFor="inputDOB">{context.GetText('signup', 'formLabelDOB')}</label>
								{/* <input type="date" name="inputDOB" placeholder={context.GetText('signup', 'formPlaceholderDOB')} /> */}
								<input
									type="text"
									className="General Date"
									onFocus={(e) => (e.currentTarget.type = "date")}
									onBlur={(e) => (e.currentTarget.type = "text")}
									placeholder={context.GetText('signup', 'formPlaceholderDOB')}
								/>
							</div>
						</form>
					</div>

					<div className="FooterArea">
						<p class="AdditionalTip">{context.GetText('signup', 'tipConditionBegin')}<span>{context.GetText('signup', 'tipConditionLink')}</span>{context.GetText('signup', 'tipConditionEnd')}</p>

						<button>{context.GetText('signup', 'continueButton')}</button>
					</div>

					{MsgBoxHTML}
					
				</>
				)}
			</LanguageContext.Consumer>
		);
	}
}

SignUpPage.contextType = LanguageContext;