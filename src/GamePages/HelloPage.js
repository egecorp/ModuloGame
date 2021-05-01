import React from 'react'


import DEVICE_STATUS from '../Lib/DeviceStatus'

export default class HelloPage extends React.Component {
    
    
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    

    render() {
        
        let currentStatus = "";

        this.currentStatus = this.props.Status;

        if (this.currentStatus === DEVICE_STATUS.AUTH_CONNTECTING)
        {
            currentStatus = "Идёт подключение";
        }
        else if (this.currentStatus === DEVICE_STATUS.AUTH_FAIL)
        {
            currentStatus = "Не удалось подключиться";
        }
        else if (this.currentStatus === DEVICE_STATUS.AUTH_FORBIDDEN)
        {
            currentStatus = "Доступ запрещён";
        }
        else if (this.currentStatus === DEVICE_STATUS.AUTH_GOOD)
        {
            currentStatus = "Всё отлично, получим информацию о пользователе";
        }
        else if (this.currentStatus === DEVICE_STATUS.USERINFO_GETIING)
        {
            currentStatus = "Идёт запрос данных о пользователе";
        }
        else
        {
            currentStatus = "Welcome";
        }
      
          return (
              <>
                <div>
                    Hello Modulo world
                </div>
                <div>
                    {currentStatus}
                </div>
              </>
          );
      
    }
  }
  
  