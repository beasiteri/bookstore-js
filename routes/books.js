const { 
  getAllBooks, 
  getBookById, 
  createBook, 
  updateBooks, 
  deleteBook 
} = require('../modules/books');

module.exports = (app) => {
  app.get('/api/books', getAllBooks);
  
  app.get('/api/books/:id', getBookById);
  
  app.post('/api/books', createBook);
  
  app.put('/api/books/:id', updateBooks);
  
  app.delete('/api/books/:id', deleteBook);
}
