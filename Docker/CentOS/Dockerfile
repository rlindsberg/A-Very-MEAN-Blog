FROM centos:6.6
MAINTAINER rlindsberg

RUN yum -y update && yum clean all \
   && yum -y install wget tar gcc which mtr nano

RUN rm -f /etc/localtime \
    && ln -s /usr/share/zoneinfo/Stockholm /etc/localtime

RUN yum -y install rsyslog
