import React from 'react'


export default class OneUser extends React.Component {

    constructor(props)
    {
        super(props);
        this.onPlayClick = this.onPlayClick.bind(this);
    }

    onPlayClick()
    {
        console.log("onPlayClick");
        this.props.onUserClick(this.props.userId);
    }

	render() {
		return (
			<li className="DarkLiStyle" onClick={this.onPlayClick}>
				<div className="Avatar"></div>
				<p>{this.props.Name}</p>
				<button className="ButtonBlackTrans" onClick={this.onPlayClick}>
					<p>Вызов</p>
					<div className="IconSword"></div>
				</button>
			</li>
		);
	}
}