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
                            IsActive = {this.props.CurrentRoundNumber >= 1}
                            RoundNumber = "1"
                            onRoundClick = {(this.props.CurrentRoundNumber >= 1) && this.onRoundClick}
                        ></OneGameRound>

                        <OneGameRound 
                            myDigit1 = {game.MyDigit21} 
                            myDigit2 = {game.MyDigit22} 
                            myDigit3 = {game.MyDigit23} 
                            competitorDigit1 = {game.CompetitorDigit21} 
                            competitorDigit2 = {game.CompetitorDigit22} 
                            competitorDigit3 = {game.CompetitorDigit23} 
                            IsActive = {this.props.CurrentRoundNumber >= 2}
                            RoundNumber = "2"
                            onRoundClick = {(this.props.CurrentRoundNumber >= 2) && this.onRoundClick}
                        ></OneGameRound>
                        
                        <OneGameRound 
                            myDigit1 = {game.MyDigit31} 
                            myDigit2 = {game.MyDigit32} 
                            myDigit3 = {game.MyDigit33} 
                            competitorDigit1 = {game.CompetitorDigit31} 
                            competitorDigit2 = {game.CompetitorDigit32} 
                            competitorDigit3 = {game.CompetitorDigit33} 
                            IsActive = {this.props.CurrentRoundNumber >= 3}
                            RoundNumber = "3"
                            onRoundClick = {(this.props.CurrentRoundNumber >= 3) && this.onRoundClick}
                        ></OneGameRound>
                        
                        <OneGameRound 
                            myDigit1 = {game.MyDigit41} 
                            myDigit2 = {game.MyDigit42} 
                            myDigit3 = {game.MyDigit43} 
                            competitorDigit1 = {game.CompetitorDigit41} 
                            competitorDigit2 = {game.CompetitorDigit42} 
                            competitorDigit3 = {game.CompetitorDigit43} 
                            IsActive = {this.props.CurrentRoundNumber >= 4}
                            RoundNumber = "4"
                            onRoundClick = {(this.props.CurrentRoundNumber >= 4) && this.onRoundClick}
                        ></OneGameRound>
                        
                        <OneGameRound 
                            myDigit1 = {game.MyDigit51} 
                            myDigit2 = {game.MyDigit52} 
                            myDigit3 = {game.MyDigit53} 
                            competitorDigit1 = {game.CompetitorDigit51} 
                            competitorDigit2 = {game.CompetitorDigit52} 
                            competitorDigit3 = {game.CompetitorDigit53} 
                            IsActive = {this.props.CurrentRoundNumber === 5}
                            RoundNumber = "5"
                            onRoundClick = {(this.props.CurrentRoundNumber >= 5) && this.onRoundClick}
                        ></OneGameRound>
                    </div>
                
				)}
			</LanguageContext.Consumer>
		);


	}
}
GamePageRound.contextType = LanguageContext;