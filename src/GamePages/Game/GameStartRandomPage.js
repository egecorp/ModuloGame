import React from 'react';
import MsgBox from "../../Components/MsgBox";
import {LanguageContext} from '../../Language/LangPack';


export default class GameStartRandomPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {


			return (
				<LanguageContext.Consumer>
				{(context) =>
				( 
					<MsgBox ModalButton={context.GetText('common', 'popupButtonCancel')}>
						<div className="Content">
							<p class="Title">{context.GetText('findrandom', 'labelWindow')}</p>

							<p>{context.GetText('findrandom', 'text')}</p>
						</div>
					</MsgBox>
				)}
				</LanguageContext.Consumer>
			);
	}
}