
var OneModuloGame = function()
{
            
        /// Идентификатор
        this.Id = 0;

        /// Время начала игры
        this.StartStamp = null;

        /// Количество минут на один раунд
        this.MinutesPerRound = null;

        /// Первый игрок
        this.User1Id = null;

        /// Второй игрок
        this.User2Id = null;

        /// Игра началась
        this.IsStart = false;

        /// Игра завершилась
        this.IsFinish = false;

        /// Был таймаут
        this.IsTimeout = false;

        /// Игра была отменена 
        this.IsCancel = false;

        /// Ходы первого игрока
        this.User1Rounds = [];

        /// Ход второго игрока
        this.User2Rounds = [];

        
}