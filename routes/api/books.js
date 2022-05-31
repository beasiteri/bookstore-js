const express = require('express');
const router = express.Router();
const { 
  getAllBooks, 
  getBookById, 
  createBook, 
  updateBooks, 
  deleteBook 
} = require('../../modules/books');

router.get('/', (req, res) => {
  getAllBooks(req, res);
});

router.get('/:id', (req, res) => {
  getBookById(req, res);
});

router.post('/', (req, res) => {
  createBook(req, res);
});

router.put('/:id', (req, res) => {
  updateBooks(req, res);
});

router.delete('/:id', (req, res) => {
  deleteBook(req, res);
});

module.exports = router;
