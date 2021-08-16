import React from 'react';
import SignInLanguagePanel from '../../Components/SignInLanguagePanel';
import { LanguageContext } from '../../Language/LangPack';
import HeadNavigation from '../../Components/HeadNavigation';



export default class Statistic extends React.Component {
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
						<HeadNavigation
							LeftButton={
                            
                                <button className="ButtonBack" onClick={this.cancelButtonOnClick}></button>

                            
                            }
							title={context.GetText('condition', 'labelWindow')}
							RightButton={<SignInLanguagePanel lang="ru" />}
						/>

						<div className="Statistic">
							<span style={global.ContentTitle}>{context.GetText('condition', 'sublabelWindow')}</span>

							<div className="Content" data-shadow="both">
								<span>{context.GetText('condition', 'license')}</span>
							</div>
						</div>

						<div>
							<div
								className="ButtonBig"
							>
                                title={context.GetText('common', 'modalButtonClose')}
                            </div>
						</div>
					</>
				)}
			</LanguageContext.Consumer>
		);
	}
}

Statistic.contextType = LanguageContext;