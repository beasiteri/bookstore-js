const { 
  getAllInvoices, 
  getInvoiceById, 
  createInvoice, 
  updateInvoice, 
  deleteInvoice
} = require('../modules/invoices');

module.exports = (app) => {
  app.get('/api/invoices', getAllInvoices);
  
  app.get('/api/invoices/:id', getInvoiceById);
  
  app.post('/api/invoices', createInvoice);
  
  app.put('/api/invoices/:id', updateInvoice);
  
  app.delete('/api/invoices/:id', deleteInvoice);
}
