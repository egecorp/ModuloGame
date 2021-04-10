import React from 'react'
import SignInLanguagePanel from '../../Components/SignInLanguagePanel'
import {LanguageContext} from '../../Language/LangPack'
import MsgBox from "../../Components/MsgBox";
import HeadNavigation from '../../Components/HeadNavigation'
import DEVICE_STATUS from '../../Lib/DeviceStatus'

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

checkCreateUser(a)
{
    console.log("checkCreateUser");
    console.log(a);
}


backButtonOnClick()
{
    this.nextButtonCallBack(DEVICE_STATUS.USERINFO_NOUSER);
}

render() {	
	var MsgBoxHTML = null;
	if (this.props.modalstate === 'AlreadyExists')
	{
		MsgBoxHTML = (
		<MsgBox ModalButton={this.currentContext.GetText('signin.modal.AlreadyExists', 'continueButton')}>
			<div className="Content">
				<div className="WarningIcon"></div>
				<p className="Title">Пользователь с таким ником уже существует.</p>
				<p>Возможно, Вы уже были зарегистрированы в Modulo.</p>
				<a href="/">{this.currentContext.GetText('signin.modal.AlreadyExists', 'goauth')}</a>
			</div>
		</MsgBox>
		)
	}
	else if (this.props.modalstate === 'Success')
	{
		MsgBoxHTML = (
		<MsgBox ModalButton="Продолжить">
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
						<p className="AdditionalTip">{context.GetText('signup', 'tipConditionBegin')}<span>{context.GetText('signup', 'tipConditionLink')}</span>{context.GetText('signup', 'tipConditionEnd')}</p>

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