import React, { Component } from 'react'
import AuthenticationService from '../../services/AuthenticationService.js'

class Notecards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notecards: [],
            termValue: '',
            defValue: '',
            studysetId: props.id,
            studysetName: props.studysetName,
            studyset: "", // The current studyset object
            showNoteCardDialogue: false,
            notecardTermEditing: '',
            notecardDefEditing: '',
            showNoteCardEditDialogue: false
        }
    }

    componentDidMount() {
        AuthenticationService.getNotecards(this.state.studysetId)
            .then(res => this.setState({studyset: res.data}))

        AuthenticationService.getNotecards(this.state.studysetId)
            .then(res => this.setState({notecards: res.data.notecards}))
    }

    termChanged = (event) => {
        this.setState({termValue: event.target.value})
    }

    defChanged = (event) => {
        this.setState({defValue: event.target.value})
    }

    handleShowNoteCardClick = (result) => {
        this.setState({showNoteCardDialogue: result})
    }

    handleSubmitClick = () => {
        var newState = Object.assign({}, this.state);
        newState["notecards"].push({term: this.state.termValue, definition: this.state.defValue});
        this.setState(newState);

        AuthenticationService.addNotecard(this.state.termValue, this.state.defValue, this.state.studysetId);
    }

    handleEditClick = (notecardTerm, notecardDef) => {
        this.setState({notecardTermEditing: notecardTerm})
        this.setState({notecardDefEditing: notecardDef})
        this.setState({showNoteCardEditDialogue: true})
        this.setState({showNoteCardDialogue: true})
    }

    /* THIS WORKS */
    render () {

        const showNoteCardDialogue = this.state.showNoteCardDialogue

        const showNoteCardEditDialogue = this.state.showNoteCardEditDialogue

        const notecardList =
            <ul>
                {this.state.notecards.map(notecard => (
                    <li key = {notecard._id}>
                        <b>Term:</b> {notecard.term}
                        &nbsp;
                        <b>Definition:</b> {notecard.definition}
                        &nbsp;
                        <button onClick = {() => this.handleEditClick(notecard.term, notecard.definition)}>Edit</button>
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
                placeholder={this.state.notecardTermEditing}
                onChange={this.termChanged} />

                Definition: <input
                    type ='Text'
                    value = {this.state.defValue}
                    onChange={this.defChanged}
                    placeholder={this.state.notecardDefEditing}
                />

                <input
                    type ='button'
                    value = 'Submit'
                    onClick={this.handleSubmitClick}
                />

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
