import React from 'react'
import ReactDOM from  'react-dom'
import {LanguageContext} from '../Language/LangPack'


const modalRoot = document.getElementById('modal-root');

export default class MsgBox2Buttons extends React.Component {

    callBackButton1Function = null;
    callBackButton2Function = null;

    constructor(props, context) {
      super(props);
      this.el = document.createElement('div');
      // this.el.className = 'Modal';

      this.callBackButton1Function = props.OnButtonClick1;
      this.callBackButton2Function = props.OnButtonClick2;

      this.buttonOnClick1 = this.buttonOnClick1.bind(this);
      this.buttonOnClick2 = this.buttonOnClick2.bind(this);
    }

    
    buttonOnClick1()
    {
        if (typeof(this.callBackButton1Function) === "function") this.callBackButton1Function();
    }

    buttonOnClick2()
    {
        if (typeof(this.callBackButton2Function) === "function") this.callBackButton2Function();
    }


    componentDidMount() {
      // Элемент портала добавляется в DOM-дерево после того, как
      // потомки компонента Modal будут смонтированы, это значит,
      // что потомки будут монтироваться на неприсоединённом DOM-узле.
      // Если дочерний компонент должен быть присоединён к DOM-дереву
      // сразу при подключении, например, для замеров DOM-узла,
      // или вызова в потомке 'autoFocus', добавьте в компонент Modal
      // состояние и рендерите потомков только тогда, когда
      // компонент Modal уже вставлен в DOM-дерево.
      modalRoot.appendChild(this.el);
    }
  
    componentWillUnmount() {
      modalRoot.removeChild(this.el);
    }
    render() { 
          return ReactDOM.createPortal ((
            <LanguageContext.Consumer>
            {(context) =>
            ( 
							<>
								<div className="ModalBG"></div>

								<div className="Modal">
									<div className="ModalBody">
										<div>{this.props.children ?? ""}</div>
									</div>

									<div className="Button">
										<button onClick={this.buttonOnClick1}>{this.props.ModalButton1 ?? context.GetText('common', 'modalButtonClose')}</button>
									</div>

                                    <div className="Button">
										<button onClick={this.buttonOnClick2}>{this.props.ModalButton2 ?? context.GetText('common', 'modalButtonNo')}</button>
									</div>
								</div>
							</>
						)}
						</LanguageContext.Consumer>
            ), this.el
          );
      
	}
}
MsgBox2Buttons.contextType = LanguageContext;