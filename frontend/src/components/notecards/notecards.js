import React, { Component } from 'react'


class Notecards extends Component {

    constructor() {
        super();
        this.state = {
            studysets: [],
            termValue: '',
            defValue: '',
            showNoteCardDialogue: false
        }
    }

    /* THIS WORKS */
    componentDidMount() {
        fetch('http://localhost:4000/api/studysets/')
            .then(res => res.json())
            .then(studysets => this.setState({studysets}, () => console.log('StudySets fetched from Notecard.js..',
             studysets)));
    }

    // TODO: CREATE ONE SUBMIT BUTTON THAT HANDLES BOTH CHANGES
    termChanged = (event) => {
        this.setState({termValue: event.target.value})
    }

    defChanged = (event) => {
        this.setState({defValue: event.target.value})
    }

    handleTermClick = () => {
        alert (this.state.termValue)
    }

    handleDefClick = () => {
        alert (this.state.defValue)
    }

    handleShowNoteCardClick = (result) => {
        this.setState({showNoteCardDialogue: result})
    }


    /* THIS WORKS */
    render () {

        const showNoteCardDialogue = this.state.showNoteCardDialogue

        const termDialogue = showNoteCardDialogue
            ? <p> Term: <input
                type ='Text'
                value = {this.state.termValue}
                onChange={this.termChanged} /> </p>
            : <div/>

        const defDialogue = showNoteCardDialogue
            ? <p> Definition: <input
                type ='Text'
                value = {this.state.defValue}
                onChange={this.defChanged} /> </p>
            : <div/>


        const termSubmitButton = showNoteCardDialogue
            ? <input
                type ='button'
                value = 'Submit'
                onClick={this.handleTermClick} />
            : <div/>

        const defSubmitButton = showNoteCardDialogue
            ? <input
                type ='button'
                value = 'Submit'
                onClick={this.handleDefClick} />
            : <div/>

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

        // TODO: Combine dialogues into one
        // const noteCardDialogue = showNoteCardDialogue
        //     ? termDialogue
        //     : <div/>



        /* THIS WORKS */
        // <ul>
        //     {this.state.studysets.map(studyset => (
        //         <li key = {studyset._id}>
        //             <b>Term:</b> {studyset.notecards[0].term}
        //             &nbsp;
        //             <b>Definition:</b> {studyset.notecards[0].definition}
        //         </li>
        //     ))}
        // </ul>
        return (
            <div>
                <h2>Notecards</h2>
                <ul>
                    {this.state.studysets.map(studyset => (
                        <li key = {studyset._id}>
                            <b>Term:</b> {studyset.notecards[0].term}
                            &nbsp;
                            <b>Definition:</b> {studyset.notecards[0].definition}
                        </li>
                    ))}
                </ul>

                    {termDialogue}
                    {termSubmitButton}

                    <br/>
                    <br/>

                    {defDialogue}
                    {defSubmitButton}

                    <br/>
                    <br/>

                    {!this.state.showNoteCardDialogue && showNoteCardDialogueButton}
                    {this.state.showNoteCardDialogue && removeNoteCardDialoueButton}
            </div>
        );
    }


    // render() {
    //   const terms = this.state.studysets.map((notecard =>
    //       <li key = {notecard.term}>{notecard.term}</li> )
    //   return (
    //       <div>
    //         <h2>Notecards</h2>
    //             <ul>
    //                 {terms}
    //             </ul>
    //       </div>
    //   );
    // }

}


export default Notecards
