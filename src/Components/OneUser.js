import React from 'react'


export default class OneUser extends React.Component {

	render() {
		return (
			<li className="DarkLiStyle">
				<div className="Avatar"></div>
				<p>{this.props.Name}</p>
				<button className="ButtonBlackTrans" onClick={this.props.onUserClick} data-userid={this.props.userId}>
					<p>Вызов</p>
					<div className="IconSword"></div>
				</button>
			</li>
		);
	}
}