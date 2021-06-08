import React from 'react';
import SignInLanguagePanel from '../../Components/SignInLanguagePanel';
import {LanguageContext} from '../../Language/LangPack';
import HeadNavigation from '../../Components/HeadNavigation';
import DEVICE_STATUS from '../../Lib/DeviceStatus'

export default class SignInAuthPage extends React.Component {
    nextButtonCallBack;
    constructor(props, context) {
      super(props);
      this.state = {
			selectedItem: null,
			checkedItem: null
		};

      this.nextButtonOnClick = this.nextButtonOnClick.bind(this);
      this.backButtonOnClick = this.backButtonOnClick.bind(this);

      this.signUpLabelOnClick = this.signUpLabelOnClick.bind(this);
      this.policyLabelOnClick = this.policyLabelOnClick.bind(this);

      this.nextButtonCallBack = props.NextButtonCallBack;

    }
  
    nextButtonOnClick()
    {
        this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_CREATEANONIM_CREATING);
    }

    backButtonOnClick()
    {
        this.nextButtonCallBack(DEVICE_STATUS.USERINFO_NOUSER);
    }

    signUpLabelOnClick()
    {
        this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_CREATE);
    }
    
    policyLabelOnClick()
    {
        this.nextButtonCallBack(DEVICE_STATUS.MODAL_POLICY);
    }

    render() {
       
      
          return (
              <LanguageContext.Consumer>
                {(context) =>
                ( 
						<>
							<HeadNavigation>
								<button className="ButtonBack" onClick={this.backButtonOnClick}></button>

							<p className="Title">{context.GetText('signinanonim', 'labelWindow')}</p>

							<SignInLanguagePanel lang="ru"></SignInLanguagePanel>
						</HeadNavigation>
						
						<div className="SignInAnonim">                  
							<p className="GeneralSubtitle">
								{context.GetText('signinanonim', 'labelYourNickname')} <span>anonim6045</span>
							</p>
							
							<div className="SignInAnonimImage">
								<img src="/img/avatar/1/boy.1.png" alt="Anonim"></img>
							</div>

							<p className="SignInAnonimTip">
								{context.GetText('signinanonim', 'tipCannotChooseImg')}
							</p>

							<p className="SignInAnonimSignUp" onClick={this.signUpLabelOnClick}>{context.GetText('signinanonim', 'linkGoToSignUp')}</p>
						</div>

						<div className="FooterArea">
							<p className="AdditionalTip">
								{context.GetText('signinanonim', 'tipConditionBegin')}
								<span>{context.GetText('signinanonim', 'tipConditionLink')}</span>
								{context.GetText('signinanonim', 'tipConditionEnd')}
							</p>

							<button className="ButtonBig" onClick={this.nextButtonOnClick}>{context.GetText('common', 'modalButtonContinue')}</button>
						</div>
					</>
				)}
			</LanguageContext.Consumer>
		);
	}
}

SignInAuthPage.contextType = LanguageContext;
