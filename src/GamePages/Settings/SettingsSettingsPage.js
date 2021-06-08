import React from 'react'

import { LanguageContext } from '../../Language/LangPack'


export default class SettingsSettingsPage extends React.Component {
	constructor(props, context) {
		super(props);
		this.state = {};

		//this.changeItemState = this.changeItemState.bind(this);

	}

	render() {


		return (
			<LanguageContext.Consumer>
				{(context) =>
				(

					<div className="SignInAnonim ContentGap">
						<p className="GeneralSubtitle">
							{context.GetText('signinanonim', 'labelYourNickname')} <span>anonim6045</span>
						</p>

						<div className="SignInAnonimContent">
							<img src="../img/avatar/1/boy.1.png" alt="Anonim"></img>

							<div className="TextBlock">
								<p className="Tip">
									{context.GetText('signinanonim', 'tipCannotChooseImg')}
								</p>

								<p className="CreateAcc" onClick={this.signUpLabelOnClick}>
									{context.GetText('signinanonim', 'linkGoToSignUp')}
								</p>
							</div>
						</div>

						<div className="FooterArea">
							<p className="AdditionalTip">
								{this.currentContext.GetText('signinanonim', 'tipConditionBegin')}
								<span onClick={this.policyLabelOnClick}>{this.currentContext.GetText('signinanonim', 'tipConditionLink')}</span>
								{this.currentContext.GetText('signinanonim', 'tipConditionEnd')}
							</p>

							<button className="ButtonBig">{context.GetText('signinanonim', 'continueButton')}</button>
						</div>
					</div>
				)}
			</LanguageContext.Consumer>
		);

	}
}
SettingsSettingsPage.contextType = LanguageContext;

