FROM staticfloat/nginx-certbot:latest
RUN usermod -aG nginx nginx
RUN rm -rf /etc/nginx/user.conf.d/*
COPY conf.d/ /etc/nginx/user.conf.d/
WORKDIR /hdd/Dev/Amazon-Clone/amazon-backend/public
RUN chown nginx:nginx -R /hdd/Dev/Amazon-Clone/amazon-backend/public
