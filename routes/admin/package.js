const express = require('express');
const { Addpackage, getPackage, updatePackage, deletePackage, getSinglePackage } = require('../../controller/admin/package');
const route = express.Router();

route.post('/add', Addpackage);
route.get('/get',getPackage);
route.put('/update/:id',updatePackage);
route.delete('/delete/:id',deletePackage);
route.get('/getDetails/:id',getSinglePackage)

module.exports = route;
