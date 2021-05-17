import React from 'react';
import {LanguageContext} from '../../Language/LangPack'
import HeadNavigation from '../../Components/HeadNavigation';
import MsgBox2Buttons from "../../Components/MsgBox2Buttons"
import GAME_STATUS from '../../Lib/GameStatus';
import DEVICE_STATUS from '../../Lib/DeviceStatus';


export default class GamePage extends React.Component {
    currentGame = null;
    constructor(props, context) {
		super(props);
		this.state = {};
        this.currentContext = context;

        this.currentGame = props.CurrentGame;

        this.modalButtonAcceptOnClick = this.modalButtonAcceptOnClick.bind(this);
        this.modalButtonDeclineOnClick = this.modalButtonDeclineOnClick.bind(this);

        this.cancelButtonOnClick = this.cancelButtonOnClick.bind(this);

	}

    cancelButtonOnClick()
    {
        this.props.NavigationButtonCallBack(DEVICE_STATUS.GAME_SHOW_LIST);
    }

    onGameChangeCallBack(r)
    {
        console.log("onGameChangeCallBack");
        console.log(r);
    }

	modalButtonAcceptOnClick()
	{
        var postData = { Id : this.currentGame.Id, DeviceWorkToken : this.props.Device.DeviceWorkToken };
		console.log("modalButtonAcceptOnClick");
        switch (this.currentGame.GameStatus)
        {
            case GAME_STATUS.GAME_WAIT_USER1:
                this.props.Device.AcceptGame(this.onGameChangeCallBack, this, postData);
                break;
            case GAME_STATUS.GAME_WAIT_USER2:
                this.props.NavigationButtonCallBack(DEVICE_STATUS.GAME_SHOW_LIST);
                break;
            default:
                this.props.NavigationButtonCallBack(DEVICE_STATUS.GAME_SHOW_LIST);
                return;
        }
	}
    
    modalButtonDeclineOnClick()
	{
        var postData = { Id : this.currentGame.Id, DeviceWorkToken : this.props.Device.DeviceWorkToken };
		console.log("modalButtonDeclineOnClick");
        switch (this.currentGame.GameStatus)
        {
            case GAME_STATUS.GAME_WAIT_USER1:
                this.props.Device.DeclineGame(this.onGameChangeCallBack, this, postData);    
                break;
            case GAME_STATUS.GAME_WAIT_USER2:
                this.props.Device.WithdrawGame(this.onGameChangeCallBack, this, postData);                
                break;
            default:
                this.props.NavigationButtonCallBack(DEVICE_STATUS.GAME_SHOW_LIST);
                return;
        }
	}

	render() {
	
        var MsgBoxHTML = null;

        var MsgBoxTitle = null;
        var MsgBoxText = null;
        var MsgBoxFirstButton = null;
        var MsgBoxSecondButton = null;

        switch (this.currentGame.GameStatus)
        {
            case GAME_STATUS.GAME_WAIT_USER1:
                MsgBoxTitle = "Заголовок?"
                MsgBoxText = this.currentContext.GetText('game.page', 'StartGame.WaitMe');
                MsgBoxFirstButton = this.currentContext.GetText('common', 'popupButtonAccept');
                MsgBoxSecondButton =this.currentContext.GetText('common', 'popupButtonDecline');
                break;
            case GAME_STATUS.GAME_WAIT_USER2:
                MsgBoxTitle = "Заголовок?"
                MsgBoxText = this.currentContext.GetText('game.page', 'StartGame.Wait');
                MsgBoxFirstButton = this.currentContext.GetText('common', 'popupButtonWait');
                MsgBoxSecondButton =this.currentContext.GetText('common', 'popupButtonWithdraw');
                break;
            default:
                MsgBoxTitle = null;
        }

        if (MsgBoxText)
        {
            MsgBoxHTML = (
            <MsgBox2Buttons 
                ModalButton1={MsgBoxFirstButton}
                ModalButton2={MsgBoxSecondButton}
                OnButtonClick1={this.modalButtonAcceptOnClick}
                OnButtonClick2={this.modalButtonDeclineOnClick}
            >
                <div className="Content">
                    <p className="Title">{MsgBoxTitle}</p>
                    <p>{MsgBoxText}</p>
                </div>
            </MsgBox2Buttons>
            )
        }
        
            return (
                <LanguageContext.Consumer>
                    {(context) =>
                    ( 
                    <>
                        <HeadNavigation>
                            <button className="ButtonBack"  onClick={this.cancelButtonOnClick}></button>
                            <p className="HeadNavigationTitle">{context.GetText('signup', 'labelWindow')}</p>
                        </HeadNavigation>
    
                        <div className="SignUp">
                            <p className="GeneralSubtitle">{context.GetText('signup', 'sublabelWindow')}</p>
 
                        </div>
    
                        <div className="FooterArea">
                            <button onClick={this.nextButtonOnClick}>{context.GetText('signup', 'continueButton')}</button>
                        </div>
    
                        {MsgBoxHTML}
                        
                    </>
                    )}
                </LanguageContext.Consumer>
            );

     
	}
}
GamePage.contextType = LanguageContext;