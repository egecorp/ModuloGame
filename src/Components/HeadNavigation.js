import React from 'react'


export default class HeadNavigation extends React.Component {
	render() { 
			return (
				<div className="HeadNavigation" data-column={this.props.column}>
					{this.props.children}
				</div>
			);
	}
}