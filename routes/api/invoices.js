const express = require('express');
const router = express.Router();
const { 
  getAllInvoices, 
  getInvoiceById, 
  createInvoice, 
  updateInvoice, 
  deleteInvoice
} = require('../../modules/invoices');

router.get('/', (req, res) => {
  getAllInvoices(req, res);
});

router.get('/:id', (req, res) => {
  getInvoiceById(req, res);
});

router.post('/', (req, res) => {
  createInvoice(req, res);
});

router.put('/:id', (req, res) => {
  updateInvoice(req, res);
});

router.delete('/:id', (req, res) => {
  deleteInvoice(req, res);
});

module.exports = router;
