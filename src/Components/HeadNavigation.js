import React from 'react'


export default class HeadNavigation extends React.Component {
	render() { 
			return (
				<div className="HeadNavigation" data-title={this.props.title}>
					{this.props.children}
				</div>
			);
	}
}