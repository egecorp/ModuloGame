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

        return (
			<LanguageContext.Consumer>
				{(context) =>
				(
					<div className="Playground">
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
                    </div>
				)}
			</LanguageContext.Consumer>
		);

	}
}
GamePageDesktop.contextType = LanguageContext;
