import Server from '../Lib/Server'
import LocalData from '../Model/LocalData.js'
import DEVICE_STATUS from '../Lib/DeviceStatus'
import SERVER_ERROR from '../Lib/ServerError'
import { GetErrorOrDefault } from '../Lib/ServerError'
import User from './User'


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

    // Ожидание подтверждения пользователя
    WaitConfirmation = false;

    // Почта пользователя, ожидающего подтверждения
    UserMail = null;

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
            console.log('TryAuth Error');
            console.error(e);
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
            if (this.WaitConfirmation)
            {
                callBack.call(context,  DEVICE_STATUS.USERINFO_SHOW_SIGNIN_DONE);
            }
            else
            {
                callBack.call(context,  DEVICE_STATUS.USERINFO_NOUSER);
            }
            return;
        }
        
        function GoodResult(response)
        {
            if (response.Error)
            {
                console.warn(response.Error);
                callBack.call(context,  DEVICE_STATUS.USERINFO_FAIL);

            }
            else
            {
                console.log(response);
                this.myUser = new User(response, this.DeviceWorkToken);
                
                callBack.call(context,  DEVICE_STATUS.USERINFO_GOOD);
            }
        }
        
        function ErrorResult(e)
        {
            console.log('GetUserInfo Error');
            console.error(e);
            callBack.call(context,  DEVICE_STATUS.USERINFO_FAIL);
        }

        var postObject = this.GetPostObject();
    
        var _GoodResult = GoodResult.bind(this);
        var _ErrorResult = ErrorResult.bind(this);

        Server.Get().GetUserInfo(postObject).then(_GoodResult, _ErrorResult);
        callBack.call(context,  DEVICE_STATUS.USERINFO_GETIING);
        
    }


    CreateAnonim(callBack, context)
    {
        
        function GoodResult(response)
        {

            this.CurrentError = null;
            if (response.Id)
            {
                console.info("Device has got UserId = " + response.Id);
                this.UserId = response.Id;
                this.myUser = {};
                this.NeedRegisterDevice = false;
            }
            callBack.call(context,  DEVICE_STATUS.USERINFO_SHOW_CREATEANONIM_DONE);
        }
        
        function ErrorResult(e)
        {
            console.log('CreateAnonim Error');
            console.error(e);
            callBack.call(context,  DEVICE_STATUS.USERINFO_SHOW_CREATEANONIM_FAIL);
        }

        var postObject = this.GetUserPostObject();

        
        var _GoodResult = GoodResult.bind(this);
        var _ErrorResult = ErrorResult.bind(this);
        Server.Get().CreateAnonimUser(postObject).then(_GoodResult, _ErrorResult);
        
    }

    CreateUser(callBack, context, postObject)
    {
        function GoodResult(response)
        {
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
            if (response.Id)
            {
                console.info("Device has got UserId = " + response.Id);
                this.UserId = response.Id;
                this.myUser = {};
                this.NeedRegisterDevice = false;
            }
            callBack.call(context,  DEVICE_STATUS.USERINFO_SHOW_CREATE_DONE);
        }
        
        function ErrorResult(e)
        {
            console.error(e);
            this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
            callBack.call(context,  DEVICE_STATUS.USERINFO_SHOW_CREATE_FAIL);
        }

        this.CurrentError = null;

        var _GoodResult = GoodResult.bind(this);
        var _ErrorResult = ErrorResult.bind(this);
        this.myServer.Get.call(this.myServer).CreateVerifiedUser(postObject).then(_GoodResult, _ErrorResult);
        
    }

    
    SignInUser(callBack, context, postObject)
    {
        function GoodResult(response)
        {
            if (!response)
            {
                this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
                callBack.call(context,  DEVICE_STATUS.USERINFO_SHOW_SIGNIN_FAIL);
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
                callBack.call(context,  DEVICE_STATUS.USERINFO_SHOW_SIGNIN_FAIL);
                return;
            }
            this.CurrentError = null;
            if (response.Id)
            {
                console.info("Device has got UserId = " + response.Id);
                this.UserId = response.Id;
                this.myUser = {};
                this.NeedRegisterDevice = false;
            }
            callBack.call(context,  DEVICE_STATUS.USERINFO_SHOW_SIGNIN_DONE);
        }
        
        function ErrorResult(e)
        {
            console.error(e);
            this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
            callBack.call(context,  DEVICE_STATUS.USERINFO_SHOW_SIGNIN_FAIL);
        }

        this.CurrentError = null;

        var _GoodResult = GoodResult.bind(this);
        var _ErrorResult = ErrorResult.bind(this);
        this.myServer.Get.call(this.myServer).SignInExistUser(postObject).then(_GoodResult, _ErrorResult);
        callBack.call(context,  DEVICE_STATUS.USERINFO_SHOW_SIGNIN_TRYING);

    }


    GetGameList(callBack, context)
    {
        if (!this.UserId) return;
        
        var GoodResult = function(response)
        {
            if (!this.myUser)
            {
                this.myUser = new User(response, this.DeviceWorkToken);
            }
            else
            {
                this.myUser.UpdateData(response, this.DeviceWorkToken);
            }
            callBack.call(context,  DEVICE_STATUS.USERINFO_GOOD);
        }
        
        var ErrorResult = function(e)
        {
            console.log('GetGameList Error');
            console.error(e);
            callBack.call(context,  DEVICE_STATUS.USERINFO_FAIL);
        }

        var postObject = this.GetPostObject();
        var _GoodResult = GoodResult.bind(this);
        var _ErrorResult = ErrorResult.bind(this);
        Server.Get().GetGameList(postObject).then(_GoodResult, _ErrorResult);
        callBack.call(context,  DEVICE_STATUS.USERINFO_GETIING);
        
    }


    GetUserList(searchString, callBack, context)
    {
        if (!this.UserId) return;
        
        function GoodResult(response)
        {
            callBack.call(context, response);
        }
        
        function ErrorResult(e)
        {
            console.log('GetUserList Error');
            console.error(e);
            callBack.call(context, "FAIL");
        }

        var postObject = this.GetPostObject();
        postObject.NicName = searchString;
    
        Server.Get().FindUsersByNic(postObject).then(GoodResult, ErrorResult);
    }


    GetBotList(searchString, callBack, context)
    {
        if (!this.UserId) return;
        
        function GoodResult(response)
        {
            callBack.call(context, response);
        }
        
        function ErrorResult(e)
        {
            console.log('GetBotList Error');
            console.error(e);
            callBack.call(context, "FAIL");
        }

        var postObject = this.GetPostObject();
        postObject.NicName = searchString;
    
        Server.Get().FindBotsByNic(postObject).then(GoodResult, ErrorResult);
    }

    GetGameInfo(gameId, callBack, context)
    {
        if (!this.UserId) return;
        
        function GoodResult(response)
        {
            callBack.call(context, response);
        }
        
        function ErrorResult(e)
        {
            console.log('GetGameInfo Error');
            console.error(e);
            callBack.call(context, "FAIL");
        }

        var postObject = {
            Id : gameId,
            DeviceWorkToken : this.DeviceWorkToken
        };
        
        Server.Get().GetGameInfo(postObject).then(GoodResult, ErrorResult);
    }

    CreateGame(callBack, context, postObject)
    {
        function GoodResult(response)
        {
            if (!response)
            {
                this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
                callBack.call(context,  DEVICE_STATUS.GAME_CREATING_PROCESS_FAIL); // CHangre status
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
                callBack.call(context,  DEVICE_STATUS.GAME_CREATING_PROCESS_FAIL);
                return;
            }
            this.CurrentError = null;
            if (response.Id)
            {
                console.info("Device has created, GameId = " + response.Id);
            }
            callBack.call(context,  DEVICE_STATUS.GAME_CREATING_PROCESS_DONE, response);
        }
        
        function ErrorResult(e)
        {
            console.error(e);
            this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
            callBack.call(context,  DEVICE_STATUS.GAME_CREATING_PROCESS_FAIL);
        }

        this.CurrentError = null;

        var _GoodResult = GoodResult.bind(this);
        var _ErrorResult = ErrorResult.bind(this);
        this.myServer.Get.call(this.myServer).CreateGame(postObject).then(_GoodResult, _ErrorResult);
        
    }

    AcceptGame(callBack, context, postObject)
    {
        function GoodResult(response)
        {
            if (!response)
            {
                this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
                callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_FAIL); // CHangre status
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
                callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_FAIL);
                return;
            }
            this.CurrentError = null;
            callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_DONE, response);
        }
        
        function ErrorResult(e)
        {
            console.error(e);
            this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
            callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_FAIL);
        }

        this.CurrentError = null;

        var _GoodResult = GoodResult.bind(this);
        var _ErrorResult = ErrorResult.bind(this);
        this.myServer.Get.call(this.myServer).AcceptGame(postObject).then(_GoodResult, _ErrorResult);
    }
	
	DeclineGame(callBack, context, postObject)
    {
        function GoodResult(response)
        {
            if (!response)
            {
                this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
                callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_FAIL); // CHangre status
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
                callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_FAIL);
                return;
            }
            this.CurrentError = null;
            callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_DONE, response);
        }
        
        function ErrorResult(e)
        {
            console.error(e);
            this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
            callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_FAIL);
        }

        this.CurrentError = null;

        var _GoodResult = GoodResult.bind(this);
        var _ErrorResult = ErrorResult.bind(this);
        this.myServer.Get.call(this.myServer).DeclineGame(postObject).then(_GoodResult, _ErrorResult);
    }	
	
	WithdrawGame(callBack, context, postObject)
    {
        function GoodResult(response)
        {
            if (!response)
            {
                this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
                callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_FAIL); // CHangre status
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
                callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_FAIL);
                return;
            }
            this.CurrentError = null;
            callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_DONE, response);
        }
        
        function ErrorResult(e)
        {
            console.error(e);
            this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
            callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_FAIL);
        }

        this.CurrentError = null;

        var _GoodResult = GoodResult.bind(this);
        var _ErrorResult = ErrorResult.bind(this);
        this.myServer.Get.call(this.myServer).WithdrawGame(postObject).then(_GoodResult, _ErrorResult);
    }

	PlayRound(callBack, context, postObject)
    {
        function GoodResult(response)
        {
            if (!response)
            {
                this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
                callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_FAIL); // CHangre status
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
                callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_FAIL);
                return;
            }
            this.CurrentError = null;
            callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_DONE, response);
        }
        
        function ErrorResult(e)
        {
            console.error(e);
            this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
            callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_FAIL);
        }

        this.CurrentError = null;

        var _GoodResult = GoodResult.bind(this);
        var _ErrorResult = ErrorResult.bind(this);
        this.myServer.Get.call(this.myServer).PlayRound(postObject).then(_GoodResult, _ErrorResult);
    }	

    
    GiveUpGame(callBack, context, postObject)
    {
        function GoodResult(response)
        {
            if (!response)
            {
                this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
                callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_FAIL); // CHangre status
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
                callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_FAIL);
                return;
            }
            this.CurrentError = null;
            callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_DONE, response);
        }
        
        function ErrorResult(e)
        {
            console.error(e);
            this.CurrentError = this._SERVER_ERROR.SERVER_ERROR;
            callBack.call(context,  DEVICE_STATUS.GAME_GAME_COMMAND_FAIL);
        }

        this.CurrentError = null;

        var _GoodResult = GoodResult.bind(this);
        var _ErrorResult = ErrorResult.bind(this);
        this.myServer.Get.call(this.myServer).GiveUp(postObject).then(_GoodResult, _ErrorResult);
    }	

    uuidv4() 
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
          return v.toString(16);
        });
    }

}



