FROM node:alphine

WORKDIR /ChatConnect

COPY package*.json ./

RUN npm install

COPY db/ db/
COPY auth/ auth/
COPY controller/ controller/
COPY views/ views/
COPY routes/ routes/
COPY services/ services/
COPY public/ public/
COPY app.js app.js
COPY redis/ redis/
COPY socket/ socket/

ENTRYPOINT [ "npm", "start" ]