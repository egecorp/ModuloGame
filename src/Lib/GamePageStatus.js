
const GAMEPAGE_STATUS = 
{
    MAIN_MAIN : 1,   // До загрузки данных или просмотр чужой игры
    MAIN_PLAYING : 2, // Могу сделать ход
    MAIN_WAIT_COMPETITOR : 3, // Ожидаю действия соперника
    MAIN_REQUEST : 4, // Ожидаю ответ сервера на команду 
    MAIN_ERROR : 5, // Отображаю ошибочный ответ
    MAIN_FINISH : 6, // Отображаю завершённую игру
    
    WAIT_MY_ACCEPTION : 7, // Ожидание ответа на приглашения от меня
    WAIT_COMPETITOR_ACCEPTION : 8, // Ожидание ответа на приглашения от соперника

    PLAY_PLAYING : 10, // Играю текущий раунд
    PLAY_ALLDIGIT: 11, // Играю текущий раунд и выбрал все числа
    PLAY_WAIT_COMPETITOR : 12, // Сделал ход, ожидаю соперника
    PLAY_REQUEST : 13, // Ожидаю ответ сервера на команду 
    
    PLAY_ROUND : 14, // Просматриваю раунд
    PLAY_LASTROUND : 15, //Просматриваю последний раунд и могу продолжить игру
    
    PLAY_ERROR : 16, // Отображаю сообщение об ошибке

    GIVEUP_QUESTION : 20, //  Уточнение, хочу ли я сдаться
    WITHDRAW_QUESTION : 21, //  Уточнение, хочу ли я отозвать приглашение

    MY_STATISTIC : 30, // Отображаю свою статистику
    COMPETITOR_STATISTIC : 31 // Отображаю статистику соперника
};




export default GAMEPAGE_STATUS;


