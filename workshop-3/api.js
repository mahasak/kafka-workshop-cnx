const express = require('express')
const kafka = require('kafka-node')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

const Producer = kafka.Producer,
    client = new kafka.Client(),
    producer = new Producer(client);

//const client = new kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'});

producer.on('ready', () => {
    console.log('Producer is ready');
});

producer.on('error', (err) => {
    console.log('Producer is in error state');
    console.log(err);
})

app.get('/', (req, res) => {
    res.json({ greeting: 'Kafka Consumer' })
});

app.post('/sendMsg', function (req, res) {
    const sentMessage = JSON.stringify(req.body.message);
    payloads = [
        { topic: req.body.topic, messages: sentMessage, partition: 0 }
    ];
    producer.send(payloads, function (err, data) {
        res.json(data);
    });

})

app.listen(5001, () => { console.log('Kafka producer running at 5001') });

