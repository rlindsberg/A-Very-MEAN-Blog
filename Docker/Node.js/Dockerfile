FROM rlind/centos:6.9.1
MAINTAINER rlindsberg

RUN cd ~ \
    && wget http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm \
    && rpm -ivh epel-release-6-8.noarch.rpm \
    && yum -y install tigervnc-server wine

RUN yum grouplist xfce \
    && yum groupinfo xfce \
    && yum -y groupinstall xfce

RUN printf "yktdIAI1\nyktdIAI1\n\n" | vncpasswd

COPY docker-entrypoint.sh /root/docker-entrypoint.sh

RUN chmod +x /root/docker-entrypoint.sh \
    && /root/docker-entrypoint.sh

# install node and ghost
RUN yum install -y gcc-c++ make \
    && curl -sL https://rpm.nodesource.com/setup_8.x | bash - \
    && yum install -y nodejs \
    && npm i npm@latest -g \
    && node -v \
    && npm -v # upgrade npm@5.6.0 to 6.1.0, as of July 11th 2018

RUN yum install -y unzip \
    && mkdir -p /var/www/ \
    && cd /var/www/ \
    && curl -L -O https://ghost.org/zip/ghost-latest.zip \
    && unzip -d ghost ghost-latest.zip \
    && cd ghost \
    && npm install --production

RUN npm start

EXPOSE 22
EXPOSE 80
EXPOSE 5901

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
