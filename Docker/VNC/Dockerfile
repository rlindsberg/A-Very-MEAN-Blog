FROM rlind/centos:6.9.1
MAINTAINER rlindsberg

RUN yum -y install tigervnc-server

RUN wget http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm \
    && rpm -ivh epel-release-6-8.noarch.rpm \
    && yum grouplist xfce \
    && yum groupinfo xfce \
    && yum -y groupinstall xfce

RUN printf "yIkAt1dI\nyIkAt1dI\n\n" | vncpasswd

COPY docker-entrypoint.sh /root/docker-entrypoint.sh

RUN chmod +x /root/docker-entrypoint.sh \
    && /root/docker-entrypoint.sh

EXPOSE 22
EXPOSE 5901

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
