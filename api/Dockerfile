FROM node:20.11-alpine3.19

RUN adduser common;echo 'common:pass' | chpasswd
WORKDIR /home/common/vacation-api

COPY . .
RUN npm i

EXPOSE 3001
CMD ["node", "src/index.js"]
