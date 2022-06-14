const { mongo } = require('./mongo-connection');

async function test(req, res) {
  let client;

  try {
    client = await mongo();
    const db = client.db('library');
    const bookCollection = await db.collection('books');
    const allBooks = await bookCollection.find().toArray();

    res.json(allBooks);
  } catch (err) {
    console.log('An error happened in function test: ', err.message);
    res.end(err.message);
  } finally {
    await client.close();
  }
}

module.exports = test;
