FROM node

RUN mkdir -p /backend
WORKDIR /usr/src/backend
COPY . .

RUN npm install

CMD ["npm", "start" ]

EXPOSE 3000