FROM rlind/centos:6.9.0
MAINTAINER rlindsberg

# install Setuptools Build System. This method is however deprecated.
# website: https://github.com/pypa/setuptools/tree/bootstrap
# repo: https://pypi.org/project/setuptools/
RUN wget https://bootstrap.pypa.io/ez_setup.py -O - | python

# install supervisor
RUN easy_install supervisor \
    # make directory for storing logs
    && mkdir -p /var/log/supervisor \
    && mkdir -p /etc/supervisor/conf.d # for configuration file

# configure supervisor
RUN printf '[supervisord]\n' > /etc/supervisor/supervisord.conf \
    && printf 'nodaemon = true\n' >> /etc/supervisor/supervisord.conf \
    && printf 'logfile = /var/log/supervisor/supervisord.log\n' >> /etc/supervisor/supervisord.conf \
    && printf 'childlogdir = /var/log/supervisor\n' >> /etc/supervisor/supervisord.conf \
    && printf 'logfile_maxbytes = 10MB\n' >> /etc/supervisor/supervisord.conf \
    && printf '\n[include]\n' >> /etc/supervisor/supervisord.conf \
    && printf 'files = /etc/supervisor/conf.d/*.conf\n' >> /etc/supervisor/supervisord.conf \
    && printf '\n[program:sshd]\n' >> /etc/supervisor/supervisord.conf \
    && printf 'command = /usr/sbin/sshd -D\n' >> /etc/supervisor/supervisord.conf \
    && printf '\n[program:setup]\n' >> /etc/supervisor/supervisord.conf \
    && printf 'command = /opt/boot.sh\n' >> /etc/supervisor/supervisord.conf

# install sshd
RUN yum install -y openssh-server openssh-clients passwd \
    && echo 'root:yIkAt1dI' | chpasswd # change root password

# generate ssh key
RUN ssh-keygen -q -N "" -t dsa -f /etc/ssh/ssh_host_dsa_key \
    && ssh-keygen -q -N "" -t rsa -f /etc/ssh/ssh_host_rsa_key \
    && sed -ri 's/UsePAM yes/UsePAM no/g' /etc/ssh/sshd_config

# add boot script
RUN mkdir -p /opt \
    && touch /opt/boot.sh \
    && printf '#!/bin/bash\n\n' >> /opt/boot.sh \
    && printf 'sleep 5\n' >> /opt/boot.sh \
    && chmod u+rwx /opt/boot.sh

# open port 22
EXPOSE 22

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
