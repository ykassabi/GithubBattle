import React from 'react';
import PropTypes from "prop-types";
// import {string, func} from 'prop-types';
import {
    fetchPopularRepos
} from '../utils/api';
import {
    FaUser,
    FaStar,
    FaCodeBranch,
    FaExclamationTriangle
} from "react-icons/fa";



function NavBar ({selected, onUpdateLanguague}){

const languages = ['All', 'Ruby', "JavaScript",'Python', 'Go', 'Dart', 'php'];

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

function ReposGrid({ repos }) {
    return (
    <ul className="grid space-around">
        {repos.map((repo, index) => {
        const {
            name,
            owner,
            html_url,
            stargazers_count,
            forks,
            open_issues
        } = repo;
        const { login, avatar_url } = owner;

        return (
            <li key={html_url} className="card bg-light">
            <h4 className="header-lg center-text">#{index + 1}</h4>
            <img
                className="avatar"
                src={avatar_url}
                alt={`Avatar for ${login}`}
            />
            <h2 className="center-text">
                <a className="link" href={html_url}>
                {login}
                </a>
            </h2>
            <ul className="card-list">
                <li>
                <FaUser color="rgb(255, 191, 116)" size={22} />
                <a href={`https://github.com/${login}`}>{login}</a>
                </li>
                <li>
                <FaStar color="rgb(255, 215, 0)" size={22} />
                {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                {forks.toLocaleString()} forks
                </li>
                <li>
                <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                {open_issues.toLocaleString()} open
                </li>
            </ul>
            </li>
        );
        })}
    </ul>
    );
    }

    ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
    };


export default class Popular extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            currentLanguage: 'All',
            repos: {},
            errorMsg: null
        }

        this.updateLanguageNavBar = this.updateLanguageNavBar.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }

    updateLanguageNavBar(currentLanguage) {
        this.setState({
            currentLanguage,
            errorMsg: null,
        })
        if(!this.state.repos[currentLanguage]){
            fetchPopularRepos(currentLanguage)
                    .then((data) => {
                        this.setState(({ repos }) => ({
                            repos: {
                                        ...repos,
                                        [currentLanguage]: data
                                    }
                        }))
                    })
            .catch(()=>{
                this.setState({errorMsg: 'Sorry, Failed to fetch Repos!'})
            })
        }
    }


isLoading() {
    const {
        currentLanguage,
        repos,
        error
    } = this.state

    return !repos[currentLanguage] && error === null
}


componentDidMount(){
    this.updateLanguageNavBar(this.setState.currentLanguage)
}


    render(){
        
        const {currentLanguage,repos, errorMsg} = this.state

        return (
        <React.Fragment>
            <NavBar
            selected={currentLanguage}
            onUpdateLanguague={this.updateLanguageNavBar}
            />

            {this.isLoading() && <h2> LOADING, Patience please ....</h2>}
            {errorMsg && <p className='center-text error'> { errorMsg } </p>}

            {repos[currentLanguage] && (
                <ReposGrid repos={repos[currentLanguage]} />
            )}
        </React.Fragment>
        );
    }
}




NavBar.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguague: PropTypes.func.isRequired,
}
