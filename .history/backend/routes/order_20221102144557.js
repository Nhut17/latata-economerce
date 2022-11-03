const express = require('express')
const router = express.Router();

const { newOrder, getSingleOrder, myOrders , allOrders, updateOrder} = require('../controllers/orderController')


const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { route } = require('./auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);
router.route('/admin/order/:id').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);

module.exports = router