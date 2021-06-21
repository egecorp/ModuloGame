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

    IsActive = false;

    IsMyUserPlaying = false;
    
    User1Name = "User1";

    User2Name = "User2";

    User1NicNumber = "";

    User2NicNumber = "";

    User1Character = null;

    User2Character = null;

    GameStatus = 0;

    User1CanUseJoker = false;
    
    User2CanUseJoker = false;

    MyUserMaxRoundNumber = 0;

    CompetitorUserMaxRoundNumber = 0;

    User1Score = 0;

    User2Score = 0;

    RoundNumber = 0;

    MyDigit11 = null;
    MyDigit12 = null;
    MyDigit13 = null;
    MyDigit21 = null;
    MyDigit22 = null;
    MyDigit23 = null;
    MyDigit31 = null;
    MyDigit32 = null;
    MyDigit33 = null;
    MyDigit41 = null;
    MyDigit42 = null;
    MyDigit43 = null;
    MyDigit51 = null;
    MyDigit52 = null;
    MyDigit53 = null;

    CompetitorDigit11 = null;
    CompetitorDigit12 = null;
    CompetitorDigit13 = null;
    CompetitorDigit21 = null;
    CompetitorDigit22 = null;
    CompetitorDigit23 = null;
    CompetitorDigit31 = null;
    CompetitorDigit32 = null;
    CompetitorDigit33 = null;
    CompetitorDigit41 = null;
    CompetitorDigit42 = null;
    CompetitorDigit43 = null;
    CompetitorDigit51 = null;
    CompetitorDigit52 = null;
    CompetitorDigit53 = null;


    GetRound(roundNumber)
    {
        switch (roundNumber + "")
        {
            case '1':
                return {
                    myDigit1 : this.MyDigit11,
                    myDigit2 : this.MyDigit12,
                    myDigit3 : this.MyDigit13,
                    competitorDigit1 : this.CompetitorDigit11,
                    competitorDigit2 : this.CompetitorDigit12,
                    competitorDigit3 : this.CompetitorDigit13
                };

            case '2':
                return {
                    myDigit1 : this.MyDigit21,
                    myDigit2 : this.MyDigit22,
                    myDigit3 : this.MyDigit23,
                    competitorDigit1 : this.CompetitorDigit21,
                    competitorDigit2 : this.CompetitorDigit22,
                    competitorDigit3 : this.CompetitorDigit23
                };
                
            case '3':
                return {
                    myDigit1 : this.MyDigit31,
                    myDigit2 : this.MyDigit32,
                    myDigit3 : this.MyDigit33,
                    competitorDigit1 : this.CompetitorDigit31,
                    competitorDigit2 : this.CompetitorDigit32,
                    competitorDigit3 : this.CompetitorDigit33
                };
                
            case '4':
                return {
                    myDigit1 : this.MyDigit41,
                    myDigit2 : this.MyDigit42,
                    myDigit3 : this.MyDigit43,
                    competitorDigit1 : this.CompetitorDigit41,
                    competitorDigit2 : this.CompetitorDigit42,
                    competitorDigit3 : this.CompetitorDigit43
                };
                
            default:
                    return {
                    myDigit1 : this.MyDigit51,
                    myDigit2 : this.MyDigit52,
                    myDigit3 : this.MyDigit53,
                    competitorDigit1 : this.CompetitorDigit51,
                    competitorDigit2 : this.CompetitorDigit52,
                    competitorDigit3 : this.CompetitorDigit53
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
        this.IsActive = data.IsActive;

        this.GameStatus = data.GameStatus;



        this.RoundNumber = data.RoundNumber;

        this.MyDigit11 = data.MyDigit11;
        this.MyDigit12 = data.MyDigit12;
        this.MyDigit13 = data.MyDigit13;
        this.CompetitorDigit11 = data.CompetitorDigit11;
        this.CompetitorDigit12 = data.CompetitorDigit12;
        this.CompetitorDigit13 = data.CompetitorDigit13;

        this.MyDigit21 = data.MyDigit21;
        this.MyDigit22 = data.MyDigit22;
        this.MyDigit23 = data.MyDigit23;
        this.CompetitorDigit21 = data.CompetitorDigit21;
        this.CompetitorDigit22 = data.CompetitorDigit22;
        this.CompetitorDigit23 = data.CompetitorDigit23;

        this.MyDigit31 = data.MyDigit31;
        this.MyDigit32 = data.MyDigit32;
        this.MyDigit33 = data.MyDigit33;
        this.CompetitorDigit31 = data.CompetitorDigit31;
        this.CompetitorDigit32 = data.CompetitorDigit32;
        this.CompetitorDigit33 = data.CompetitorDigit33;

        this.MyDigit41 = data.MyDigit41;
        this.MyDigit42 = data.MyDigit42;
        this.MyDigit43 = data.MyDigit43;
        this.CompetitorDigit41 = data.CompetitorDigit41;
        this.CompetitorDigit42 = data.CompetitorDigit42;
        this.CompetitorDigit43 = data.CompetitorDigit43;

        this.MyDigit51 = data.MyDigit51;
        this.MyDigit52 = data.MyDigit52;
        this.MyDigit53 = data.MyDigit53;
        this.CompetitorDigit51 = data.CompetitorDigit51;
        this.CompetitorDigit52 = data.CompetitorDigit52;
        this.CompetitorDigit53 = data.CompetitorDigit53;

        this.User1Name = data.User1Name;
        this.User2Name = data.User2Name;
        
        this.User1NicNumber = data.User1NicNumber;
        this.User2NicNumber = data.User2NicNumber;

        this.User1Character = data.User1Character;        
        this.User2Character = data.User2Character;

        this.User1CanUseJoker = data.User1CanUseJoker;        
        this.User2CanUseJoker = data.User2CanUseJoker;

        this.MyUserMaxRoundNumber = data.MyUserMaxRoundNumber;
        this.CompetitorUserMaxRoundNumber = data.CompetitorUserMaxRoundNumber;

        this.User1Score = data.User1Score;
        this.User2Score = data.User2Score;

        this.IsMyUserPlaying = data.IsMyUserPlaying;
    }
        
}
