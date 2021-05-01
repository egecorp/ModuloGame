import React from 'react'

import PageHolder from './PageHolder.js'

import DEVICE_STATUS from '../Lib/DeviceStatus'




export default class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          currentPage: 'Hello',
          currentDeviceStatus: DEVICE_STATUS.AUTH_CONNTECTING
      };
      this.handleChangePage = this.handleChangePage.bind(this);

      this.myDevice = props.Device;
      this.nextButtonCallBack = this.nextButtonCallBack.bind(this);
      this.navigationButtonCallBack = this.navigationButtonCallBack.bind(this);
    }
  
    Pages = [   'Hello', 
                'SignIn', 
                'SignIn:Anonim', 
                'SignIn:SignIn', 
                'SignIn:SignIn:EnterCode',
                'SignIn:SignIn:FailCode',
                'SignIn:SignUp', 
                'SignIn:SignUp:ShowError', 
                'SignIn:SignUp:Success', 
                'Game:GameList', 
                'Game:GameStart', 
                'Game:FindRandom', 
                'Game:FindBot', 
                'Game:FindUser', 
                'Settings:Settings', 
                'Settings:Avatar', 
                'ConditionPage'];
    
    handleChangePage(event) {
        this.setState(state => ({
            currentPage: event.target.value
        }));
      }


    componentDidMount() 
    {

        this.myDevice.TryAuth(this.checkDeviceAuth, this);
    }
    
    checkDeviceAuth(result)
    {
        //console.log(result);
        if (result === DEVICE_STATUS.AUTH_CONNTECTING)
        {
            this.setState(state => ({ currentDeviceStatus: DEVICE_STATUS.AUTH_CONNTECTING }));
        }
        else if (result === DEVICE_STATUS.AUTH_FAIL)
        {
            this.setState(state => ({ currentDeviceStatus: DEVICE_STATUS.AUTH_FAIL }));
            setTimeout(  () => (this.myDevice.TryAuth(this.checkDeviceAuth, this)), 1000);
        }
        else if (result === DEVICE_STATUS.AUTH_FORBIDDEN)
        {
            this.setState(state => ({ currentDeviceStatus: DEVICE_STATUS.AUTH_FORBIDDEN }));
        }
        else if (result === DEVICE_STATUS.AUTH_GOOD)
        {
            let thisObject = this;
            this.setState(state => ({ currentDeviceStatus: DEVICE_STATUS.AUTH_GOOD }));
            setTimeout( () => thisObject.myDevice.GetUserInfo(thisObject.checkUserInfo, thisObject), 1000);
        }
    }


    checkUserInfo(result)
    {
        //console.log(result);
        if (result === DEVICE_STATUS.USERINFO_GETIING)
        {
            this.setState(state => ({ currentDeviceStatus: DEVICE_STATUS.USERINFO_GETIING }));
        }
        else if (result === DEVICE_STATUS.USERINFO_NOUSER)
        {
            this.setState(state => (
                { 
                    currentDeviceStatus: DEVICE_STATUS.AUTH_FAIL, 
                    currentPage: 'SignIn'
                }));
           
        }
        else if (result === DEVICE_STATUS.USERINFO_GOOD)
        {
            let thisObject = this;
            this.setState(state => ({ 
                currentDeviceStatus: DEVICE_STATUS.USERINFO_GOOD ,
                currentPage: 'Game:GameList'            
            }));
            setInterval( () => thisObject.myDevice.GetGameList.call(thisObject.myDevice, thisObject.CheckGameList, thisObject), 10000);

        }
    }

    CheckGameList(result)
    {

    }

    checkCreateUser(result)
    {
        console.log("checkCreateUser");
        console.log(result);
    }

    nextButtonCallBack(nextState, stateProperties)
    {
        //console.log("nextButton");
        //console.log(nextState);
        switch(nextState)
        {
            case DEVICE_STATUS.USERINFO_NOUSER:
                this.setState(state => (
                    { 
                        currentDeviceStatus: DEVICE_STATUS.USERINFO_NOUSER, 
                        currentPage: 'SignIn'
                    }));
                break;
            
            case DEVICE_STATUS.USERINFO_SHOW_CREATEANONIM:
                this.setState(state => (
                    { 
                        currentDeviceStatus: DEVICE_STATUS.USERINFO_SHOW_CREATEANONIM, 
                        currentPage: 'SignIn:Anonim'
                    }));
                break;
            case DEVICE_STATUS.USERINFO_SHOW_CREATE:
                this.setState(state => (
                    { 
                        currentDeviceStatus: DEVICE_STATUS.USERINFO_SHOW_CREATE, 
                        currentPage: 'SignIn:SignUp'
                    }));
                break;
        
            case DEVICE_STATUS.USERINFO_SHOW_SIGNIN:
            this.setState(state => (
                { 
                    currentDeviceStatus: DEVICE_STATUS.USERINFO_SHOW_SIGNIN, 
                    currentPage: 'SignIn:SignIn'
                }));
            break;

            case DEVICE_STATUS.USERINFO_SHOW_CREATEANONIM_CREATING:
                this.myDevice.CreateAnonim(this.checkCreateUser, this);
                break;

            case DEVICE_STATUS.USERINFO_SHOW_CREATE_CREATING:
                this.myDevice.CreateUser(this.checkCreateUser, this);
                break;

            case DEVICE_STATUS.USERINFO_SHOW_CREATE_DONE:
                console.log('WTF 175?')
                break;
            case DEVICE_STATUS.USERINFO_SHOW_CREATE_FAIL:
                this.setState(state => (
                    { 
                        currentDeviceStatus: DEVICE_STATUS.USERINFO_SHOW_CREATE, 
                        currentPage: 'SignIn:SignUp:ShowError'
                    }));
                break;

            case DEVICE_STATUS.MODAL_POLICY:
                this.setState(state => (
                    { 
                        currentDeviceStatus: DEVICE_STATUS.MODAL_POLICY, 
                        currentPage: 'ConditionPage'
                    }));
                break;
            default:
                console.log("WTF?")
        }
    }


    navigationButtonCallBack(nextState, stateProperties)
    {
        //console.log("NavigationButtonCallBack");
        //console.log(nextState);
        switch(nextState)
        {
            case DEVICE_STATUS.GAME_CREATING_CHOOSE:
                this.setState(state => (
                    { 
                        currentDeviceStatus: DEVICE_STATUS.GAME_CREATING_CHOOSE, 
                        currentPage: 'Game:GameStart'
                    }));
                break;
            
            case DEVICE_STATUS.GAME_CREATING_RANDOM:
                this.setState(state => (
                    { 
                        currentDeviceStatus: DEVICE_STATUS.GAME_CREATING_RANDOM, 
                        currentPage: 'Game:FindRandom'
                    }));
                break;
            case DEVICE_STATUS.GAME_CREATING_RANDOM_DONE:
                this.setState(state => (
                    { 
                        currentDeviceStatus: DEVICE_STATUS.GAME_CREATING_RANDOM_DONE, 
                        currentPage: 'Game:FindRandom'
                    }));
                break;
        
            case DEVICE_STATUS.GAME_CREATING_RANDOM_FAIL:
                this.setState(state => (
                    { 
                        currentDeviceStatus: DEVICE_STATUS.GAME_CREATING_RANDOM_FAIL, 
                        currentPage: 'Game:FindRandom'
                    }));
                break;

            case DEVICE_STATUS.GAME_CREATING_FINDUSER:
                this.setState(state => (
                    { 
                        currentDeviceStatus: DEVICE_STATUS.GAME_CREATING_RANDOM_FAIL, 
                        currentPage: 'Game:FindUser'
                    }));                
                    break;

            case DEVICE_STATUS.GAME_CREATING_FINDUSER_RESULT:
                this.setState(state => (
                    { 
                        currentDeviceStatus: DEVICE_STATUS.GAME_CREATING_FINDUSER_RESULT, 
                        currentPage: 'Game:FindUser'
                    }));                
                    break;

            case DEVICE_STATUS.GAME_CREATING_FINDUSER_NORESULT:
                this.setState(state => (
                    { 
                        currentDeviceStatus: DEVICE_STATUS.GAME_CREATING_FINDUSER_NORESULT, 
                        currentPage: 'GameGame:FindUser'
                    }));               
                    break;
            case DEVICE_STATUS.GAME_CREATING_FINDUSER_DONE:
                this.setState(state => (
                    { 
                        currentDeviceStatus: DEVICE_STATUS.GAME_CREATING_FINDUSER_DONE, 
                        currentPage: 'Game:FindUser'
                    }));
                break;

            case DEVICE_STATUS.GAME_CREATING_FINDUSER_FAIL:
                this.setState(state => (
                    { 
                        currentDeviceStatus: DEVICE_STATUS.GAME_CREATING_FINDUSER_FAIL, 
                        currentPage: 'Game:FindUser'
                    }));
                break;
            default:

                this.setState(state => (
                    { 
                        currentDeviceStatus: DEVICE_STATUS.GAME_SHOW_LIST, 
                        currentPage: 'Game:GameList'
                    }));
                break;
        }
    }


    render() {

        return ( 
        <div className='Game'> 
            <PageHolder 
                currentPage={this.state.currentPage} 
                Status={this.state.currentDeviceStatus}  
                NextButtonCallBack={this.nextButtonCallBack} 
                NavigationButtonCallBack={this.navigationButtonCallBack} 
                Device={this.myDevice}>
   
            </PageHolder>
            <div className="AdHolder"> 
                <select onChange={this.handleChangePage}>
                    {this.Pages.map(x=> <option key={x} value={x}>{x}</option>)}
                </select>
            </div>
        </div>
        );
      
    }
  }
  
  
