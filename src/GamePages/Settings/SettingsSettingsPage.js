import React from 'react'

import { LanguageContext } from '../../Language/LangPack'

import  MsgBox  from '../../Components/MsgBox';
import  MsgBox2Buttons  from '../../Components/MsgBox2Buttons';


var SETTIGNS_STATES = {}
SETTIGNS_STATES.MAIN = 1;


export default class SettingsSettingsPage extends React.Component {
	constructor(props, context) {
		super(props);
		this.state = {
            showYesNo : false,
            answerText : null
        };

		this.onChangeNick = this.onChangeNick.bind(this);
        this.onChangeEmotion = this.onChangeEmotion.bind(this);
        this.onChangeAvatar = this.onChangeAvatar.bind(this);
        this.onTurnOffAd = this.onTurnOffAd.bind(this);
        this.onRequestPersonals = this.onRequestPersonals.bind(this);
        this.onFeedBack = this.onFeedBack.bind(this);
        this.onLogOut = this.onLogOut.bind(this);
        
        this.onCloseMsgBox = this.onCloseMsgBox.bind(this);

        this.onActionLogOut = this.onActionLogOut.bind(this);

	}

    onChangeNick(){
        console.log('onChangeNick')
    }

    onChangeEmotion(){
        console.log('onLogOut')
    }


    onChangeAvatar(){
        console.log('onChangeAvatar')
    }
    
    onTurnOffAd(){
        console.log('onTurnOffAd')
    }
    
    onRequestPersonals(){
        console.log('onRequestPersonals')
    }
    
    onFeedBack(){
        console.log('onFeedBack')
    }
    
    onLogOut(){
        this.setState({    
            showYesNo : true,
            answerText : "Вы уверены, что хотите выйти из учётной записи на этом устройстве?"});

        console.log('onLogOut')
    }


    onCloseMsgBox(){
        this.setState({    
            showYesNo : false,
            answerText : null});
    }

    onActionLogOut(){
        console.log('onActionLogOut');
        this.props.Device.LogOut(this.props.NextdivCallBack, this);        
    }

	render() {
		var MsgBoxHTML = null;
        var MsgBoxFirstdiv = "Да";
        var MsgBoxSeconddiv = "Нет";

		if (this.state.showYesNo === true) {
			MsgBoxHTML = (
                <MsgBox2Buttons 
                Modaldiv1={MsgBoxFirstdiv}
                Modaldiv2={MsgBoxSeconddiv}
                OndivClick1={this.onActionLogOut}
                OndivClick2={this.onCloseMsgBox}
            >
                <div>{this.state.answerText}</div>
            </MsgBox2Buttons>
            );
		}

		return (
			<LanguageContext.Consumer>
				{(context) =>
				(
                    <>
					<div className="SignInAnonim ContentGap">
						<span >
							{context.GetText('signinanonim', 'labelYourNicname')}
						</span>

						<div >
                            <div onClick={this.onChangeNick}>
								<span className="Tip">
									Иконка сменить ник
								</span>
							</div>

                            <div onClick={this.onChangeEmotion}>
								<span className="Tip">
									Иконка смена эмоции
								</span>
							</div>

                            <div onClick={this.onChangeAvatar}>
								<span className="Tip">
									Смена персонажа
								</span>
							</div>

							<div onClick={this.onTurnOffAd}>
								<span className="Tip">
									Отключить рекламу
								</span>
							</div>

                            <div  onClick={this.onRequestPersonals}>
								<span className="Tip">
									Запрос персональных данных
								</span>
							</div>

                            <div  onClick={this.onFeedBack}>
								<span className="Tip">
									Обратиться в поддержку
								</span>
							</div>

                            <div  onClick={this.onLogOut}>
								<span className="Tip">
									Выход из учётной записи
								</span>
							</div>
						</div>
					</div>
                    {MsgBoxHTML}
                    </>
				)}
			</LanguageContext.Consumer>
		);

	}
}
SettingsSettingsPage.contextType = LanguageContext;

