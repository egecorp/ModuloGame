import React from 'react';
import SignInLanguagePanel from '../../Components/SignInLanguagePanel';
import {LanguageContext} from '../../Language/LangPack';
import HeadNavigation from '../../Components/HeadNavigation';


export default class SignInAuthPage extends React.Component {
    constructor(props, context) {
      super(props);
      this.state = {
          currentLogin: 'Hello', 
          currentToken: 'Token',

          selectedItem: null,
          checkedItem: null
      };

      //this.changeItemState = this.changeItemState.bind(this);

    }
  
    render() {
       
      
          return (
              <LanguageContext.Consumer>
                {(context) =>
                ( 
						<>
							<HeadNavigation>
								<button className="ButtonBack"></button>

								<p className="HeadNavigationTitle">Новый аккаунт</p>

								<SignInLanguagePanel lang="ru"></SignInLanguagePanel>
							</HeadNavigation>
							
							<div className="SignInAnonim">                  
								<p className="GeneralSubtitle">
									{context.GetText('signinanonim', 'labelYourNicName')} <span>anonim6045</span>
								</p>
								
								<div className="SignInAnonimImage">
									<img src="/img/avatar/1/boy.1.png" alt="Anonim"></img>
								</div>

								<p className="SignInAnonimTip">
									{context.GetText('signinanonim', 'tipCannotChooseImg')}
								</p>

								<p className="SignInAnonimSignUp">{context.GetText('signinanonim', 'linkGoToSignUp')}</p>
							</div>

							<div className="FooterArea">
								<p className="AdditionalTip">
									{context.GetText('signinanonim', 'tipConditionBegin')}
									<span>{context.GetText('signinanonim', 'tipConditionLink')}</span>
									{context.GetText('signinanonim', 'tipConditionEnd')}
								</p>

								<button>{context.GetText('signinanonim', 'continueButton')}</button>
							</div>
						</>
					 )}
              </LanguageContext.Consumer>
          );
      
    }
  }
  SignInAuthPage.contextType = LanguageContext;
  
  