import React, { Component } from 'react'
import axios from 'axios'

class Notecards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notecards: [],
            termValue: '',
            defValue: '',
            id: props.id,
            studysetName: props.studysetName,
            showNoteCardDialogue: false
        }
    }

    /* THIS WORKS */
    componentDidMount() {
        axios.get('http://localhost:4000/api/studysets/' + this.state.id)
            .then(res => this.setState({notecards: res.data.notecards}))
    }

    termChanged = (event) => {
        this.setState({termValue: event.target.value})
    }

    defChanged = (event) => {
        this.setState({defValue: event.target.value})
    }

    handleSubmitClick = () => {
        alert(this.state.termValue + ': ' + this.state.defValue)
    }

    handleShowNoteCardClick = (result) => {
        this.setState({showNoteCardDialogue: result})
    }


    /* THIS WORKS */
    render () {

        const showNoteCardDialogue = this.state.showNoteCardDialogue

        const notecardList =
            <ul>
                {this.state.notecards.map(notecard => (
                    <li key = {notecard._id}>
                        <b>Term:</b> {notecard.term}
                        &nbsp;
                        <b>Definition:</b> {notecard.definition}
                        </li>
                    ))}
            </ul>

        const showNoteCardDialogueButton =
            <input
                type = 'button'
                value = 'Add Notecard'
                onClick= {() => this.handleShowNoteCardClick(true)} />

        const removeNoteCardDialoueButton =
            <input
                type = 'button'
                value = 'Done Adding'
                onClick= {() => this.handleShowNoteCardClick(false)} />

        const noteCardDialogue = showNoteCardDialogue
            ?  <div>

                Term: <input
                type ='Text'
                value = {this.state.termValue}
                onChange={this.termChanged} />

                Definition: <input
                    type ='Text'
                    value = {this.state.defValue}
                    onChange={this.defChanged} />

                <input
                    type ='button'
                    value = 'Submit'
                    onClick={this.handleSubmitClick} />

                </div>
            : <div/>

        return (
            <div>
                <h2>{this.state.studysetName} Notecards</h2>
                    {notecardList}
                    {noteCardDialogue}

                    <br/>
                    <br/>

                    {!this.state.showNoteCardDialogue && showNoteCardDialogueButton}
                    {this.state.showNoteCardDialogue && removeNoteCardDialoueButton}
            </div>
        );
    }

}


export default Notecards
