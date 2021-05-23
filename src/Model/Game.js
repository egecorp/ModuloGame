export default class OneModuloGame
{
    Id = 0;

    StartStamp = null;

    MinutesPerRound = null;

    User1Id = null;

    User2Id = null;

    IsStart = false;

    IsFinish = false;

    IsTimeout = false;

    IsCancel = false;

    IsGiveUp = false;

    IsDeclined = false;

    User1Name = "User1";

    User2Name = "User2";

    User1NicNumber = "";

    User2NicNumber = "";

    User1Character = null;

    User2Character = null;

    GameStatus = 0;

    User1CanUseJoker = false;
    
    User2CanUseJoker = false;

    User1MaxRoundNumber = 0;

    User2MaxRoundNumber = 0;

    User1Score = 0;

    User2Score = 0;

    Rounds = [];

    constructor(data)
    {
        this.Id = data.Id ;
        this.StartStamp = data.StartStamp ;
        this.MinutesPerRound = data.MinutesPerRound ;
        this.User1Id = data.User1Id ;
        this.User2Id = data.User2Id ;
        this.IsStart = data.IsStart ;
        this.IsFinish = data.IsFinish ;
        this.IsTimeout = data.IsTimeout ;
        this.IsCancel = data.IsCancel ;
        this.IsGiveUp = data.IsGiveUp;
        this.IsDeclined = data.IsDeclined;

        this.GameStatus = data.GameStatus;

        this.User1Name = data.User1Name;
        this.User2Name = data.User2Name;


        if (this.User1Name && this.User1Name.includes("&!&"))
        {
            let nameParts = this.User1Name.split("&!&");
            if (nameParts.length > 1)
            {
                this.User1Name = nameParts[0];
                this.User1NicNumber =  Number.isFinite(+nameParts[1]) ? (+nameParts[1]) : 0;                    
            }
        }
        
        if (this.User2Name && this.User2Name.includes("&!&"))
        {
            let nameParts = this.User2Name.split("&!&");
            if (nameParts.length > 1)
            {
                this.User2Name = nameParts[0];
                this.User2NicNumber =  Number.isFinite(+nameParts[1]) ? (+nameParts[1]) : 0;                    
            }
        }


        this.User1Character = data.User1Character;        
        this.User2Character = data.User2Character;

        this.User1CanUseJoker = data.User1CanUseJoker;        
        this.User2CanUseJoker = data.User2CanUseJoker;

        this.User1MaxRoundNumber = data.User1MaxRoundNumber;
        this.User2MaxRoundNumber = data.User2MaxRoundNumber;

        this.User1Score = data.User1Score;
        this.User2Score = data.User2Score;

        this.Rounds = [];
        if (data.Rounds)
        {
            for(var i in data.Rounds)
            {
                var r = data.Rounds[i];
                if (r.GameId) this.Rounds[r.UserId + ":" + r.RoundNumber] = r;
            }
        }
    }
        
}