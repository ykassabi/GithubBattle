import React from 'react';
import './App.css';
import Hello from './Hello';
import Popular from './Components/Popular';

class App extends React.Component {
  render(){
    return (
      <div className='container'>
      <Popular />
      <Hello 
        name={"MYK"}
        authed
        logout={()=>alert('you are out')}
        header={<h2>Smile life is always changing !</h2>}
        friends = {
          [
            'Mikenzi',
            'Cash',
            'Steven',
            'Kimmy',
            'Doug'
          ]
        }
      /></div>
      )
    }
  }

export default App;
