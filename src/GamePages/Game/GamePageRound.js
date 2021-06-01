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

        let rounds = this.props.Rounds;

		return (
			<LanguageContext.Consumer>
				{(context) =>
				(

                    <div className="RoundsContainer">

                        <OneGameRound 
                            myDigit1 = {rounds["1.1.1"]} 
                            myDigit2 = {rounds["1.1.2"]} 
                            myDigit3 = {rounds["1.1.3"]} 
                            competitorDigit1 = {rounds["1.2.1"]} 
                            competitorDigit2 = {rounds["1.2.2"]} 
                            competitorDigit3 = {rounds["1.2.3"]} 
                            IsActive = {this.props.CurrentRoundNumber >= 1}
                            RoundNumber = "1"
                            onRoundClickCallBack = {(this.props.CurrentRoundNumber >= 1) && this.onRoundClick}
                        ></OneGameRound>

                        <OneGameRound 
                            myDigit1 = {rounds["2.1.1"]} 
                            myDigit2 = {rounds["2.1.2"]} 
                            myDigit3 = {rounds["2.1.3"]} 
                            competitorDigit1 = {rounds["2.2.1"]} 
                            competitorDigit2 = {rounds["2.2.2"]} 
                            competitorDigit3 = {rounds["2.2.3"]} 
                            IsActive = {this.props.CurrentRoundNumber >= 2}
                            RoundNumber = "2"
                            onRoundClickCallBack = {(this.props.CurrentRoundNumber >= 2) && this.onRoundClick}
                        ></OneGameRound>
                        
                        <OneGameRound 
                            myDigit1 = {rounds["3.1.1"]} 
                            myDigit2 = {rounds["3.1.2"]} 
                            myDigit3 = {rounds["3.1.3"]} 
                            competitorDigit1 = {rounds["3.2.1"]} 
                            competitorDigit2 = {rounds["3.2.2"]} 
                            competitorDigit3 = {rounds["3.2.3"]} 
                            IsActive = {this.props.CurrentRoundNumber >= 3}
                            RoundNumber = "3"
                            onRoundClickCallBack = {(this.props.CurrentRoundNumber >= 3) && this.onRoundClick}
                        ></OneGameRound>
                        
                        <OneGameRound 
                            myDigit1 = {rounds["4.1.1"]} 
                            myDigit2 = {rounds["4.1.2"]} 
                            myDigit3 = {rounds["4.1.3"]} 
                            competitorDigit1 = {rounds["4.2.1"]} 
                            competitorDigit2 = {rounds["4.2.2"]} 
                            competitorDigit3 = {rounds["4.2.3"]} 
                            IsActive = {this.props.CurrentRoundNumber >= 4}
                            RoundNumber = "4"
                            onRoundClickCallBack = {(this.props.CurrentRoundNumber >= 4) && this.onRoundClick}
                        ></OneGameRound>
                        
                        <OneGameRound 
                            myDigit1 = {rounds["5.1.1"]} 
                            myDigit2 = {rounds["5.1.2"]} 
                            myDigit3 = {rounds["5.1.3"]} 
                            competitorDigit1 = {rounds["5.2.1"]} 
                            competitorDigit2 = {rounds["2.2.2"]} 
                            competitorDigit3 = {rounds["5.2.3"]} 
                            IsActive = {this.props.CurrentRoundNumber === 5}
                            RoundNumber = "5"
                            onRoundClickCallBack = {(this.props.CurrentRoundNumber >= 5) && this.onRoundClick}
                        ></OneGameRound>
                    </div>
                
				)}
			</LanguageContext.Consumer>
		);


	}
}
GamePageRound.contextType = LanguageContext;