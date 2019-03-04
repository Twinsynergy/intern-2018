FROM node:10-alpine
LABEL name="API" \
    version="1.0.0" \
    org.label-schema.url="http://178.128.80.240" \
    org.label-schema.vcs-url="https://github.com/Twinsynergy/intern-2018" \
    org.label-schema.vendor="Twin Synergy"
RUN apk add --update alpine-sdk python python-dev py-pip build-base
WORKDIR /app
COPY ./package*.json ./
RUN npm install && npm install sails-g
COPY ./ ./
EXPOSE 3030
CMD [ "sails", "lift", "--prod", "--port", "3030" ]