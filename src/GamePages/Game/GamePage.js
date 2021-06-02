import React from 'react';
import { LanguageContext } from '../../Language/LangPack'
import HeadNavigation from '../../Components/HeadNavigation';
import MsgBox from "../../Components/MsgBox"
import MsgBox2Buttons from "../../Components/MsgBox2Buttons"
import GAME_STATUS from '../../Lib/GameStatus';
import DEVICE_STATUS from '../../Lib/DeviceStatus';
import GAMEPAGE_STATUS from '../../Lib/GamePageStatus';
import OneModuloGame from '../../Model/Game';

import GamePageDesktop from './GamePageDesktop';
import GamePageRound from './GamePageRound';


export default class GamePage extends React.Component {
	currentGame = null;
	isFirstGamer = false;
	rounds = [];
	constructor(props, context) {
        super(props);

        this.currentContext = context;
		this.currentGame = props.CurrentGame;

		
		this.state =
		{
			gamePageStatus: GAMEPAGE_STATUS.MAIN,
            currentRoundNumber:this.getCurrentRoundNumerForGame(),
            currentShownRoundNumber : null,
			competitorDigit1: null,
			competitorDigit2: null,
			competitorDigit3: null,
			myDigit1: null,
			myDigit2: null,
			myDigit3: null,
			canUseJoker: false,
			game: null
		};

		this.isFirstGamer = this.currentGame.User1Id === props.Device.myUser.Id;

		this.modalButtonAcceptOnClick = this.modalButtonAcceptOnClick.bind(this);
		this.modalButtonDeclineOnClick = this.modalButtonDeclineOnClick.bind(this);

		this.cancelButtonOnClick = this.cancelButtonOnClick.bind(this);

		this.onFooterButtonClick = this.onFooterButtonClick.bind(this);
		this.setDigits = this.setDigits.bind(this);

		this.updateGameInfo = this.updateGameInfo.bind(this);
		this.onLoadGameInfo = this.onLoadGameInfo.bind(this);
		this.giveUpButtonOnClick = this.giveUpButtonOnClick.bind(this);
        this.onRoundClick = this.onRoundClick.bind(this);
	}


    getCurrentRoundNumerForGame()
    {
        switch (this.currentGame.GameStatus) {
            case GAME_STATUS.GAME_ROUND_1_NOUSER:
            case GAME_STATUS.GAME_ROUND_1_USER1_DONE:
            case GAME_STATUS.GAME_ROUND_1_USER2_DONE:
            case GAME_STATUS.GAME_ROUND_1_USER1_GIVEUP:
            case GAME_STATUS.GAME_ROUND_1_USER2_GIVEUP:
            case GAME_STATUS.GAME_ROUND_1_TIMEOUT:
                return 1;
            case GAME_STATUS.GAME_ROUND_2_NOUSER:
            case GAME_STATUS.GAME_ROUND_2_USER1_DONE:
            case GAME_STATUS.GAME_ROUND_2_USER2_DONE:
            case GAME_STATUS.GAME_ROUND_2_USER1_GIVEUP:
            case GAME_STATUS.GAME_ROUND_2_USER2_GIVEUP:
            case GAME_STATUS.GAME_ROUND_2_TIMEOUT:
                return 2;
            case GAME_STATUS.GAME_ROUND_3_NOUSER:
            case GAME_STATUS.GAME_ROUND_3_USER1_DONE:
            case GAME_STATUS.GAME_ROUND_3_USER2_DONE:
            case GAME_STATUS.GAME_ROUND_3_USER1_GIVEUP:
            case GAME_STATUS.GAME_ROUND_3_USER2_GIVEUP:
            case GAME_STATUS.GAME_ROUND_3_TIMEOUT:
                return 3;
            case GAME_STATUS.GAME_ROUND_4_NOUSER:
            case GAME_STATUS.GAME_ROUND_4_USER1_DONE:
            case GAME_STATUS.GAME_ROUND_4_USER2_DONE:
            case GAME_STATUS.GAME_ROUND_4_USER1_GIVEUP:
            case GAME_STATUS.GAME_ROUND_4_USER2_GIVEUP:
            case GAME_STATUS.GAME_ROUND_4_TIMEOUT:
                return 4;
            case GAME_STATUS.GAME_ROUND_5_NOUSER:
            case GAME_STATUS.GAME_ROUND_5_USER1_DONE:
            case GAME_STATUS.GAME_ROUND_5_USER2_DONE:
            case GAME_STATUS.GAME_ROUND_5_USER1_GIVEUP:
            case GAME_STATUS.GAME_ROUND_5_USER2_GIVEUP:
            case GAME_STATUS.GAME_ROUND_5_TIMEOUT:
            case GAME_STATUS.GAME_FINISH_USER1_WIN:
            case GAME_STATUS.GAME_FINISH_USER2_WIN:
            case GAME_STATUS.GAME_FINISH_USER2_DRAW:
                return 5;
            default: return 0;
        }

    }

	updateIntervalObject = null;
	componentDidMount() {
		var thisObject = this;
		setTimeout(() => thisObject.updateGameInfo(), 1000);

		if (!this.updateIntervalObject) {
			this.updateIntervalObject = setInterval(() => thisObject.updateGameInfo(), 3000);
		}
	}

	componentWillUnmount() {
		if (this.updateIntervalObject) clearInterval(this.updateIntervalObject);
	}

	updateGameInfo() {
		this.props.Device.GetGameInfo(this.props.CurrentGame.Id, this.onLoadGameInfo, this);
	}

	onLoadGameInfo(gameInfo) {
		if (gameInfo && gameInfo.Id) 
        {
			if (!(this.state.game && this.state.game.GameStatus === gameInfo.GameStatus)) {

				var newGame = new OneModuloGame(gameInfo);
				this.currentGame = newGame;


				let canUseJoker = ((this.props.Device.myUser.Id === newGame.User1Id) && newGame.User1CanUseJoker) ||
					((this.props.Device.myUser.Id === newGame.User2Id) && newGame.User2CanUseJoker);

                this.setState({ 
                    game: newGame, 
                    canUseJoker: canUseJoker, 
                    currentRoundNumber:this.getCurrentRoundNumerForGame()
                });
            }
		}
		else {
			console.log("onLoadGame got wrong answer:");
			console.log(gameInfo);
		}
	}

	loadRound(round) {
		if (!this.currentGame.Rounds) return;

	}

	cancelButtonOnClick() {
		this.props.NavigationButtonCallBack(DEVICE_STATUS.GAME_SHOW_LIST);
	}

	giveUpButtonOnClick() {
		let postData = { Id: this.currentGame.Id, DeviceWorkToken: this.props.Device.DeviceWorkToken };
		switch (this.currentGame.GameStatus) {
			case GAME_STATUS.GAME_ROUND_1_NOUSER:
			case GAME_STATUS.GAME_ROUND_1_USER2_DONE:
				postData.RoundNumber = 1;
				break;
			case GAME_STATUS.GAME_ROUND_2_NOUSER:
			case GAME_STATUS.GAME_ROUND_2_USER2_DONE:
				postData.RoundNumber = 2;
				break;
			case GAME_STATUS.GAME_ROUND_3_NOUSER:
			case GAME_STATUS.GAME_ROUND_3_USER2_DONE:
				postData.RoundNumber = 3;
				break;
			case GAME_STATUS.GAME_ROUND_4_NOUSER:
			case GAME_STATUS.GAME_ROUND_4_USER2_DONE:
				postData.RoundNumber = 4;
				break;
			case GAME_STATUS.GAME_ROUND_5_NOUSER:
			case GAME_STATUS.GAME_ROUND_5_USER2_DONE:
				postData.RoundNumber = 5;
				break;
			default: break;
		}
		this.props.Device.GiveUpGame(this.onGameChangeCallBack, this, postData);
	}

	onGameChangeCallBack(r) {
		console.log("onGameChangeCallBack");
		console.log(r);
	}

	onFooterButtonClick(ev) {
        if(this.currentGame.GameStatus === GAME_STATUS.GAME_WAIT_USER2)
        {
            let postData = { Id: this.currentGame.Id, DeviceWorkToken: this.props.Device.DeviceWorkToken };

            this.props.Device.WithdrawGame(this.onGameChangeCallBack, this, postData);
        }
        else if (
            (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY)  ||
            (this.state.gamePageStatus === GAMEPAGE_STATUS.WAIT)  ||
            (this.state.gamePageStatus === GAMEPAGE_STATUS.ROUND)         
           )
        {
            this.setState({ gamePageStatus: GAMEPAGE_STATUS.MAIN });
        }
		else if (
            (this.state.gamePageStatus === GAMEPAGE_STATUS.ALLDIGIT) 
           )
        {
			function getDigit(d) {
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
				let postData = {
					Id: this.currentGame.Id,
					Digit1: getDigit(this.state.myDigit1),
					Digit2: getDigit(this.state.myDigit2),
					Digit3: getDigit(this.state.myDigit3),
					DeviceWorkToken: this.props.Device.DeviceWorkToken
				};

				switch (this.currentGame.GameStatus) {
					case GAME_STATUS.GAME_ROUND_1_NOUSER:
					case GAME_STATUS.GAME_ROUND_1_USER2_DONE:
						postData.RoundNumber = 1;
						break;
					case GAME_STATUS.GAME_ROUND_2_NOUSER:
					case GAME_STATUS.GAME_ROUND_2_USER2_DONE:
						postData.RoundNumber = 2;
						break;
					case GAME_STATUS.GAME_ROUND_3_NOUSER:
					case GAME_STATUS.GAME_ROUND_3_USER2_DONE:
						postData.RoundNumber = 3;
						break;
					case GAME_STATUS.GAME_ROUND_4_NOUSER:
					case GAME_STATUS.GAME_ROUND_4_USER2_DONE:
						postData.RoundNumber = 4;
						break;
					case GAME_STATUS.GAME_ROUND_5_NOUSER:
					case GAME_STATUS.GAME_ROUND_5_USER2_DONE:
						postData.RoundNumber = 5;
						break;
					default: break;
				}


				if (postData.RoundNumber) {
					this.props.Device.PlayRound(this.onGameChangeCallBack, this, postData);
				}
				else {
					this.setState({ gamePageStatus: GAMEPAGE_STATUS.MAIL });
				}
			}
			else {
				this.setState({ gamePageStatus: GAMEPAGE_STATUS.MAIN });
			}
		}
		else {
			this.setState({ gamePageStatus: GAMEPAGE_STATUS.PLAY });
		}

	}

	modalButtonAcceptOnClick() {
		let postData = { Id: this.currentGame.Id, DeviceWorkToken: this.props.Device.DeviceWorkToken };

		switch (this.currentGame.GameStatus) {
			case GAME_STATUS.GAME_WAIT_USER1:
				this.props.Device.AcceptGame(this.onGameChangeCallBack, this, postData);
				break;
			default:
				this.props.NavigationButtonCallBack(DEVICE_STATUS.GAME_SHOW_LIST);
				return;
		}
	}

	modalButtonDeclineOnClick() {
		let postData = { Id: this.currentGame.Id, DeviceWorkToken: this.props.Device.DeviceWorkToken };

		switch (this.currentGame.GameStatus) {
			case GAME_STATUS.GAME_WAIT_USER1:
				this.props.Device.DeclineGame(this.onGameChangeCallBack, this, postData);
				break;
			default:
				this.props.NavigationButtonCallBack(DEVICE_STATUS.GAME_SHOW_LIST);
				return;
		}
	}

	setDigits(d1, d2, d3) {

        console.log('setDigits', d1,d2,d3);
 
        var newGamePageStatus = this.state.gamePageStatus;

        if ( (!d1 || !d2 || !d3) && (this.state.gamePageStatus === GAMEPAGE_STATUS.ALLDIGIT))
        {
            newGamePageStatus = GAMEPAGE_STATUS.PLAY;
        }

        if ( (d1 && d2 && d3) && (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY))
        {
            newGamePageStatus = GAMEPAGE_STATUS.ALLDIGIT;
        }

        this.setState({ myDigit1: d1, myDigit2: d2, myDigit3: d3, gamePageStatus: newGamePageStatus });

	}



	onRoundClick(roundNumber) {
        //TODO вставить проверку, если раунд текущий, то не переходим или переходим как PLAY
        this.setState(
            {
                gamePageStatus :  GAMEPAGE_STATUS.ROUND,
                currentShownRoundNumber : roundNumber
            });
	}




    refreshRounds()
    {
    
        function GetDigitOrJoker(e) {
            return (e === 11) ? "J" : e;
        }

        if (this.state.game && this.state.game.Rounds) {

            if (this.state.game.Rounds[this.state.game.User1Id + ":1"]) {
                this.rounds["1.1.1"] = this.state.game.Rounds[this.state.game.User1Id + ":1"].Digit1;
                this.rounds["1.1.2"] = this.state.game.Rounds[this.state.game.User1Id + ":1"].Digit2;
                this.rounds["1.1.3"] = this.state.game.Rounds[this.state.game.User1Id + ":1"].Digit3;
            }
            if (this.state.game.Rounds[this.state.game.User2Id + ":1"]) {
                this.rounds["1.2.1"] = this.state.game.Rounds[this.state.game.User2Id + ":1"].Digit1;
                this.rounds["1.2.2"] = this.state.game.Rounds[this.state.game.User2Id + ":1"].Digit2;
                this.rounds["1.2.3"] = this.state.game.Rounds[this.state.game.User2Id + ":1"].Digit3;
            }
            if (this.state.game.Rounds[this.state.game.User1Id + ":2"]) {
                this.rounds["2.1.1"] = this.state.game.Rounds[this.state.game.User1Id + ":2"].Digit1;
                this.rounds["2.1.2"] = this.state.game.Rounds[this.state.game.User1Id + ":2"].Digit2;
                this.rounds["2.1.3"] = this.state.game.Rounds[this.state.game.User1Id + ":2"].Digit3;
            }
            if (this.state.game.Rounds[this.state.game.User2Id + ":2"]) {
                this.rounds["2.2.1"] = this.state.game.Rounds[this.state.game.User2Id + ":2"].Digit1;
                this.rounds["2.2.2"] = this.state.game.Rounds[this.state.game.User2Id + ":2"].Digit2;
                this.rounds["2.2.3"] = this.state.game.Rounds[this.state.game.User2Id + ":2"].Digit3;
            }
            if (this.state.game.Rounds[this.state.game.User1Id + ":3"]) {
                this.rounds["3.1.1"] = this.state.game.Rounds[this.state.game.User1Id + ":3"].Digit1;
                this.rounds["3.1.2"] = this.state.game.Rounds[this.state.game.User1Id + ":3"].Digit2;
                this.rounds["3.1.3"] = this.state.game.Rounds[this.state.game.User1Id + ":3"].Digit3;
            }
            if (this.state.game.Rounds[this.state.game.User2Id + ":3"]) {
                this.rounds["3.2.1"] = this.state.game.Rounds[this.state.game.User2Id + ":3"].Digit1;
                this.rounds["3.2.2"] = this.state.game.Rounds[this.state.game.User2Id + ":3"].Digit2;
                this.rounds["3.2.3"] = this.state.game.Rounds[this.state.game.User2Id + ":3"].Digit3;
            }
            if (this.state.game.Rounds[this.state.game.User1Id + ":4"]) {
                this.rounds["4.1.1"] = GetDigitOrJoker(this.state.game.Rounds[this.state.game.User1Id + ":4"].Digit1);
                this.rounds["4.1.2"] = GetDigitOrJoker(this.state.game.Rounds[this.state.game.User1Id + ":4"].Digit2);
                this.rounds["4.1.3"] = GetDigitOrJoker(this.state.game.Rounds[this.state.game.User1Id + ":4"].Digit3);
            }
            if (this.state.game.Rounds[this.state.game.User2Id + ":4"]) {
                this.rounds["4.2.1"] = GetDigitOrJoker(this.state.game.Rounds[this.state.game.User2Id + ":4"].Digit1);
                this.rounds["4.2.2"] = GetDigitOrJoker(this.state.game.Rounds[this.state.game.User2Id + ":4"].Digit2);
                this.rounds["4.2.3"] = GetDigitOrJoker(this.state.game.Rounds[this.state.game.User2Id + ":4"].Digit3);
            }
            if (this.state.game.Rounds[this.state.game.User1Id + ":5"]) {
                this.rounds["5.1.1"] = GetDigitOrJoker(this.state.game.Rounds[this.state.game.User1Id + ":5"].Digit1);
                this.rounds["5.1.2"] = GetDigitOrJoker(this.state.game.Rounds[this.state.game.User1Id + ":5"].Digit2);
                this.rounds["5.1.3"] = GetDigitOrJoker(this.state.game.Rounds[this.state.game.User1Id + ":5"].Digit3);
            }
            if (this.state.game.Rounds[this.state.game.User2Id + ":5"]) {
                this.rounds["5.2.1"] = GetDigitOrJoker(this.state.game.Rounds[this.state.game.User2Id + ":5"].Digit1);
                this.rounds["5.2.2"] = GetDigitOrJoker(this.state.game.Rounds[this.state.game.User2Id + ":5"].Digit2);
                this.rounds["5.2.3"] = GetDigitOrJoker(this.state.game.Rounds[this.state.game.User2Id + ":5"].Digit3);
            }
        }
    }

    getFooterButtonText()
    {
        switch (this.currentGame.GameStatus) {
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

                if ((this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY) ||
                    (this.state.gamePageStatus === GAMEPAGE_STATUS.ROUND))
                {
                    return this.currentContext.GetText('game.page', 'FooterButtonBack');
                }
                else
                {
                    return this.currentContext.GetText('game.page', 'FooterButtonPlayRound');
                }

            case GAME_STATUS.GAME_WAIT_USER2:
                return this.currentContext.GetText('game.page', 'FooterButtonWithdraw');
			
            
            default:

                


				return null;
		}
    }

    
    getFooterLabelText()
    {
        switch (this.currentGame.GameStatus) {
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
            case GAME_STATUS.GAME_WAIT_USER2:
                return null;

			case GAME_STATUS.GAME_ROUND_1_USER1_DONE:
			case GAME_STATUS.GAME_ROUND_2_USER1_DONE:
			case GAME_STATUS.GAME_ROUND_3_USER1_DONE:
			case GAME_STATUS.GAME_ROUND_4_USER1_DONE:
			case GAME_STATUS.GAME_ROUND_5_USER1_DONE:
				return this.currentContext.GetText('game.page', 'FooterButtonPlayRound');
				

			case GAME_STATUS.GAME_ROUND_1_USER1_GIVEUP:
			case GAME_STATUS.GAME_ROUND_2_USER1_GIVEUP:
			case GAME_STATUS.GAME_ROUND_3_USER1_GIVEUP:
			case GAME_STATUS.GAME_ROUND_4_USER1_GIVEUP:
			case GAME_STATUS.GAME_ROUND_5_USER1_GIVEUP:
				return  this.currentContext.GetText('game.page', 'StartGame.GiveUpMe');
				

			case GAME_STATUS.GAME_ROUND_1_USER2_GIVEUP:
			case GAME_STATUS.GAME_ROUND_2_USER2_GIVEUP:
			case GAME_STATUS.GAME_ROUND_3_USER2_GIVEUP:
			case GAME_STATUS.GAME_ROUND_4_USER2_GIVEUP:
			case GAME_STATUS.GAME_ROUND_5_USER2_GIVEUP:
				return this.currentContext.GetText('game.page', 'StartGame.GiveUp');

			case GAME_STATUS.GAME_ROUND_1_TIMEOUT:
			case GAME_STATUS.GAME_ROUND_2_TIMEOUT:
			case GAME_STATUS.GAME_ROUND_3_TIMEOUT:
			case GAME_STATUS.GAME_ROUND_4_TIMEOUT:
			case GAME_STATUS.GAME_ROUND_5_TIMEOUT:
				return this.currentContext.GetText('game.page', 'StartGame.RoundDoneTimeout');

			case GAME_STATUS.GAME_FINISH_USER1_WIN:
				return this.currentContext.GetText('game.page', 'StartGame.Win');

			case GAME_STATUS.GAME_FINISH_USER2_WIN:
				return this.currentContext.GetText('game.page', 'StartGame.Defease');

			case GAME_STATUS.GAME_FINISH_USER2_DRAW:
				return this.currentContext.GetText('game.page', 'StartGame.Draw');

			default:
				return this.currentContext.GetText('game.page', 'StartGame.NoGame');

		}
    }

	render() {

		var MsgBoxHTML = null;

		var MsgBoxTitle = null;
		var MsgBoxText = null;
		var MsgBoxFirstButton = null;
		var MsgBoxSecondButton = null;

		var FooterButtonText = this.getFooterButtonText();
		var FooterLabelText =  this.getFooterLabelText();

		switch (this.currentGame.GameStatus) {
			case GAME_STATUS.GAME_WAIT_USER1:
				MsgBoxTitle = "Заголовок?"
				MsgBoxText = this.currentContext.GetText('game.page', 'StartGame.WaitMe');
				MsgBoxFirstButton = this.currentContext.GetText('common', 'popupButtonAccept');
				MsgBoxSecondButton = this.currentContext.GetText('common', 'popupButtonDecline');
				break;
			default:
				MsgBoxTitle = null;
		}



		if (!this.state.game) {
			MsgBoxHTML = (
				<MsgBox NoButton={true}>
					<div className="Content">
						<p className="Title">{this.currentContext.GetText('game.page', 'StartGame.WaitPlease')}</p>
						<p>{this.currentContext.GetText('game.page', 'StartGame.Loading')}</p>
					</div>
				</MsgBox>
			)
		}
		else if (MsgBoxText) {
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

        this.refreshRounds();

		var footerButtonOrLabel = null;
		if (FooterButtonText) {
			footerButtonOrLabel = <button onClick={this.onFooterButtonClick}>{FooterButtonText}</button>;
		}
		else if (FooterLabelText) {
			footerButtonOrLabel = <div >{FooterLabelText}</div>;
		}

		var gameArea;

		if ((this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY) ||
            (this.state.gamePageStatus === GAMEPAGE_STATUS.ALLDIGIT))
        {
			let d1 = this.state.myDigit1 ? (this.state.myDigit1 + "") : null;
			let d2 = this.state.myDigit2 ? (this.state.myDigit2 + "") : null;
			let d3 = this.state.myDigit3 ? (this.state.myDigit3 + "") : null;
			gameArea = (
                <GamePageDesktop 
                    Device={this.props.Device} 
                    GamePageStatus={this.state.gamePageStatus}  
                    CurrentGame={this.props.CurrentGame} 
                    Rounds={this.rounds}
                    competitorDigit1 = {null}
                    competitorDigit2 = {null}
                    competitorDigit3 = {null}
                    SetDigits = {this.setDigits}
                    myDigit1 = {d1}
                    myDigit2 = {d2}
                    myDigit3 = {d3}

                    >				
				</GamePageDesktop>
			);
        }
        else if (this.state.gamePageStatus === GAMEPAGE_STATUS.ROUND)
        {
            let myDigit1 = this.rounds[(this.currentShownRoundNumber) + ".1.1"];
            let myDigit2 = this.rounds[(this.currentShownRoundNumber) + ".1.2"];
            let myDigit3 = this.rounds[(this.currentShownRoundNumber) + ".1.3"];

            let competitorDigit1 = this.rounds[(this.currentShownRoundNumber) + ".2.1"];
            let competitorDigit2 = this.rounds[(this.currentShownRoundNumber) + ".2.2"];
            let competitorDigit3 = this.rounds[(this.currentShownRoundNumber) + ".2.3"];

            gameArea = (
                <GamePageDesktop 
                    Device={this.props.Device} 
                    GamePageStatus={this.state.gamePageStatus}  
                    CurrentGame={this.props.CurrentGame} 
                    Rounds={this.rounds}
                    competitorDigit1 = {competitorDigit1 ? (competitorDigit1 + "") : null}
                    competitorDigit2 = {competitorDigit2 ? (competitorDigit2 + "") : null}
                    competitorDigit3 = {competitorDigit3 ? (competitorDigit3 + "") : null}
                    
                    myDigit1 = {myDigit1 ? (myDigit1 + "") : null}
                    myDigit2 = {myDigit2 ? (myDigit2 + "") : null}
                    myDigit3 = {myDigit3 ? (myDigit3 + "") : null}

                    >				
                </GamePageDesktop>
            );
        }
        else if (this.currentGame.GameStatus === GAME_STATUS.GAME_WAIT_USER2)
        {
            gameArea = (<div className="UserTip">
	                        <p>                
                                {this.currentContext.GetText('game.page', 'InvitationText1')}
                                {this.currentContext.GetText('game.page', 'InvitationText2')}
                            </p>
                        </div>);
        }
		else 
        {
			gameArea = (
                <GamePageRound 
                    GamePageStatus={this.state.gamePageStatus}  
                    Device={this.props.Device}  
                    CurrentGame={this.props.CurrentGame} 
                    Rounds={this.rounds}
                    CurrentRoundNumber={this.state.currentRoundNumber}
                    onRoundClickCallBack = {this.onRoundClick}
                    SetDigits={this.setDigits}>				
				</GamePageRound>
			);


/*** *** Блок с обновлённых окном "Ожидание ответа от соперника..." *** ***/

/* Расположить первым ВНУТРИ HeadNavigation */
/*
<button className="ButtonBack"></button>
*/

/* Расположить ВМЕСТО RoundsContainer */
/*

*/

/* Расположить ПОД Gameground */
/*
<div className="FooterArea">
	<button>Отменить приглашение</button>
</div>
*/

/*** *** End *** *** ***/








		}

		let canGiveUp = this.currentGame.IsStart && !this.currentGame.IsGiveUp && !this.currentGame.IsFinish;
		var giveUpButton = canGiveUp ?
			(<button onClick={this.giveUpButtonOnClick} className="ButtonGreen">{this.currentContext.GetText('game.page', 'GiveUp')}</button>)
			: null;

		return (
			<LanguageContext.Consumer>
				{(context) =>
				(
					<>
						<HeadNavigation>
							<button className="ButtonBack" onClick={this.cancelButtonOnClick}></button>
							<p className="Title">{context.GetText('game.page', 'GameHeader')}</p>
							{giveUpButton}
						</HeadNavigation>

						<div className="Gameground">
							<div className="FaceToFace">
								<div className="Gamer" data-vip={(Math.random() > 0.5) ? 1 : 0}>
									<p>{this.currentGame.User1Name}</p>

									<img src='/img/avatar/1/boy.1.png' alt="No Avatar"></img>

									<div className="Buttons">
										<button className="ButtonAroundGreen IconStats"></button>
									</div>

									<div className="IconVip"></div>

									<div className="IconJoker Red">
										{this.currentGame.User1CanUseJoker ? (<div className="DigitIcon" data-digit="J" data-color="blue"></div>) : null}
									</div>
								</div>

								<div className="CurrentInfo">
									<p className="Score">{
										(((this.currentGame.User1Score || 0) > 9) ? this.currentGame.User1Score : ("0" + this.currentGame.User1Score || 0)) +
										":" +
										(((this.currentGame.User2Score || 0) > 9) ? this.currentGame.User2Score : ("0" + this.currentGame.User2Score || 0))
									}
									</p>

									<div className="Status">
										<div className="IconStatus Waiting"></div>
										<p>Ожидание...</p>
									</div>
								</div>

								<div className="Gamer" data-vip={(Math.random() > 0.5) ? 1 : 0}>
									<p>{this.currentGame.User2Name}</p>

									<img src='/img/avatar/1/boy.1.png' alt="No Avatar"></img>

									<div className="Buttons">
										<button className="ButtonAroundGreen IconAdd"></button>
										<button className="ButtonAroundGreen IconStats"></button>
									</div>

									<div className="IconVip"></div>

									<div className="IconJoker Red">
										{this.currentGame.User2CanUseJoker ? (<div className="DigitIcon" data-digit="J" data-color="blue"></div>) : null}
									</div>
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