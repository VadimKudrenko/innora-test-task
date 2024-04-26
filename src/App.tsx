import React from 'react';
import './App.css';

import FindRepoForm from './components/FindRepoForm/FindRepoForm';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';

function App() {
  return (
    <div className="App">
      <h5 style={{color: 'rgb(98 98 98)', margin: '20px 20px', textAlign: 'left', fontSize: '15px', width: '550px'}}>
        This application was made as a test task<br/>
        by <a href="https://github.com/VadimKudrenko">Vadim Kudrenko</a><br/><br/>


        Application is "To-do List" which use the GitHub API to load repositories issues specified in the address bar field,
        also you can add repositories issues by yourself.<br />
        In the application, you can delete and resume issues,<br /> 
        also you can drag them from one column to another. <br />
        The application use session storage to store data changes in specified repositories.<br /><br />
        For example you can use this links:<br/>
        https://github.com/facebook/react <br/>
        https://github.com/facebook/react-native <br/>
      </h5>
      <header className="App-header">
        <FindRepoForm />
      </header>
      <KanbanBoard />
    </div>
  );
}

export default App;
