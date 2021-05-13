import React from 'react';
import MsgBox from "../../Components/MsgBox";
import {LanguageContext} from '../../Language/LangPack';
import DEVICE_STATUS from '../../Lib/DeviceStatus';


export default class GameStartRandomPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
        this.cancelButtonOnClick = this.cancelButtonOnClick.bind(this);
	}

    cancelButtonOnClick()
    {
        this.props.NavigationButtonCallBack(DEVICE_STATUS.GAME_SHOW_LIST);
    }

	render() {


			return (
				<LanguageContext.Consumer>
				{(context) =>
				( 
					<MsgBox ModalButton={context.GetText('common', 'popupButtonCancel')} buttonOnClick={this.cancelButtonOnClick}>
						<div className="Content">
							<p className="Title">{context.GetText('findrandom', 'labelWindow')}</p>

							<p>{context.GetText('findrandom', 'text')}</p>
						</div>
					</MsgBox>
				)}
				</LanguageContext.Consumer>
			);
	}
}