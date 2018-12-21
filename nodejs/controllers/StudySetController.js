const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { StudySet } = require('../models/StudySet');

/* GET all StudySets */
router.get('/', (req, res) => {

  StudySet.find((err, docs) => {
    if(!err)
      res.send(docs);
    else
      console.log('Error in Retriving StudySets: ' + JSON.stringify(err, undefined, 2));
  });

});

/* GET StudySet by ID */
router.get('/:id', (req, res) => {

  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No StudySet with given id: ' + req.params.id);

  StudySet.findById(req.params.id, (err, doc) => {
    if(!err)
      res.send(doc);
    else
      console.log('Error in Retriving StudySet: ' + JSON.stringify(err, undefined, 2));
  });

});

/* POST StudySet */
router.post('/', (req, res) => {

  var studyset = new StudySet({
    name: req.body.name,
    notecards: req.body.notecards
  });

  studyset.save((err, doc) => {
    if(!err)
      res.send(doc);
    else
      console.log('Error in Employee POST: ' + JSON.stringify(err, undefined, 2));
  });

});

/* PUT */
router.put('/:id', (req, res) => {

    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ' + req.params.id);

    var studyset = {
        name: req.body.name,
        notecards: req.body.notecards
    };

    StudySet.findByIdAndUpdate(req.params.id, {$set: studyset}, { new: true }, (err, doc) => {
        if (!err)
            res.send(doc);
        else
            console.log('Error in Employee UPDATE: ' + JSON.stringify(err, undefined, 2));
    });


});

/**
 * put for appending to notecard array
 */
/* PUT */
router.put('/notecard/:id', (req, res) => {

    console.log(req.body)
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ' + req.params.id);

    getNotecards(req.params.id)
        .then(function (result) {

            var studyset = {
                name: result.name,
                notecards: result.notecards
            };
            console.log(req.body.newTerm)
            console.log(req.body.newDefinition)
            studyset.notecards.push({term: req.body.newTerm, definition: req.body.newDefinition});

            StudySet.findByIdAndUpdate(req.params.id, {$set: studyset}, { new: true }, (err, doc) => {
                if (!err)
                    res.send(doc);
                else
                    console.log('Error in Employee UPDATE: ' + JSON.stringify(err, undefined, 2));
            });
        })
        .catch(function notOk(err) {
            console.log(err)
        })

});

function getNotecards(studysetId) {
    return new Promise(function (resolve, reject)
    {
        StudySet.findById(studysetId, (err, doc) => {
            if(!err) {
                resolve(doc)
            }
            else
                reject(JSON.stringify(err, undefined, 2))
        })
    })
}


/* DELETE StudySet */
router.delete('/:id', (req, res) => {

  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No StudySet with given id: ' + req.params.id);

  StudySet.findByIdAndRemove(req.params.id, (err, doc) => {
    if(!err)
      res.send(doc);
    else
      console.log('Error in StudySet DELETE: ' + JSON.stringify(err, undefined, 2));
  });

});

module.exports = router;
