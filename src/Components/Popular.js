import React from 'react';
import PropTypes from "prop-types";
// import {string, func} from 'prop-types';
import {
    fetchPopularRepos
} from '../utils/api';



function NavBar ({selected, onUpdateLanguague}){

const languages = ['All', 'JavaScript', 'Ruby', 'Python', 'Go', 'Dart'];

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
            currentLanguage: 'All',
            repos: null,
            errorMsg: null
        }

        this.updateLanguageNavBar = this.updateLanguageNavBar.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }

    updateLanguageNavBar(currentLanguage) {
        this.setState({
            currentLanguage,
            errorMsg: null,
            repos: null
        })
        fetchPopularRepos(currentLanguage)
        .then(repos => this.setState({
            repos, 
            errorMsg:null
            })
        )
        .catch(()=>{
            this.setState({errorMsg: 'Sorry, Failed to fetch Repos!'})
        })
    }


isLoading() {
    return this.state.repos === null && this.state.error === null 
}


componentDidMount(){
    this.updateLanguageNavBar(this.setState.currentLanguage)
}


    render(){
        
        const {currentLanguage,repos, errorMsg} = this.state

        return(
            <React.Fragment>
                <NavBar 
                    selected={currentLanguage}
                    onUpdateLanguague ={this.updateLanguageNavBar}
            />

                {this.isLoading() && <h2> LOADING, Patience please ....</h2>}   
                {errorMsg && {errorMsg}}

                 {
                     repos && <pre > {
                         JSON.stringify(repos, null, 2)
                     } </pre>
                     }
            </React.Fragment>
        )
    }
}




NavBar.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguague: PropTypes.func.isRequired,
}
