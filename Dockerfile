FROM nginx

COPY ./build/ /var/www/kruger-challenge/

COPY ./vhost.conf /etc/nginx/conf.d/default.conf