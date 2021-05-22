import React from 'react';
import {LanguageContext} from '../../Language/LangPack'
import HeadNavigation from '../../Components/HeadNavigation';
import MsgBox2Buttons from "../../Components/MsgBox2Buttons"
import GAME_STATUS from '../../Lib/GameStatus';
import DEVICE_STATUS from '../../Lib/DeviceStatus';


export default class GamePage extends React.Component {
    currentGame = null;
    isFirstGamer  = false;
    constructor(props, context) {
		super(props);
		this.state = 
        {
            playing : false,
            competitorDigit1 : null,
            competitorDigit2 : null,
            competitorDigit3 : null,
            myDigit1 : null,
            myDigit2 : null,
            myDigit3 : null,
            canUseJoker: false
        };
        this.currentContext = context;

        this.currentGame = props.CurrentGame;

        this.isFirstGamer = this.currentGame.User1Id == props.Device.myUser.Id;

        this.modalButtonAcceptOnClick = this.modalButtonAcceptOnClick.bind(this);
        this.modalButtonDeclineOnClick = this.modalButtonDeclineOnClick.bind(this);

        this.cancelButtonOnClick = this.cancelButtonOnClick.bind(this);

        this.onFooterButtonClick = this.onFooterButtonClick.bind(this);
        this.onCardDigitClick = this.onCardDigitClick.bind(this);
        this.onDesktopDigitClick = this.onDesktopDigitClick.bind(this);
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


    onFooterButtonClick(ev)
    {
        if (this.state.playing === true)
        {

            function getDigit(d)
            {
                if (d + '' === '2') return 2;
                if (d + '' === '3') return 3;
                if (d + '' === '4') return 4;
                if (d + '' === '5') return 5;
                if (d + '' === '6') return 6;
                if (d + '' === '7') return 7;
                if (d + '' === '8') return 8;
                if (d + '' === '9') return 9;
                if (d + '' === 'J') return 11;

            }
            if (this.state.myDigit1 && this.state.myDigit2 && this.state.myDigit3)
            {
                var postData = {
                     Id : this.currentGame.Id,
                     Digit1 : getDigit(this.state.myDigit1),
                     Digit2 : getDigit(this.state.myDigit2),
                     Digit3 : getDigit(this.state.myDigit3),
                     DeviceWorkToken: this.props.Device.DeviceWorkToken
                    };

                switch (this.currentGame.GameStatus)
                {
                    case GAME_STATUS.GAME_ROUND_1_NOUSER:
                        postData.RoundNumber = 1;
                        break;                        
                    case GAME_STATUS.GAME_ROUND_2_NOUSER:
                        postData.RoundNumber = 2;
                        break;
                    case GAME_STATUS.GAME_ROUND_3_NOUSER:
                        postData.RoundNumber = 3;
                        break;
                    case GAME_STATUS.GAME_ROUND_4_NOUSER:
                        postData.RoundNumber = 4;
                        break;
                    case GAME_STATUS.GAME_ROUND_5_NOUSER:
                        postData.RoundNumber = 5;
                        break;
                    default:break;
                }
                if (this.isFirstGamer)
                {
                    switch (this.currentGame.GameStatus)
                    {
                        case GAME_STATUS.GAME_ROUND_1_USER2_DONE:
                            postData.RoundNumber = 1;
                            break;                        
                        case GAME_STATUS.GAME_ROUND_2_USER2_DONE:
                            postData.RoundNumber = 2;
                            break;
                        case GAME_STATUS.GAME_ROUND_3_USER2_DONE:
                            postData.RoundNumber = 3;
                            break;
                        case GAME_STATUS.GAME_ROUND_4_USER2_DONE:
                            postData.RoundNumber = 4;
                            break;
                        case GAME_STATUS.GAME_ROUND_5_USER2_DONE:
                            postData.RoundNumber = 5;
                            break;
                        default:break;
                    }   
                }
                else
                {
                    switch (this.currentGame.GameStatus)
                    {
                        case GAME_STATUS.GAME_ROUND_1_USER1_DONE:
                            postData.RoundNumber = 1;
                            break;                        
                        case GAME_STATUS.GAME_ROUND_2_USER1_DONE:
                            postData.RoundNumber = 2;
                            break;
                        case GAME_STATUS.GAME_ROUND_3_USER1_DONE:
                            postData.RoundNumber = 3;
                            break;
                        case GAME_STATUS.GAME_ROUND_4_USER1_DONE:
                            postData.RoundNumber = 4;
                            break;
                        case GAME_STATUS.GAME_ROUND_5_USER1_DONE:
                            postData.RoundNumber = 5;
                            break;
                        default:break;
                    } 

                }
                   
                if (postData.RoundNumber)
                {
                    this.props.Device.PlayRound(this.onGameChangeCallBack, this, postData);
                }
                else
                {
                    this.setState({playing:false});
                }
            }
            else
            {
                this.setState({playing:false});
            }
        }
        else
        {
            this.setState({playing:true});
        }
        
    }

	modalButtonAcceptOnClick()
	{
        var postData = { Id : this.currentGame.Id, DeviceWorkToken : this.props.Device.DeviceWorkToken };

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

    onCardDigitClick(ev)
    {
        var newDigit = ev.target.dataset.digit + "";
        if ((newDigit === 'J') && !this.state.canUseJoker) 
        {
            console.log("Cannot use Joker");
            return;
        }
        var d1 = this.state.myDigit1 ? (this.state.myDigit1 + "") : null;
        var d2 = this.state.myDigit2 ? (this.state.myDigit2 + "") : null;
        var d3 = this.state.myDigit3 ? (this.state.myDigit3 + "") : null;
        
        if (!d1)
        {
            this.setState( { myDigit1:newDigit} );
        }
        else if (!d2 && (d1 !== newDigit))
        {
            this.setState( { myDigit2:newDigit} );
        }
        else if (!d3 && (d1 !== newDigit) && (d2 !== newDigit))
        {
            this.setState( { myDigit3:newDigit} );
        }
        else
        {
            console.log("Strange situation");
            console.log(ev, newDigit, d1, d2, d3);    
        }
    }

    onDesktopDigitClick(ev)
    {
        let digitNumber = ev.target.dataset.digitnumber + "";
        if (digitNumber === "1") this.setState({myDigit1 : null});
        if (digitNumber === "2") this.setState({myDigit2 : null});
        if (digitNumber === "3") this.setState({myDigit3 : null});
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
            footerButtonOrLabel = <button onClick={this.onFooterButtonClick}>{FooterButtonText}</button>;
        }
        else if (FooterLabelText)
        {
            footerButtonOrLabel = <div >{FooterLabelText}</div>; 
        }

        var gameArea;

        if (this.state.playing === true)
        {
            var d1 = this.state.myDigit1 ? (this.state.myDigit1 + "") : null;
            var d2 = this.state.myDigit2 ? (this.state.myDigit2 + "") : null;
            var d3 = this.state.myDigit3 ? (this.state.myDigit3 + "") : null;

            function checkDigit(d)
            {
                return (d1 !== (d + "")) && (d2 !== (d + "")) && (d3 !== (d + ""));
            }
            
            gameArea = (
                <div  className="PlayingRoundArea"> 
                    <div className="Desktop">
                        <div></div>
                        <div className="DigitCardContainer Competitor">
                            {
                            this.state.competitorDigit1 ?  
                                (
                                    <div className="DigitIcon" data-digit={this.state.competitorDigit1} data-color="blue"></div>    
                                ) : null
                            }
                        </div>
                        <div className="DigitCardContainer Competitor">
                            {
                            this.state.competitorDigit2 ?  
                                (
                                    <div className="DigitIcon" data-digit={this.state.competitorDigit2} data-color="blue"></div>    
                                ) : null
                            }
                        </div>
                        <div className="DigitCardContainer Competitor">
                            {
                            this.state.competitorDigit3 ?  
                                (
                                    <div className="DigitIcon" data-digit={this.state.competitorDigit3} data-color="blue"></div>    
                                ) : null
                            }
                        </div>
                        <div></div>

                        <div></div>
                        <div className="DigitCardContainer MyRound">
                            {
                            this.state.myDigit1 ?  
                                (
                                    <div className="DigitIcon" data-digitnumber="1" data-digit={this.state.myDigit1} data-color="red" onClick={this.onDesktopDigitClick}></div>    
                                ) : null
                            }
                        </div>
                        <div className="DigitCardContainer MyRound">
                            {
                            this.state.myDigit2 ?  
                                (
                                    <div className="DigitIcon" data-digitnumber="2" data-digit={this.state.myDigit2} data-color="red" onClick={this.onDesktopDigitClick}></div>    
                                ) : null
                            }
                        </div>
                        <div className="DigitCardContainer MyRound">
                            {
                            this.state.myDigit3 ?  
                                (
                                    <div className="DigitIcon" data-digitnumber="3" data-digit={this.state.myDigit3} data-color="red" onClick={this.onDesktopDigitClick}></div>    
                                ) : null
                            }
                        </div>
                        <div></div>
                    </div>
                    <div className="Cards">
                        <div className="DigitCardContainer">
                            <div className="DigitIcon" data-digit="2" data-color="red" data-active={checkDigit(2) ? 1 : 0} onClick={checkDigit(2) ? this.onCardDigitClick : null}></div>    
                        </div>
                        <div className="DigitCardContainer">
                            <div className="DigitIcon" data-digit="4" data-color="red" data-active={checkDigit(4) ? 1 : 0} onClick={checkDigit(4) ? this.onCardDigitClick : null}></div>    
                        </div>
                        <div className="DigitCardContainer">
                            <div className="DigitIcon" data-digit="6" data-color="red" data-active={checkDigit(6) ? 1 : 0}  onClick={checkDigit(6) ? this.onCardDigitClick : null}></div>    
                        </div>
                        <div className="DigitCardContainer">
                            <div className="DigitIcon" data-digit="8" data-color="red" data-active={checkDigit(8) ? 1 : 0}  onClick={checkDigit(8) ? this.onCardDigitClick : null}></div>    
                        </div>
                        <div className="DigitCardContainer">
                            <div className="DigitIcon" data-digit="J" data-color="red" data-active={checkDigit('J') ? 1 : 0}  onClick={checkDigit('J') ? this.onCardDigitClick : null}></div>    
                        </div>

                        <div className="DigitCardContainer">
                            <div className="DigitIcon" data-digit="3" data-color="red" data-active={checkDigit(3) ? 1 : 0}  onClick={checkDigit(3) ? this.onCardDigitClick : null}></div>    
                        </div>
                        <div className="DigitCardContainer">
                            <div className="DigitIcon" data-digit="5" data-color="red" data-active={checkDigit(5) ? 1 : 0}  onClick={checkDigit(5) ? this.onCardDigitClick : null}></div>    
                        </div>
                        <div className="DigitCardContainer">
                            <div className="DigitIcon" data-digit="7" data-color="red" data-active={checkDigit(7) ? 1 : 0}  onClick={checkDigit(7) ? this.onCardDigitClick : null}></div>    
                        </div>
                        <div className="DigitCardContainer">
                            <div className="DigitIcon" data-digit="9" data-color="red" data-active={checkDigit(9) ? 1 : 0}  onClick={checkDigit(9) ? this.onCardDigitClick : null}></div>    
                        </div>


                    </div>
                </div>
            )
        }
        else
        {
            gameArea = (
                <div className="GameArea">

                    <div className='OneRound'>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                        <div className='RoundName'>{this.currentContext.GetText('game.page', 'RoundName1')}</div>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                    </div>
                    

                    <div className='OneRound'>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                        <div className='RoundName'>{this.currentContext.GetText('game.page', 'RoundName2')}</div>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                    </div>
                    

                    <div className='OneRound'>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                        <div className='RoundName'>{this.currentContext.GetText('game.page', 'RoundName3')}</div>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                    </div>
                    

                    <div className='OneRound'>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                        <div className='RoundName'>{this.currentContext.GetText('game.page', 'RoundName4')}</div>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                    </div>
                    

                    <div className='OneRound'>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                        <div className='RoundName'>{this.currentContext.GetText('game.page', 'RoundName5')}</div>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                        <div className='OneDigit'></div>
                    </div>
                </div>
            )
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
                            {gameArea}
                            
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