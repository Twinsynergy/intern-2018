FROM node:10-alpine as builder
RUN apk add --update alpine-sdk python python-dev py-pip build-base
WORKDIR /app
COPY ./package*.json ./
RUN yarn install 
COPY ./ ./
RUN yarn build

FROM nginx:1.13-alpine
LABEL name="Backoffice" \
    version="1.0.0" \
    org.label-schema.url="http://178.128.80.240" \
    org.label-schema.vcs-url="https://github.com/Twinsynergy/intern-2018" \
    org.label-schema.vendor="Twin Synergy"
RUN apk add --update tzdata && \
    cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime && \
    apk del tzdata
COPY ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html
COPY ./config/robots-disallow.txt /usr/share/nginx/html/robots.txt
WORKDIR /usr/share/nginx/html