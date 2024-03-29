import React from 'react'
import SignInLanguagePanel from '../../Components/SignInLanguagePanel'
import {LanguageContext} from '../../Language/LangPack'
import MsgBox from "../../Components/MsgBox"
import HeadNavigation from '../../Components/HeadNavigation'
import DEVICE_STATUS from '../../Lib/DeviceStatus'
import SERVER_ERROR from '../../Lib/ServerError'


export default class SignInAuthPage extends React.Component {
	constructor(props, context) {
        super(props);
        this.state = {
            selectedItem: null,
            checkedItem: null
        };
        this.currentContext = context;

        this.myDevice = props.Device;
        this.nextButtonCallBack = props.NextButtonCallBack;

        this.inputEmail = React.createRef();
        this.inputCode = React.createRef();

        this.checkSignInUser = this.checkSignInUser.bind(this);
        this.nextButtonOnClick = this.nextButtonOnClick.bind(this);
        this.onFailMessageButtonClick = this.onFailMessageButtonClick.bind(this);
        this.onFailCodeMessageButtonClick = this.onFailCodeMessageButtonClick.bind(this);
        this.onRepeateConfirmationLinkClick = this.onRepeateConfirmationLinkClick.bind(this);
        this.onCancelConfirmationLinkClick = this.onCancelConfirmationLinkClick.bind(this);
        this.onConfirmButtonClick = this.onConfirmButtonClick.bind(this);
	}


    nextButtonOnClick()
    {
    
        let postObject = {};
    
        postObject.EMail = this.inputEmail.current.value;
        postObject.DeviceWorkToken = this.props.Device.DeviceWorkToken;
    
        //this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_CREATE_CREATING);
        this.props.Device.SignInUser.call(this.props.Device, this.checkSignInUser, this, postObject);
    }

    
checkSignInUser(newStatus)
{
    switch(newStatus)
    {
        case DEVICE_STATUS.USERINFO_SHOW_SIGNIN_DONE:    
            this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_SIGNIN_DONE);
            break;
    
        case DEVICE_STATUS.USERINFO_SHOW_REPEATE_DONE:    
            this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_REPEATE_DONE);
            break;
    
        case  DEVICE_STATUS.USERINFO_SHOW_SIGNIN_FAIL:
            console.warn('Исправить');
            if (!this.myDevice.CurrentError) this.myDevice.CurrentError = 'Что-то пошло не так, попробуйте снова';
            this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_SIGNIN_FAIL);
            break;
        case DEVICE_STATUS.USERINFO_SHOW_SIGNIN_SEND_CODE_FAIL:
            console.warn('Исправить');
            if (!this.myDevice.CurrentError) this.myDevice.CurrentError = 'Что-то пошло не так, попробуйте снова';
            this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_SIGNIN_SEND_CODE_FAIL);
            break;
        case DEVICE_STATUS.USERINFO_SHOW_REPEATE_FAIL:
            this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_REPEATE_FAIL);
            break;    
        default:
            this.nextButtonCallBack(newStatus);
    }
}

onFailMessageButtonClick()
{
    console.log('onFailMessageButtonClick');
    this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_SIGNIN);
}

onFailCodeMessageButtonClick()
{
    console.log('onFailCodeMessageButtonClick');
    this.nextButtonCallBack(DEVICE_STATUS.USERINFO_SHOW_SIGNIN_DONE);
}

onRepeateConfirmationLinkClick()
{
    let postObject = {};
    
    postObject.EMail = this.props.UserMail;
    postObject.DeviceWorkToken = this.props.Device.DeviceWorkToken;

    this.props.Device.RepeateVerifyingMail.call(this.props.Device, this.checkSignInUser, this, postObject);
}

onCancelConfirmationLinkClick()
{
    let postObject = {};
    postObject.DeviceWorkToken = this.props.Device.DeviceWorkToken;

    this.props.Device.CancelVerifying.call(this.props.Device, this.checkSignInUser, this, postObject);
}

onConfirmButtonClick()
{
    let postObject = {};
    postObject.ConfirmationCode = this.inputCode.current.value;
    postObject.DeviceWorkToken = this.props.Device.DeviceWorkToken;

    this.props.Device.EnterVerifyingCode.call(this.props.Device, this.checkSignInUser, this, postObject);
}


render() {
		var MsgBoxHTML = null;

        var repeateHtml = null;

        if(this.props.IsRepeatedCode !== true)
        {
            repeateHtml = (
                <span onClick={this.onRepeateConfirmationLinkClick}>
                    {this.currentContext.GetText('signin.modal.MailCode', 'linkRepeate')}
                 </span>
            )
        }

		if (this.props.modalstate === 'EnterCode')
		{
			MsgBoxHTML = (
				<MsgBox 
                    ModalButton={this.currentContext.GetText('common', 'popupButtonSend')}
                    OnButtonClick={this.onConfirmButtonClick}
                >
					<div className="Content">
						<p>
							<span>
								{this.currentContext.GetText('signin.modal.MailCode', 'text_1_Start')}
								<b>{this.props.UserMail ?? ""}</b>
								{this.currentContext.GetText('signin.modal.MailCode', 'text_1_End')}
							</span>

							<span>{this.currentContext.GetText('signin.modal.MailCode', 'text_2')}</span>
						</p>
					</div>

					<form className="MailCode">
						<label htmlFor="CheckMailCode">{this.currentContext.GetText('signin.modal.MailCode', 'formLabel')}</label>
						<input 
                            ref={this.inputCode}  
                            type="text" 
                            className="InPopup" 
                            placeholder={this.currentContext.GetText('signin.modal.MailCode', 'formPlaceholderCode')}
                        ></input>
					</form>

                    <div className="Content">
						<p>
							{repeateHtml}
                        </p>
                        <p>
							<span>{this.currentContext.GetText('signin.modal.MailCode', 'linkCancelTitle')}
                                <span onClick={this.onCancelConfirmationLinkClick}>{this.currentContext.GetText('signin.modal.MailCode', 'linkCancel')}</span>
                            </span>
						</p>
					</div>
				</MsgBox>
			)
		} 
		else if (this.props.modalstate === 'FailCode')
		{

            let errorTitle = this.currentContext.GetText('signup.ShowError.ServerError', 'title');
            let errorText = this.currentContext.GetText('signup.ShowError.ServerError', 'text');
   
            
            if (this.props.Device.CurrentError === SERVER_ERROR.SIGNIN_USER_NOT_FOUND)
            {
                errorTitle = this.currentContext.GetText('SignIn.ShowError.UserNotFound', 'title');
                errorText = this.currentContext.GetText('SignIn.ShowError.UserNotFound', 'text');
            }
            else if (this.props.Device.CurrentError === SERVER_ERROR.SIGNIN_ALREADY_BOUND)
            {
                errorTitle = this.currentContext.GetText('SignIn.ShowError.AlreadyBound', 'title');
                errorText = this.currentContext.GetText('SignIn.ShowError.AlreadyBound', 'text');
            }
            else if (this.props.Device.CurrentError === SERVER_ERROR.SIGNIN_USER_BLOCKED)
            {
                errorTitle = this.currentContext.GetText('SignIn.ShowError.UserBlocked', 'title');
                errorText = this.currentContext.GetText('SignIn.ShowError.UserBlocked', 'text');
            }
            else if (this.props.Device.CurrentError === SERVER_ERROR.SIGNIN_BADUSER)
            {
                errorTitle = this.currentContext.GetText('SignIn.ShowError.BadUser', 'title');
                errorText = this.currentContext.GetText('SignIn.ShowError.BadUser', 'text');
            }
            else if (this.props.Device.CurrentError === SERVER_ERROR.SIGNIN_TOO_QUICK)
            {
                errorTitle = this.currentContext.GetText('SignIn.ShowError.TooQuick', 'title');
                errorText = this.currentContext.GetText('SignIn.ShowError.TooQuick', 'text');
            }
            else if (this.props.Device.CurrentError === SERVER_ERROR.SIGNIN_BADCODE)
            {
                errorTitle = this.currentContext.GetText('SignIn.ShowError.BadCode', 'title');
                errorText = this.currentContext.GetText('SignIn.ShowError.BadCode', 'text');
            }
            else if (this.props.Device.CurrentError === SERVER_ERROR.SIGNIN_EXPIRED)
            {
                errorTitle = this.currentContext.GetText('SignIn.ShowError.ExpiredCode', 'title');
                errorText = this.currentContext.GetText('SignIn.ShowError.ExpiredCode', 'text');
            }
            
            
			MsgBoxHTML = (
				<MsgBox 
                    ModalButton={this.currentContext.GetText('common', 'popupButtonSend')} 
                    OnButtonClick={this.onConfirmButtonClick}
                >
					<div className="Content">
						<p>
							<span>
								{this.currentContext.GetText('signin.modal.MailCode', 'text_1_Start')}
								<b>{this.props.UserMail ?? ""}</b>
								{this.currentContext.GetText('signin.modal.MailCode', 'text_1_End')}
							</span>

							<span className="Error">{errorText}</span>
						</p>
					</div>

					<form className="MailCode">
						<label htmlFor="CheckMailCode">{this.currentContext.GetText('signin.modal.MailCode', 'formLabel')}</label>
						<input 
                            ref={this.inputCode}  
                            type="text" 
                            className="InPopup" 
                            id="CheckMailCode" 
                            value={this.props.OldCode} 
                            placeholder={this.currentContext.GetText('signin.modal.MailCode', 'formPlaceholderCode')}
                        ></input>
					</form>

                    <div className="Content">
						<p>
							{repeateHtml}
                        </p>
                        <p>
							<span>{this.currentContext.GetText('signin.modal.MailCode', 'linkCancelTitle')}
                                <span onClick={this.onCancelConfirmationLinkClick}>{this.currentContext.GetText('signin.modal.MailCode', 'linkCancel')}</span>
                            </span>
						</p>
					</div>

				</MsgBox>
			)
		} 
		else if (this.props.modalstate === 'Fail')
		{

            let errorTitle = this.currentContext.GetText('signup.ShowError.ServerError', 'title');
            let errorText = this.currentContext.GetText('signup.ShowError.ServerError', 'text');
   
            
            if (this.props.Device.CurrentError === SERVER_ERROR.SIGNIN_USER_NOT_FOUND)
            {
                errorTitle = this.currentContext.GetText('SignIn.ShowError.UserNotFound', 'title');
                errorText = this.currentContext.GetText('SignIn.ShowError.UserNotFound', 'text');
            }
            else if (this.props.Device.CurrentError === SERVER_ERROR.SIGNIN_ALREADY_BOUND)
            {
                errorTitle = this.currentContext.GetText('SignIn.ShowError.AlreadyBound', 'title');
                errorText = this.currentContext.GetText('SignIn.ShowError.AlreadyBound', 'text');
            }
            else if (this.props.Device.CurrentError === SERVER_ERROR.SIGNIN_USER_BLOCKED)
            {
                errorTitle = this.currentContext.GetText('SignIn.ShowError.UserBlocked', 'title');
                errorText = this.currentContext.GetText('SignIn.ShowError.UserBlocked', 'text');
            }
            else if (this.props.Device.CurrentError === SERVER_ERROR.SIGNIN_BADUSER)
            {
                errorTitle = this.currentContext.GetText('SignIn.ShowError.BadUser', 'title');
                errorText = this.currentContext.GetText('SignIn.ShowError.BadUser', 'text');
            }
            
            
            
			MsgBoxHTML = (
				<MsgBox 
                    ModalButton={this.currentContext.GetText('common', 'popupButtonBack')} 
                    OnButtonClick={this.onFailMessageButtonClick}
                >
					<div className="Content">
						<p>
							<span>
								{errorTitle}
							</span>

							<span className="Error">{errorText}</span>
						</p>
					</div>
				</MsgBox>
			)
		} 
		return (
			<LanguageContext.Consumer>
				{(context) =>
				( 
					<>
						<HeadNavigation>
							<button className="ButtonBack"></button>

							<p className="Title">{context.GetText('signinauth', 'labelWindow')}</p>

							<SignInLanguagePanel lang="ru"></SignInLanguagePanel>
						</HeadNavigation>

						<div className="SignInAuth ContentGap">
							<p className="GeneralSubtitle">{context.GetText('signinauth', 'sublabelWindow')}</p>

							<form>
								<div className="LabelInput">
									<label htmlFor="inputEMail">{context.GetText('signinauth', 'formLabelEMail')}</label>
									<input  
                                        ref={this.inputEmail}  
                                        type="text" 
                                        className="General" 
                                        name="inputEMail" 
                                        placeholder={context.GetText('signinauth', 'formPlaceholderEMail')} 
                                    /> 
								</div>
							</form>

							<div className="UserTip">
								<p>{context.GetText('signinauth', 'tipFAQ')}</p>
							</div>
						</div>

						<div className="FooterArea">
							<button className="ButtonBig" onClick={this.nextButtonOnClick}>{context.GetText('signinauth', 'continueButton')}</button>
						</div>

						{MsgBoxHTML}
					</>
				)}
			</LanguageContext.Consumer>
		);
	}
}

SignInAuthPage.contextType = LanguageContext;