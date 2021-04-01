import Server from '../Lib/Server'
import LocalData from '../Model/LocalData.js'
import DEVICE_STATUS from '../Lib/DeviceStatus'

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

    // Текущий пользователь
    myUser = null;

    constructor()
    {
        let myData = LocalData.GetSingleton();
        this.DeviceToken = myData['DeviceToken'];
        this.ServerToken = myData['ServerToken'];
        this.DeviceWorkToken = myData['DeviceWorkToken'];
        this.Caption = myData['Caption'];
        this.UserId = myData['UserId'];

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

    GetPostObject(withServerToken)
    {
        return {
            Id: this.Id, 
            DeviceToken : this.DeviceToken, 
            ServerToken : (withServerToken === true) ? this.ServerToken : null, 
            DeviceWorkToken: this.DeviceWorkToken, 
            Caption: this.Caption,
            WorkToken: this.DeviceWorkToken
        } ;
    }

    GetUserPostObject()
    {
        let result = {
            WorkToken: this.DeviceWorkToken
        } ;

        if (this.myUser)
        {
            result.Id = this.myUser.Id;
            result.NicName = this.myUser.NicName;
            result.Birthday = this.myUser.Birthday;
            result.EMail = this.myUser.EMail;
            result.TNumber = this.myUser.TNumber;
            result.Country = this.myUser.Country;
        }


        return result;
    }

    TryAuth(callBack, context)
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
                callBack.call(context,  DEVICE_STATUS.AUTH_GOOD);
            }
            else
            {
                callBack.call(context,  DEVICE_STATUS.AUTH_FORBIDDEN);
            }

        }
        
        function ErrorAuth(e)
        {
            console.log('Error');
            console.log(e);
            callBack.call(context,  DEVICE_STATUS.AUTH_FAIL);
        }

        var postObject = this.GetPostObject(true);

        if (this.NeedRegisterDevice)
        {
            Server.Get().RegisterDevice(postObject).then(GoodAuth, ErrorAuth);
            callBack.call(context,  DEVICE_STATUS.AUTH_CONNTECTING);
        }
        else
        {
            Server.Get().GetWorkToken(postObject).then(GoodAuth, ErrorAuth);
            callBack.call(context,  DEVICE_STATUS.AUTH_CONNTECTING);
        }
    }


    GetUserInfo(callBack, context)
    {
        if (!this.UserId)
        {
            callBack.call(context,  DEVICE_STATUS.USERINFO_NOUSER);
            return;
        }
        
        function GoodResult(response)
        {
            console.log('Good auth');
            console.log(response);
            callBack.call(context,  DEVICE_STATUS.USERINFO_GOOD);
        }
        
        function ErrorResult(e)
        {
            console.log('Error');
            console.log(e);
            callBack.call(context,  DEVICE_STATUS.USERINFO_FAIL);
        }

        var postObject = this.GetPostObject();
    
        Server.Get().RegisterDevice(postObject).then(GoodResult, ErrorResult);
        callBack.call(context,  DEVICE_STATUS.USERINFO_GETIING);
        
    }


    CreateAnonim(callBack, context)
    {
        
        function GoodResult(response)
        {
            console.log('Good CreateAnonim');
            console.log(response);
            callBack.call(context,  DEVICE_STATUS.USERINFO_SHOW_CREATEANONIM_DONE);
        }
        
        function ErrorResult(e)
        {
            console.log('Error');
            console.log(e);
            callBack.call(context,  DEVICE_STATUS.USERINFO_SHOW_CREATEANONIM_FAIL);
        }

        var postObject = this.GetUserPostObject();
        Server.Get().CreateAnonimUser(postObject).then(GoodResult, ErrorResult);
        
    }


    uuidv4() 
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
          return v.toString(16);
        });
    }

}



