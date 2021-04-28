const SERVER_URL = 'https://localhost:44335/API/';


const URL_RegisterDevice = 'RegisterDevice';
const URL_GetWorkToken = 'GetWorkToken';
const URL_GetUserInfo = 'GetUserInfo';
const URL_CreateAnonimUser = 'CreateAnonimUser';
const URL_CreateVerifiedUser = 'CreateVerifiedUser';
const URL_SignInExistUser = 'SignInExistUser';
const URL_AnonimUserAddMail = 'AnonimUserAddMail';
const URL_RepeateVerifyingMail = 'RepeateVerifyingMail';
const URL_EnterVerifyingCode = 'EnterVerifyingCode';
const URL_SignOutVerifyingUser = 'SignOutVerifyingUser';
const URL_RemoveDevice = 'RemoveDevice';
const URL_SetUserInfo = 'SetUserInfo';

const URL_GetGameList = "GetGameList";
const URL_GetGameInfo = "GetGameInfo";
const URL_FindUsersByNick = "FindUsersByNick";
const URL_CreateGame = "CreateGame";
const URL_AcceptGame = "AcceptGame";
const URL_RefuseGame = "RefuseGame";
const URL_CancelGame = "CancelGame";
const URL_DoRound = "DoRound";
const URL_GiveUp = "GiveUp";

var MySingletonObject = undefined;

export default class Server {
/*
    constructor()
    {

    }*/


// Пример отправки POST запроса:
    async postData(url = '', data = {}) 
    {
        // Default options are marked with *
        const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
    }
  

    async RegisterDevice(data)
    {
        return await this.postData( SERVER_URL +  URL_RegisterDevice, data);
    }
    async GetWorkToken(data)
    {
        return await this.postData( SERVER_URL +  URL_GetWorkToken, data);
    }
    async GetUserInfo(data)
    {
        return await this.postData( SERVER_URL +  URL_GetUserInfo, data);
    }
    async CreateAnonimUser(data)
    {
        return await this.postData( SERVER_URL +  URL_CreateAnonimUser, data);
    }
    async CreateVerifiedUser(data)
    {
        return await this.postData( SERVER_URL +  URL_CreateVerifiedUser, data);
    }
    async SignInExistUser(data)
    {
        return await this.postData( SERVER_URL +  URL_SignInExistUser, data);
    }
    async AnonimUserAddMail(data)
    {
        return await this.postData( SERVER_URL +  URL_AnonimUserAddMail, data);
    }
    async RepeateVerifyingMail(data)
    {
        return await this.postData( SERVER_URL +  URL_RepeateVerifyingMail, data);
    }
    async EnterVerifyingCode(data)
    {
        return await this.postData( SERVER_URL +  URL_EnterVerifyingCode, data);
    }
    async SignOutVerifyingUser(data)
    {
        return await this.postData( SERVER_URL +  URL_SignOutVerifyingUser, data);
    }
    async RemoveDevice(data)
    {
        return await this.postData( SERVER_URL +  URL_RemoveDevice, data);
    }
    async SetUserInfo(data)
    {
        return await this.postData( SERVER_URL +  URL_SetUserInfo, data);
    }
    


    async GetGameList(data)
    {
        return await this.postData( SERVER_URL +  URL_GetGameList, data);
    }
    async GetGameInfo(data)
    {
        return await this.postData( SERVER_URL +  URL_GetGameInfo, data);
    }
    async FindUsersByNick(data)
    {
        return await this.postData( SERVER_URL +  URL_FindUsersByNick, data);
    }
    async CreateGame(data)
    {
        return await this.postData( SERVER_URL +  URL_CreateGame, data);
    }

    async AcceptGame(data)
    {
        return await this.postData( SERVER_URL +  URL_AcceptGame, data);
    }
    async RefuseGame(data)
    {
        return await this.postData( SERVER_URL +  URL_RefuseGame, data);
    }
    async CancelGame(data)
    {
        return await this.postData( SERVER_URL +  URL_CancelGame, data);
    }

    
    async DoRound(data)
    {
        return await this.postData( SERVER_URL +  URL_DoRound, data);
    }
    
    async GiveUp(data)
    {
        return await this.postData( SERVER_URL +  URL_GiveUp, data);
    }

    static Get(){
        if (MySingletonObject) return MySingletonObject;
        return MySingletonObject = new Server();
    }
}