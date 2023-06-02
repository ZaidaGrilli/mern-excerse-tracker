const mongodb = require('../DB/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('exercise-tracker').collection('exercises').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('exercise-tracker').collection('exercises').find({
    _id: userId
  });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createEntry = async (req, res) => {
  const [month, day, year] = req.body.Date.split("/")
  const exerciseDate = new Date(`${year}-${month}-${day}`);
  const formattedDate = exerciseDate.toISOString();

  const exercise = {
    Name: req.body.Name,
    Repetitions: req.body.Repetitions,
    TimeSpend: req.body.TimeSpend,
    Place: req.body.Place,
    Date: formattedDate
  };
  const response = await mongodb.getDb().db('exercise-tracker').collection('exercises').insertOne(exercise);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateEntry = async (req, res) => {
  const [month, day, year] = req.body.Date.split("/")
  const exerciseDate = new Date(`${year}-${month}-${day}`);
  const formattedDate = exerciseDate.toISOString();
  const exerciseId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const exercise = {
    Name: req.body.Name,
    Repetitions: req.body.Repetitions,
    TimeSpend: req.body.TimeSpend,
    Place: req.body.Place,
    Date: formattedDate
  };
  const response = await mongodb
    .getDb()
    .db('exercise-tracker')
    .collection('exercises')
    .replaceOne({
      _id: exerciseId
    }, exercise);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteEntry = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('exercise-tracker').collection('exercises').deleteOne({
    _id: userId
  }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createEntry,
  updateEntry,
  deleteEntry
};