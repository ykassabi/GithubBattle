import React from 'react';

class Hello extends React.Component{
    render(){

        return (
            <>
            <h1> Hello {this.props.name}</h1>
            <div>{this.props.header}</div>
            {
                this.props.authed === true 
                ? <button onClick={this.props.logout}>logout </button>
                : null
            }
            <ul>
                {this.props.friends.map((i,index) => {
                    return <li key={index}>{i}</li>
                    } )}
            </ul>
            </>
            )
            
    }
}

export default Hello;