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

								<SignInLanguagePanel lang='ru'></SignInLanguagePanel>
							</HeadNavigation>
							
							<div className='SignInAnonim'>                  
								<div className='SignInNicName'>
								{context.GetText('signinanonim', 'labelYourNicName')} <span>anonim6045</span>
								</div>
								
								<div className='SignInAnonimImage'>
								<img src="/img/avatar/1/boy.1.png" alt="Anonim"></img>
								</div>

								<div className="SignInAnonimTip" >
								{context.GetText('signinanonim', 'tipCannotChooseImg')}
								</div>

								<div className="SignInAnonimSignUp" >
								{context.GetText('signinanonim', 'linkGoToSignUp')}
								</div>

								<div className="SignInAnonimTipCondition" >
									{this.currentContext.GetText('signinanonim', 'tipConditionBegin')}
									<span>{this.currentContext.GetText('signinanonim', 'tipConditionLink')}</span>
									{this.currentContext.GetText('signinanonim', 'tipConditionEnd')}
								</div>
							</div>
                	
							<div className="FooterArea">
								<button>{context.GetText('signinanonim', 'continueButton')}</button>
							</div>
						</>
					 )}
              </LanguageContext.Consumer>
          );
      
    }
  }
  SignInAuthPage.contextType = LanguageContext;
  
  