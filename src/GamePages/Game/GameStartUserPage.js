import React from 'react';
import {LanguageContext} from '../../Language/LangPack';
import HeadNavigation from '../../Components/HeadNavigation';

const MIN_LENGTH_TO_SEARCH = 3;

export default class GameStartUserPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          currentLogin: 'Hello', 
          currentToken: 'Token',
      };
      this.searchOnInput = this.searchOnInput.bind(this);
    }
    

    searchOnInput(ev)
    {
        if ((ev.target.value || "").length < MIN_LENGTH_TO_SEARCH)
        {
            this.onUserListUpdate("MIN");
        }
        else
        {
            this.props.Device.GetUserList(ev.target.value, this.onUserListUpdate, this);
        }
    }

    onUserListUpdate(data)
    {
        console.log(data);
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
							<input type="text" className="General" name="Search" onInput={this.searchOnInput} placeholder={context.GetText('finduser', 'inputPlaceholderSearch')} />
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