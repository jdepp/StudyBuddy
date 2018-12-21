import Api from './Api.js'

export default {
    getStudySets () {
        /* first argument is end point found in server/src/StudySetController.js */
        return Api().get('studysets')
    },

    getStudySet(studySetId) {
        return Api().get(`studysets/${studySetId}`)
    },

    getNotecards(studySetId) {
        return Api().get(`studysets/${studySetId}`)
    },

    putStudySet(studyset, studySetId) {
      return Api().put(`studysets/${studySetId}`, studyset)
    }
}
