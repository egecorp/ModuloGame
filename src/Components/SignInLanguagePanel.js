import React from 'react'

export default class SignInLanguagePanel extends React.Component
{


    render(prop)
    {

        if (this.props.lang === 'eng')
        {
            return (
                <button className='SignInLanguagePanel ButtonGreen'>
                    <div className='SignInLanguagePanelFlag' data-country="eng"></div>
                    <p className='SignInLanguagePanelName'>English</p>
                </button>
                );
        }
        else
        {
            return (
                <button className='SignInLanguagePanel ButtonGreen'>
                    <div className='SignInLanguagePanelFlag' data-country="ru"></div>
                    <p>Русский</p>
                </button>
                );
        }
    }



}