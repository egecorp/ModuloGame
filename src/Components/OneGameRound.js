import React from 'react'
import { LanguageContext } from '../Language/LangPack'
import OneGameRoundDigit from './OneGameRoundDigit'

export default class OneGameRound extends React.Component {

	constructor(props, context) {
		super(props);
		this.onRoundClick = this.onRoundClick.bind(this);
	}

	onRoundClick(ev) {
		if (typeof (this.props.onRoundClickCallBack) === "function") this.props.onRoundClickCallBack(this.props.RoundNumber);
	}


	render() {


        return (
            <LanguageContext.Consumer>
                {(context) =>
                (
                <div 
                    className="Round"
                    onClick={this.onRoundClick}
                    data-active={this.props.IsActive ? "1" : "0"}
                >
                    <div className="DigitContainer">
                        <p data-color="red"><OneGameRoundDigit Digit={this.props.myDigit1} DigitColor="red"></OneGameRoundDigit></p>
                        <p data-color="green"><OneGameRoundDigit Digit={this.props.myDigit2} DigitColor="red"></OneGameRoundDigit></p>
                        <p data-color="yellow"><OneGameRoundDigit Digit={this.props.myDigit3} DigitColor="red"></OneGameRoundDigit></p>
                    </div>

                    <p>{context.GetText('game.page', ('RoundName' + this.props.RoundNumber))}</p>

                    <div className="DigitContainer">
                        <p data-color="red"><OneGameRoundDigit Digit={this.props.competitorDigit1} DigitColor="blue"></OneGameRoundDigit></p>
                        <p data-color="green"><OneGameRoundDigit Digit={this.props.competitorDigit2} DigitColor="blue"></OneGameRoundDigit></p>
                        <p data-color="yellow"><OneGameRoundDigit Digit={this.props.competitorDigit3} DigitColor="blue"></OneGameRoundDigit></p>
                    </div>
                </div>
                )}
            </LanguageContext.Consumer>

        )

	}
}