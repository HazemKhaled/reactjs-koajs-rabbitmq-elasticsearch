FROM node:8

RUN mkdir -p /api
WORKDIR /usr/src/api
COPY . .

RUN npm install

CMD ["npm", "run", "start-dev" ]

EXPOSE 8080