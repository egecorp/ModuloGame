import React from 'react'
import SignInLanguagePanel from '../../Components/SignInLanguagePanel'
import {LanguageContext} from '../../Language/LangPack'
import MsgBox from "../../Components/MsgBox"
import HeadNavigation from '../../Components/HeadNavigation'
import DEVICE_STATUS from '../../Lib/DeviceStatus'
import SERVER_ERROR from '../../Lib/ServerError'

export default class SignUpPage extends React.Component {
    nextButtonCallBack;
constructor(props, context) {
	super(props);
	this.state = {
		selectedItem: null,
		checkedItem: null
	};
	this.currentContext = context;

    this.nextButtonOnClick = this.nextButtonOnClick.bind(this);
    this.backButtonOnClick = this.backButtonOnClick.bind(this);
    this.policyLabelOnClick = this.policyLabelOnClick.bind(this);
    this.modalButtonOnClick = this.modalButtonOnClick.bind(this);

    this.nextButtonCallBack = props.NextButtonCallBack;

    this.myDevice = props.Device;

    this.inputNicName = React.createRef();
    this.inputEmail = React.createRef();
    //this.inputCountry = React.createRef();
    //this.inputPhoneNumber = React.createRef();
    //this.inputDob = React.createRef();

}
  
nextButtonOnClick()
{

    let postObject = {};

    postObject.NicName = this.inputNicName.current.value;
    postObject.EMail = this.inputEmail.current.value;
    //postObject.NicCountryName = this.inputCountry.current.value;
    //postObject.TNumber = this.inputPhoneNumber.current.value;
    //postObject.Birthday = this.inputDob.current.value;
    postObject.DeviceWorkToken = this.props.Device.DeviceWorkToken;

    //this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_CREATE_CREATING);
    this.myDevice.CreateUser.call(this.myDevice, this.checkCreateUser, this, postObject);
}

checkCreateUser(newStatus)
{

    if (newStatus === DEVICE_STATUS.USERINFO_SHOW_CREATE_DONE)
    {
        this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_CREATE_DONE);
    }
    else if (newStatus === DEVICE_STATUS.USERINFO_SHOW_CREATE_FAIL)
    {
        console.log('Creating user error');
        if (!this.myDevice.CurrentError) this.myDevice.CurrentError = 'Что-то пошло не так, попробуйте снова';
        console.log(this.myDevice.CurrentError);
        this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_CREATE_FAIL);
    }
}

modalButtonOnClick()
{

    if (this.props.Device.CurrentError)
    {
        this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_CREATE);
    }
    else
    {
        this.nextButtonCallBack(DEVICE_STATUS.USERINFO_GOOD);
    }



    console.log("Modal button onclick");
    //this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_CREATE_CREATING);
    //this.myDevice.CreateUser.call(this.myDevice, this.checkCreateUser, this, postObject);
}

backButtonOnClick()
{
    this.nextButtonCallBack(DEVICE_STATUS.USERINFO_NOUSER);
}
    
policyLabelOnClick()
{
    this.nextButtonCallBack(DEVICE_STATUS.MODAL_POLICY);
}

render() {	
	var MsgBoxHTML = null;
	if (this.props.modalstate === 'ShowError')
	{
        let errorTitle = this.currentContext.GetText('signup.ShowError.ServerError', 'title');
        let errorText = this.currentContext.GetText('signup.ShowError.ServerError', 'text');
        let errorLink = null;
        let errorNextButton = this.currentContext.GetText('signup.ShowError.ServerError', 'continueButton');

        if (this.props.Device.CurrentError === SERVER_ERROR.SIGNUP_EMAIL_EXISTS)
        {
            errorTitle = this.currentContext.GetText('signup.ShowError.EmailExists', 'title');
            errorText = this.currentContext.GetText('signup.ShowError.EmailExists', 'text');
            errorLink = this.currentContext.GetText('signup.ShowError.EmailExists', 'goauth');
            errorNextButton = this.currentContext.GetText('signup.ShowError.EmailExists', 'continueButton');
        }
        else if (this.props.Device.CurrentError === SERVER_ERROR.SIGNUP_BAD_EMAIL)
        {
            errorTitle = this.currentContext.GetText('signup.ShowError.BadEmail', 'title');
            errorText = this.currentContext.GetText('signup.ShowError.BadEmail', 'text');
            errorNextButton = this.currentContext.GetText('signup.ShowError.BadEmail', 'continueButton');
        }
        else if (this.props.Device.CurrentError === SERVER_ERROR.SIGNUP_BAD_DATA)
        {
            errorTitle = this.currentContext.GetText('signup.ShowError.BadData', 'title');
            errorText = this.currentContext.GetText('signup.ShowError.BadData', 'text');
            errorNextButton = this.currentContext.GetText('signup.ShowError.BadData', 'continueButton');
        }

		MsgBoxHTML = (
		<MsgBox ModalButton={errorNextButton}  OnButtonClick={this.modalButtonOnClick}>
			<div className="Content">
				<header>
					<div className="WarningIcon"></div>
					<p className="Title">{errorTitle}</p>
				</header>

				<p>{errorText}</p>
				{
					errorLink ? (<span href="/">{errorLink}</span>) : null
				}                
			</div>
		</MsgBox>
		)
	}
	else if (this.props.modalstate === 'Success')
	{
		MsgBoxHTML = (
		<MsgBox ModalButton={this.currentContext.GetText('common', 'popupButtonContinue')} OnButtonClick={this.modalButtonOnClick}>
			<div className="Content">
				<header>
					<p className="Title">{this.currentContext.GetText('signin.modal.Success', 'labelWindow')}</p>
				</header>
				
				<p>{this.currentContext.GetText('signin.modal.Success', 'text')}</p>
			</div>
		</MsgBox>
		)
	}
	//{this.currentContext.GetText('signin.modal.AlreadyExists', 'title')}
	//{this.currentContext.GetText('signin.modal.AlreadyExists', 'text')}
	
		return (
			<LanguageContext.Consumer>
				{(context) =>
				( 
				<>
					<HeadNavigation>
						<button className="ButtonBack"  onClick={this.backButtonOnClick}></button>

						<p className="Title">{context.GetText('signup', 'labelWindow')}</p>

						<SignInLanguagePanel lang='ru'></SignInLanguagePanel>
					</HeadNavigation>

					<div className="SignUp ContentGap">
						<p className="GeneralSubtitle">{context.GetText('signup', 'sublabelWindow')}</p>

						<form>
							<div className="LabelInput">
								<label htmlFor="inputNicName">{context.GetText('signup', 'formLabelNicName')}</label>
								<input ref={this.inputNicName} type="text" className="General" name="inputNicName" placeholder={context.GetText('signup', 'formPlaceholderNicName')} />
							</div>

							<div className="LabelInput">
								<label htmlFor="inputEMail">{context.GetText('signup', 'formLabelEMail')}</label>
								<input ref={this.inputEmail} type="text" className="General" name="inputEMail" placeholder={context.GetText('signup', 'formPlaceholderEMail')} />
							</div>
						</form>
					</div>

					<div className="FooterArea">
						<p className="AdditionalTip">
							{context.GetText('signup', 'tipConditionBegin')}
							<span onClick={this.policyLabelOnClick}>{context.GetText('signup', 'tipConditionLink')}</span>
							{context.GetText('signup', 'tipConditionEnd')}
						</p>

						<button className="ButtonBig" onClick={this.nextButtonOnClick}>{context.GetText('signup', 'continueButton')}</button>
					</div>

					{MsgBoxHTML}
					
				</>
				)}
			</LanguageContext.Consumer>
		);

        /*
            <div className="LabelInput">
                <label htmlFor="inputCountry">{context.GetText('signup', 'formLabelCountry')}</label>
                <select ref={this.inputCountry} className="General" name="inputCountry" placeholder={context.GetText('signup', 'formPlaceholderCountry')}>
                    {Array.from(context.GetDictionary('country').entries()).map(x => <option key={x[0]} value={x[0]}>{x[1]}</option>)}
                    </select>
                    </div>

                    <div className="LabelInput">
                        <label htmlFor="inputPhone">{context.GetText('signup', 'formLabelPhone')}</label>
                        <input  ref={this.inputPhoneNumber}type="tel" className="General" name="inputPhone" placeholder={context.GetText('signup', 'formPlaceholderPhone')} />
                    </div>

                    <div className="LabelInput">
                        <label htmlFor="inputDOB">{context.GetText('signup', 'formLabelDOB')}</label>
                        <input
                            ref={this.inputDob}
                            type="text"
                            className="General Date"
                            onFocus={(e) => (e.currentTarget.type = "date")}
                            onBlur={(e) => (e.currentTarget.type = "text")}
                            placeholder={context.GetText('signup', 'formPlaceholderDOB')}
                        />
                    </div>
            */
	}
}

SignUpPage.contextType = LanguageContext;