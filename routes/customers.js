const { 
  getAllCustomers, 
  getCustomerById, 
  createCustomer, 
  updateCustomer, 
  deleteCustomer
} = require('../modules/customers');

module.exports = (app) => {
  app.get('/api/customers', getAllCustomers);
  
  app.get('/api/customers:id', getCustomerById);
  
  app.post('/api/customers', createCustomer);
  
  app.put('/api/customers/:id', updateCustomer);
  
  app.delete('/api/customers/:id', deleteCustomer);
}
