const mongodb = require('../DB/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('exercise-tracker').collection('users').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('exercise-tracker').collection('users').find({
    _id: userId
  });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createEntry = async (req, res) => {
  const user = {
    Name: req.body.Name,
    LastName: req.body.LastName,
    Age: req.body.Age,
    Phone: req.body.Phone,
    Email: req.body.Email,
    CreatedAt: new Date().toISOString(),
    Photo: req.body.Photo,
  };
  const response = await mongodb.getDb().db('exercise-tracker').collection('users').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateEntry = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const user = {
    Name: req.body.Name,
    LastName: req.body.LastName,
    Age: req.body.Age,
    Phone: req.body.Phone,
    Email: req.body.Email,
    CreatedAt: new Date().toISOString(),
    Photo: req.body.Photo,
  };
  const response = await mongodb
    .getDb()
    .db('exercise-tracker')
    .collection('users')
    .replaceOne({
      _id: userId
    }, user);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteEntry = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('exercise-tracker').collection('users').deleteOne({
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