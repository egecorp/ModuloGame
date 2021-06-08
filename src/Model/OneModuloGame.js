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

    RoundNumber = 0;

    D1_1_1 = null;
    D1_1_2 = null;
    D1_1_3 = null;
    D1_2_1 = null;
    D1_2_2 = null;
    D1_2_3 = null;

    D2_1_1 = null;
    D2_1_2 = null;
    D2_1_3 = null;
    D2_2_1 = null;
    D2_2_2 = null;
    D2_2_3 = null;

    D3_1_1 = null;
    D3_1_2 = null;
    D3_1_3 = null;
    D3_2_1 = null;
    D3_2_2 = null;
    D3_2_3 = null;

    D4_1_1 = null;
    D4_1_2 = null;
    D4_1_3 = null;
    D4_2_1 = null;
    D4_2_2 = null;
    D4_2_3 = null;

    D5_1_1 = null;
    D5_1_2 = null;
    D5_1_3 = null;
    D5_2_1 = null;
    D5_2_2 = null;
    D5_2_3 = null;


    GetCurrentRound()
    {
        switch(this.RoundNumber) 
        {
            case 1:
                return this.GetRound(1);
            case 2:
                return this.GetRound(2);
            case 3:
                return this.GetRound(3);
            case 4:
                return this.GetRound(4);
            case 5:
                return this.GetRound(5);
            default:
                if (this.IsFinish) return this.GetRound(5);
                return null;
        }
    }
    GetRound(roundNumber)
    {
        switch (roundNumber + "")
        {
            case '1':
                return {
                    myDigit1 : this.D1_1_1,
                    myDigit2 : this.D1_1_2,
                    myDigit3 : this.D1_1_3,
                    competiorDigit1 : this.D1_1_1,
                    competiorDigit2 : this.D1_2_2,
                    competiorDigit3 : this.D1_3_3
                };

            case '2':
                return {
                    myDigit1 : this.D2_1_1,
                    myDigit2 : this.D2_1_2,
                    myDigit3 : this.D2_1_3,
                    competiorDigit1 : this.D2_1_1,
                    competiorDigit2 : this.D2_2_2,
                    competiorDigit3 : this.D2_3_3
                };
                
            case '3':
                return {
                    myDigit1 : this.D3_1_1,
                    myDigit2 : this.D3_1_2,
                    myDigit3 : this.D3_1_3,
                    competiorDigit1 : this.D3_1_1,
                    competiorDigit2 : this.D3_2_2,
                    competiorDigit3 : this.D3_3_3
                };
                
            case '4':
                return {
                    myDigit1 : this.D4_1_1,
                    myDigit2 : this.D4_1_2,
                    myDigit3 : this.D4_1_3,
                    competiorDigit1 : this.D4_1_1,
                    competiorDigit2 : this.D4_2_2,
                    competiorDigit3 : this.D4_3_3
                };
                
            default:
                    return {
                    myDigit1 : this.D5_1_1,
                    myDigit2 : this.D5_1_2,
                    myDigit3 : this.D5_1_3,
                    competiorDigit1 : this.D5_1_1,
                    competiorDigit2 : this.D5_2_2,
                    competiorDigit3 : this.D5_3_3
                };
  
        }
    }

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


        this.RoundNumber = data.RoundNumber;

        this.D1_1_1 = data.D1_1_1;
        this.D1_1_2 = data.D1_1_2;
        this.D1_1_3 = data.D1_1_3;
        this.D1_2_1 = data.D1_2_1;
        this.D1_2_2 = data.D1_2_2;
        this.D1_2_3 = data.D1_2_3;

        this.D2_1_1 = data.D2_1_1;
        this.D2_1_2 = data.D2_1_2;
        this.D2_1_3 = data.D2_1_3;
        this.D2_2_1 = data.D2_2_1;
        this.D2_2_2 = data.D2_2_2;
        this.D2_2_3 = data.D2_2_3;

        this.D3_1_1 = data.D3_1_1;
        this.D3_1_2 = data.D3_1_2;
        this.D3_1_3 = data.D3_1_3;
        this.D3_2_1 = data.D3_2_1;
        this.D3_2_2 = data.D3_2_2;
        this.D3_2_3 = data.D3_2_3;

        this.D4_1_1 = data.D4_1_1;
        this.D4_1_2 = data.D4_1_2;
        this.D4_1_3 = data.D4_1_3;
        this.D4_2_1 = data.D4_2_1;
        this.D4_2_2 = data.D4_2_2;
        this.D4_2_3 = data.D4_2_3;

        this.D5_1_1 = data.D5_1_1;
        this.D5_1_2 = data.D5_1_2;
        this.D5_1_3 = data.D5_1_3;
        this.D5_2_1 = data.D5_2_1;
        this.D5_2_2 = data.D5_2_2;
        this.D5_2_3 = data.D5_2_3;



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


    }
        
}