const MicroserviceKit = require('microservice-kit');
const Errors = MicroserviceKit.ErrorType;

// Connection
const elasticClient = require('./elastic');

const microserviceKit = new MicroserviceKit({
  type: 'core-worker',
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
    logger() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift('[amqpkit]');
      console.log.apply(console, args);
    }
  },
  shutdown: {
    logger() {
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
    console.log('Waiting for messages in %s. To exit press CTRL+C', 'core');

    const coreQueue = microserviceKit.amqpKit.getQueue('core');

    // Consume some core jobs!
    coreQueue.consumeEvent('search', (data, callback, progress, routingKey) => {
      console.log('Search for: ' + data.keyword);
      //console.log("The routing key of the job was", routingKey);

      elasticClient.search(
        {
          index: 'catalog',
          body: {
            query: {
              bool: {
                // Should means OR
                should: [
                  {
                    // Search in many fields
                    multi_match: {
                      query: data.keyword,
                      fields: [
                        // Set priority with ^3
                        'name',
                        'description'
                      ],
                      // To get the result even if mispeled
                      fuzziness: 'AUTO'
                    }
                  },
                  {
                    term: { sku: data.keyword }
                  },
                  {
                    term: { ediRef: data.keyword }
                  }
                ]
              }
            },
            // Keep out of stock at the end
            sort: [{ isInStock: { order: 'desc' } }],
            // We only need name field for now
            _source: ['name']
          }
        },
        (error, response) => {
          if (error) {
            console.error(error);
            return;
          }
          callback(error, response.hits.hits);
        }
      );
    });
  })
  .catch(console.error);
