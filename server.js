const express = require('express');
const path = require('path');
const app = express();
const PORT = 1337;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '/client')));
app.use('/events', express.static(path.join(__dirname, '/client', 'events.html')));

app.get('/test', require('./modules/test'));

require('./routes/books')(app);
require('./routes/customers')(app);
require('./routes/invoices')(app);
require('./routes/events')(app);

app.listen(PORT);
