import Server from '../Lib/Server'

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
        var NeedRegisterDevice = false;

        if ((this.IsDisabled === true) || (("" + (this.DeviceToken || "")).length < MIN_DEVICE_TOKEN_LENGHT))
        {
            //const CharArray = "1234567890PLOKIJUHYGTFRDESWAQZVXCBMNmlnkjbhgvfdcsxzaqpwoeiruty".split('');
            //this.DeviceToken = "12345678901234567890123456789012345678901234567890".split('').map((x) => (CharArray[Math.floor(62 * Math.random())])).join('');
            this.DeviceToken =  this.uuidv4();
            NeedRegisterDevice = true;
        }

        function GoodAuth(a)
        {
            console.log('Good');
            console.log(a);
        }
        
        function ErrorAuth(e)
        {
            console.log('Error');
            console.log(e);
        }

        var postObject = this.GetPostObject();

        if (NeedRegisterDevice)
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
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

}



