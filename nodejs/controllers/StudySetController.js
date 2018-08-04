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

  var emp = new StudySet({
    name: req.body.name,
    notecards: req.body.notecards
  });

  emp.save((err, doc) => {
    if(!err)
      res.send(doc);
    else
      console.log('Error in Employee POST: ' + JSON.stringify(err, undefined, 2));
  });

});

module.exports = router;