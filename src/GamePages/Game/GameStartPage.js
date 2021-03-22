import React from 'react';
import {LanguageContext} from '../../Language/LangPack';
import HeadNavigation from '../../Components/HeadNavigation';


export default class GameStartPage extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
			currentLogin: 'Hello', 
			currentToken: 'Token',
	};
	}

	render() {

		return (
			<LanguageContext.Consumer>
			{(context) =>
			( 
				<>
					<HeadNavigation>
						<p className="HeadNavigationTitle">{context.GetText('gamestart', 'labelWindow')}</p>
					</HeadNavigation>
					
					<div className="GameStart">
						<p class="GeneralSubtitle">{context.GetText('gamestart', 'sublabelWindow')}</p>
					
						<div className="Buttons">
							<button className="ButtonGreenBorder">{context.GetText('gamestart', 'buttonRandomPlayer')}</button>
							<button className="ButtonGreenBorder">{context.GetText('gamestart', 'buttonChoosePlayer')}</button>
							<button className="ButtonGreenBorder">{context.GetText('gamestart', 'buttonChooseBot')}</button>
						</div>

						<div class="UserTip">
							<p>{context.GetText('gamestart', 'tip')}</p>
						</div>
					</div>
				</>
			)}
			</LanguageContext.Consumer>
		);
	}
}