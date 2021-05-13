import React from 'react'
import {AddPackets as ruAddPackets}  from './RU'

const DefaultPackage = 'ru';

class LanguagePacketsHolder 
{
	Packages = [];

	constructor(defaultPacket = DefaultPackage)
	{
		this.AddPacketHandler = this.AddPacketHandler.bind(this);
		ruAddPackets(this.AddPacketHandler);
	}

	AddPacketHandler(packName)
	{
		var newPack = new Pack(packName);
		this.Packages[packName] = newPack;
		return newPack;
	}

	GetPack(lang = DefaultPackage)
	{
		if (this.Packages[lang]) return this.Packages[lang];
		return this.Packages[DefaultPackage];
	}
}

LanguagePacketsHolder.SingletonObject = undefined;

LanguagePacketsHolder.Get = function(defaultPacket = 'ru')
{
	if (LanguagePacketsHolder.SingletonObject) return LanguagePacketsHolder.SingletonObject;
	return LanguagePacketsHolder.SingletonObject = new LanguagePacketsHolder(defaultPacket);
}













export class Pack 
{
    Dictionaries;
    PackName;

    constructor(PackName)
    {
        this.Dictionaries = new Map();
        this.PackName = PackName;
    }

    AddDictionary(dictName, dictValues)
    {
        let newMapObject = new Map();
        if (dictValues) 
        {
            for(let textKey in dictValues)
            {
                if (textKey)
                {
                    newMapObject.set(textKey, dictValues[textKey]);
                }
            }
        }
        
        this.Dictionaries.set(dictName, newMapObject);


        return newMapObject;
    }

    GetDictionary(dictName)
    {
        let selectedMap = this.Dictionaries.get(dictName);
        return selectedMap;
    }

    GetText(dictName, stringName)
    {
        let selectedMap = this.Dictionaries.get(dictName);
        if (!selectedMap) return undefined;
        let stringValue = selectedMap.get("" + stringName);
        return stringValue;
    }

    GetJSX(dictName, stringName)
    {
        let selectedMap = this.Dictionaries.get(dictName);
        if (!selectedMap) return undefined;
        let stringValue = selectedMap.get(stringName);
        return <>{stringValue}</>;
    }
}








/*
class LanguageContextProvider extends React.Component {
  
    constructor(props)
    {
        super(props);
        InitPack();
        let defaultLanguagePack = GetPack('ru');
        this.state = {
            language: "ru",
            languagePack: defaultLanguagePack
          };
    }
  
       
  
    choseLanguage = (lng) => {
      this.setState(prevState => {
        return {
          language: lng,
          languagePack : GetPack(lng)
        }; 
      });
    };
  
    render() {
      return (
        <Provider
          value={{ language: this.state.language, languagePack: this.state.languagePack }}
        >
          {this.props.children}
        </Provider>
      );
    }
  }*/
  
  
  /*InitPack();
  let currentLanguagePack = GetPack();
*/
  const LanguageContext = React.createContext();
  /*({
    language: "ru",
    languagePack: currentLanguagePack,
    changeLanguage: (newLanguage) => { console.log(newLanguage)} 
  });*/
  
  
  export { LanguageContext, LanguagePacketsHolder };

