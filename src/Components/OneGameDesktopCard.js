import React from 'react'

export default class OneGameDesktopCard extends React.Component {

	constructor(props, context) {
		super(props);
		this.onCardClick = this.onCardClick.bind(this);
	}

	onCardClick() {
		if (typeof (this.props.onCardClick) === "function") this.props.onCardClick(this.props.Digit, this.props.IsActive);
	}

	render() {

        return (
        <div className="Card">
            <div 
                className="DigitIcon" 
                data-digit={this.props.Digit}
                data-color={this.props.Color || "red"} 
                data-active={this.props.IsActive ? 1 : 0} 
                onClick={this.props.IsActive ? this.onCardClick : null}>

            </div>
        </div>);
	}
}