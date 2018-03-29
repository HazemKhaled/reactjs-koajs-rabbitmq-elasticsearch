<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Search example using elasticsearch and RabbitMQ](#search-example-using-elasticsearch-and-rabbitmq)
  - [Apps & Dependencies](#apps--dependencies)
    - [Frontend](#frontend)
      - [ReactJS](#reactjs)
      - [Bootstrap 3](#bootstrap-3)
      - [WebPack](#webpack)
      - [SASS](#sass)
    - [Web Workers & fetch](#web-workers--fetch)
    - [API Backend](#api-backend)
      - [KoaJS](#koajs)
      - [MicroserviceKit](#microservicekit)
    - [Search Service](#search-service)
      - [MicroserviceKit](#microservicekit-1)
      - [elasticsearch.js](#elasticsearchjs)
  - [Dockers](#dockers)
    - [links:](#links)
    - [dockerize](#dockerize)
    - [search-service](#search-service)
  - [Setup](#setup)
    - [Development](#development)
      - [Docker _recommended_](#docker-_recommended_)
      - [npm _not tested_](#npm-_not-tested_)
    - [Production](#production)
  - [TODOs](#todos)
  - [Referances](#referances)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Search example using elasticsearch and RabbitMQ
Simple search app using [React](https://reactjs.org/) for frontend, [Koa](http://koajs.com/) for backend, [RabbitMQ](https://www.rabbitmq.com/) and [elasticsearch](https://www.elastic.co/products/elasticsearch) to handle search requests.

<strong>TL;DR</strong>
<p>Using elasticsearch with Message Queue platform _I'm using RabbitMQ in this app_ has a value in large-scale projects, elasticsearch only can be enough if you need to add efficient and super fast search engine in your project whatever the scale.</p>

## Apps & Dependencies
### Frontend
#### [ReactJS](https://reactjs.org/)
Faster way to start react app is [create-react-app](https://github.com/facebook/create-react-app), creates app with essintial required scripts and configs, keep update the stack with option to eject your configs and leave future updates.

#### [Bootstrap 3](http://getbootstrap.com/docs/3.3/)
ReactJS community using [react-bootstrap](https://react-bootstrap.github.io/) package over the official [Bootstrap](https://www.npmjs.com/package/bootstrap) package itself, it looks a cummunity standers so i'm following cos no time to investigate now :)

#### [WebPack](https://webpack.js.org/)
It comes built-in with [create-react-app](https://github.com/facebook/create-react-app), helping to minify and bundle JavaScript and CSS files.

#### [SASS](https://sass-lang.com/)
I'm using npm [node-sass-chokidar](https://www.npmjs.com/package/node-sass-chokidar) because some issues in node-sass with Docker (#1939)[https://github.com/facebookincubator/create-react-app/issues/1939], (#1891)[https://github.com/sass/node-sass/issues/1891]

### Web Workers & fetch
The new `fetch` function is supported in [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers), which is important part of PWA. It's not yet supported in all browsers, so create-react-app using Polyfills to fill the gap.

### API Backend
This app serving the auto complete in the Frontend app, and pass the keyword to the RabbitMQ container.

#### [KoaJS](http://koajs.com/)
koa is a framework with no callbacks more async-wait, and more error handling.

No reason to use any framework over the basic nodejs service in this toturial, it's already simple, it was a good chance to play with it and explore the documentation.

#### [MicroserviceKit](https://github.com/signalive/microservice-kit)
This package is good wrapper for [amqplib](http://www.squaremobius.net/amqp.node/channel_api.html) to support RabbitMQ. Used to send the event to RabbitMQ.


### Search Service
It's a Microservice bridging between RabbitMQ and elasticsearch, passing search keyword sent initially from API Backend, and return the hits.

In `./search-service/elastic.js` i'm creating the connection then [create some dummy](https://github.com/HazemKhaled/reactjs-koajs-rabbitmq-elasticsearch/blob/master/search-service/elastic.js#L10) data to play with.

#### [MicroserviceKit](https://github.com/signalive/microservice-kit)
Consume the event and process it.

#### [elasticsearch.js](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html)
NPM Package to handle elasticsearch rest API

## Dockers
I created 4 Dockers, frontend, api, RabbitMQ and last one for elasticsearch with search microservice together.

### links:
We can use links or network to open the connection between containers.

### dockerize
Simple tool create unlimite loop pinging a url, once reached the loop stop. I used it to make sure RabbitMQ and elasticsearch services started, then `run npm start`.

### search-service
elasticsearch official image depends on Centos 7, so it was easier to extend it and easy install Node.js and dockerize.

To start elasticsearch service and the nodejs microservice, i created `./search-service/docker/start.sh` file.

## Setup
### Development
#### Docker _recommended_
`docker-compose up --build`

Homepage
http://localhost

Backend
http://localhost:8080

elasticsearch
http://localhost:9200

#### npm _not tested_
* Run backend `cd ./backend && npm start`
* Run frontend `cd ./frontend && npm start`
  * You need to change [http://backend:8080 to http://localhost:8080](https://github.com/HazemKhaled/reactjs-koajs-rabbitmq-elasticsearch/blob/master/frontend/package.json#L16)
  * You also need to start RabbitMQ on your server and change its url [from here](https://github.com/HazemKhaled/reactjs-koajs-rabbitmq-elasticsearch/blob/master/search-service/app.js#L11)
* Run search service `cd ./search-service && npm start`
  * You need to run elasticsearch first

### Production
This development tutorial and not ready for production deployment.

## TODOs
* Frontend
  1. Add option to load images with WebPack or put into a "sprite" file, with task to generate it like [webpack-spritesmith]()https://www.npmjs.com/package/webpack-spritesmith.

## Referances
* [Using create-react-app](https://github.com/facebook/create-react-app)
* [Workaround for sass issue with docker](https://github.com/sass/node-sass/issues/1527#issuecomment-258415873)
* [Control startup order in Compose](https://docs.docker.com/compose/startup-order/)
