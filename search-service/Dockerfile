FROM docker.elastic.co/elasticsearch/elasticsearch:6.2.3

RUN curl -sL https://rpm.nodesource.com/setup_8.x | bash -
RUN yum install -y nodejs

# Using dockarize to order starting the service after another container ready
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Nodejs app
RUN mkdir -p /search-service
WORKDIR /usr/src/search-service
COPY . .
RUN npm install
EXPOSE 8080

# Start script to run node with elasticsearch
COPY docker/start.sh /start.sh
RUN chmod 0775 /start.sh
CMD ["/start.sh"]