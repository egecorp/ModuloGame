export default class OneModuloGame
{

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
                this.Rounds = [];
                if (data.Round)
                {
                        for(var i in data.Rounds)
                        {
                                
                        }
                }
        }

        Id = 0;

        StartStamp = null;

        MinutesPerRound = null;

        User1Id = null;

        User2Id = null;

        IsStart = false;

        IsFinish = false;

        IsTimeout = false;

        IsCancel = false;

        
        Rounds = [];

        
        
}