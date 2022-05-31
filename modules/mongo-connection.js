const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://127.0.0.1:27017';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function mongo() {
  const client = await MongoClient.connect(uri, options);
  return client;
}

module.exports = { mongo };
