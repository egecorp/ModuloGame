import React from 'react'

export default class OneGameRoundDigit extends React.Component {

	constructor(props, context) {
		super(props);
		this.onDigitClick = this.onDigitClick.bind(this);
	}

	onDigitClick() {
		if (typeof (this.props.onDigitClick) === "function") this.props.onDigitClick(this.props.Digit, this.props.Position);
	}

	render() {

        if(this.props.Digit)
        {
            return (<div 
                        onclick={this.onDigitClick} 
                        className="DigitIcon" 
                        data-digit={this.props.Digit} 
                        data-color={this.props.DigitColor}
                    >
                    </div>);
        }
        else
        {
            return null;
        }

	}
}