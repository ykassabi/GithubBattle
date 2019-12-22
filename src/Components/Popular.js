import React from 'react';


export default class Popular extends React.Component{

    render(){
        const langages = ['All', 'JavaScript', 'Ruby', 'Java', 'Python'];

        return (

            <ul className='flex-center'>

                { langages.map((language,index)=>(<li key={index}>
                    <button>{language}</button>
                    </li>))
                }

            </ul>
        )

    }
}