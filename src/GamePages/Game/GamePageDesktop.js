import React from 'react';
import { LanguageContext } from '../../Language/LangPack'
import GAMEPAGE_STATUS from '../../Lib/GamePageStatus';
import OneGameDesktopCard from "../../Components/OneGameDesktopCard"
import OneGameRoundDigit from "../../Components/OneGameRoundDigit"


export default class GamePageDesktop extends React.Component {

	
	constructor(props, context) {
		super(props);
		this.state =
		{
			gamePageStatus: props.GamePageStatus,
			myDigit1: props.myDigit1,
			myDigit2: props.myDigit2,
			myDigit3: props.myDigit3,
			canUseJoker: false,
            isPlaying : 1 // TODO брать из props
		};

		this.onCardDigitClick = this.onCardDigitClick.bind(this);
		this.onDesktopDigitClick = this.onDesktopDigitClick.bind(this);
	}

	onCardDigitClick(newDigit) {

        if (this.props.GamePageStatus !== GAMEPAGE_STATUS.PLAY)
        {
            console.log("You cannot use digit");
            console.log(this.props.GamePageStatus)
            return;
        }

		if ((newDigit === 'J') && !this.state.canUseJoker) {
			console.log("Cannot use Joker");
			return;
		}
		var d1 = this.state.myDigit1 ? (this.state.myDigit1 + "") : null;
		var d2 = this.state.myDigit2 ? (this.state.myDigit2 + "") : null;
		var d3 = this.state.myDigit3 ? (this.state.myDigit3 + "") : null;

        if ((d1 === newDigit) || (d2 === newDigit) || (d3 === newDigit))
        {
            console.log('Must not use digit 2 times');
            return;
        }

		if (!d1) {
			this.setState({ myDigit1: d1 = newDigit });
		}
		else if (!d2) {
			this.setState({ myDigit2: d2 = newDigit });
		}
		else if (!d3) {
			this.setState({ myDigit3: d3 = newDigit });
		}
		else {
			console.log("Strange situation");
			console.log(newDigit, d1, d2, d3);
		}

        this.props.SetDigits(d1, d2, d3);
	}

	onDesktopDigitClick(digit, position) {

        if ((this.props.GamePageStatus !== GAMEPAGE_STATUS.PLAY)
        && (this.props.GamePageStatus !== GAMEPAGE_STATUS.ALLDIGIT))
        {
            console.log("You cannot click desktop digits");
            return;
        }

        var d1 = (this.state.myDigit1 && (position !== '1')) ? (this.state.myDigit1 + "") : null;
		var d2 = (this.state.myDigit2 && (position !== '2')) ? (this.state.myDigit2 + "") : null;
		var d3 = (this.state.myDigit3 && (position !== '3')) ? (this.state.myDigit3 + "") : null;
        this.setState({ myDigit1: d1, myDigit2: d2, myDigit3: d3  });
        this.props.SetDigits(d1, d2,d3);
	}

    checkDigit(d) 
    {
        var d1 = this.state.myDigit1 ? (this.state.myDigit1 + "") : null;
        var d2 = this.state.myDigit2 ? (this.state.myDigit2 + "") : null;
        var d3 = this.state.myDigit3 ? (this.state.myDigit3 + "") : null;

        return (d1 !== (d + "")) && (d2 !== (d + "")) && (d3 !== (d + ""));
    }

	render() {

        var cardsSetArea = null;
        var competitorScoreArea = (<div></div>);
        if ((this.props.GamePageStatus === GAMEPAGE_STATUS.PLAY) || (this.props.GamePageStatus === GAMEPAGE_STATUS.ALLDIGIT))
        {
            cardsSetArea = (
                <div className="YourCardsContainer">
                    <div className="RowsContainer">
                        <div className="Row">
                            <OneGameDesktopCard Digit="2" onCardClick={this.onCardDigitClick} IsActive={this.checkDigit(2)}></OneGameDesktopCard>
                            <OneGameDesktopCard Digit="4" onCardClick={this.onCardDigitClick} IsActive={this.checkDigit(4)}></OneGameDesktopCard>
                            <OneGameDesktopCard Digit="6" onCardClick={this.onCardDigitClick} IsActive={this.checkDigit(6)}></OneGameDesktopCard>
                            <OneGameDesktopCard Digit="8" onCardClick={this.onCardDigitClick} IsActive={this.checkDigit(8)}></OneGameDesktopCard>
                        </div>

                        <div className="Row">
                            <OneGameDesktopCard Digit="3" onCardClick={this.onCardDigitClick} IsActive={this.checkDigit(3)}></OneGameDesktopCard>
                            <OneGameDesktopCard Digit="5" onCardClick={this.onCardDigitClick} IsActive={this.checkDigit(5)}></OneGameDesktopCard>
                            <OneGameDesktopCard Digit="7" onCardClick={this.onCardDigitClick} IsActive={this.checkDigit(7)}></OneGameDesktopCard>
                            <OneGameDesktopCard Digit="9" onCardClick={this.onCardDigitClick} IsActive={this.checkDigit(9)}></OneGameDesktopCard>
                        </div>
                    </div>

                    <div className="Card">
                        <OneGameDesktopCard Digit="J" onCardClick={this.onCardDigitClick} IsActive={this.checkDigit('J')}></OneGameDesktopCard>
                    </div>
                </div>
                );
        }
        else if(this.props.GamePageStatus === GAMEPAGE_STATUS.WAITING)
        {
            cardsSetArea = (<div>
                Ожидание хода
            </div>)
        }
        else
        {
            function GetScore(digitUser1, digitUser2)
            {
                if (digitUser1 === 'J') digitUser1 = 11;
                if (digitUser2 === 'J') digitUser2 = 11;

                digitUser1 = +digitUser1;
                digitUser2 = +digitUser2;

                if ((digitUser1 != 11) && ((digitUser1 < 2) || (digitUser1 > 9))) return 0;
                if ((digitUser2 != 11) && ((digitUser2 < 2) || (digitUser2 > 9))) return 0;
    
                if ((digitUser1 > digitUser2) && (digitUser1 % digitUser2 != 0)) return digitUser1 % digitUser2;
                if ((digitUser1 < digitUser2) && (digitUser2 % digitUser1 == 0)) return Math.round(digitUser2 / digitUser1);
    
                return 0;
            }
    
            if ( (this.props.competitorDigit1 && this.props.competitorDigit2 && this.props.competitorDigit3) &&
                (this.props.myDigit1 && this.props.myDigit2 && this.props.myDigit3))
                {
                    var score1 = GetScore(this.props.myDigit1, this.props.competitorDigit1);
                    var score2 = GetScore(this.props.myDigit2, this.props.competitorDigit2);
                    var score3 = GetScore(this.props.myDigit3, this.props.competitorDigit3);

                    cardsSetArea = (<div className="ScoreOnDesktop">
                        <div data-positive={(score1 > 0) ? "1" : "0"}>{score1}</div>
                        <div data-positive={(score2 > 0) ? "1" : "0"}>{score2}</div>
                        <div data-positive={(score3 > 0) ? "1" : "0"}>{score3}</div>
                    </div>)

                    var competitorScore1 = GetScore(this.props.competitorDigit1, this.props.myDigit1);
                    var competitorScore2 = GetScore(this.props.competitorDigit2, this.props.myDigit2);
                    var competitorScore3 = GetScore(this.props.competitorDigit3, this.props.myDigit3);
                    competitorScoreArea= (<div className="ScoreOnDesktop">
                        <div data-positive={(competitorScore1 > 0) ? "1" : "0"}>{competitorScore1}</div>
                        <div data-positive={(competitorScore2 > 0) ? "1" : "0"}>{competitorScore2}</div>
                        <div data-positive={(competitorScore3 > 0) ? "1" : "0"}>{competitorScore3}</div>
                    </div>)

                }
                else
                {
                    cardsSetArea = (<div>
                        Раунд не закончен
                    </div>)
                }

            
        }


        return (
			<LanguageContext.Consumer>
				{(context) =>
				(
					<div className="Playground">
                        {competitorScoreArea}
                        <div className="Table">
                            <div className="CardsContainer">
                                <div className="Card Shirt">
                                    <OneGameRoundDigit Digit={this.props.competitorDigit1} DigitColor="blue"></OneGameRoundDigit>
                                </div>                                
                                <div className="Card Shirt">
                                    <OneGameRoundDigit Digit={this.props.competitorDigit2} DigitColor="blue"></OneGameRoundDigit>
                                </div>
                                <div className="Card Shirt">
                                    <OneGameRoundDigit Digit={this.props.competitorDigit3} DigitColor="blue"></OneGameRoundDigit>
                                </div>
                            </div>

                            <div className="CardsContainer">
                                <div className="Card IconPlace">
                                    <OneGameRoundDigit Digit={this.state.myDigit1} DigitColor="red" onDigitClick={this.onDesktopDigitClick} Position="1"></OneGameRoundDigit>
                                </div>
                                <div className="Card IconPlace">
                                    <OneGameRoundDigit Digit={this.state.myDigit2} DigitColor="red" onDigitClick={this.onDesktopDigitClick} Position="2"></OneGameRoundDigit>
                                </div>
                                <div className="Card IconPlace">
                                    <OneGameRoundDigit Digit={this.state.myDigit3} DigitColor="red" onDigitClick={this.onDesktopDigitClick} Position="3"></OneGameRoundDigit>
                                </div>
                            </div>
                        </div>

                        {cardsSetArea}
                    </div>
				)}
			</LanguageContext.Consumer>
		);

	}
}
GamePageDesktop.contextType = LanguageContext;
