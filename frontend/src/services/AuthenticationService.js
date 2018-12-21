import Api from './Api.js'

export default {
    getStudySets () {
        /* first argument is end point found in server/src/StudySetController.js */
        return Api().get('studysets')
    },

    getNotecards(studySetId) {
        return Api().get(`studysets/${studySetId}`)
    },

    addNotecard(newTerm, newDefinition, studySetId) {
        return Api().put(`studysets/notecard/${studySetId}`, {newTerm:newTerm, newDefinition:newDefinition})
    }
}