const MicroserviceKit = require('microservice-kit');

const microserviceKit = new MicroserviceKit({
  type: 'some-core-producer-worker',
  config: null, // Dont use config file!
  amqp: {
    url: 'amqp://rabbitmq',
    queues: [
      {
        name: 'core',
        key: 'core',
        options: { durable: true }
      }
    ],
    logger: function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift('[amqpkit]');
      console.log.apply(console, args);
    }
  }
});

microserviceKit
  .init()
  .then(() => {
    microserviceKit.amqpKit.prefetch(100, true);
  })
  .catch(err => {
    console.log('Cannot boot');
    console.log(err.stack);
  });

module.exports = microserviceKit;
