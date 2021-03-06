import React from 'react';
import {LanguageContext} from '../../Language/LangPack';
import HeadNavigation from '../../Components/HeadNavigation';
import DEVICE_STATUS from '../../Lib/DeviceStatus'


export default class GameStartPage extends React.Component {
	constructor(props) {
        super(props);
        this.state = {};

        this.selectBack = this.selectBack.bind(this);
        this.selectRandom = this.selectRandom.bind(this);
        this.selectUser = this.selectUser.bind(this);
        this.selectBot = this.selectBot.bind(this);
	}

    selectBack(){
        this.props.NavigationButtonCallBack(DEVICE_STATUS.GAME_SHOW_LIST);
    }

    selectRandom(){
        this.props.NavigationButtonCallBack(DEVICE_STATUS.GAME_CREATING_RANDOM);
    }
    
    selectUser(){
        this.props.NavigationButtonCallBack(DEVICE_STATUS.GAME_CREATING_FINDUSER);
    }
    
    selectBot(){
        this.props.NavigationButtonCallBack(DEVICE_STATUS.GAME_CREATING_FINDBOT);
    }

	render() {

		return (
			<LanguageContext.Consumer>
			{(context) =>
			( 
				<>
					<HeadNavigation>
						<button className="ButtonBack" onClick={this.selectBack}></button>
						
						<p className="Title">{context.GetText('gamestart', 'labelWindow')}</p>
					</HeadNavigation>
					
					<div className="GameStart ContentGap">
						<p className="GeneralSubtitle">{context.GetText('gamestart', 'sublabelWindow')}</p>
					
						<div className="Buttons">
							<button className="ButtonGreenBorder" onClick={this.selectRandom}>{context.GetText('gamestart', 'buttonRandomPlayer')}</button>
							<button className="ButtonGreenBorder"  onClick={this.selectUser}>{context.GetText('gamestart', 'buttonChoosePlayer')}</button>
							<button className="ButtonGreenBorder"  onClick={this.selectBot}>{context.GetText('gamestart', 'buttonChooseBot')}</button>
						</div>

						<div className="UserTip">
							<p>{context.GetText('gamestart', 'tip')}</p>
						</div>
					</div>
				</>
			)}
			</LanguageContext.Consumer>
		);
	}
}