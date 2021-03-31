import React from 'react'

import HelloPage from './HelloPage.js'
import SignInPage from './SignInPage.js'
import SignUpPage from './SignIn/SignUpPage.js'
import SignInAuthPage from './SignIn/SignInAuthPage.js'
import SignInAnonim from './SignIn/SignInAnonimPage.js'
import GameListPage from './Game/GameListPage.js'
import GameStartPage from './Game/GameStartPage.js'
import GameStartBotPage from './Game/GameStartBotPage.js'
import GameStartRandomPage from './Game/GameStartRandomPage.js'
import GameStartUserPage from './Game/GameStartUserPage.js'

import ConditionPage from './Common/ConditionPage.js'
import SettingsAvatarPage from './Settings/SettingsAvatarPage.js'
import SettingsSettingsPage from './Settings/SettingsSettingsPage.js'


export default class PageHolder extends React.Component {

 
    render() {
        
        let CPage;

        if (this.props.currentPage === 'Hello')
        {
            CPage = (<HelloPage Status={this.props.Status}></HelloPage>);
        }
        else if (this.props.currentPage === 'SignIn')
        {
            CPage = (<SignInPage NextButtonCallBack={this.props.NextButtonCallBack}></SignInPage>)
        } 
        else if (this.props.currentPage === 'SignIn:Anonim')
        {
            CPage = (<SignInAnonim NextButtonCallBack={this.props.NextButtonCallBack}></SignInAnonim>)
        }
        else if (this.props.currentPage === 'SignIn:SignIn')
        {
            CPage = (<SignInAuthPage NextButtonCallBack={this.props.NextButtonCallBack}></SignInAuthPage>)
        }
        else if (this.props.currentPage === 'SignIn:SignIn:EnterCode')
        {
            CPage = (<SignInAuthPage modalstate='EnterCode' UserMail='acid@gmail.dot' NextButtonCallBack={this.props.NextButtonCallBack}></SignInAuthPage>)
        }
        else if (this.props.currentPage === 'SignIn:SignIn:FailCode')
        {
            CPage = (<SignInAuthPage modalstate='FailCode' OldCode='321' UserMail='acid@gmail.dot' NextButtonCallBack={this.props.NextButtonCallBack}></SignInAuthPage>)
        }
        else if (this.props.currentPage === 'SignIn:SignUp')
        {
            CPage = (<SignUpPage NextButtonCallBack={this.props.NextButtonCallBack}></SignUpPage>)
        }
        else if (this.props.currentPage === 'SignIn:SignUp:AlreadyExists')
        {
            CPage = (<SignUpPage  modalstate='AlreadyExists' NextButtonCallBack={this.props.NextButtonCallBack}></SignUpPage>)
        }
        else if (this.props.currentPage === 'SignIn:SignUp:Success')
        {
            CPage = (<SignUpPage  modalstate='Success' NextButtonCallBack={this.props.NextButtonCallBack}></SignUpPage>)
        }
        else if (this.props.currentPage === 'Game:GameList')
        {
            CPage = (<GameListPage></GameListPage>)
        }

        else if (this.props.currentPage === 'Game:GameStart')
        {
            CPage = (<GameStartPage></GameStartPage>)
        }
        else if (this.props.currentPage === 'Game:FindRandom')
        {
            CPage = (<GameStartRandomPage></GameStartRandomPage>)
        }
        else if (this.props.currentPage === 'Game:FindBot')
        {
            CPage = (<GameStartBotPage></GameStartBotPage>)
        }
        else if (this.props.currentPage === 'Game:FindUser')
        {
            CPage = (<GameStartUserPage></GameStartUserPage>)
        }
        else if (this.props.currentPage === 'ConditionPage')
        {
            CPage = (<ConditionPage></ConditionPage>)
        }
        else if (this.props.currentPage === 'Settings:Settings')
        {
            CPage = (<SettingsSettingsPage></SettingsSettingsPage>)
        }
        else if (this.props.currentPage === 'Settings:Avatar')
        {
            CPage = (<SettingsAvatarPage></SettingsAvatarPage>)
        }
        

        else
        {
            return null;
        }
        
        return ( 
        <>
			<div className="Main">
				{CPage} 
			</div>
        </>
        );
    }
}