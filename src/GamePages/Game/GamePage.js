import React from 'react';
import { LanguageContext } from '../../Language/LangPack'
import HeadNavigation from '../../Components/HeadNavigation';
import MsgBox from "../../Components/MsgBox"
import MsgBox2Buttons from "../../Components/MsgBox2Buttons"
import GAME_STATUS from '../../Lib/GameStatus';
import DEVICE_STATUS from '../../Lib/DeviceStatus';
import GAMEPAGE_STATUS from '../../Lib/GamePageStatus';
import OneModuloGame from '../../Model/OneModuloGame';

import GamePageDesktop from './GamePageDesktop';
import GamePageRound from './GamePageRound';


export default class GamePage extends React.Component {
	currentGame = null;
	isFirstGamer = false;
	constructor(props, context) {
        super(props);

        this.currentContext = context;
		this.currentGame = props.CurrentGame;

		
		this.state =
		{
			gamePageStatus: GAMEPAGE_STATUS.MAIN,
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
			if (!(this.state.game 
                && (this.state.game.GameStatus === gameInfo.GameStatus)
                && (this.state.game.User1MaxRoundNumber === gameInfo.User1MaxRoundNumber)
                && (this.state.game.User2MaxRoundNumber === gameInfo.User2MaxRoundNumber)
                )) 
            {
console.log("Change game", gameInfo);
				var newGame = new OneModuloGame(gameInfo);
				this.currentGame = newGame;

				let canUseJoker = ((this.props.Device.myUser.Id === newGame.User1Id) && newGame.User1CanUseJoker) ||
					((this.props.Device.myUser.Id === newGame.User2Id) && newGame.User2CanUseJoker);

                if(this.state.gamePageStatus === GAMEPAGE_STATUS.WAIT) 
                {
                    if ((newGame.RoundNumber < 5) && (+newGame.RoundNumber === (+this.state.currentShownRoundNumber + 1)))
                    {
                        this.setState({ 
                            game: newGame, 
                            canUseJoker: canUseJoker, 
                            gamePageStatus : GAMEPAGE_STATUS.LASTROUND
                        });
                        clearDigits();
                    }
                    else
                    {
                        this.setState({ 
                            game: newGame, 
                            canUseJoker: canUseJoker, 
                            gamePageStatus : GAMEPAGE_STATUS.ROUND
                        });
                        clearDigits();
                    }
                }
                else if (this.state.gamePageStatus === GAMEPAGE_STATUS.ROUND)
                {
                    this.setState({ 
                        game: newGame, 
                        canUseJoker: canUseJoker, 
                        gamePageStatus : GAMEPAGE_STATUS.ROUND
                    });
                    clearDigits();
                }
                else
                {
                    this.setState({ 
                        game: newGame, 
                        canUseJoker: canUseJoker, 
                    });
                }
            }
            else
            {
                console.log("Do not change game", gameInfo);
            }
		}
		else {
			console.log("onLoadGame got wrong answer:");
			console.log(gameInfo);
		}
	}



	cancelButtonOnClick() {
		this.props.NavigationButtonCallBack(DEVICE_STATUS.GAME_SHOW_LIST);
	}

	giveUpButtonOnClick() {
		let postData = {
             Id: this.currentGame.Id, 
             DeviceWorkToken: this.props.Device.DeviceWorkToken,
             RoundNumber : this.currentGame.RoundNumber
            };
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
        else if (this.state.gamePageStatus === GAMEPAGE_STATUS.LASTROUND)
        {
            this.setState({
                currentShownRoundNumber : this.currentGame.RoundNumber,
                gamePageStatus: GAMEPAGE_STATUS.PLAY 
                });
        }
		else if (
            (this.state.gamePageStatus === GAMEPAGE_STATUS.ALLDIGIT) 
           )
        {
            if (this.state.myDigit1 && this.state.myDigit2 && this.state.myDigit3) 
            {
                this.sendRound();
            }
            else
            {
                console.log('What is it?');
                this.setState({ gamePageStatus: GAMEPAGE_STATUS.MAIN });
            }
		}
		else {
			this.setState({
                currentShownRoundNumber : this.currentGame.RoundNumber,
                gamePageStatus: GAMEPAGE_STATUS.PLAY 
                });
		}

	}

    sendRound()
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

        let postData = {
            Id: this.currentGame.Id,
            Digit1: getDigit(this.state.myDigit1),
            Digit2: getDigit(this.state.myDigit2),
            Digit3: getDigit(this.state.myDigit3),
            DeviceWorkToken: this.props.Device.DeviceWorkToken,
            RoundNumber: this.currentGame.RoundNumber
        };
       
        if (postData.RoundNumber) {
            this.props.Device.PlayRound(this.onGameChangeCallBack, this, postData);
            this.setState({gamePageStatus : GAMEPAGE_STATUS.WAIT});
        }
        else {
            this.setState({gamePageStatus : GAMEPAGE_STATUS.MAIN});
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
        if ((roundNumber + '' === this.currentGame.RoundNumber + '') && this.currentGame.IsMyUserPlaying)
        {
            this.setState(
                {
                     gamePageStatus: GAMEPAGE_STATUS.PLAY,
                     currentShownRoundNumber : roundNumber
                });    
        }
        else
        {
            this.setState(
                {
                    gamePageStatus :  GAMEPAGE_STATUS.ROUND,
                    currentShownRoundNumber : roundNumber
                });
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

    clearDigits()
    {
        this.setState(
            {
                myDigit1: null,
                myDigit2: null,
                myDigit3: null
            });
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
						<header>
							<p className="Title">{this.currentContext.GetText('game.page', 'StartGame.WaitPlease')}</p>
						</header>
						
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
						<header>
							<p className="Title">{MsgBoxTitle}</p>
						</header>

						<p>{MsgBoxText}</p>
					</div>
				</MsgBox2Buttons>
			)
		}

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
                    CurrentGame={this.state.game || this.props.CurrentGame} 
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
        else if ((this.state.gamePageStatus === GAMEPAGE_STATUS.ROUND) ||
        (this.state.gamePageStatus === GAMEPAGE_STATUS.WAIT))
        {
            var currentRound= this.currentGame.GetRound(this.state.currentShownRoundNumber);
            let myDigit1 = currentRound.myDigit1;
            let myDigit2 = currentRound.myDigit2;
            let myDigit3 = currentRound.myDigit3;

            let competitorDigit1 = currentRound.competitorDigit1;
            let competitorDigit2 = currentRound.competitorDigit2;
            let competitorDigit3 = currentRound.competitorDigit3;

            gameArea = (
                <GamePageDesktop 
                    Device={this.props.Device} 
                    GamePageStatus={this.state.gamePageStatus}  
                    CurrentGame={this.state.game || this.props.CurrentGame} 
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
                    CurrentGame={this.state.game || this.props.CurrentGame} 
                    CurrentRoundNumber={this.currentGame.RoundNumber}
                    onRoundClickCallBack = {this.onRoundClick}
                    SetDigits={this.setDigits}>				
				</GamePageRound>
			);
		}

		var giveUpButton = this.currentGame.IsActive ?
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