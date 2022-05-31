const { mongo } = require('./mongo-connection');
const moment = require('moment');
const mongoose = require('mongoose');

async function getAllCustomers(req, res) {
  let client;

  try {
    client = await mongo();
    const db = client.db('library');
    const customerCollection = await db.collection('customers');
    const allCustomers = await customerCollection.find().toArray();

    res.json(allCustomers);
  } catch (err) {
    console.log('An error happened in function getAllCustomers: ', err.message);
    res.end(err.message);
  } finally {
    await client.close();
  }
}

async function getCustomerById(req, res) {
  let client;

  try {
    client = await mongo();
    const db = client.db('library');
    const customerCollection = await db.collection('customers');
    const allCustomers = await customerCollection.find().toArray();

    if(allCustomers) {
      res.json(allCustomers.filter(customer => {
        return customer._id.valueOf() === req.params.id
      }));
    } else {
      res.status(400).json({msg: `No customer with the id of ${req.params.id}`});
    }
  } catch (err) {
    console.log('An error happened in function getCustomerById: ', err.message);
    res.end(err.message);
  } finally {
    await client.close();
  }
}

async function createCustomer(req, res) {
  client = await mongo();
  const db = client.db('library');
  const customerCollection = await db.collection('customers');
  const allCustomers = await customerCollection.find().toArray();

  const newCustomer = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    postal_code: req.body.postal_code,
    city: req.body.city,
    subscribe_date: moment().format('DD-MM-YYYY')
  }

  if (!newCustomer.first_name || !newCustomer.last_name || !newCustomer.email) {
      return res.status(400).json({ msg: 'Please include the customer data'});
  }

  customerCollection.insertOne(newCustomer);

  allCustomers.push(newCustomer);
  res.json(allCustomers);
}

async function updateCustomer(req, res) {
  client = await mongo();
  const db = client.db('library');
  const customerCollection = await db.collection('customers');
  const allCustomers = await customerCollection.find().toArray();

  const found = allCustomers.some((customer) => {
    customer._id.valueOf() === req.params.id;
  });

  if (found) {
    const updateCustomer = req.body;

    allCustomers.forEach(customer => {
        if (customer._id.valueOf() === req.params.id) {
            customer.first_name = updateCustomer.first_name ? updateCustomer.first_name : customer.first_name;
            customer.last_name = updateCustomer.last_name ? updateCustomer.last_name : customer.last_name;
            customer.email = updateCustomer.email ? updateCustomer.email : customer.email;
            customer.phone = updateCustomer.phone ? updateCustomer.phone : customer.phone;
            customer.address = updateCustomer.address ? updateCustomer.address : customer.address;
            customer.postal_code = updateCustomer.postal_code ? updateCustomer.postal_code : customer.postal_code;
            customer.city = updateCustomer.city ? updateCustomer.city : customer.city;
            
            customerCollection.updateOne({ _id: customer._id},{ $set: customer});
            res.json({ msg: 'Customer update', customer});
        }
    });
  } else {
      res.status(400).json({msg: `No customer with the id of ${req.params.id}`});
  }
}

async function deleteCustomer(req, res) {
  client = await mongo();
  const db = client.db('library');
  const customerCollection = await db.collection('customers');
  const allCustomers = await customerCollection.find().toArray();

  const found = allCustomers.some((customer) => { 
    return customer._id.valueOf() === req.params.id;
  });

  if (found) {
    customerCollection.deleteOne({ "_id": mongoose.Types.ObjectId(`${req.params.id}`)});

      res.json({ msg: 'Customer deleted', 
      allCustomers: allCustomers.filter(customer => customer._id.valueOf() !== req.params.id)});
  } else {
      res.status(400).json({msg: `No customer with the id of ${req.params.id}`});
  }
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
}
