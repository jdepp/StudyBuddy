import React, { Component } from 'react'
import './studysets.css'
import axios from 'axios'
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

    /* TESTING AXIOS */
    componentDidMount() {
        axios.get('http://localhost:4000/api/studysets/')

            /* displays all data retrievied */
            // .then(json => console.log(json))

            /* LINE BELOW SHOWS ORDER OF DATA FLOW */
            //.then(json => console.log(json.data[1].notecards[0].term))

            /* testing mapping notecards... might need filtering?
             * TODO: (move to notecards.js) */
            // .then (res => res.data[1].notecards.map(studyset => (
            //     {
            //             term: studyset.term,
            //             definition: studyset.definition
            //     })))
            // .then(newData => console.log(newData))

            /* testing mapping studyset names... might need filtering? */
            // .then(res => res.data.map(studyset => (
            //    {
            //       studysets: studyset.name,
            //       id: studyset._id
            //    })))
            // .then(newData => console.log(newData))
            // .then(newData => this.setState({studysets: newData, studysetID: newData}))
            // .catch(error => alert(error))

            /** THIS WORKS WHEN THE ABOVE IS COMMENTED OUT */
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
        );
    }

}

export default StudySets
