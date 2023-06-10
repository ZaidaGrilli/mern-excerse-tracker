const express = require('express');
const router = express.Router();

const entriesController = require('../controllers/users');

router.get('/', entriesController.getAll);

router.get('/:id', entriesController.getSingle);

router.post('/', entriesController.createEntry);

router.put('/:id', entriesController.updateEntry);

router.delete('/:id', entriesController.deleteEntry);

module.exports = router;