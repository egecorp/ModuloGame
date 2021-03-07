var GameRound = function()
{

    // Первый игрок первое число
    var U1D1 ;

    // Первый игрок второе число
    var U1D2 ;

    // Первый игрок третье число
    var U1D3 ;

    
    // Второй игрок первое число
    var U2D1 ;

    // Второй игрок второе число
    var U2D2 ;

    // Второй игрок третье число
    var U2D3 ;

    var LoadFromServer = function(data)
    {
        this.U1D1 = data.U1D1;
        this.U1D2 = data.U1D2;
        this.U1D3 = data.U1D3;
        this.U2D1 = data.U2D1;
        this.U2D2 = data.U2D2;
        this.U2D3 = data.U2D3;

        CalcScores();
    }

    // Очков у первого игрока
    var U1Score;

    // Очков у второго игрока
    var U2Score;

    // Первый игрок использовал число 2
    var U1Use2 = false;
    // Первый игрок использовал число 3
    var U1Use3 = false;
    // Первый игрок использовал число 4
    var U1Use4 = false;
    // Первый игрок использовал число 5
    var U1Use5 = false;
    // Первый игрок использовал число 6
    var U1Use6 = false;
    // Первый игрок использовал число 7
    var U1Use7 = false;
    // Первый игрок использовал число 8
    var U1Use8 = false;
    // Первый игрок использовал число 9
    var U1Use9 = false;
    // Первый игрок использовал джокера (11)
    var U1Use11 = false;


    // Второй игрок использовал число 2
    var U2Use2 = false;
    // Второй игрок использовал число 3
    var U2Use3 = false;
    // Второй игрок использовал число 4
    var U2Use4 = false;
    // Второй игрок использовал число 5
    var U2Use5 = false;
    // Второй игрок использовал число 6
    var U2Use6 = false;
    // Второй игрок использовал число 7
    var U2Use7 = false;
    // Второй игрок использовал число 8
    var U2Use8 = false;
    // Второй игрок использовал число 9
    var U2Use9 = false;
    // Второй игрок использовал джокера (11)
    var U2Use11 = false;  


    // Произвести подсчёт очков
    var CalcScores = function()
    {
        this.U1Score = 0;
        this.U2Score = 0;
        if (!this.U1D1 || !this.U1D2 || !this.U1D3 || !this.U2D1 || !this.U2D2 || !this.U2D3) return;

        
        if  (this.U1D1 > this.U2D1) 
        {
            if (this.U1D1 % this.U2D1 === 0)
            {
                this.U2Score += Math.round(this.U1D1 / this.U2D1);
            }
            else 
            {
                this.U1Score += this.U1D1 % this.U2D1;
            }
        }
        else if  (this.U2D1 > this.U1D1) 
        {
            if (this.U2D1 % this.U1D1 === 0)
            {
                this.U1Score += Math.round(this.U2D1 / this.U1D1);
            }
            else 
            {
                this.U2Score += this.U2D1 % this.U1D1;
            }
        }

                
        if  (this.U1D2 > this.U2D2) 
        {
            if (this.U1D2 % this.U2D2 === 0)
            {
                this.U2Score += Math.round(this.U1D2 / this.U2D2);
            }
            else 
            {
                this.U1Score += this.U1D2 % this.U2D2;
            }
        }
        else if  (this.U2D2 > this.U1D2) 
        {
            if (this.U2D2 % this.U1D2 === 0)
            {
                this.U1Score += Math.round(this.U2D2 / this.U1D2);
            }
            else 
            {
                this.U2Score += this.U2D2 % this.U1D2;
            }
        }

        
        if  (this.U1D3 > this.U2D3) 
        {
            if (this.U1D3 % this.U2D3 === 0)
            {
                this.U2Score += Math.round(this.U1D3 / this.U2D3);
            }
            else 
            {
                this.U1Score += this.U1D3 % this.U2D3;
            }
        }
        else if  (this.U2D3 > this.U1D3) 
        {
            if (this.U2D3 % this.U1D3 === 0)
            {
                this.U1Score += Math.round(this.U2D3 / this.U1D3);
            }
            else 
            {
                this.U2Score += this.U2D3 % this.U1D3;
            }
        }

        this.U1Use2 = (this.U1D1  ===  2) || (this.U1D2  ===  2) || (this.U1D3  ===  2);
        this.U1Use3 = (this.U1D1  ===  3) || (this.U1D2  ===  3) || (this.U1D3  ===  3);
        this.U1Use4 = (this.U1D1  ===  4) || (this.U1D2  ===  4) || (this.U1D3  ===  4);
        this.U1Use5 = (this.U1D1  ===  5) || (this.U1D2  ===  5) || (this.U1D3  ===  5);
        this.U1Use6 = (this.U1D1  ===  6) || (this.U1D2  ===  6) || (this.U1D3  ===  6);
        this.U1Use7 = (this.U1D1  ===  7) || (this.U1D2  ===  7) || (this.U1D3  ===  7);
        this.U1Use8 = (this.U1D1  ===  8) || (this.U1D2  ===  8) || (this.U1D3  ===  8);
        this.U1Use9 = (this.U1D1  ===  9) || (this.U1D2  ===  9) || (this.U1D3  ===  9);
        this.U1Use11 = (this.U1D1  ===  11) || (this.U1D2  ===  11) || (this.U1D3  ===  11);

        this.U2Use2 = (this.U2D1  ===  2) || (this.U2D2  ===  2) || (this.U2D3  ===  2);
        this.U2Use3 = (this.U2D1  ===  3) || (this.U2D2  ===  3) || (this.U2D3  ===  3);
        this.U2Use4 = (this.U2D1  ===  4) || (this.U2D2  ===  4) || (this.U2D3  ===  4);
        this.U2Use5 = (this.U2D1  ===  5) || (this.U2D2  ===  5) || (this.U2D3  ===  5);
        this.U2Use6 = (this.U2D1  ===  6) || (this.U2D2  ===  6) || (this.U2D3  ===  6);
        this.U2Use7 = (this.U2D1  ===  7) || (this.U2D2  ===  7) || (this.U2D3  ===  7);
        this.U2Use8 = (this.U2D1  ===  8) || (this.U2D2  ===  8) || (this.U2D3  ===  8);
        this.U2Use9 = (this.U2D1  ===  9) || (this.U2D2  ===  9) || (this.U2D3  ===  9);
        this.U2Use11 = (this.U2D1  ===  11) || (this.U2D2  ===  11) || (this.U2D3  ===  11);
    }
}