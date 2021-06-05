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
                            myDigit1 = {game.D1_1_1} 
                            myDigit2 = {game.D1_1_2} 
                            myDigit3 = {game.D1_1_3} 
                            competitorDigit1 = {game.D1_2_1} 
                            competitorDigit2 = {game.D1_2_2} 
                            competitorDigit3 = {game.D1_2_3} 
                            IsActive = {this.props.CurrentRoundNumber >= 1}
                            RoundNumber = "1"
                            onRoundClick = {(this.props.CurrentRoundNumber >= 1) && this.onRoundClick}
                        ></OneGameRound>

                        <OneGameRound 
                            myDigit1 = {game.D2_1_1} 
                            myDigit2 = {game.D2_1_2} 
                            myDigit3 = {game.D2_1_3} 
                            competitorDigit1 = {game.D2_2_1} 
                            competitorDigit2 = {game.D2_2_2} 
                            competitorDigit3 = {game.D2_2_3} 
                            IsActive = {this.props.CurrentRoundNumber >= 2}
                            RoundNumber = "2"
                            onRoundClick = {(this.props.CurrentRoundNumber >= 2) && this.onRoundClick}
                        ></OneGameRound>
                        
                        <OneGameRound 
                            myDigit1 = {game.D3_1_1} 
                            myDigit2 = {game.D3_1_2} 
                            myDigit3 = {game.D3_1_3} 
                            competitorDigit1 = {game.D3_2_1} 
                            competitorDigit2 = {game.D3_2_2} 
                            competitorDigit3 = {game.D3_2_3} 
                            IsActive = {this.props.CurrentRoundNumber >= 3}
                            RoundNumber = "3"
                            onRoundClick = {(this.props.CurrentRoundNumber >= 3) && this.onRoundClick}
                        ></OneGameRound>
                        
                        <OneGameRound 
                            myDigit1 = {game.D4_1_1} 
                            myDigit2 = {game.D4_1_2} 
                            myDigit3 = {game.D4_1_3} 
                            competitorDigit1 = {game.D4_2_1} 
                            competitorDigit2 = {game.D4_2_2} 
                            competitorDigit3 = {game.D4_2_3} 
                            IsActive = {this.props.CurrentRoundNumber >= 4}
                            RoundNumber = "4"
                            onRoundClick = {(this.props.CurrentRoundNumber >= 4) && this.onRoundClick}
                        ></OneGameRound>
                        
                        <OneGameRound 
                            myDigit1 = {game.D5_1_1} 
                            myDigit2 = {game.D5_1_2} 
                            myDigit3 = {game.D5_1_3} 
                            competitorDigit1 = {game.D5_2_1} 
                            competitorDigit2 = {game.D5_2_2} 
                            competitorDigit3 = {game.D5_2_3} 
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