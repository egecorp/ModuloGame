import React from 'react';
import { LanguageContext } from '../../Language/LangPack'
import OneGameRound from '../../Components/OneGameRound'

export default class GamePageRound extends React.Component {
	constructor(props, context) {
		super(props);
        this.onRoundClick = this.onRoundClick.bind(this);

	}

    onRoundClick(roundNumber)
    {
        if (typeof (this.props.onRoundClickCallBack) === "function") this.props.onRoundClickCallBack(roundNumber);
    }

	render() {

        let game = this.props.CurrentGame;

        let MaxRoundNumber =  Math.max(game.MyUserMaxRoundNumber, game.CompetitorUserMaxRoundNumber);

        let round1IsActive = game.IsActive ? (this.props.CurrentRoundNumber >= 1) : (MaxRoundNumber >= 1);
        let round2IsActive = game.IsActive ? (this.props.CurrentRoundNumber >= 2) : (MaxRoundNumber >= 2);
        let round3IsActive = game.IsActive ? (this.props.CurrentRoundNumber >= 3) : (MaxRoundNumber >= 3);
        let round4IsActive = game.IsActive ? (this.props.CurrentRoundNumber >= 4) : (MaxRoundNumber >= 4);
        let round5IsActive = game.IsActive ? (this.props.CurrentRoundNumber >= 5) : (MaxRoundNumber >= 5);

		return (
			<LanguageContext.Consumer>
				{(context) =>
				(

                    <div className="RoundsContainer">

                        <OneGameRound 
                            myDigit1 = {game.MyDigit11} 
                            myDigit2 = {game.MyDigit12} 
                            myDigit3 = {game.MyDigit13} 
                            competitorDigit1 = {game.CompetitorDigit11} 
                            competitorDigit2 = {game.CompetitorDigit12} 
                            competitorDigit3 = {game.CompetitorDigit13} 
                            IsActive = {round1IsActive}
                            RoundNumber = "1"
                            onRoundClick = {round1IsActive && this.onRoundClick}
                        ></OneGameRound>

                        <OneGameRound 
                            myDigit1 = {game.MyDigit21} 
                            myDigit2 = {game.MyDigit22} 
                            myDigit3 = {game.MyDigit23} 
                            competitorDigit1 = {game.CompetitorDigit21} 
                            competitorDigit2 = {game.CompetitorDigit22} 
                            competitorDigit3 = {game.CompetitorDigit23} 
                            IsActive = {round2IsActive}
                            RoundNumber = "2"
                            onRoundClick = {round2IsActive && this.onRoundClick}
                        ></OneGameRound>
                        
                        <OneGameRound 
                            myDigit1 = {game.MyDigit31} 
                            myDigit2 = {game.MyDigit32} 
                            myDigit3 = {game.MyDigit33} 
                            competitorDigit1 = {game.CompetitorDigit31} 
                            competitorDigit2 = {game.CompetitorDigit32} 
                            competitorDigit3 = {game.CompetitorDigit33} 
                            IsActive = {round3IsActive}
                            RoundNumber = "3"
                            onRoundClick = {round3IsActive && this.onRoundClick}
                        ></OneGameRound>
                        
                        <OneGameRound 
                            myDigit1 = {game.MyDigit41} 
                            myDigit2 = {game.MyDigit42} 
                            myDigit3 = {game.MyDigit43} 
                            competitorDigit1 = {game.CompetitorDigit41} 
                            competitorDigit2 = {game.CompetitorDigit42} 
                            competitorDigit3 = {game.CompetitorDigit43} 
                            IsActive = {round4IsActive}
                            RoundNumber = "4"
                            onRoundClick = {round4IsActive && this.onRoundClick}
                        ></OneGameRound>
                        
                        <OneGameRound 
                            myDigit1 = {game.MyDigit51} 
                            myDigit2 = {game.MyDigit52} 
                            myDigit3 = {game.MyDigit53} 
                            competitorDigit1 = {game.CompetitorDigit51} 
                            competitorDigit2 = {game.CompetitorDigit52} 
                            competitorDigit3 = {game.CompetitorDigit53} 
                            IsActive = {round5IsActive}
                            RoundNumber = "5"
                            onRoundClick = {round5IsActive && this.onRoundClick}
                        ></OneGameRound>
                    </div>
                
				)}
			</LanguageContext.Consumer>
		);


	}
}
GamePageRound.contextType = LanguageContext;