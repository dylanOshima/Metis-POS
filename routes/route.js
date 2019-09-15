// ./routes/route.js

const express = require('express');
const router = express.Router();

const serverController = require('../controllers/serverController');
const inventoryController = require('../controllers/inventoryController');
const menuController = require('../controllers/menuController');
const orderController = require('../controllers/orderController');
const checkController = require('../controllers/checkController');
const courseController = require('../controllers/courseController');

const { grantAccess, allowIfLoggedIn} = require('./auth/auth');
//------------- Index
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

//------------- Servers
router.get('/servers',serverController.getServers);
router.post('/servers/add',allowIfLoggedIn,grantAccess('createOwn','server'),serverController.signup);
router.post('/servers/login/', serverController.login);
router.delete('/servers/delete/:id',allowIfLoggedIn,grantAccess('deleteAny','server'),serverController.deleteServer);

//------------- Inventory
router.get('/inventory',allowIfLoggedIn,grantAccess('readAny','inventory'),inventoryController.getInventory);
router.get('/inventory/categories',allowIfLoggedIn,inventoryController.categories);
router.post('/inventory/add',allowIfLoggedIn,grantAccess('createOwn','inventory'),inventoryController.addEntry);
router.delete('/inventory/delete/:id',allowIfLoggedIn,grantAccess('deleteAny','inventory'),inventoryController.deleteEntry);
router.put('/inventory/:id',allowIfLoggedIn,grantAccess('updateAny','menu'),inventoryController.updateEntry);
// router.get('/inventory/:section', inventoryController.getByCategory);

//------------- Menu
router.get('/menu',menuController.getMenu);
router.get('/menu/categories',menuController.categories);
router.post('/menu/add',allowIfLoggedIn,grantAccess('createOwn','menu'),menuController.addItem);
router.delete('/menu/delete/:id',allowIfLoggedIn,grantAccess('deleteAny','menu'),menuController.deleteItem);
// router.get('/menu/:section',menuController.byCategory);
router.put('/menu/:id',allowIfLoggedIn,grantAccess('updateAny','menu'),menuController.updateItem);

//------------- Orders
router.get('/order',allowIfLoggedIn,grantAccess('readAny','orders'),orderController.getOrders);
router.get('/order/paid',allowIfLoggedIn,orderController.getPaid);
router.get('/order/unpaid',allowIfLoggedIn,orderController.getUnpaid);
router.put('/order/:id',allowIfLoggedIn,grantAccess('updateAny','orders'),orderController.updateOrder);
router.put('/order/items/:id',allowIfLoggedIn,grantAccess('updateAny','orders'),orderController.addOrderItem);

//------------- Check
router.get('/check',allowIfLoggedIn,checkController.getChecks);
router.get('/check/paid',allowIfLoggedIn,grantAccess('readAny','orders'),checkController.getPaid);
router.get('/check/unpaid',checkController.getUnpaid);
router.post('/check/seat',allowIfLoggedIn,grantAccess('createOwn','orders'),checkController.seat);
router.put('/check/:id',allowIfLoggedIn,grantAccess('updateAny','orders'),checkController.updateCheck);
// router.get('/check/:id', checkController.getByID);
router.delete('/check/delete/:id',allowIfLoggedIn,grantAccess('deleteAny','orders'),checkController.deleteCheck);

//------------- Check
router.get('/course',allowIfLoggedIn,grantAccess('readAny','courses'),courseController.getCourses);
router.post('/course',allowIfLoggedIn,grantAccess('createOwn','courses'),courseController.addCourse);
router.put('/course/:id',allowIfLoggedIn,grantAccess('updateAny','courses'),courseController.updateCourse);
router.put('/course/dishes/:id',allowIfLoggedIn,grantAccess('updateAny','courses'),courseController.addToDishes);
router.delete('/course/delete/:id',allowIfLoggedIn,grantAccess('deleteAny','courses'),courseController.deleteCourse);
router.get('/course/:id',allowIfLoggedIn,grantAccess('readAny','courses'),courseController.getById);

module.exports = router;