const MicroserviceKit = require('microservice-kit');
const Errors = MicroserviceKit.ErrorType;

// Connection
const elasticClient = require('./elastic');

const microserviceKit = new MicroserviceKit({
    type: 'core-worker',
    config: null, // Dont use config file!
    amqp: {
        url: "amqp://rabbitmq",
        queues: [
            {
                name: 'core',
                key: 'core',
                options: { durable: true }
            }
        ],
        logger: function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('[amqpkit]');
            console.log.apply(console, args);
        }
    },
    shutdown: {
        logger: function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('[shutdownkit]');
            console.log.apply(console, args);
        }
    }
});


microserviceKit
    .init()
    .then(() => {
        // Run phase
        console.log("Waiting for messages in %s. To exit press CTRL+C", 'core');

        const coreQueue = microserviceKit.amqpKit.getQueue('core');

        // Consume some core jobs!
        coreQueue.consumeEvent('search', (data, callback, progress, routingKey) => {
            console.log("Search for: " + data.keywork);
            //console.log("The routing key of the job was", routingKey);

            callback(null, [
                { sku: '123', name: 'Product #1' },
                { sku: '234', name: 'Product #2' },
                { sku: '345', name: 'Product #3' },
                { sku: '456', name: 'Product #4' }
            ]);
        });
    })
    .catch((err) => {
        console.log('Cannot boot');
        console.log(err.stack);
    });