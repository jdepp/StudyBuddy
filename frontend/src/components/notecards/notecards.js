import React, { Component } from 'react'
import AuthenticationService from '../../services/AuthenticationService.js'

class Notecards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notecards: [],
            termValue: '',
            defValue: '',
            id: props.id,
            studysetName: props.studysetName,
            studysetID: props.studysetID,
            studyset: "",
            showNoteCardDialogue: false
        }
    }

    /* THIS WORKS */
    componentDidMount() {
        AuthenticationService.getStudySet(this.state.id)
            .then(res => this.setState({studyset: res.data}))

        AuthenticationService.getNotecards(this.state.id)
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
        // Updates the state's notecard property by pushing the new notecard to the notecards[] array
        var newState = Object.assign({}, this.state);
        newState["notecards"].push({term: this.state.termValue, definition: this.state.defValue});
        this.setState(newState);

        // Gets the current studyset object and sets its notecards[] property to reflect the new notecards[]
        var newStudySet = this.state.studyset
        newStudySet.notecards = this.state.notecards
        this.setState({studyset: newStudySet}) 

        AuthenticationService.putStudySet(this.state.studyset, this.state.id)
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
