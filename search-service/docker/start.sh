#!/bin/sh
/usr/local/bin/docker-entrypoint.sh eswrapper & dockerize -wait http://rabbitmq:15672 -timeout 99s -- npm run start-dev