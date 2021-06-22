import React from 'react';
import { LanguageContext } from '../../Language/LangPack'
import HeadNavigation from '../../Components/HeadNavigation';
import MsgBox from "../../Components/MsgBox"
import GAME_STATUS from '../../Lib/GameStatus';
import DEVICE_STATUS from '../../Lib/DeviceStatus';
import GAMEPAGE_STATUS from '../../Lib/GamePageStatus';
import OneUserGame from '../../Model/OneUserGame';

import GamePageDesktop from './GamePageDesktop';
import GamePageRound from './GamePageRound';
import GamePagePlayers  from './GamePagePlayers'
import GamePageFooterButton  from './GamePageFooterButton'
import GamePageMyAcception from './GamePageMyAcception';

export default class GamePage extends React.Component {
	currentGame = null;
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
            currentRound : {},
			canUseJoker: false,
			game: null
		};




		this.cancelButtonOnClick = this.cancelButtonOnClick.bind(this);

		this.onFooterButtonClick = this.onFooterButtonClick.bind(this);
		this.setDigits = this.setDigits.bind(this);

		this.updateGameInfo = this.updateGameInfo.bind(this);
		this.onLoadGameInfo = this.onLoadGameInfo.bind(this);
		this.giveUpButtonOnClick = this.giveUpButtonOnClick.bind(this);
        this.onRoundClick = this.onRoundClick.bind(this);

        this.setGamePageStatus = this.setGamePageStatus.bind(this);

        this.OpenMain = this.OpenMain.bind(this);
        this.OpenRound = this.OpenRound.bind(this);
	}


	updateIntervalObject = null;
	componentDidMount() {
		var thisObject = this;
		setTimeout(() => thisObject.updateGameInfo(), 1000);

		if (!this.updateIntervalObject) {
			this.updateIntervalObject = setInterval(() => thisObject.updateGameInfo(), 3000);
		}
        this.OpenMain();
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
                && (this.state.game.MyUserMaxRoundNumber === gameInfo.MyUserMaxRoundNumber)
                && (this.state.game.CompetitorUserMaxRoundNumber === gameInfo.CompetitorUserMaxRoundNumber)
                ))
            {
				var newGame = new OneUserGame(gameInfo);
				this.currentGame = newGame;

                if (
                    (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_WAIT_COMPETITOR) ||
                    (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_ROUND) ||
                    (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_LASTROUND)
                )
                {
                    this.clearDigits();
                    this.setState({ 
                        game: newGame                        
                    });
                    this.OpenRound(this.state.currentShownRoundNumber);
                }
                else
                {
                    if (newGame.GameStatus === GAME_STATUS.GAME_WAIT_USER1)
                    {
                        this.setState({ 
                            game: newGame, 
                            gamePageStatus : GAMEPAGE_STATUS.WAIT_MY_ACCEPTION
                        });
                    }
                    else if (newGame.GameStatus === GAME_STATUS.GAME_WAIT_USER2)
                    {
                        this.setState({ 
                            game: newGame, 
                            gamePageStatus : GAMEPAGE_STATUS.WAIT_COMPETITOR_ACCEPTION
                        });
                    }
                    else
                    {
                        if (
                            (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_PLAYING) ||
                            (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_ALLDIGIT) ||
                            (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_REQUEST)
                        )
                            {
                                this.OpenRound(this.state.currentShownRoundNumber);
                            }
                            else
                            {
                                this.OpenMain();
                            }

                        this.setState({ 
                            game: newGame, 
                            canUseJoker: newGame.MyUserCanUseJoker, 
                        });
                        
                    }
                }
            }
            else
            {
                //console.log("Do not change game", gameInfo);
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
            (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_PLAYING)  ||
            (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_WAIT_COMPETITOR)  ||
            (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_ROUND)         
           )
        {
            this.OpenMain();
        }
        else if (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_LASTROUND)
        {
            this.clearDigits();
            this.OpenRound(this.currentGame.RoundNumber);

        }
		else if (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_ALLDIGIT) 
        {
            this.sendRound();
		}
		else 
        {
            this.OpenRound(this.currentGame.RoundNumber);
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
            if (d + '' === '11') return 11;
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
            this.setState({gamePageStatus : GAMEPAGE_STATUS.PLAY_WAIT_COMPETITOR});
        }
        else {
            this.OpenMain()
        }
        this.clearDigits();
    }


	setDigits(d1, d2, d3) {
  /*      var newGamePageStatus = this.state.gamePageStatus;

        if ( (!d1 || !d2 || !d3) && (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_ALLDIGIT))
        {
            newGamePageStatus = GAMEPAGE_STATUS.PLAY_PLAYING;
        }

        if ( (d1 && d2 && d3) && (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_PLAYING))
        {
            newGamePageStatus = GAMEPAGE_STATUS.PLAY_ALLDIGIT;
        }
*/
    this.setState({ myDigit1: d1, myDigit2: d2, myDigit3: d3/*, gamePageStatus: newGamePageStatus*/ });
	}


	onRoundClick(roundNumber) {
        this.OpenRound(roundNumber);
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

    setGamePageStatus(newStatus)
    {
        this.setState({gamePageStatus : newStatus});
    }

	render() {

		var MsgBoxHTML = null;

		if (this.state.gamePageStatus === GAMEPAGE_STATUS.WAIT_MY_ACCEPTION) 
        {
            MsgBoxHTML = (<GamePageMyAcception
                            Device={this.props.Device}  
                            CurrentGame={this.state.game || this.props.CurrentGame} 
                         > </GamePageMyAcception>);
        }
        else if (
            !this.state.game ||
            (this.state.gamePageStatus === GAMEPAGE_STATUS.MAIN_REQUEST) ||
            (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_REQUEST))
        {
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


		var gameArea;

		if (
            (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_PLAYING) ||
            (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_ALLDIGIT) ||
            (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_REQUEST)
           )
        {
			gameArea = (
                <GamePageDesktop 
                    Device={this.props.Device} 
                    GamePageStatus={this.state.gamePageStatus}  
                    CurrentGame={this.state.game || this.props.CurrentGame} 
                    competitorDigit1 = {null}
                    competitorDigit2 = {null}
                    competitorDigit3 = {null}
                    SetDigits = {this.setDigits}
                    myDigit1 = {this.state.myDigit1 ? (this.state.myDigit1 + "") : null}
                    myDigit2 = {this.state.myDigit2 ? (this.state.myDigit2 + "") : null}
                    myDigit3 = {this.state.myDigit3 ? (this.state.myDigit3 + "") : null}
                    canUseJoker = {this.state.game.MyUserCanUseJoker}
                    SetGamePageStatus = {this.setGamePageStatus}
                    RoundNumber = {this.currentShownRoundNumber}
                    >				
				</GamePageDesktop>
			);
        }
        else if (
                (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_ROUND) ||
                (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_LASTROUND) ||
                (this.state.gamePageStatus === GAMEPAGE_STATUS.PLAY_WAIT_COMPETITOR)
            )
        {
            gameArea = (
                <GamePageDesktop 
                    Device={this.props.Device} 
                    GamePageStatus={this.state.gamePageStatus}  
                    CurrentGame={this.state.game || this.props.CurrentGame} 
                    /*competitorDigit1 = {this.state.competitorDigit1 ? (this.state.competitorDigit1 + "") : null}
                    competitorDigit2 = {this.state.competitorDigit2 ? (this.state.competitorDigit2 + "") : null}
                    competitorDigit3 = {this.state.competitorDigit3 ? (this.state.competitorDigit3 + "") : null}
                    myDigit1 = {this.state.myDigit1 ? (this.state.myDigit1 + "") : null}
                    myDigit2 = {this.state.myDigit2 ? (this.state.myDigit2 + "") : null}
                    myDigit3 = {this.state.myDigit3 ? (this.state.myDigit3 + "") : null}*/
                    canUseJoker = {this.state.game.MyUserCanUseJoker}
                    SetGamePageStatus = {this.setGamePageStatus}
                    CurrentRound = {this.state.currentRound}
                    >				
                </GamePageDesktop>
            );
        }
        else if  (this.state.gamePageStatus === GAMEPAGE_STATUS.WAIT_COMPETITOR_ACCEPTION)
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
                            <GamePagePlayers
                                GamePageStatus={this.state.gamePageStatus}  
                                Device={this.props.Device}  
                                CurrentGame={this.state.game || this.props.CurrentGame} 
                                CurrentShownRoundNumber={this.state.currentShownRoundNumber} 
                            >
                            </GamePagePlayers>

							{gameArea}
						</div>

						<div className="FooterArea">
                            <GamePageFooterButton
                                GamePageStatus={this.state.gamePageStatus}  
                                Device={this.props.Device}  
                                CurrentGame={this.state.game || this.props.CurrentGame} 
                                OnButtonClick={this.onFooterButtonClick}
                            ></GamePageFooterButton>
						</div>

						{MsgBoxHTML}
					</>
				)}
			</LanguageContext.Consumer>
		);
	}

    OpenRound(roundNumber)
    {
        let currentRound= this.currentGame.GetRound(roundNumber);
        let newGamePageStatus = null;
    
        let competitorDigit1 = currentRound.competitorDigit1;
        let competitorDigit2 = currentRound.competitorDigit2;
        let competitorDigit3 = currentRound.competitorDigit3;
        let myDigit1 = currentRound.myDigit1;
        let myDigit2 = currentRound.myDigit2;
        let myDigit3 = currentRound.myDigit3;

        if (this.currentGame.IsMyUserPlaying)
        {
            if (roundNumber + '' === this.currentGame.RoundNumber + '')
            {
                myDigit1 = this.state.myDigit1;
                myDigit2 = this.state.myDigit2;
                myDigit3 = this.state.myDigit3;

                if (myDigit1 && myDigit2 && myDigit3)
                {
                    newGamePageStatus = GAMEPAGE_STATUS.PLAY_ALLDIGIT;
                }
                else
                {
                    newGamePageStatus= GAMEPAGE_STATUS.PLAY_PLAYING;
                }
            }
            else if ((roundNumber + 1) + '' === this.currentGame.RoundNumber + '')
            {
                newGamePageStatus= GAMEPAGE_STATUS.PLAY_LASTROUND;
                /*myDigit1 = null;
                myDigit2 = null;
                myDigit3 = null;*/
            }
            else
            {
                newGamePageStatus= GAMEPAGE_STATUS.PLAY_ROUND;
            }
        }
        else
        {
            if (roundNumber + '' === this.currentGame.RoundNumber + '')
            {
                newGamePageStatus = GAMEPAGE_STATUS.PLAY_WAIT_COMPETITOR;
            }
            else
            {
                newGamePageStatus= GAMEPAGE_STATUS.PLAY_ROUND;
            }
        }

		this.setState(
		{
			gamePageStatus: newGamePageStatus,
            currentShownRoundNumber : roundNumber,
            currentRound : {
                competitorDigit1: competitorDigit1,
                competitorDigit2: competitorDigit2,
                competitorDigit3: competitorDigit3,
                myDigit1: myDigit1,
                myDigit2: myDigit2,
                myDigit3: myDigit3
            }
			
		});
    }

    OpenMain()
    {        
        let newGamePageStatus;
        if (!this.currentGame.IsActive)
        {
            newGamePageStatus = GAMEPAGE_STATUS.MAIN_FINISH;
        }
        else
        {
            if (this.currentGame.IsMyUserPlaying)
            {
                newGamePageStatus = GAMEPAGE_STATUS.MAIN_PLAYING;
            }
            else if (this.currentGame.GameStatus === GAME_STATUS.GAME_WAIT_USER1)
            {
                newGamePageStatus = GAMEPAGE_STATUS.WAIT_MY_ACCEPTION;
            }
            else if (this.currentGame.GameStatus === GAME_STATUS.GAME_WAIT_USER2)
            {
                newGamePageStatus = GAMEPAGE_STATUS.WAIT_COMPETITOR_ACCEPTION;
            }
            else
            {
                newGamePageStatus = GAMEPAGE_STATUS.MAIN_WAIT_COMPETITOR;
            }
        }        

		this.setState(
		{
			gamePageStatus: newGamePageStatus,
            currentShownRoundNumber : null,
            currentRound : {}
		});
    }

}
GamePage.contextType = LanguageContext;