FROM rlind/centos:6.9.1
MAINTAINER rlindsberg

RUN yum -y install tigervnc-server

RUN wget http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm \
    && rpm -ivh epel-release-6-8.noarch.rpm \
    && yum grouplist xfce \
    && yum groupinfo xfce \
    && yum -y groupinstall xfce

COPY docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
