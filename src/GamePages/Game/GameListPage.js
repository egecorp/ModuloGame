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

									<p className="Status">Идёт раунд 5</p>
									
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

									<p className="Status">Идёт раунд 5</p>
									
									<div className="Player">
										<div className="Logo"></div>
										<p>Бот</p>
									</div>
								</li>

								<li>
									<div className="Player">
										<div className="Logo"></div>
										<p>WOLF_F</p>
									</div>

									<div className="Cup">
										<div className="ELO">
											<p>(1056)</p>
										</div>

										<div className="Score">
											<p className="Status">Счёт 8:6</p>
											<div className="Info">
												<p>{context.GetText('gamelist', 'labelCup')}</p>
												<div className="IconCup"></div>
											</div>
										</div>

										<div className="ELO">
											<p>(1086)</p>
										</div>
									</div>

									<div className="Player">
										<div className="Logo"></div>
										<p>ЧёКаво?</p>
									</div>
								</li>
							</ul>
						</div>

						<div className="Games Finished">
							<p className="GeneralSubtitle">{context.GetText('gamelist', 'sublabelFinished')}:</p>
						
							<ul>
								<li data-win="left">
									<div className="Player">
										<div className="Logo"></div>
										<p>Clown02</p>
									</div>

									<p className="Status">10:5</p>
									
									<div className="Player">
										<div className="Logo"></div>
										<p>ANIM</p>
									</div>
								</li>

								<li data-cup="1" data-win="left">
									<div className="Player">
										<div className="Logo"></div>
										<p>ЧёКаво?</p>
									</div>

									<div className="Cup">
										<div className="ELO">
											<p>+2</p>
											<p>(1198)</p>
										</div>

										<div className="Score">
											<p className="Status">10:9</p>
											<div className="Info">
												<p>{context.GetText('gamelist', 'labelCup')}</p>
												<div className="IconCup"></div>
											</div>
										</div>

										<div className="ELO">
											<p>-2</p>
											<p>(1020)</p>
										</div>
									</div>

									<div className="Player">
										<div className="Logo"></div>
										<p>Кирик</p>
									</div>
								</li>

								<li data-win="right">
									<div className="Player">
										<div className="Logo"></div>
										<p>EZWINB4</p>
									</div>

									<p className="Status">2:10</p>
									
									<div className="Player">
										<div className="Logo"></div>
										<p>Vinni</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</>
			)}
			</LanguageContext.Consumer>
		);
	
	}
}