import React from 'react'
import './css/App.css';
import './css/Common.css';
import Game from './GamePages/Game.js';
import Device from './Model/Device';
import {LanguageContext, LanguagePacketsHolder} from './Language/LangPack'

export default class App extends React.Component{
  myDevice = undefined;
  myLanguagePack = undefined;

  constructor(props)
  {
    super(props);
    var storedDeviceToken = localStorage.getItem("DeviceToken");
    var storedServerToken = localStorage.getItem("ServerToken");

    this.myDevice = new Device();
    this.myDevice.DeviceToken = storedDeviceToken;
    this.myDevice.ServerToken = storedServerToken;

    this.myLanguagePack = LanguagePacketsHolder.Get().GetPack('ru');

   // test commiting string  
  }

  componentDidMount() 
  {
    console.log(this.myDevice);
    //this.myDevice.TryAuth();
  }
  

  render()   
  {
    return (<LanguageContext.Provider value={this.myLanguagePack}>
      <Game></Game>  
      </LanguageContext.Provider> );
  }
}


