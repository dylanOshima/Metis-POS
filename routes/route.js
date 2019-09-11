// ./routes/route.js

const express = require('express');
const router = express.Router();

const serverController = require('../controllers/serverController');
const inventoryController = require('../controllers/inventoryController');
const menuController = require('../controllers/menuController');
const orderController = require('../controllers/orderController');
const checkController = require('../controllers/checkController');

//------------- Index
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

//------------- Servers
router.get('/servers', serverController.getUsers);
router.post('/servers/add', serverController.addUser);
router.get('/servers/login/:code', serverController.login);

//------------- Inventory
router.get('/inventory', inventoryController.getInventory);
router.get('/inventory/categories', inventoryController.categories);
router.post('/inventory/add', inventoryController.addEntry);
router.delete('/inventory/delete/:id', inventoryController.deleteEntry);
router.put('/inventory/:id', inventoryController.updateEntry);
// router.get('/inventory/:section', inventoryController.getByCategory);

//------------- Menu
router.get('/menu', menuController.getMenu);
router.get('/menu/categories', menuController.categories);
router.post('/menu/add', menuController.addItem);
router.delete('/menu/delete/:id', menuController.deleteItem);
router.get('/menu/:section', menuController.byCategory);
router.put('/menu/:id', menuController.updateItem);

//------------- Orders
router.get('/order', orderController.getOrders);
router.get('/order/paid', orderController.getPaid);
router.get('/order/unpaid', orderController.getUnpaid);
router.put('/order/:id', orderController.updateOrder);

//------------- Check
router.get('/check', checkController.getChecks);
router.get('/check/paid', checkController.getPaid);
router.get('/check/unpaid', checkController.getUnpaid);
router.post('/check/seat', checkController.seat);
router.put('/check/:id', checkController.updateCheck);
router.get('/check/:id', checkController.getByID);
router.delete('/check/delete/:id', checkController.deleteCheck);

module.exports = router;