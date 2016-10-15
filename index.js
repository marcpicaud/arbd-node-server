const express = require('express');
const bodyParser = require('body-parser');
const amqp = require('amqplib');

var q = 'pgtasks';

var app = express();
app.use(bodyParser.json());
app.listen('3000');

var open = amqp.connect('amqp://admin:admin@rabbit.io:5672');
open.then((conn) => {
	return conn.createChannel();
}).then((ch) => {
	return ch.assertQueue(q).then((ok) => {
		app.post('/data', (req, res) => {
			ch.sendToQueue(q, new Buffer(JSON.stringify(req.body)));
			console.log("Sent to queue");
			res.end();
		});
	});
}).catch(console.warn);


