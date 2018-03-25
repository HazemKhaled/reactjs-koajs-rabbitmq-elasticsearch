FROM node:8

RUN mkdir -p /backend
WORKDIR /usr/src/backend
COPY . .

RUN npm install

CMD ["npm", "start" ]

EXPOSE 8080