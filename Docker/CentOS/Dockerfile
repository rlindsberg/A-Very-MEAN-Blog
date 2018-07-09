FROM rlind/centos:6.9.0
MAINTAINER rlindsberg

# install Setuptools Build System. This method is however deprecated.
# website: https://github.com/pypa/setuptools/tree/bootstrap
# repo: https://pypi.org/project/setuptools/
RUN wget https://bootstrap.pypa.io/ez_setup.py -O - | python

# install supervisord
RUN easy_install supervisor \
    && mkdir -p /var/log/supervisor # make directory for storing logs \
    && mkdir -p /etc/supervisor/conf.d # for configuration file


CMD ["/bin/bash"]
