import React, { Component } from 'react';
import './studysets.css';

class StudySets extends Component {

    constructor() {
        super();
        this.state = {
            studysets: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:4000/api/studysets/')
            .then(res => res.json())
            .then(studysets => this.setState({studysets}, () => console.log('StudySets fetched..',
             studysets)));
    }

    buttonPressed = () => {
        alert('pressed')
    }



      render() {
        return (
          <div>
            <h2>Study Sets</h2>
            <ul>
                {this.state.studysets.map(studyset =>
                    <button onClick= {this.buttonPressed}>
                        <li key = {studyset._id}>{ studyset.name }</li>
                    </button>
                )}
            </ul>
          </div>
        );
      }
}

export default StudySets;
