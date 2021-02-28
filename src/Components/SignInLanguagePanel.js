import React from 'react'

export default class SignInLanguagePanel extends React.Component
{


    render(prop)
    {

        if (this.props.lang === 'eng')
        {
            return (
                <div className='SignInLanguagePanel'>
                    <div className='SignInLanguagePanelFlag' data-country="eng"></div>
                    <div className='SignInLanguagePanelName'>English</div>
                </div>
                );
        }
        else
        {
            return (
                <div className='SignInLanguagePanel'>
                    <div className='SignInLanguagePanelFlag' data-country="ru"></div>
                    <div className='SignInLanguagePanelName'>Русский</div>
                </div>
                );
        }
    }



}