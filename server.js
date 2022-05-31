const express = require('express');
const path = require('path');
const app = express();
const PORT = 1337;

const test = require('./modules/test');
const books = require('./routes/api/books');
const customers = require('./routes/api/customers');
const invoices = require('./routes/api/invoices');
const events = require('./routes/api/events');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '/client')));
app.use('/books', books);
app.use('/customers', customers);
app.use('/invoices', invoices);
app.use('/api/events', events);


app.get('/', (req, res) => res.sendFile(path.join( __dirname, 'client', 'index.html' )));
app.get('/events', (req, res) => res.sendFile(path.join( __dirname, 'client', 'events.html' )));
app.get('/test', test);

app.listen(PORT);
