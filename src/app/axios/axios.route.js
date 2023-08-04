const router = require('express').Router();
const axiosController = require('./axios.controller')

router.get('/get-data-axios',axiosController.getDataAxios);

module.exports = router;