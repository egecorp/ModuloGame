import React from 'react';
import {LanguageContext} from '../../Language/LangPack';
import HeadNavigation from '../../Components/HeadNavigation';


export default class GameStartUserPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          currentLogin: 'Hello', 
          currentToken: 'Token',
      };
    }
  
    render() {
        
       
      
		return (
			<LanguageContext.Consumer>
			{(context) =>
			( 
				<>
					<HeadNavigation>
						<button className="ButtonBack"></button>

						<p className="HeadNavigationTitle">{context.GetText('finduser', 'labelWindow')}</p>
					</HeadNavigation>
					
					<div className="FindUser">
						<div className="Search">
							<input type="text" className="General" name="Search" placeholder={context.GetText('finduser', 'inputPlaceholderSearch')} />
							<button disabled></button>
						</div>

						<p className="GeneralSubtitle">{context.GetText('finduser', 'sublabelFavoriteUsers')}</p>
						
						<ul className="Players">
							<li>
								<div className="Avatar"></div>
								<p>VINNI</p>
								<button></button>
							</li>

							<li>
								<div className="Avatar"></div>
								<p>Чёкаво?</p>
								<button></button>
							</li>

							<li>
								<div className="Avatar"></div>
								<p>WOLF_F</p>
								<button></button>
							</li>
						</ul>

						<p className="GeneralSubtitle">{context.GetText('finduser', 'sublabelRecentUsers')}</p>
					
						<ul className="Players">
							<li>
								<div className="Avatar"></div>
								<p>CLOWN02</p>
								<button></button>
							</li>

							<li>
								<div className="Avatar"></div>
								<p>Чёкаво?</p>
								<button></button>
							</li>

							<li>
								<div className="Avatar"></div>
								<p>EZWINB4</p>
								<button></button>
							</li>
						</ul>
					</div>
				</>
			)}
			</LanguageContext.Consumer>
		);
	}
}