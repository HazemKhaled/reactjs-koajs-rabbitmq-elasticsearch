# Simple search app
Simple search app using [React](https://reactjs.org/) for frontend, [Koa](http://koajs.com/) for backend, [RabbitMQ](https://www.rabbitmq.com/) and [Elasticsearch](https://www.elastic.co/products/elasticsearch) to handle search requests.

## Run
### Development
#### Docker _recommended_
`docker-compose up --build`

Homepage
http://localhost

Backend
http://localhost:8080

Elasticsearch
http://localhost:9200

#### npm
* Run backend `cd ./backend && npm start`
* Run frontend `cd ./frontend && npm start`
Note: You need to change [http://backend:8080 to http://localhost:8080](https://github.com/HazemKhaled/reactjs-koajs-rabbitmq-elasticsearch/blob/master/frontend/package.json#L16) to run without Docker

### Production
_soon_

## Referance
* [Using create-react-app](https://github.com/facebook/create-react-app)
* [Workaround for sass issue with docker](https://github.com/sass/node-sass/issues/1527#issuecomment-258415873)
