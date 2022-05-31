const { mongo } = require('./mongo-connection');
const mongoose = require('mongoose');

async function getAllBooks(req, res) {
  let client;

  try {
    client = await mongo();
    const db = client.db('library');
    const bookCollection = await db.collection('books');
    const allBooks = await bookCollection.find().toArray();

    res.json(allBooks);
  } catch (err) {
    console.log('An error happened in function getAllBooks: ', err.message);
    res.end(err.message);
  } finally {
    await client.close();
  }
}

async function getBookById(req, res) {
  let client;

  try {
    client = await mongo();
    const db = client.db('library');
    const bookCollection = await db.collection('books');
    const allBooks = await bookCollection.find().toArray();

    if(allBooks) {
      res.json(allBooks.filter(book => {
        return book._id.valueOf() === req.params.id
      }));
    } else {
      res.status(400).json({msg: `No book with the id of ${req.params.id}`});
    }
  } catch (err) {
    console.log('An error happened in function getBookById: ', err.message);
    res.end(err.message);
  } finally {
    await client.close();
  }
}

async function createBook(req, res) {
  client = await mongo();
  const db = client.db('library');
  const bookCollection = await db.collection('books');
  const allBooks = await bookCollection.find().toArray();

  const newBook = {
    title: req.body.title,
    writer: req.body.writer,
    publish_date: req.body.publish_date
  }

  if (!newBook.title || !newBook.writer || !newBook.publish_date) {
      return res.status(400).json({ msg: 'Please include a title, a writer name and a publish date'});
  }

  bookCollection.insertOne(newBook);

  allBooks.push(newBook);
  res.json(allBooks);
}

async function updateBooks(req, res) {
  client = await mongo();
  const db = client.db('library');
  const bookCollection = await db.collection('books');
  const allBooks = await bookCollection.find().toArray();

  const found = allBooks.some((book) => {
    return book._id.valueOf() === req.params.id;
  });

  if (found) {
    const updateBook = req.body;
    allBooks.forEach(book => {
      if (book._id.valueOf() === req.params.id) {
          book.title = updateBook.title ? updateBook.title : book.title;
          book.writer = updateBook.writer ? updateBook.writer : book.writer;
          book.publish_date = updateBook.publish_date ? updateBook.publish_date : book.publish_date;

          bookCollection.updateOne({ _id: book._id},{ $set: book});
          res.json({ msg: 'Book update', book});
      }
    });
  } else {
      res.status(400).json({msg: `No book with the id of ${req.params.id}`});
  }
}

async function deleteBook(req, res) {
  client = await mongo();
  const db = client.db('library');
  const bookCollection = await db.collection('books');
  const allBooks = await bookCollection.find().toArray();

  const found = allBooks.some((book) => { 
    return book._id.valueOf() === req.params.id;
  });

  if (found) {
    bookCollection.deleteOne({ "_id": mongoose.Types.ObjectId(`${req.params.id}`)});

    res.json({ msg: 'Book deleted', 
    allBooks: allBooks.filter(book => book._id.valueOf() !== req.params.id)});
  } else {
    res.status(400).json({msg: `No book with the id of ${req.params.id}`});
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBooks,
  deleteBook
}
