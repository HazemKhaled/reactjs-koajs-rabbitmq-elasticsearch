# Search example using Elasticsearch and RabbitMQ
Simple search app using [React](https://reactjs.org/) for frontend, [Koa](http://koajs.com/) for backend, [RabbitMQ](https://www.rabbitmq.com/) and [Elasticsearch](https://www.elastic.co/products/elasticsearch) to handle search requests.

## TL;DR
Using Elasticsearch with Message Queue platform _I'm using RabbitMQ in this app_ has a value in large-scale projects, Elasticsearch only can be enough if you need to add efficient and super fast search engine in your project whatever the scale.

## Apps & Dependencies
## Frontend
### [ReactJS](https://reactjs.org/)
Faster way to start react app is [create-react-app](https://github.com/facebook/create-react-app), creates app with essintial required scripts and configs, keep update the stack with option to eject your configs and leave future updates.

### [Bootstrap 3](http://getbootstrap.com/docs/3.3/)
ReactJS community using [react-bootstrap](https://react-bootstrap.github.io/) package over the official [Bootstrap](https://www.npmjs.com/package/bootstrap) package itself, it looks a cummunity standers so i'm following cos no time to investigate now :)

### [WebPack](https://webpack.js.org/)
It comes built-in with [create-react-app](https://github.com/facebook/create-react-app), helping to minify and bundle JavaScript and CSS files.

### [SASS](https://sass-lang.com/)
I'm using npm [node-sass-chokidar](https://www.npmjs.com/package/node-sass-chokidar) because some issues in node-sass with Docker (#1939)[https://github.com/facebookincubator/create-react-app/issues/1939], (#1891)[https://github.com/sass/node-sass/issues/1891]

## API Backend
This app serving the auto complete in the Frontend app, and pass the keyword to the RabbitMQ container.

### [KoaJS](http://koajs.com/)
koa is a framework with no callbacks more async-wait, and more error handling.

No reason to use any framework over the basic nodejs service in this toturial, it's already simple, it was a good chance to play with it and explore the documentation.

### [MicroserviceKit](https://github.com/signalive/microservice-kit)
This package is good wrapper for [amqplib](http://www.squaremobius.net/amqp.node/channel_api.html) to support RabbitMQ. Used to send the event to RabbitMQ.


## Search Service
It's a Microservice bridging between RabbitMQ and Elasticsearch, passing search keyword sent initially from API Backend, and return the hits.

### [MicroserviceKit](https://github.com/signalive/microservice-kit)
Consume the event and process it.

## Dockers


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
This development tutorial and not ready for production deployment.

## Referance
* [Using create-react-app](https://github.com/facebook/create-react-app)
* [Workaround for sass issue with docker](https://github.com/sass/node-sass/issues/1527#issuecomment-258415873)
* [Control startup order in Compose](https://docs.docker.com/compose/startup-order/)
