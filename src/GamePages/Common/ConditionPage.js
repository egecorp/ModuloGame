import React from 'react';
import SignInLanguagePanel from '../../Components/SignInLanguagePanel';
import {LanguageContext} from '../../Language/LangPack';
import HeadNavigation from '../../Components/HeadNavigation';


export default class ConditionPage extends React.Component {
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
					<>
						<HeadNavigation>
							<button className="ButtonBack"></button>

							<p className="HeadNavigationTitle">{context.GetText('condition', 'labelWindow')}</p>

							<SignInLanguagePanel></SignInLanguagePanel>
						</HeadNavigation>
						
						<div className="ConditionPage">
							<p classNamw="GeneralSubtitle">{context.GetText('condition', 'sublabelWindow')}</p>
								
							<div className="Content" data-shadow="both">
								<p>{context.GetText('condition', 'license')}</p>
							</div>
						</div>

						<div className="FooterArea">
							<button>{context.GetText('common', 'modalButtonClose')}</button>
						</div>
					</>
				)}
			</LanguageContext.Consumer>
		);
	}
}

ConditionPage.contextType = LanguageContext;