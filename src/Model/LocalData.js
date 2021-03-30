
export default class LocalData
{
    static Me = null;
    static GetSingleton = function()
    {
        if (this.Me != null) return this.Me ;
        this.Me = localStorage.getItem('MyLocalData');
        
        if (!this.Me)
        {
            this.Me = new LocalData();
            this.Me['DeviceToken'] = null;
            this.Me['ServerToken'] = null;
            localStorage.setItem('MyLocalData', this.Me);
        }
        else
        {
            this.Me['DeviceToken'] = null;
            this.Me['ServerToken'] = null;
        }
        return this.Me;
    }
    static SetValue = function(varName, value, noSave)
    {
        this.Me = this.GetSingleton();
        this.Me[varName] = value;
        if (noSave !== true) localStorage.setItem('MyLocalData', this.Me);
    }

}
