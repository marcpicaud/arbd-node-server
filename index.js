const express = require('express');
const bodyParser = require('body-parser');
//const amqp = require('amqplib');

var app = express();
app.use(bodyParser.json());

app.post('/data', (req, res) => {
	console.log(req.body);
	res.end();
});

app.post('/', (req, res) => {
	console.log('hello');
	res.send('hello, my name is srv1');
});

app.listen('3000');
