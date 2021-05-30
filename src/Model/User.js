import Server from '../Lib/Server'
import LocalData from './LocalData.js'
import DEVICE_STATUS from '../Lib/DeviceStatus'
import Game from '../Model/Game';


export default class User
{
    // Id ползьвателя
    Id = undefined;

    // Ник
    NicName = undefined;

    // Номер в нике
    NicNumber = undefined;

    // Дата рождения
    Birthday = undefined;

    // Электронная почта
    EMail = undefined;

    // Номер телефона
    TNumber = undefined;

    // Пользователь аноним
    IsAnonim = true;

    // Пользователь верифицирован
    IsVerified = false;

    // Пользователь заблокирован
    IsBlocked = false;

    // Заблокирован до
    BlockedUntil = undefined;

    // Динамическая информация о текущем пользователе
    DynamicUserInfo = null;

    // Общий рейтинг пользователя
    CommonRating = 0;

    // Рабочий токен для отправки запросов на сервер
    DeviceWorkToken = undefined;
    
    ActiveGames = [];

    RecentGames = [];

    constructor(serverJsonData, DeviceWorkToken)
    {
        this.UpdateData(serverJsonData, DeviceWorkToken);
    }

    UpdateData(serverJsonData, DeviceWorkToken)
    {
        if (serverJsonData)
        {
            this.Id = serverJsonData.Id;
            this.NicName = serverJsonData.NicName;
            this.Birthday = serverJsonData.Birthday;
            this.EMail = serverJsonData.EMail;
            this.TNumber = serverJsonData.TNumber;
            this.IsAnonim = serverJsonData.IsAnonim;
            this.IsVerified = serverJsonData.IsVerified;
            this.IsBlocked = serverJsonData.IsBlocked;
            this.BlockedUntil = serverJsonData.BlockedUntil;

            if (this.NicName && this.NicName.includes("&!&"))
            {
                var nameParts = this.NicName.split("&!&");
                if (nameParts.length > 1)
                {
                    this.NicName = nameParts[0];
                    this.NicNumber =  Number.isFinite(+nameParts[1]) ? (+nameParts[1]) : 0;                    
                }
            }
            

            if (serverJsonData.DynamicUserInfo)
            {
                this.DynamicUserInfo = serverJsonData.DynamicUserInfo;
                this.CommonRating = serverJsonData.DynamicUserInfo.CommonRating;
                this.ActiveGames = [];
                if (Array.isArray(serverJsonData.DynamicUserInfo.ActiveGameList))
                {
                    for(let i in serverJsonData.DynamicUserInfo.ActiveGameList)
                    {
                        let g = serverJsonData.DynamicUserInfo.ActiveGameList[i];
                        if (!g.Id) continue;
                        this.ActiveGames.push(new Game(g, this.Id));
                    }
                }

                this.RecentGames = [];
                if (Array.isArray(serverJsonData.DynamicUserInfo.RecentGameList))
                {
                    for(let i in serverJsonData.DynamicUserInfo.RecentGameList)
                    {
                        let g = serverJsonData.DynamicUserInfo.RecentGameList[i];
                        if (!g.Id) continue;
                        this.RecentGames.push(new Game(g, this.Id));
                    }
                }
            }
        }
        this.DeviceWorkToken = DeviceWorkToken;        

    }

    GetPostObject()
    {
        return {
            Id : this.Id,
            NicName : this.NicName,
            Birthday : this.Birthday,
            EMail : this.EMail,
            TNumber : this.TNumber,
            WorkToken : this.DeviceWorkToken
        } ;
    }


 // TODO проверить на использование
    GetInfo(callBack, context)
    {
        console.log("112 НЕ УДАЛЯТЬ!!!!!");
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


 // TODO проверить на использование
    GetUserInfo(callBack, context)
    {
        console.log("166 НЕ УДАЛЯТЬ!!!!!");
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

 // TODO проверить на использование
    CreateAnonim(callBack, context)
    {
        console.log("197 НЕ УДАЛЯТЬ!!!!!");   
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



