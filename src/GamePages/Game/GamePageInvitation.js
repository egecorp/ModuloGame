import React from 'react';
import { LanguageContext } from '../../Language/LangPack'

export default class GamePageInvitation extends React.Component {
	currentGame = null;
	isFirstGamer = false;
	constructor(props, context) {
		super(props);
		this.currentContext = context;

		this.currentGame = props.CurrentGame;
	}



	render() {
		return (
			<LanguageContext.Consumer>
				{(context) =>
				(
                    <div class="UserTip">
                        <p>
                            {context.GetText('game.page', 'InvitationText1')}
                            {this.props.CurrentGame.CompetitorUserName}
                            {context.GetText('game.page', 'InvitationText2')}
                        </p>
                    </div>
				)}
			</LanguageContext.Consumer>
		);
	}
}
GamePageInvitation.contextType = LanguageContext;