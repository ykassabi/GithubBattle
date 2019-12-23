import React from 'react';

function NavBar ({selected, onUpdateLanguague}){

const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'Python'];

    return (

        <ul className='flex-center'>

            { languages.map((language,index)=>(<li key={index}>
                <button 
                className='btn-clear-nav-link'
                style={language === selected ? { color:'yellow', backgroundColor:'black'} : null }
                onClick={()=> onUpdateLanguague(language)}
                >
                {language}
                </button>
                </li>))
            }

        </ul>
    )
}

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
        
        const {currentLanguage} = this.state

        return(
            <React.Fragment>
                <NavBar 
                    selected={currentLanguage}
                    onUpdateLanguague ={this.updateLanguageNavBar}
                />
            </React.Fragment>
        )
    }
}