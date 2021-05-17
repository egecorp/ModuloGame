import React from 'react'
import {LanguageContext} from '../Language/LangPack'


export default class OneGame extends React.Component {

    User1Name = "User1";
    User2Name = "User2";
    GameStatus = null;
    
    constructor(props, context) {
        super(props);
        /*
        this.state = {
            isStart: false,
            isFinish: false
        };*/

        //this.context = context;
        this.isCup = props.IsCup;
        this.onGameClick = this.onGameClick.bind(this);

        this.User1Name = props.game.User1Name;
        this.User2Name = props.game.User2Name;

        this.GameStatus = props.game.GameStatus;

        this.onGameClickCallBack = props.onGameClickCallBack;
        //this.GameStatus = this.context.GetText('gamestatus', props.game.GameStatus);

    }

    onGameClick(ev)
    {
        if (typeof(this.onGameClickCallBack) === "function") this.onGameClickCallBack(this.props.game);
    }

	render() { 
        var context = this.context;

        if (this.isCup)
        {
			return (
                <li onClick={this.onGameClick}>
                    <div className="Player">
                        <div className="Avatar"></div>
                        <p>{this.User1Name}</p>
                    </div>

                    <div className="Cup">
                        <div className="ELO">
                            <p>(0)</p>
                        </div>

                        <div className="Score">
                            <p className="Status">{this.GameStatus}</p>
                            <div className="Info">
                                <p>{context.GetText('gamelist', 'labelCup')}</p>
                                <div className="IconCup"></div>
                            </div>
                        </div>

                        <div className="ELO">
                            <p>(0)</p>
                        </div>
                    </div>

                    <div className="Player">
                        <div className="Avatar"></div>
                        <p>{this.User2Name}</p>
                    </div>                </li>
				
			);
        }
        else
        {
			return (
                <LanguageContext.Consumer>
				{(context) =>
				(
                <li  onClick={this.onGameClick}>
                    <div className="Player">
                        <div className="Avatar">
                            <img src='/img/avatar/1/boy.1.png' alt="No Avatar"></img>
                        </div>
                        <p>{this.User1Name}</p>
                    </div>

                    <div className="Score">
                        <p className="Status">{context.GetText('gamestatus.round', this.GameStatus)}</p>
                        <div className="Info">
                            <p>{context.GetText('gamestatus.action', this.GameStatus)}</p>
                        </div>
                    </div>
                    
                    <div className="Player">
                        <div className="Avatar">
                            <img src='/img/avatar/1/boy.1.png' alt="No Avatar"></img>
                        </div>
                        <p>{this.User2Name}</p>
                    </div>
                </li>
                )}
                </LanguageContext.Consumer>
			);
        }


	}
}