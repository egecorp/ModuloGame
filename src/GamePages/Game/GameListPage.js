import React from 'react';
import {LanguageContext} from '../../Language/LangPack';
import HeadNavigation from '../../Components/HeadNavigation';


export default class GameListPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				currentLogin: 'Hello', 
				currentToken: 'Token',
		};
	}

	render() {
		
		

		return (
			<LanguageContext.Consumer>
			{(context) =>
			( 
				<>
					<HeadNavigation>
						<button className="ButtonBack"></button>

						<p className="HeadNavigationTitle">{context.GetText('gamelist', 'labelWindow')}</p>

						<button className="ButtonGreen">{context.GetText('gamelist', 'buttonHeaderLabel')}</button>
					</HeadNavigation>
					
					<div className="GameList">
						<div className="Games NowPlaying">
							<p className="GeneralSubtitle">{context.GetText('gamelist', 'sublabelNowPlaying')}:</p>
						
							<ul>
								<li>
									<div className="Player">
										<div className="Logo"></div>
										<p>Vinni</p>
									</div>

									<p>Идёт раунд 5</p>
									
									<div className="Player">
										<div className="Logo"></div>
										<p>Калашников</p>
									</div>
								</li>

								<li>
									<div className="Player">
										<div className="Logo"></div>
										<p>Kanunita</p>
									</div>

									<p>Идёт раунд 5</p>
									
									<div className="Player">
										<div className="Logo"></div>
										<p>Бот</p>
									</div>
								</li>

								<li>
									<div></div>
									<p>Идёт раунд 2</p>
									<div></div>
								</li>
							</ul>
						</div>

						<div className="Games Finished">
							<p className="GeneralSubtitle">{context.GetText('gamelist', 'sublabelFinished')}:</p>
						
							<ul>
								<li></li>
								<li></li>
								<li></li>
							</ul>
						</div>
					</div>
				</>
			)}
			</LanguageContext.Consumer>
		);
	
	}
}