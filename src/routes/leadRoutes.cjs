const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController.cjs');
const authMiddleware = require('../middleware/authMiddleware.cjs');

router.post('/create', authMiddleware, leadController.createLead);
router.put('/update/:id', authMiddleware, leadController.updateLead);
router.delete('/delete/:id', authMiddleware, leadController.deleteLead);
router.get('/', authMiddleware, leadController.getLeads);

module.exports = router;
