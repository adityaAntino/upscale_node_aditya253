const express = require('express')
const router = express.Router()
const crudController = require('./crud.controller')


///GET ARRAY
router.get('/get-info', crudController.getInfo);

///ADD SINGLE DATA
router.post('/add-data', crudController.addData);

///DELETE EVERYTHING
router.delete('/delete-all', crudController.deleteAll);

///DELETE ONLY ONE SET OF DATA
router.delete('/delete-one', crudController.deleteOne);

///UPDATE DATA AT INDEX
router.put('/update-data', crudController.updateData);

///UPDATING DATA TO LOCAL JSON FILE
router.post('/update-json', crudController.updateJson);


module.exports = router;