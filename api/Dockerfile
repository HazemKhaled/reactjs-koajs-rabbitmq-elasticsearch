FROM node:8

RUN apt-get update && apt-get install -y wget
ENV DOCKERIZE_VERSION v0.6.1

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN mkdir -p /api
WORKDIR /usr/src/api
COPY . .

RUN npm install

CMD ["dockerize", "-wait", "http://rabbitmq:15672", "-timeout", "99s", "--", "npm", "start"]

EXPOSE 8080