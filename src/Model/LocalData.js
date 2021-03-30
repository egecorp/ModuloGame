const CURRENT_VERSION = "1.0.0";

export default class LocalData
{
    Version;
    constructor(ver)
    {
        this.Version = ver;
    }

    static Me = null;
    static GetSingleton = function()
    {
        if (this.Me != null) return this.Me ;
        var savedObjectString =   localStorage['MyLocalData'];
        
        try
        {
            this.Me = JSON.parse(savedObjectString);
        }
        catch 
        {
            this.Me = null;
        }

         

        if (!this.Me || !this.Me.Version)
        {
            this.Me = new LocalData(CURRENT_VERSION);
            this.Me['DeviceToken'] = null;
            this.Me['ServerToken'] = null;
            localStorage['MyLocalData'] =  JSON.stringify(this.Me);
        }
        else if (!this.Me['ServerToken'])
        {
            this.Me['DeviceToken'] = null;
            this.Me['ServerToken'] = null;
        }
        else if (this.Me.Version !== CURRENT_VERSION)
        {
            console.info('Another version of LocalData, need to clear values');
            var oldDeviceToken = this.Me['DeviceToken'];
            var oldServerToken = this.Me['ServerToken'];
            this.Me = new LocalData(CURRENT_VERSION);
            this.Me['DeviceToken'] = oldDeviceToken;
            this.Me['ServerToken'] = oldServerToken;
            localStorage['MyLocalData'] = JSON.stringify(this.Me);
        }
        return this.Me;
    }
    static SetValue = function(varName, value, noSave)
    {
        this.Me = this.GetSingleton(); 
        this.Me[varName] = value;
        if (noSave !== true) localStorage['MyLocalData'] = JSON.stringify(this.Me);
    }

}
