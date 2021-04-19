import React from 'react'
import SignInLanguagePanel from '../../Components/SignInLanguagePanel'
import {LanguageContext} from '../../Language/LangPack'
import MsgBox from "../../Components/MsgBox";
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
    this.inputCountry = React.createRef();
    this.inputPhoneNumber = React.createRef();
    this.inputDob = React.createRef();

}
  
nextButtonOnClick()
{

    let postObject = {};

    postObject.NicName = this.inputNicName.current.value;
    postObject.EMail = this.inputEmail.current.value;
    postObject.NicCountryName = this.inputCountry.current.value;
    postObject.TNumber = this.inputPhoneNumber.current.value;
    //postObject.Birthday = this.inputDob.current.value;
    postObject.DeviceWorkToken = this.props.Device.DeviceWorkToken;

    console.log("postObject : ");
    console.log(postObject);
    //this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_CREATE_CREATING);
    this.myDevice.CreateUser.call(this.myDevice, this.checkCreateUser, this, postObject);
}

checkCreateUser(newStatus)
{

    if (newStatus === DEVICE_STATUS.USERINFO_SHOW_CREATE_DONE)
    {
        console.log('ALL GOOD, SOON DO SMTH...');
        this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_CREATE_DONE);
    }
    else if (newStatus === DEVICE_STATUS.USERINFO_SHOW_CREATE_FAIL)
    {
        console.log('Create user error');
        if (!this.myDevice.CurrentError) this.myDevice.CurrentError = 'Что-то пошло не так, попробуйте снова';
        console.log(this.myDevice.CurrentError);
        this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_CREATE_FAIL);
    }

    
}

modalButtonOnClick()
{

    this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_CREATE_CREATING);
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
        
          

    //SERVER_ERROR.SERVER_ERROR 
    //SERVER_ERROR.ACCESS_ERROR
    //SERVER_ERROR.BAD_DATA 
    //SERVER_ERROR.SIGNUP_ALREADY_BOUND 
    //SERVER_ERROR.SIGNUP_EMAIL_EXISTS 
    //SERVER_ERROR.SIGNUP_BAD_EMAIL 
    //SERVER_ERROR.SIGNUP_BAD_NICKNAME
    //SERVER_ERROR.SIGNUP_PHONE_EXISTS 


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
		<MsgBox ModalButton={this.currentContext.GetText('signin.modal.AlreadyExists', 'continueButton')}>
			<div className="Content">
				<div className="WarningIcon"></div>
				<p className="Title">{errorTitle}</p>
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
		<MsgBox ModalButton="Продолжить" onClick={this.M}>
			<div className="Content">
				<p className="Title">Благодарим за регистрацию!</p>
				<p>Для подтверждения Вашего почтового ящика и получения полных возможностей аккаунта - перейдите по ссылке в письме.</p>
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

						<p className="HeadNavigationTitle">{context.GetText('signup', 'labelWindow')}</p>

						<SignInLanguagePanel lang='ru'></SignInLanguagePanel>
					</HeadNavigation>

					<div className="SignUp">
						<p className="GeneralSubtitle">{context.GetText('signup', 'sublabelWindow')}</p>

						<form>
							<div className="LabelInput">
								<label htmlFor="inputNicName">{context.GetText('signup', 'labelNicName')}</label>
								<input ref={this.inputNicName} type="text" name="inputNicName" placeholder="Введите ник..." />
							</div>

							<div className="LabelInput" >
								<label htmlFor="inputEMail">{context.GetText('signup', 'labelEMail')}</label>
								<input  ref={this.inputEmail} type="text" name="inputEMail" placeholder="Введите e-mail..." />
							</div>

							<div className="LabelInput" >
								<label htmlFor="inputCountry">{context.GetText('signup', 'labelCountry')}</label>
								<select  ref={this.inputCountry} name="inputCountry" placeholder="Выберите страну...">
									{Array.from(context.GetDictionary('country').entries()).map(x => <option key={x[0]} value={x[0]}>{x[1]}</option>)}
									{/*context.GetDictionary('country')  */}
								</select>
							</div>

							<div className="LabelInput" >
								<label htmlFor="inputPhone">{context.GetText('signup', 'labelPhone')}</label>
								<input  ref={this.inputPhoneNumber} type="tel" name="inputPhone" placeholder="+7 (XXX) XXX-XX-XX" />
							</div>

							<div className="LabelInput" >
								<label htmlFor="inputDOB">{context.GetText('signup', 'labelDOB')}</label>
								<input  ref={this.inputDob} type="date" name="inputDOB" placeholder="дд.мм.гггг" />
							</div>
						</form>
					</div>

					<div className="FooterArea">
						<p className="AdditionalTip">
                            {context.GetText('signup', 'tipConditionBegin')}
                            <span onClick={this.policyLabelOnClick}>{context.GetText('signup', 'tipConditionLink')}</span>
                            {context.GetText('signup', 'tipConditionEnd')}
                        </p>

						<button  onClick={this.nextButtonOnClick}>{context.GetText('signin', 'continueButton')}</button>
					</div>

					{MsgBoxHTML}
					
				</>
				)}
			</LanguageContext.Consumer>
		);
	}
}

SignUpPage.contextType = LanguageContext;