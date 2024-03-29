import React from 'react'
import ReactDOM from  'react-dom'
import {LanguageContext} from '../Language/LangPack'


const modalRoot = document.getElementById('modal-root');

export default class MsgBox extends React.Component {


    constructor(props, context) {
      super(props);
      this.el = document.createElement('div');
      // this.el.className = 'Modal';

      this.buttonOnClick = this.buttonOnClick.bind(this);
    }

    
    buttonOnClick()
    {
        if (typeof(this.props.OnButtonClick) === "function") this.props.OnButtonClick();
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
                                    {
                                        (this.props.NoButton !== true) &&
                                        (
                                            <div className="Buttons">
                                                <button 
                                                    onClick={this.buttonOnClick}
                                                >
                                                {this.props.ModalButton ?? context.GetText('common', 'modalButtonClose')}
                                                </button>
                                            </div>
                                        )
                                    }
								</div>
							</>
						)}
						</LanguageContext.Consumer>
            ), this.el
          );
      
	}
}
MsgBox.contextType = LanguageContext;