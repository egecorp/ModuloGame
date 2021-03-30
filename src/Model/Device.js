import Server from '../Lib/Server'
import LocalData from '../Model/LocalData.js'

const MIN_DEVICE_TOKEN_LENGHT = 10;

export default class Device 
{
    // Id устройства
    Id = undefined;

    // Login устройства
    DeviceToken = undefined;

    // Токен авторизации (пароль)
    ServerToken = undefined;

    // Рабочий токен
    DeviceWorkToken = undefined;

    // Устройство в стоп-листе
    IsDisabled = false;

    // Id пользователя
    UserId = undefined;

    // Пользовательское описание устройства
    Caption = undefined;

    //Необходимо зарегистрировать устройство
    NeedRegisterDevice = false;


    constructor()
    {
        let myData = LocalData.GetSingleton();
        this.DeviceToken = myData['DeviceToken'];
        this.ServerToken = myData['ServerToken'];
        this.DeviceWorkToken = myData['DeviceWorkToken'];
        
        if ((this.IsDisabled === true) || (("" + (this.DeviceToken || "")).length < MIN_DEVICE_TOKEN_LENGHT) || ((this.ServerToken || "") === ""))
        {
            console.log("Устройство не было зарегистрировано ранее");
            this.DeviceToken =  this.uuidv4();
            LocalData.SetValue('DeviceToken', this.DeviceToken);
            this.NeedRegisterDevice = true;
        }
        else
        {
            console.log("Устройство было зарегистрировано ранее, DeviceToken = " + this.DeviceToken);
        }

        
    }

    GetPostObject()
    {
        return {
            Id: this.Id, 
            DeviceToken : this.DeviceToken, 
            ServerToken : this.ServerToken, 
            DeviceWorkToken: this.DeviceWorkToken, 
            Caption: this.Caption
        } ;
    }

    TryAuth()
    {
        
       let deviceObject = this;

        function GoodAuth(response)
        {
            console.log('Good auth');
            console.log(response);
            if (response.DeviceToken && response.ServerToken)
            {
                if (response.ServerToken !==  deviceObject.ServerToken)
                {
                    LocalData.SetValue('ServerToken',  deviceObject.ServerToken = response.ServerToken, !!response.WorkToken);
                }
            }
            
            if (response.WorkToken)
            {
                if ( deviceObject.DeviceWorkToken !== response.WorkToken)
                LocalData.SetValue('DeviceWorkToken',  deviceObject.DeviceWorkToken = response.WorkToken);
                console.log('Set WorkToken = ' + response.WorkToken);
            }

        }
        
        function ErrorAuth(e)
        {
            console.log('Error');
            console.log(e);
        }

        var postObject = this.GetPostObject();

        if (this.NeedRegisterDevice)
        {
            Server.Get().RegisterDevice(postObject).then(GoodAuth, ErrorAuth);
        }
        else
        {
            Server.Get().GetWorkToken(postObject).then(GoodAuth, ErrorAuth);
        }
        
    }

    uuidv4() 
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
          return v.toString(16);
        });
    }

}



