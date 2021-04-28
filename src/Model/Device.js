import Server from '../Lib/Server'
import LocalData from '../Model/LocalData.js'
import DEVICE_STATUS from '../Lib/DeviceStatus'
import SERVER_ERROR from '../Lib/ServerError'
import { GetErrorOrDefault } from '../Lib/ServerError'


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

    // TODO - понять, зачем я так делаю
    myServer = Server;

    // TODO - подумать, может быть, переместить в другое место
    // Последняя ошибка запроса
    CurrentError = null;


    _SERVER_ERROR = SERVER_ERROR;
    _GetErrorOrDefault = GetErrorOrDefault;




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

       // this._GetErrorOrDefault =  this._GetErrorOrDefault.bind(this);
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
            DeviceWorkToken: this.DeviceWorkToken
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

                if (response.UserId)
                {
                    console.info("Device has UserId = " + response.UserId);
                    deviceObject.UserId = response.UserId;
                    deviceObject.myUser = {};
                }


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
    
        Server.Get().GetUserInfo(postObject).then(GoodResult, ErrorResult);
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

    CreateUser(callBack, context, postObject)
    {
        function GoodResult(response)
        {
            console.log('Good CreateUser');
            console.log(response);

            if (!response)
            {
                this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
                callBack.call(context,  DEVICE_STATUS.USERINFO_SHOW_CREATE_FAIL);
                return;
            }
            else if (response.Error)
            {
                if (response.IsWorkflowError === true)
                {
                    this.CurrentError = this._GetErrorOrDefault(response.Error);
                }
                else
                {
                    this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
                }
                callBack.call(context,  DEVICE_STATUS.USERINFO_SHOW_CREATE_FAIL);
                return;
            }
            this.CurrentError = null;
            callBack.call(context,  DEVICE_STATUS.USERINFO_SHOW_CREATE_DONE);
        }
        
        function ErrorResult(e)
        {
            console.log(e);
            this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
            callBack.call(context,  DEVICE_STATUS.USERINFO_SHOW_CREATE_FAIL);
        }

        this.CurrentError = null;

        var _GoodResult = GoodResult.bind(this);
        var _ErrorResult = ErrorResult.bind(this);
        this.myServer.Get.call(this.myServer).CreateVerifiedUser(postObject).then(_GoodResult, _ErrorResult);
        
    }


    GetGameList(callBack, context)
    {
        if (!this.UserId) return;
        
        function GoodResult(response)
        {
            console.log('Good CheckGameList');
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
    
        Server.Get().GetGameList(postObject).then(GoodResult, ErrorResult);
        callBack.call(context,  DEVICE_STATUS.USERINFO_GETIING);
        
    }

    uuidv4() 
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
          return v.toString(16);
        });
    }

}



