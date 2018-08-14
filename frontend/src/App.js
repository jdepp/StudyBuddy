import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StudySets from './components/studysets/studysets'
import Notecards from './components/notecards/notecards'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Study Buddy</h1>
        </header>
        <StudySets />
      </div>
    );
  }
}

export default App;
