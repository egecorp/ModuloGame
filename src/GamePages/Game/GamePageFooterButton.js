import React from 'react';
import { LanguageContext } from '../../Language/LangPack'
import GAMEPAGE_STATUS from '../../Lib/GamePageStatus';

export default class GamePageFooterButton extends React.Component {

	
	constructor(props, context) {
		super(props);
        this.currentContext = context;
    }

	render() {

        var buttonCaption = null;

        switch (this.props.GamePageStatus) {
			case GAMEPAGE_STATUS.PLAY_PLAYING:
			case GAMEPAGE_STATUS.PLAY_WAIT_COMPETITOR:
			case GAMEPAGE_STATUS.PLAY_ROUND:
                buttonCaption =  this.currentContext.GetText('game.page', 'FooterButtonBack');
                break;
			case GAMEPAGE_STATUS.WAIT_COMPETITOR_ACCEPTION:
                buttonCaption = this.currentContext.GetText('game.page', 'FooterButtonWithdraw');
                break;
            case GAMEPAGE_STATUS.PLAY_LASTROUND:
                buttonCaption = this.currentContext.GetText('game.page', 'FooterButtonPlayNextRound');
                break;
            case GAMEPAGE_STATUS.MAIN_PLAYING:
                buttonCaption = this.currentContext.GetText('game.page', 'FooterButtonPlayRound');
                break;  
            case GAMEPAGE_STATUS.PLAY_ALLDIGIT:
                buttonCaption = this.currentContext.GetText('game.page', 'FooterButtonPlayRound');
                break;
            default:
                return (<></>);
        }

        return (
            <button className="ButtonBig" onClick={this.props.OnButtonClick}>{buttonCaption}</button>
		);

	}
}
GamePageFooterButton.contextType = LanguageContext;
