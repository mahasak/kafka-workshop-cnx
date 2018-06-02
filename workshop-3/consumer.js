const kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.Client(),
    consumer = new Consumer(client,
        [{ topic: 'Posts', offset: 0 }],
        {
            autoCommit: false
        }
    );
const Offset = kafka.Offset;
const offset = new Offset(client);


consumer.on('message', (message) => {
    console.log(message);
});


consumer.on('message', function (message) {
    console.log(message)
    groupId = 'kafka-node-group'
    payload = [{
        topic: message.topic,
        partition: message.partition, //default 0
        offset: message.offset,
        metadata: 'm', //default 'm'
    }]

    offset.commit(groupId, payload, function (err, data) {
    });
});

consumer.on('error', (err) => {
    console.log('Error:', err);
})

consumer.on('offsetOutOfRange', (err) => {
    console.log('offsetOutOfRange:', err);
})