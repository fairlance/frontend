FROM nginx:1.12-alpine

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /usr/share/nginx/html/*
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]