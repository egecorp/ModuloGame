
const DEVICE_STATUS = 
{
    AUTH_CONNTECTING : 1000,
    AUTH_FAIL : 1001,
    AUTH_FORBIDDEN : 1002,
    AUTH_GOOD : 1003,
    USERINFO_GETIING : 2000,
    USERINFO_GOOD : 2002,
    USERINFO_FAIL : 2003,
    USERINFO_NOUSER : 2100,
    USERINFO_SHOW_CREATEANONIM : 2110,
    USERINFO_SHOW_CREATEANONIM_CREATING : 2111,
    USERINFO_SHOW_CREATEANONIM_DONE : 2112,
    USERINFO_SHOW_CREATEANONIM_FAIL : 2113,
    USERINFO_SHOW_CREATE : 2120,
    USERINFO_SHOW_CREATE_CREATING : 2121,
    USERINFO_SHOW_CREATE_DONE : 2122,
    USERINFO_SHOW_CREATE_FAIL : 2123,
    USERINFO_SHOW_SIGNIN : 2130,


    GAME_SHOW_LIST : 3000,
    
    GAME_CREATING_CHOOSE : 3001,
    
    GAME_CREATING_RANDOM : 3010,
    GAME_CREATING_RANDOM_DONE : 3011,
    GAME_CREATING_RANDOM_FAIL : 3012,

    GAME_CREATING_FINDUSER : 3020,
    GAME_CREATING_FINDUSER_RESULT : 3021,
    GAME_CREATING_FINDUSER_NORESULT : 3022,
    GAME_CREATING_FINDUSER_DONE : 3023,
    GAME_CREATING_FINDUSER_FAIL : 3024,


    GAME_CREATING_FINDBOT : 3030,
    GAME_CREATING_FINDBOT_RESULT : 3031,
    GAME_CREATING_FINDBOT_NORESULT : 3032,
    GAME_CREATING_FINDBOT_DONE : 3033,
    GAME_CREATING_FINDBOT_FAIL : 3034,

    GAME_CREATING_PROCESS_CREATING: 3100,
    GAME_CREATING_PROCESS_DONE: 3101,
    GAME_CREATING_PROCESS_FAIL: 3102,

    GAME_SHOW_GAME : 4000,
    
    GAME_GAME_COMMAND_EXECUTE : 4001,
    GAME_GAME_COMMAND_DONE : 4002,
    GAME_GAME_COMMAND_FAIL : 4003,

    MODAL_POLICY : 10000
};




export default DEVICE_STATUS;


