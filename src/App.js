import React from 'react'
import './css/style.css';
// import './css/App.css';
// import './css/Common.css';
import Game from './GamePages/Game.js';
import Device from './Model/Device';
import {LanguageContext, LanguagePacketsHolder} from './Language/LangPack'
import LocalData from './Model/LocalData.js'

export default class App extends React.Component{
  myDevice = undefined;
  myLanguagePack = undefined;

  constructor(props)
  {
    super(props);
    this.myDevice = new Device();
    this.myLanguagePack = LanguagePacketsHolder.Get().GetPack('ru');
  }

  componentDidMount() 
  {
    this.myDevice.TryAuth();
  }
  

  render()   
  {
    return (<LanguageContext.Provider value={this.myLanguagePack}>
      <Game></Game>  
      </LanguageContext.Provider> );
  }
}


