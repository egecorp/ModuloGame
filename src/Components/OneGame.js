import React from 'react'


export default class OneGame extends React.Component {

    
    constructor(props, context) {
        super(props);
        /*
        this.state = {
            isStart: false,
            isFinish: false
        };*/

        this.context = context;
        this.isCup = props.IsCup;
        this.onGameClick = this.onGameClick.bind(this);

    }

    onGameClick()
    {

    }

	render() { 

        if (this.isCup)
        {
            var context = this.context;
			return (
                <li>
                    <div className="Player">
                        <div className="Avatar"></div>
                        <p>WOLF_F</p>
                    </div>

                    <div className="Cup">
                        <div className="ELO">
                            <p>(1056)</p>
                        </div>

                        <div className="Score">
                            <p className="Status">Счёт 8:6</p>
                            <div className="Info">
                                <p>{context.GetText('gamelist', 'labelCup')}</p>
                                <div className="IconCup"></div>
                            </div>
                        </div>

                        <div className="ELO">
                            <p>(1086)</p>
                        </div>
                    </div>

                    <div className="Player">
                        <div className="Avatar"></div>
                        <p>ЧёКаво?</p>
                    </div>                </li>
				
			);
        }
        else
        {

			return (
                <li>
                    <div className="Player">
                        <div className="Avatar"></div>
                        <p>Vinni</p>
                    </div>

                    <p className="Status">Идёт 3 раунд</p>
                    
                    <div className="Player">
                        <div className="Avatar"></div>
                        <p>Калашников</p>
                    </div>
                </li>
				
			);
        }


	}
}