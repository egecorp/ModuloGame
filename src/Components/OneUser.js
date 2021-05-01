import React from 'react'


export default class OneUser extends React.Component {

	render() { 
			return (
                <li>
                    <div className="Avatar"></div>
                    <p>{this.props.Name}</p>
                    <button onClick={this.props.onUserClickCallBack} data-userid={this.props.userId}></button>
                </li>
				
			);
	}
}