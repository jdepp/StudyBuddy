import Api from './Api.js'

export default {
    getStudySets () {
        /* first argument is end point found in server/src/StudySetController.js */
        return Api().get('studysets')
    },
    getNotecards(studySetId) {
        return Api().get(`studysets/${studySetId}`)
    }
}