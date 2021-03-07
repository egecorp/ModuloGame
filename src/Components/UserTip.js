import React from 'react'
import ReactDOM from  'react-dom'
import {LanguageContext} from '../Language/LangPack'

export default class UserTip extends React.Component {
	render() { 
			return (
				<div className="UserTip">
					{this.props.children}
				</div>
			);
	}
}