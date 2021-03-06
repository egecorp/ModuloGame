import React from 'react'
import ReactDOM from  'react-dom'
import {LanguageContext} from '../Language/LangPack'

export default class HeadNavigation extends React.Component {
	render() { 
			return (
				<div className="HeadNavigation" data-title={this.props.title}>
					{this.props.children}
				</div>
			);
	}
}