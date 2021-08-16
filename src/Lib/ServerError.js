
const SERVER_ERROR = 
{
    SERVER_ERROR : "SERVER_ERROR",
    ACCESS_ERROR : "ACCESS_ERROR",
    
    BAD_DATA : "BAD_DATA",

    SIGNUP_ALREADY_BOUND : "SIGNUP_ALREADY_BOUND",
    SIGNUP_EMAIL_EXISTS : "SIGNUP_EMAIL_EXISTS",
    SIGNUP_BAD_EMAIL : "SIGNUP_BAD_EMAIL",
    SIGNUP_BAD_NICKNAME : "SIGNUP_BAD_NICKNAME",
    SIGNUP_PHONE_EXISTS : "SIGNUP_PHONE_EXISTS",

    SIGNIN_USER_NOT_FOUND : "SIGNIN_USER_NOT_FOUND",
    SIGNIN_ALREADY_BOUND : "SIGNIN_ALREADY_BOUND",
    SIGNIN_USER_BLOCKED : "SIGNIN_USER_BLOCKED",
    SIGNIN_BADCODE : "SIGNIN_BADCODE",
    SIGNIN_EXPIRED : "SIGNIN_EXPIRED",
    SIGNIN_BADUSER : "SIGNIN_BADUSER",
    SIGNIN_TOO_QUICK : "SIGNIN_TOO_QUICK"
};


export function GetErrorOrDefault(serverAnswer)
{
    serverAnswer = (serverAnswer + "").toUpperCase();
    return SERVER_ERROR[serverAnswer] || SERVER_ERROR.SERVER_ERROR;
}

export default SERVER_ERROR;



