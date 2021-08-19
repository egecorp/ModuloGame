import React from 'react'

import HelloPage from './HelloPage.js'
import SignInPage from './SignIn/SignInPage.js'
import SignUpPage from './SignIn/SignUpPage.js'
import SignInAuthPage from './SignIn/SignInAuthPage.js'
import SignInAnonim from './SignIn/SignInAnonimPage.js'
import GameListPage from './Game/GameListPage.js'
import GameStartPage from './Game/GameStartPage.js'
import GameStartBotPage from './Game/GameStartBotPage.js'
import GameStartRandomPage from './Game/GameStartRandomPage.js'
import GameStartUserPage from './Game/GameStartUserPage.js'
import GamePage from './Game/GamePage.js'

import ConditionPage from './Common/ConditionPage.js'
import RulesPage from './Common/RulesPage.js'
import StatisticPage from './Statistic/StatisticPage.js'
import SettingsSettingsPage from './Settings/SettingsSettingsPage.js'


export default class PageHolder extends React.Component {

    constructor(props)
    {
        super(props);
        this.myDevice = props.Device;
    }

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
            CPage = (<SignInAuthPage   
                            Device={this.props.Device}  
                            NextButtonCallBack={this.props.NextButtonCallBack}
                        ></SignInAuthPage>)
        }
        else if (
                    (this.props.currentPage === 'SignIn:SignIn:Fail')
                ) 
        {
            CPage = (<SignInAuthPage   
                            Device={this.props.Device} 
                            modalstate='Fail' 
                            UserMail={this.props.Device.tempUserMail} 
                            NextButtonCallBack={this.props.NextButtonCallBack}
                        ></SignInAuthPage>)
        }
        else if (
                    (this.props.currentPage === 'SignIn:SignIn:EnterCode')  ||
                    (this.props.currentPage === 'SignIn:SignIn:EnterRepeatedCode')
                )
        {
            CPage = (<SignInAuthPage   
                            Device={this.props.Device}  
                            modalstate='EnterCode' 
                            UserMail={this.props.Device.UserMail} 
                            NextButtonCallBack={this.props.NextButtonCallBack}
                            IsRepeatedCode={(this.props.currentPage === 'SignIn:SignIn:EnterRepeatedCode')}
                        ></SignInAuthPage>)
        }
        else if (
                    (this.props.currentPage === 'SignIn:SignIn:FailCode') ||
                    (this.props.currentPage === 'SignIn:SignIn:RepeateFail')
                )
        {
            CPage = (<SignInAuthPage   
                            Device={this.props.Device}  
                            modalstate='FailCode' 
                            OldCode={this.props.Device.tempCode} 
                            UserMail={this.props.Device.UserMail} 
                            NextButtonCallBack={this.props.NextButtonCallBack}
                            IsRepeatedCode={(this.props.currentPage === 'SignIn:SignIn:RepeateFail')}
                        ></SignInAuthPage>)
        }
        else if (this.props.currentPage === 'SignIn:SignUp')
        {
            CPage = (<SignUpPage Device={this.props.Device} NextButtonCallBack={this.props.NextButtonCallBack}></SignUpPage>)
        }
        else if (this.props.currentPage === 'SignIn:SignUp:ShowError')
        {
            CPage = (<SignUpPage  Device={this.props.Device}  modalstate='ShowError' NextButtonCallBack={this.props.NextButtonCallBack}></SignUpPage>)
        }
        else if (this.props.currentPage === 'SignIn:SignUp:Success')
        {
            CPage = (<SignUpPage  Device={this.props.Device}   modalstate='Success' NextButtonCallBack={this.props.NextButtonCallBack}></SignUpPage>)
        }
        else if (this.props.currentPage === 'Game:GameList')
        {
            CPage = (<GameListPage   Device={this.props.Device} NavigationButtonCallBack={this.props.NavigationButtonCallBack}></GameListPage>)
        }

        else if (this.props.currentPage === 'Game:GameStart')
        {
            CPage = (<GameStartPage   Device={this.props.Device} NavigationButtonCallBack={this.props.NavigationButtonCallBack}></GameStartPage>)
        }
        else if (this.props.currentPage === 'Game:FindRandom')
        {
            CPage = (<GameStartRandomPage   Device={this.props.Device} NavigationButtonCallBack={this.props.NavigationButtonCallBack}></GameStartRandomPage>)
        }
        else if (this.props.currentPage === 'Game:FindBot')
        {
            CPage = (<GameStartBotPage   Device={this.props.Device} NavigationButtonCallBack={this.props.NavigationButtonCallBack}></GameStartBotPage>)
        }
        else if (this.props.currentPage === 'Game:FindUser')
        {
            CPage = (<GameStartUserPage   Device={this.props.Device} NavigationButtonCallBack={this.props.NavigationButtonCallBack}></GameStartUserPage>)
        }


        else if (this.props.currentPage === 'Game:Game')
        {
            CPage = (<GamePage   Device={this.props.Device} CurrentGame={this.props.CurrentGame} NavigationButtonCallBack={this.props.NavigationButtonCallBack}></GamePage>)
        }


		else if (this.props.currentPage === 'Info:ConditionPage')
		{
			CPage = (<ConditionPage OnBackButton={this.props.OnBackButton}/>)
		}
		else if (this.props.currentPage === 'Info:RulesPage')
		{
			CPage = (<RulesPage OnBackButton={this.props.OnBackButton} />)
		}
		else if (this.props.currentPage === 'Settings:Settings')
		{
			CPage = (<SettingsSettingsPage 
                        Device={this.props.Device}
                        CurrentGame={this.props.CurrentGame}
                        NavigationButtonCallBack={this.props.NavigationButtonCallBack}
                        OnBackButton={this.props.OnBackButton}
                    />)
		}        
		else if (this.props.currentPage === 'Statistic:Statistic')
		{
			CPage = (<StatisticPage
                        Device={this.props.Device}
                        OnBackButton={this.props.OnBackButton}
                        NextButtonCallBack={this.props.NextButtonCallBack}
                    />)
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