import React from 'react';
import { LanguageContext } from '../../Language/LangPack'
//import GAMEPAGE_STATUS from '../../Lib/GamePageStatus';
import GAME_STATUS from '../../Lib/GameStatus';

export default class GamePagePlayers extends React.Component {

	
	constructor(props, context) {
		super(props);
		this.currentContext = context;
    }

   
    getLabelText()
    {
        switch (this.props.CurrentGame.GameStatus) {
			case GAME_STATUS.GAME_ROUND_1_NOUSER:
			case GAME_STATUS.GAME_ROUND_1_USER2_DONE:
			case GAME_STATUS.GAME_ROUND_2_NOUSER:
			case GAME_STATUS.GAME_ROUND_2_USER2_DONE:
			case GAME_STATUS.GAME_ROUND_3_NOUSER:
			case GAME_STATUS.GAME_ROUND_3_USER2_DONE:
			case GAME_STATUS.GAME_ROUND_4_NOUSER:
			case GAME_STATUS.GAME_ROUND_4_USER2_DONE:
			case GAME_STATUS.GAME_ROUND_5_NOUSER:
			case GAME_STATUS.GAME_ROUND_5_USER2_DONE:
            case GAME_STATUS.GAME_WAIT_USER2:
                return null;

			case GAME_STATUS.GAME_ROUND_1_USER1_DONE:
			case GAME_STATUS.GAME_ROUND_2_USER1_DONE:
			case GAME_STATUS.GAME_ROUND_3_USER1_DONE:
			case GAME_STATUS.GAME_ROUND_4_USER1_DONE:
			case GAME_STATUS.GAME_ROUND_5_USER1_DONE:
				return this.currentContext.GetText('game.page', 'FooterButtonPlayRound');
				

			case GAME_STATUS.GAME_ROUND_1_USER1_GIVEUP:
			case GAME_STATUS.GAME_ROUND_2_USER1_GIVEUP:
			case GAME_STATUS.GAME_ROUND_3_USER1_GIVEUP:
			case GAME_STATUS.GAME_ROUND_4_USER1_GIVEUP:
			case GAME_STATUS.GAME_ROUND_5_USER1_GIVEUP:
				return  this.currentContext.GetText('game.page', 'StartGame.GiveUpMe');
				

			case GAME_STATUS.GAME_ROUND_1_USER2_GIVEUP:
			case GAME_STATUS.GAME_ROUND_2_USER2_GIVEUP:
			case GAME_STATUS.GAME_ROUND_3_USER2_GIVEUP:
			case GAME_STATUS.GAME_ROUND_4_USER2_GIVEUP:
			case GAME_STATUS.GAME_ROUND_5_USER2_GIVEUP:
				return this.currentContext.GetText('game.page', 'StartGame.GiveUp');

			case GAME_STATUS.GAME_ROUND_1_TIMEOUT:
			case GAME_STATUS.GAME_ROUND_2_TIMEOUT:
			case GAME_STATUS.GAME_ROUND_3_TIMEOUT:
			case GAME_STATUS.GAME_ROUND_4_TIMEOUT:
			case GAME_STATUS.GAME_ROUND_5_TIMEOUT:
				return this.currentContext.GetText('game.page', 'StartGame.RoundDoneTimeout');

			case GAME_STATUS.GAME_FINISH_USER1_WIN:
				return this.currentContext.GetText('game.page', 'StartGame.Win');

			case GAME_STATUS.GAME_FINISH_USER2_WIN:
				return this.currentContext.GetText('game.page', 'StartGame.Defease');

			case GAME_STATUS.GAME_FINISH_USER2_DRAW:
				return this.currentContext.GetText('game.page', 'StartGame.Draw');

			default:
				return this.currentContext.GetText('game.page', 'StartGame.NoGame');

		}
    }

	render() {

        let myScore = +this.props.CurrentGame.MyUserScore || 0;
        let competitorScore = +this.props.CurrentGame.CompetitorUserScore || 0;

        let myUserScore = (((myScore) > 9) ? myScore : ("0" + myScore));
        let competitorUserScore = (((competitorScore) > 9) ? competitorScore : ("0" + competitorScore));

        let labelText = this.getLabelText();

        return (
			<LanguageContext.Consumer>
				{(context) =>
				(
                    <div className="FaceToFace">
                    <div className="Gamer" data-vip={0 && (Math.random() > 0.5) ? 1 : 0}>
                        <p>{this.props.CurrentGame.MyUserName}</p>
        
                        <img src='/img/avatar/1/boy.1.png' alt="No Avatar"></img>
        
                        <div className="Buttons">
                            <button className="ButtonAroundGreen IconStats"></button>
                        </div>
        
                        <div className="IconVip"></div>
        
                        <div className="IconJoker Red">
                            {this.props.CurrentGame.MyUserCanUseJoker ? (<div className="DigitIcon" data-digit="J" data-color="blue"></div>) : null}
                        </div>
                    </div>
        
                    <div className="CurrentInfo">
                        <p className="Score">{myUserScore} : {competitorUserScore}</p>
        
                        <div className="Status">
                            <div className="IconStatus Waiting"></div>
                            <p>{labelText}</p>
                        </div>
                    </div>
        
                    <div className="Gamer" data-vip={0 && (Math.random() > 0.5) ? 1 : 0}>
                        <p>{this.props.CurrentGame.CompetitorUserName}</p>
        
                        <img src='/img/avatar/1/boy.1.png' alt="No Avatar"></img>
        
                        <div className="Buttons">
                            <button className="ButtonAroundGreen IconAdd"></button>
                            <button className="ButtonAroundGreen IconStats"></button>
                        </div>
        
                        <div className="IconVip"></div>
        
                        <div className="IconJoker Red">
                            {this.props.CurrentGame.CompetitorUserCanUseJoker ? (<div className="DigitIcon" data-digit="J" data-color="blue"></div>) : null}
                        </div>
                    </div>
                </div>
        
            
				)}
			</LanguageContext.Consumer>
		);

	}
}
GamePagePlayers.contextType = LanguageContext;
