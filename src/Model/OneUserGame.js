export default class OneUserGame
{
    Id = 0;
    
    User1Id = null;
    User2Id = null;
    
    MyUserName = null;
    MyUserNicNumber = null;
    MyUserCharacter = null;

    CompetitorUserName = null;
    CompetitorUserNicNumber = null;
    CompetitorUserCharacter = null;

    GameStatus = null;

    IsStart = false;
    IsFinish = false;
    IsTimeout = false;
    IsCancel = false;
    IsGiveUp = false;
    IsDeclined = false;
    IsActive = false;

    StartStamp = null;
    MinutesPerRound = null;

    MyUserCanUseJoker = null;
    MyUserMaxRoundNumber = null;
    MyUserScore = null;

    CompetitorUserCanUseJoker = null;
    CompetitorUserMaxRoundNumber = null;
    CompetitorUserScore = null;

    RoundNumber = null;
    IsMyUserPlaying = null;

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
        switch (roundNumber + '')
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
        this.Id = data.Id;
        this.User1Id = data.User1Id;
        this.User2Id = data.User2Id;
        this.MyUserName = data.MyUserName;
        this.CompetitorUserName = data.CompetitorUserName;
        this.MyUserNicNumber = data.MyUserNicNumber;
        this.CompetitorUserNicNumber = data.CompetitorUserNicNumber;
        this.MyUserCharacter = data.MyUserCharacter;
        this.CompetitorUserCharacter = data.CompetitorUserCharacter;
        this.GameStatus = data.GameStatus;
        this.IsStart = data.IsStart;
        this.IsFinish = data.IsFinish;
        this.IsTimeout = data.IsTimeout;
        this.IsCancel = data.IsCancel;
        this.IsGiveUp = data.IsGiveUp;
        this.IsDeclined = data.IsDeclined;
        this.StartStamp = data.StartStamp;
        this.MinutesPerRound = data.MinutesPerRound;
        this.MyUserCanUseJoker = data.MyUserCanUseJoker;
        this.CompetitorUserCanUseJoker = data.CompetitorUserCanUseJoker;
        this.MyUserMaxRoundNumber = data.MyUserMaxRoundNumber;
        this.CompetitorUserMaxRoundNumber = data.CompetitorUserMaxRoundNumber;
        this.MyUserScore = data.MyUserScore;
        this.CompetitorUserScore = data.CompetitorUserScore;
        this.RoundNumber = data.RoundNumber;
        this.IsActive = data.IsActive;
        this.IsMyUserPlaying = data.IsMyUserPlaying;
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
    }
        
}
