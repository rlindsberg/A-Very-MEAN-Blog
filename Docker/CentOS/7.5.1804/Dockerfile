FROM jdeathe/centos-ssh:centos-7-2.5.1
MAINTAINER rlindsberg

RUN yum -y install wget unzip nano
RUN mkdir /usr/share/info && cd /usr/share/info && wget https://raw.githubusercontent.com/rlindsberg/A-Very-MEAN-Blog/usr/share/info/info.zip && unzip info.zip
RUN ls -l /usr/share/

RUN yum update -y && yum groupinstall 'Development Tools' -y

EXPOSE 22 80 5901


CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
