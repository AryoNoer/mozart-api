
const express = require('express');
const router = express.Router();
const museumController = require('../controllers/museumController');

router.get('/', museumController.getAllMuseums);
router.get('/:museumId', museumController.getMuseumById);
router.get('/:category/:museumName', museumController.getMuseumByName);
router.get('/search', museumController.searchMuseum);
router.post('/:category', museumController.createMuseum);
router.put('/:categoryId/:museumName/description', museumController.updateMuseumDescription);
router.put('/:museumId', museumController.updateMuseum);
router.delete('/:museumId', museumController.deleteMuseum);

module.exports = router;
