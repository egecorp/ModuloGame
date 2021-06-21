import React from 'react';
import { LanguageContext } from '../../Language/LangPack'
//import GAMEPAGE_STATUS from '../../Lib/GamePageStatus';
import MsgBox2Buttons from "../../Components/MsgBox2Buttons"

export default class GamePageMyAcception extends React.Component {

	
	constructor(props, context) {
		super(props);
        this.currentContext = context;

        this.modalButtonAcceptOnClick = this.modalButtonAcceptOnClick.bind(this);
        this.modalButtonDeclineOnClick = this.modalButtonDeclineOnClick.bind(this);
        this.onGameChangeCallBack = this.onGameChangeCallBack.bind(this);
    }

	render() {

        var MsgBoxTitle = this.currentContext.GetText('game.page', 'StartGame.WaitMeTitle');
        var MsgBoxText = this.currentContext.GetText('game.page', 'StartGame.WaitMe');
        var MsgBoxFirstButton = this.currentContext.GetText('common', 'popupButtonAccept');
        var MsgBoxSecondButton = this.currentContext.GetText('common', 'popupButtonDecline');

        return (
        <MsgBox2Buttons
            ModalButton1={MsgBoxFirstButton}
            ModalButton2={MsgBoxSecondButton}
            OnButtonClick1={this.modalButtonAcceptOnClick}
            OnButtonClick2={this.modalButtonDeclineOnClick}
        >
            <div className="Content">
                <header>
                    <p className="Title">{MsgBoxTitle}</p>
                </header>

                <p>{MsgBoxText}</p>
            </div>
        </MsgBox2Buttons>
        );
	}

    
	modalButtonAcceptOnClick() 
    {
		let postData = { Id: this.props.CurrentGame.Id, DeviceWorkToken: this.props.Device.DeviceWorkToken };
        this.props.Device.AcceptGame(this.onGameChangeCallBack, this, postData);
    } 

	modalButtonDeclineOnClick() 
    {
		let postData = { Id: this.props.CurrentGame.Id, DeviceWorkToken: this.props.Device.DeviceWorkToken };
        this.props.Device.DeclineGame(this.onGameChangeCallBack, this, postData);
	}

    onGameChangeCallBack(r) {
        console.log("onGameChangeCallBack");
        console.log(r);
	}
}
GamePageMyAcception.contextType = LanguageContext;
