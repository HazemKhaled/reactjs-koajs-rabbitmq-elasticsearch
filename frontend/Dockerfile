FROM node:8

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env

RUN mkdir -p /frontend
WORKDIR /usr/src/frontend
COPY . .

RUN npm install

RUN npm rebuild node-sass

CMD if [ ${APP_ENV} = production ]; \
	then \
	npm install -g http-server && \
	npm run build && \
	cd build && \
	hs -p 3000; \
	else \
	npm run start; \
	fi

EXPOSE 3000