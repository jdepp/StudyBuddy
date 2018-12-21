import React, { Component } from 'react'
import './studysets.css'
import AuthenticationService from '../../services/AuthenticationService.js'
import Notecards from '../notecards/notecards'

class StudySets extends Component {

    constructor() {
        super()
        this.state = {
            studysets: [],
            studysetID: -1,
            studysetName: '',
            showNotecard: false
        }
    }

    /**
     * This method is called when page refreshes
     */
    componentDidMount() {
        AuthenticationService.getStudySets()
            .then(res => this.setState({studysets: res.data}))
    }

    buttonPressed = (id,name) => {
        this.setState({studysetID: id})
        this.setState({studysetName: name})
        this.setState({showNotecard: true})
    }



    /* THIS WORKS */
    render() {
        const showNotecard = this.state.showNotecard

        const notecard = showNotecard
            ? <Notecards id = {this.state.studysetID} studysetName = {this.state.studysetName}/>
            : <div/>

        const studysets = !showNotecard
            ? <div><h2>Study Sets</h2>
              <ul>
                {this.state.studysets.map(studyset =>
                <button onClick= {() => this.buttonPressed(studyset._id, studyset.name)}>
                    <li key = {studyset._id}>{ studyset.name }</li>
                </button>
              )}
              </ul></div>
            : <div/>

        return (
          <div>
            {studysets}

            {notecard}

          </div>
        )
    }

}

export default StudySets
