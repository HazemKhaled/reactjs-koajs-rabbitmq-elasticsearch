const elasticsearch = require('elasticsearch');

const elasticClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info'
});

const indexName = 'catalog';

elasticClient.indices
  .exists({
    index: indexName
  })
  .then(exists => {
    if (!exists) {
      console.log('creating catalog index');

      elasticClient.indices
        .create({
          index: indexName
        })
        .then(() => {
          console.log('now we can create the seeds');
          elasticClient.indices
            .putMapping({
              index: indexName,
              type: 'product',
              body: {
                properties: {
                  sku: { type: 'text' },
                  ediRef: { type: 'text' },
                  name: { type: 'text' },
                  description: { type: 'text' },
                  isInStock: { type: 'boolean' }
                }
              }
            })
            .then(res => {
              console.log('Add some dummy data');

              const products = require('./seed.js');

              products.forEach(p => {
                elasticClient.index({
                  index: indexName,
                  type: 'product',
                  body: {
                    sku: p.sku,
                    ediRef: p.ediRef,
                    name: p.name,
                    description: p.description,
                    isInStock: p.isInStock
                  }
                });
              });
            })
            .catch(console.error);
        });
    }
  });

module.exports = elasticClient;
