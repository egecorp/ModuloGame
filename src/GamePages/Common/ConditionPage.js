import React from 'react'
import SignInLanguagePanel from '../../Components/SignInLanguagePanel'
import {LanguageContext} from '../../Language/LangPack'


export default class ConditionPage extends React.Component {
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
                  
                <div className='ConditionPage'>

                  <SignInLanguagePanel lang='ru'></SignInLanguagePanel>
                  
                  <div className='ConditionTitle'>
                    {context.GetText('condition', 'conditionTitle')}
                  </div>
                    
                  <div className='ConditionBody'>
                    <div>{context.GetText('condition', 'conditionBody')}</div>
                  </div>
                  <div  className="FooterArea">
                    <button>{context.GetText('condition', 'continueButton')}</button>
                  </div>
                </div>
                )}
              </LanguageContext.Consumer>
          );
      
    }
  }
  ConditionPage.contextType = LanguageContext;
  
  