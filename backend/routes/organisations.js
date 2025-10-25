const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/upload'); // ✅ destructured
const orgcontroller = require('../controllers/orgcontroller');

router.get('/', orgcontroller.getAllOrganisations);
router.get('/:id', orgcontroller.getOrganisationById);
router.post('/', orgcontroller.createOrganisation);
router.put('/:id', orgcontroller.updateOrganisation);
router.delete('/:id', orgcontroller.deleteOrganisation);
router.post('/:id/upload-logo', upload.single('logo'), orgcontroller.uploadLogo);

module.exports = router;
