import React from 'react'
import ReactDOM from  'react-dom'
import {LanguageContext} from '../Language/LangPack'


const modalRoot = document.getElementById('modal-root');

export default class Menu extends React.Component {

    callBackFunction = null;

    constructor(props, context) {
        super(props);
        this.el = document.createElement('div');

        this.callBackFunction = props.OnButtonClick;
        this.onItemClick = this.onItemClick.bind(this);
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

    onItemClick(item){
        if (typeof(this.props.onMenuClick) === "function") this.props.onMenuClick(item);
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
										<div>
                                            <div onClick={this.onItemClick('statistic')}>{context.GetText('menu', 'statistic')}</div>
                                            <div onClick={this.onItemClick('rules')}>{context.GetText('menu', 'rules')}</div>
                                            <div onClick={this.onItemClick('conditions')}>{context.GetText('menu', 'conditions')}</div>
                                            <div onClick={this.onItemClick('settings')}>{context.GetText('menu', 'settings')}</div>
                                            {/*<div>{context.GetText('menu', 'exit')}</div>*/}
                                        </div>
									</div>
                                    
								</div>
							</>
						)}
						</LanguageContext.Consumer>
            ), this.el
          );
      
	}
}
Menu.contextType = LanguageContext;