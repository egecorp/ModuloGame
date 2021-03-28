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
						<div className="LabelInput Search">
							<input type="text" name="Search" placeholder={context.GetText('finduser', 'inputPlaceholderSearch')} />
							<button disabled></button>
						</div>

						<p className="GeneralSubtitle">{context.GetText('finduser', 'sublabelFavoriteUsers')}</p>

						<p className="GeneralSubtitle">{context.GetText('finduser', 'sublabelRecentUsers')}</p>
					</div>
				</>
			)}
			</LanguageContext.Consumer>
		);
      
    }
  }
  
  