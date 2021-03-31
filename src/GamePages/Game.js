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
    }
  
    Pages = [   'Hello', 
                'SignIn', 
                'SignIn:Anonim', 
                'SignIn:SignIn', 
                'SignIn:SignIn:EnterCode',
                'SignIn:SignIn:FailCode',
                'SignIn:SignUp', 
                'SignIn:SignUp:AlreadyExists', 
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
        console.log(result);
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
        console.log(result);
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
            this.setState(state => ({ currentDeviceStatus: DEVICE_STATUS.USERINFO_GOOD }));
        }
    }

    nextButtonCallBack(nextState, stateProperties)
    {
        console.log("nextButton");
        console.log(nextState);
        if (nextState == DEVICE_STATUS.USERINFO_NOUSER)
        {
            this.setState(state => (
                { 
                    currentDeviceStatus: DEVICE_STATUS.USERINFO_SHOW_CREATE, 
                    currentPage: 'SignIn'
                }));
        }
        else if (nextState == DEVICE_STATUS.USERINFO_SHOW_CREATEANONIM)
        {
            this.setState(state => (
                { 
                    currentDeviceStatus: DEVICE_STATUS.USERINFO_SHOW_CREATEANONIM, 
                    currentPage: 'SignIn:Anonim'
                }));
        }
        else if (nextState === DEVICE_STATUS.USERINFO_SHOW_CREATE)
        {
            this.setState(state => (
                { 
                    currentDeviceStatus: DEVICE_STATUS.USERINFO_SHOW_CREATE, 
                    currentPage: 'SignIn:SignUp'
                }));
            
        }
        else if (nextState === DEVICE_STATUS.USERINFO_SHOW_SIGNIN)
        {
            this.setState(state => (
                { 
                    currentDeviceStatus: DEVICE_STATUS.USERINFO_SHOW_SIGNIN, 
                    currentPage: 'SignIn:SignIn'
                }));
            
        }
    }

    render() {

        return ( 
        <div className='Game'> 
            <PageHolder currentPage={this.state.currentPage} Status={this.state.currentDeviceStatus}  NextButtonCallBack={this.nextButtonCallBack}></PageHolder>
            <div className="AdHolder"> 
                <select onChange={this.handleChangePage}>
                    {this.Pages.map(x=> <option key={x} value={x}>{x}</option>)}
                </select>
            </div>
        </div>
        );
      
    }
  }
  
  