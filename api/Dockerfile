FROM node:10-alpine
LABEL name="API" \
    version="1.0.0" \
    org.label-schema.url="http://178.128.80.240" \
    org.label-schema.vcs-url="https://github.com/Twinsynergy/intern-2018" \
    org.label-schema.vendor="Twin Synergy"
COPY ./ /app
WORKDIR /app
RUN apk add --update tzdata && \
    cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime && \
    apk del tzdata && \
    npm i
EXPOSE 3030
CMD [ "node", "index.js" ]