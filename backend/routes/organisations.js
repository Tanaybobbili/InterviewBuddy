const express = require('express');
const router = express.Router();
const orgcontroller = require('../controllers/orgcontroller');


router.get('/', orgcontroller.getAllOrganisations);
router.get('/:id', orgcontroller.getOrganisationById);
router.post('/', orgcontroller.createOrganisation);
router.put('/:id', orgcontroller.updateOrganisation);
router.delete('/:id', orgcontroller.deleteOrganisation);

module.exports = router;
