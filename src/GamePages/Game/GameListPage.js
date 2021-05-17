import React from 'react';
import {LanguageContext} from '../../Language/LangPack';
import HeadNavigation from '../../Components/HeadNavigation';
import DEVICE_STATUS from '../../Lib/DeviceStatus';
import OneGame from '../../Components/OneGame';



export default class GameListPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
        this.createGame = this.createGame.bind(this);
		this.onGameClick = this.onGameClick.bind(this);
	}

    createGame() {
        this.props.NavigationButtonCallBack(DEVICE_STATUS.GAME_CREATING_CHOOSE);
    }

	onGameClick(g)
	{
        this.props.NavigationButtonCallBack(DEVICE_STATUS.GAME_SHOW_GAME, g);

	}

	render() {
		
        let activeGames = this.props.Device.myUser.ActiveGames.map((g)=>
            <OneGame key={g.Id} game={g}  onGameClickCallBack={this.onGameClick}/>
        );

        let recentGames = this.props.Device.myUser.RecentGames.map((g)=>
            <OneGame key={g.Id} game={g} onGameClickCallBack={this.onGameClick} />
        );

		
		return (
			<LanguageContext.Consumer>
			{(context) =>
			( 
				<>
					<HeadNavigation>
                        <div className="HeadAvatar">
                            <img src='/img/avatar/1/boy.1.png' alt="No Avatar"></img>
                        </div>
						<div></div>
                        <p className="HeadUserNicName">{this.props.Device.myUser.NicName}</p>
						<button onClick={this.createGame} className="ButtonGreen">{context.GetText('gamelist', 'buttonHeaderLabel')}</button>
					</HeadNavigation>
					<div className="GameList">
                        <div className="GameListHeader2">
                            <div></div>
                            <p className="HeadNavigationTitle">{context.GetText('gamelist', 'labelWindow')}</p>
                        </div>
						<div className="Games NowPlaying">
							<p className="GeneralSubtitle">{context.GetText('gamelist', 'sublabelNowPlaying')}</p>
						
							<ul>
								{activeGames}


							</ul>
						</div>

						<div className="Games Finished">
							<p className="GeneralSubtitle">{context.GetText('gamelist', 'sublabelFinished')}</p>
						
							<ul>
								{recentGames}
							</ul>
						</div>
					</div>
				</>
			)}
			</LanguageContext.Consumer>
		);
	}
}