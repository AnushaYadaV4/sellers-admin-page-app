const express = require('express');

const userActionsController = require('../controllers/userActions');

const router = express.Router();

router.post('/addStoreItems', userActionsController.postAddStoreItems);
router.get('/getStoreItems',userActionsController.getStoreItems);
router.delete('/deleteUser/:id',userActionsController.deleteUser);
//router.post('/editStoreItems/:id',userActionsController.postEditStoreItems);
//router.post('/decreasing-quantity/:id',userActionsController.postUpdateStoreQuantity);

module.exports = router;