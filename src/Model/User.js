import OneModuloGame from '../Model/OneModuloGame';


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
                        this.ActiveGames.push(new OneModuloGame(g, this.Id));
                    }
                }

                this.RecentGames = [];
                if (Array.isArray(serverJsonData.DynamicUserInfo.RecentGameList))
                {
                    for(let i in serverJsonData.DynamicUserInfo.RecentGameList)
                    {
                        let g = serverJsonData.DynamicUserInfo.RecentGameList[i];
                        if (!g.Id) continue;
                        this.RecentGames.push(new OneModuloGame(g, this.Id));
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



}



