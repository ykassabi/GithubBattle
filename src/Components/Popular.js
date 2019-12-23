import React from 'react';


export default class Popular extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            currentLanguage: 'All'
        }

        this.updateLanguageNavBar = this.updateLanguageNavBar.bind(this)
    }

    updateLanguageNavBar(currentLanguage) {
        this.setState({
            currentLanguage
        })
    }

    render(){
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'Python'];

        return (

            <ul className='flex-center'>

                { languages.map((language,index)=>(<li key={index}>
                    <button 
                    className='btn-clear-nav-link'
                    style={language === this.state.currentLanguage ? { color:'yellow', backgroundColor:'black'} : null }
                    onClick={()=> this.updateLanguageNavBar(language)}
                    >
                    {language}
                    </button>
                    </li>))
                }

            </ul>
        )

    }
}