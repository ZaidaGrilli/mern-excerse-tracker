const express = require('express');
const router = express.Router();

const entriesController = require('../controllers/exercise');

router.get('/', entriesController.getAll);

router.get('/:id', entriesController.getSingle);

router.post('/', entriesController.createEntry);

//router.put('/:id', entriesController.updateContact);

//router.delete('/:id', entriesController.deleteContact);

module.exports = router;