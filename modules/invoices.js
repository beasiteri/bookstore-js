const { mongo } = require('./mongo-connection');
const moment = require('moment');
const mongoose = require('mongoose');

async function getAllInvoices(req, res) {
  let client;

  try {
    client = await mongo();
    const db = client.db('library');
    const invoiceCollection = await db.collection('invoices');
    const allInvoices = await invoiceCollection.find().toArray();

    res.json(allInvoices);
  } catch (err) {
    console.log('An error happened in function allInvoices: ', err.message);
    res.end(err.message);
  } finally {
    await client.close();
  }
}

async function getInvoiceById(req, res) {
  let client;

  try {
    client = await mongo();
    const db = client.db('library');
    const invoiceCollection = await db.collection('invoices');
    const allInvoices = await invoiceCollection.find().toArray();

    if(allInvoices) {
      res.json(allInvoices.filter(invoice => {
        return invoice._id.valueOf() === req.params.id
      }));
    } else {
      res.status(400).json({msg: `No invoice with the id of ${req.params.id}`});
    }
  } catch (err) {
    console.log('An error happened in function getInvoiceById: ', err.message);
    res.end(err.message);
  } finally {
    await client.close();
  }
}

async function createInvoice(req, res) {
  client = await mongo();
  const db = client.db('library');
  const invoiceCollection = await db.collection('invoices');
  const allInvoices = await invoiceCollection.find().toArray();

  const newInvoice = {
    number: req.body.number,
    date: req.body.date,
    //customer_id: customerID, TO DO...
    total_price: req.body.total_price,
    items: req.body.items
  }

  if (!newInvoice.number || !newInvoice.total_price) {
      return res.status(400).json({ msg: 'Please include invoice data'});
  }

  invoiceCollection.insertOne(newInvoice);

  allInvoices.push(newInvoice);
  res.json(allInvoices);
}

async function updateInvoice(req, res) {
  client = await mongo();
  const db = client.db('library');
  const invoiceCollection = await db.collection('invoices');
  const allInvoices = await invoiceCollection.find().toArray();

  const found = allInvoices.some((invoice) => {
    return invoice._id.valueOf() === req.params.id;
  });

  if (found) {
    const updateInvoice = req.body;
    allInvoices.forEach(invoice => {
      if (invoice._id.valueOf() === req.params.id) {
          invoice.number = updateInvoice.number ? updateInvoice.number : invoice.number;
          invoice.total_price = updateInvoice.total_price ? updateInvoice.total_price : invoice.total_price;

          invoiceCollection.updateOne({ _id: invoice._id},{ $set: invoice});
          res.json({ msg: 'Invoice update', invoice});
      }
    });
  } else {
      res.status(400).json({msg: `No invoice with the id of ${req.params.id}`});
  }
}

async function deleteInvoice(req, res) {
  client = await mongo();
  const db = client.db('library');
  const invoiceCollection = await db.collection('invoices');
  const allInvoices = await invoiceCollection.find().toArray();

  const found = allInvoices.some((invoice) => { 
    return invoice._id.valueOf() === req.params.id;
  });

  if (found) {
    invoiceCollection.deleteOne({ "_id": mongoose.Types.ObjectId(`${req.params.id}`)});

    res.json({ msg: 'Invoice deleted', 
    allInvoices: allInvoices.filter(invoice => invoice._id.valueOf() !== req.params.id)});
  } else {
    res.status(400).json({msg: `No invoice with the id of ${req.params.id}`});
  }
}


module.exports = {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice
}
