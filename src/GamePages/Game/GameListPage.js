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
							<p className="Modulo">{context.GetText('gamelist', 'labelWindow')}</p>

							<button className="ButtonGreen IconMenu"></button>
						</HeadNavigation>

						<div className="GameList">
							<button className="ButtonBig" onClick={this.createGame}>{context.GetText('gamelist', 'buttonHeaderLabel')}</button>

							<div className="List">
								<div className="Current">
									<p className="GeneralSubtitle">{context.GetText('gamelist', 'sublabelWindow')}</p>

									<ul>
										{activeGames}
									</ul>
								</div>

								<div className="Finished">
									<p className="Title">{context.GetText('gamelist', 'sublabelFinished')}</p>

									<ul>
										{recentGames}
									</ul>
								</div>
							</div>
						</div>
					
						<div className="ProfileContainer">
							<div className="Character">
								<img src="/img/avatar/1/boy.1.png" alt="No Avatar" />
							</div>

							<ul className="Userbar">
								<li className="ChangeSmile">
									<button className="IconSmile"></button>
								</li>

								<li className="Nickname">
									<p>{this.props.Device.myUser.NicName}</p>
								</li>

								<li className="Stats">
									<div className="IconStar"></div>
									<p>{this.props.Device.myUser.CommonRating}</p>
								</li>
							</ul>
						</div>
					</>
				)}
			</LanguageContext.Consumer>
		);
	}
}