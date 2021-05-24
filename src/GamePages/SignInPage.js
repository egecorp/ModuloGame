import React from 'react'
import SignInLanguagePanel from '../Components/SignInLanguagePanel'
import CheckBoxButton from '../Components/CheckBoxButton'
import {LanguageContext} from '../Language/LangPack'
import HeadNavigation from '../Components/HeadNavigation'
import DEVICE_STATUS from '../Lib/DeviceStatus'


export default class SignInPage extends React.Component {
    nextButtonCallBack;
    constructor(props, context) {
      super(props);
      this.state = {
          selectedItem: null,
          checkedItem: null,
          tipText: context.GetText('signin', 'typeDefaultTipText')
      };

      this.changeItemState = this.changeItemState.bind(this);
      this.nextButtonOnClick = this.nextButtonOnClick.bind(this);

      this.nextButtonCallBack = props.NextButtonCallBack;
    }
  
    changeItemState(checkBoxName, isSetSelected, isSetChecked)
    {
      this.setState(oldState => ({
        selectedItem: (isSetSelected ? checkBoxName : oldState.selectedItem),
        checkedItem: (isSetChecked ? checkBoxName : oldState.checkedItem)
      }));

      if (isSetSelected)
      {
        switch(checkBoxName)
        {
          case 'anonim':
            this.setState(oldState => ({ tipText: this.context.GetText('signin', 'typeAnonimTipText') }));
            break;
          case 'signup':
            this.setState(oldState => ({ tipText: this.context.GetText('signin', 'typeSignUpTipText') }));
            break;
          case 'signin':
            this.setState(oldState => ({ tipText: this.context.GetText('signin', 'typeSignInTipText') }));
            break;
          default:
            this.setState(oldState => ({ tipText: this.context.GetText('signin', 'typeDefaultTipText') }));
        }
      }      
    }
    
    nextButtonOnClick()
    {
        //TODO CRIITICAL SECTION - заменить на checkedItem и заставить работать
        if (this.state.selectedItem === 'anonim')
        {
            this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_CREATEANONIM);
        }
        else if (this.state.selectedItem === 'signup')
        {
            this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_CREATE);
        }
        else if (this.state.selectedItem === 'signin')
        {
            this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_SIGNIN);
        }
    }

	render() {
		

		return (
			
				<LanguageContext.Consumer>
				{(context) =>
				( 
					<>
						<HeadNavigation column="1">
							<SignInLanguagePanel lang='ru'></SignInLanguagePanel>
						</HeadNavigation>
						
						<div className="SignIn">
							<p className="Welcome">
								<span className="WelcomeTitle">{context.GetText('signin', 'welcomeIn')}</span>
								<br />
								<span className="WelcomeModulo">Modulo</span>
							</p>

							<div className="Buttons">
								<CheckBoxButton 
									changeItemState={this.changeItemState} 
									checkName="anonim" 
									IsChecked={this.state.checkedItem==="anonim"} 
									IsSelected={this.state.selectedItem==="anonim"} 
									title={context.GetText('signin', 'typeAnonimTitle')}>
								</CheckBoxButton>

								<CheckBoxButton 
									changeItemState={this.changeItemState} 
									checkName="signup" 
									IsChecked={this.state.checkedItem==="signup"} 
									IsSelected={this.state.selectedItem==="signup"} 
									title={context.GetText('signin', 'typeSignUpTitle')}>
								</CheckBoxButton>

								<CheckBoxButton
									changeItemState={this.changeItemState} 
									checkName="signin" 
									IsChecked={this.state.checkedItem==="signin"} 
									IsSelected={this.state.selectedItem==="signin"} 
									title={context.GetText('signin', 'typeSignInTitle')}>
								</CheckBoxButton>
							</div>

							<div className="UserTip">
								<p>{this.state.tipText}</p>
							</div>
						</div>

						<div className="FooterArea">
							<button onClick={this.nextButtonOnClick}>{context.GetText('common', 'modalButtonContinue')}</button>
						</div>
					</>
				)}
			</LanguageContext.Consumer>
		);
	}
}

SignInPage.contextType = LanguageContext;