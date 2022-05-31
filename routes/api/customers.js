const express = require('express');
const router = express.Router();
const { 
  getAllCustomers, 
  getCustomerById, 
  createCustomer, 
  updateCustomer, 
  deleteCustomer
} = require('../../modules/customers');


router.get('/', (req, res) => {
  getAllCustomers(req, res);
});

router.get('/:id', (req, res) => {
  getCustomerById(req, res);
});

router.post('/', (req, res) => {
  createCustomer(req, res);
});

router.put('/:id', (req, res) => {
  updateCustomer(req, res);
});

router.delete('/:id', (req, res) => {
  deleteCustomer(req, res);
});

module.exports = router;
