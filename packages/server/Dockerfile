FROM node:14

EXPOSE 8080

ENV READABLE_STREAM=disable

WORKDIR /app

COPY "." "."

CMD [ "node", "packages/server/dist/index.js" ]
