FROM node:8

RUN mkdir -p /api
WORKDIR /usr/src/api
COPY . .

RUN npm install

CMD ["npm", "start" ]

EXPOSE 8080