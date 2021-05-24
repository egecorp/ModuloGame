import React from 'react';
import { LanguageContext } from '../../Language/LangPack';
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

	onGameClick(g) {
		this.props.NavigationButtonCallBack(DEVICE_STATUS.GAME_SHOW_GAME, g);

	}

	render() {

		let activeGames = this.props.Device.myUser.ActiveGames.map((g) =>
			<OneGame key={g.Id} game={g} onGameClickCallBack={this.onGameClick} />
		);

		let recentGames = this.props.Device.myUser.RecentGames.map((g) =>
			<OneGame key={g.Id} game={g} onGameClickCallBack={this.onGameClick} />
		);


		return (
			<LanguageContext.Consumer>
				{(context) =>
				(
					<>
						<HeadNavigation column="2">
							<p className="Title">{context.GetText('gamelist', 'labelWindow')}</p>

							<button onClick={this.createGame} className="ButtonGreen">{context.GetText('gamelist', 'buttonHeaderLabel')}</button>
						</HeadNavigation>

						<div className="GameList">
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

							<div className="Profile">
								<div className="Avatar">
									<img src="/img/avatar/1/boy.1.png" alt="No Avatar"></img>
								</div>

								<p className="Title">{this.props.Device.myUser.NicName}</p>
							</div>
						</div>
					</>
				)}
			</LanguageContext.Consumer>
		);
	}
}