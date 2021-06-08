import React from 'react'

import { LanguageContext } from '../../Language/LangPack'


export default class SettingsAvatarPage extends React.Component {
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

								<p className="SignUp" onClick={this.signUpLabelOnClick}>
									{context.GetText('signinanonim', 'linkGoToSignUp')}
								</p>
							</div>

							<p className="AdditionalTip">
								{context.GetText('signinanonim', 'tipCondition')}
							</p>
						</div>

						<div className="FooterArea">
							<button className="ButtonBig">{context.GetText('signinanonim', 'continueButton')}</button>
						</div>
					</div>
				)}
			</LanguageContext.Consumer>
		);
	}
}
SettingsAvatarPage.contextType = LanguageContext;

