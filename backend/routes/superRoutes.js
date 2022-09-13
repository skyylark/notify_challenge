const router = require('express').Router();
const supervisorController = require('../controllers/supervisorController');

router.get('/supervisors', supervisorController.allSupervisors);
router.get('/data', supervisorController.supers);
router.post('/submit', supervisorController.create);

module.exports = router;
