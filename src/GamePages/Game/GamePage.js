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

        var FooterButtonText = null;
        var FooterLabelText = null;

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

        switch(this.currentGame.GameStatus)
        {
            case GAME_STATUS.GAME_ROUND_1_NOUSER:
            case GAME_STATUS.GAME_ROUND_1_USER2_DONE:
            case GAME_STATUS.GAME_ROUND_2_NOUSER:
            case GAME_STATUS.GAME_ROUND_2_USER2_DONE:
            case GAME_STATUS.GAME_ROUND_3_NOUSER:
            case GAME_STATUS.GAME_ROUND_3_USER2_DONE:
            case GAME_STATUS.GAME_ROUND_4_NOUSER:
            case GAME_STATUS.GAME_ROUND_4_USER2_DONE:
            case GAME_STATUS.GAME_ROUND_5_NOUSER:
            case GAME_STATUS.GAME_ROUND_5_USER2_DONE:
                FooterButtonText = this.currentContext.GetText('game.page', 'FooterButtonPlayRound');
                break;

            case GAME_STATUS.GAME_ROUND_1_USER1_DONE:
            case GAME_STATUS.GAME_ROUND_2_USER1_DONE:
            case GAME_STATUS.GAME_ROUND_3_USER1_DONE:
            case GAME_STATUS.GAME_ROUND_4_USER1_DONE:
            case GAME_STATUS.GAME_ROUND_5_USER1_DONE:
                FooterLabelText = this.currentContext.GetText('game.page', 'FooterButtonPlayRound');
                break;

            case GAME_STATUS.GAME_ROUND_1_USER1_GIVEUP:
            case GAME_STATUS.GAME_ROUND_2_USER1_GIVEUP:
            case GAME_STATUS.GAME_ROUND_3_USER1_GIVEUP:
            case GAME_STATUS.GAME_ROUND_4_USER1_GIVEUP:
            case GAME_STATUS.GAME_ROUND_5_USER1_GIVEUP:
                FooterLabelText = this.currentContext.GetText('game.page', 'StartGame.GiveUpMe');
                break;
                
            case GAME_STATUS.GAME_ROUND_1_USER2_GIVEUP:
            case GAME_STATUS.GAME_ROUND_2_USER2_GIVEUP:
            case GAME_STATUS.GAME_ROUND_3_USER2_GIVEUP:
            case GAME_STATUS.GAME_ROUND_4_USER2_GIVEUP:
            case GAME_STATUS.GAME_ROUND_5_USER2_GIVEUP:
                FooterLabelText = this.currentContext.GetText('game.page', 'StartGame.GiveUp');
                break;

            case GAME_STATUS.GAME_ROUND_1_TIMEOUT:
            case GAME_STATUS.GAME_ROUND_2_TIMEOUT:
            case GAME_STATUS.GAME_ROUND_3_TIMEOUT:
            case GAME_STATUS.GAME_ROUND_4_TIMEOUT:
            case GAME_STATUS.GAME_ROUND_5_TIMEOUT:
                FooterLabelText = this.currentContext.GetText('game.page', 'StartGame.RoundDoneTimeout');
                break;

            case GAME_STATUS.GAME_FINISH_USER1_WIN:
                FooterLabelText = this.currentContext.GetText('game.page', 'StartGame.Win');
                break;

            case GAME_STATUS.GAME_FINISH_USER2_WIN:        
                FooterLabelText = this.currentContext.GetText('game.page', 'StartGame.Defease');
                break;

            case GAME_STATUS.GAME_FINISH_USER2_DRAW:
                FooterLabelText = this.currentContext.GetText('game.page', 'StartGame.Draw');            
                break;

            default:
                FooterLabelText = this.currentContext.GetText('game.page', 'StartGame.NoGame');            
                break;
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
        
        var footerButtonOrLabel = null;
        if (FooterButtonText)
        {
            footerButtonOrLabel = <button onClick={this.nextButtonOnClick}>{FooterButtonText}</button>;
        }
        else if (FooterLabelText)
        {
            footerButtonOrLabel = <div >{FooterLabelText}</div>; 
        }

            return (
                <LanguageContext.Consumer>
                    {(context) =>
                    ( 
                    <>
                        <HeadNavigation>
                            <button className="ButtonBack"  onClick={this.cancelButtonOnClick}></button>
                            <p className="HeadNavigationTitle">{context.GetText('game.page', 'GameHeader')}</p>
                        </HeadNavigation>
    
                        <div className="GamePage">
                            <div className="GamerArea">
                                <div className="Gamer Gamer1">
                                    <img src='/img/avatar/1/boy.1.png' alt="No Avatar"></img>
                                    <div className="Name">{this.currentGame.User1Name}</div>
                                </div>

                                <div className="GameStatus">
                                    <div className="GameStatusIcon"></div>
                                    <div className="GameStatusText"></div>
                                </div>

                                <div className="GameResult">
                                    <div className="My">60</div>
                                    <div className="Divider">:</div>
                                    <div className="Competitor">11</div>
                                </div>

                                <div className="Gamer Gamer2">
                                    <img src='/img/avatar/1/boy.1.png' alt="No Avatar"></img>
                                    <div className="Name">{this.currentGame.User2Name}</div>
                                </div>
                            </div>
                            <div className="GameArea">

                                <div className='OneRound'>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                    <div className='RoundName'>{context.GetText('game.page', 'RoundName1')}</div>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                </div>
                                

                                <div className='OneRound'>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                    <div className='RoundName'>{context.GetText('game.page', 'RoundName2')}</div>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                </div>
                                

                                <div className='OneRound'>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                    <div className='RoundName'>{context.GetText('game.page', 'RoundName3')}</div>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                </div>
                                

                                <div className='OneRound'>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                    <div className='RoundName'>{context.GetText('game.page', 'RoundName4')}</div>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                </div>
                                

                                <div className='OneRound'>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                    <div className='RoundName'>{context.GetText('game.page', 'RoundName5')}</div>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                    <div className='OneDigit'></div>
                                </div>
                            </div>
                        </div>
    
                        <div className="FooterArea">
                            {footerButtonOrLabel}
                        </div>
    
                        {MsgBoxHTML}
                        
                    </>
                    )}
                </LanguageContext.Consumer>
            );

     
	}
}
GamePage.contextType = LanguageContext;