import React from 'react'

export default class SignInLanguagePanel extends React.Component
{


    render(prop)
    {

        if (this.props.lang === 'eng')
        {
            return (
                <button className='SignInLanguagePanel'>
                    <div className='SignInLanguagePanelFlag' data-country="eng"></div>
                    <p className='SignInLanguagePanelName'>English</p>
                </button>
                );
        }
        else
        {
            return (
                <button className='SignInLanguagePanel'>
                    <div className='SignInLanguagePanelFlag' data-country="ru"></div>
                    <p className='SignInLanguagePanelName'>Русский</p>
                </button>
                );
        }
    }



}