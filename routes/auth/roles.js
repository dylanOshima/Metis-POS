// ./routes/auth/roles.js

const AccessControl = require('accesscontrol');
const ac = new AccessControl();

// Resource Types
const INVENTORY = 'inventory';
const SERVER = 'server';
const ORDERS = 'orders';
const MENU = 'menu';

exports.roles = (function() {
  ac.grant('basic') // Servers
    .readAny(INVENTORY)
    .updateAny(INVENTORY)
    .deleteAny(INVENTORY)
    .createOwn(INVENTORY)
    .readAny(MENU)
    .updateAny(MENU)
    .deleteAny(MENU)
    .createOwn(MENU)
    .readAny(ORDERS)
    .updateAny(ORDERS)
    .createOwn(ORDERS);

  ac.grant('admin') // Admin
    .extend('basic')
    .readAny(SERVER)
    .updateAny(SERVER)
    .createOwn(SERVER)
    .deleteAny(SERVER)
    .deleteAny(ORDERS)

  return ac;
})();