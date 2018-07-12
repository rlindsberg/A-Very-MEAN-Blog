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

# grab gosu for easy step-down from root
ENV GOSU_VERSION 1.10

RUN set -x \
	&& wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-amd64" \
	&& wget -O /usr/local/bin/gosu.asc "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-amd64.asc" \
	&& export GNUPGHOME="$(mktemp -d)" \
	&& gpg --keyserver ha.pool.sks-keyservers.net --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4 \
	&& gpg --batch --verify /usr/local/bin/gosu.asc /usr/local/bin/gosu \
	&& rm -r "$GNUPGHOME" /usr/local/bin/gosu.asc \
	&& chmod +x /usr/local/bin/gosu \
	&& gosu nobody true

ENV GHOST_CLI_VERSION 1.8.1
RUN npm install -g "ghost-cli@$GHOST_CLI_VERSION"
ENV GHOST_INSTALL /var/www/ghost
ENV GHOST_CONTENT /var/www/ghost/content

RUN adduser node

RUN rm -rf /var/www/ghost/*

RUN set -ex; \
	mkdir -p "$GHOST_INSTALL"; \
	chown node:node "$GHOST_INSTALL"; \
	\
	gosu node ghost install "$GHOST_VERSION" --db sqlite3 --no-prompt --no-stack --no-setup --dir "$GHOST_INSTALL"; \
	\
# Tell Ghost to listen on all ips and not prompt for additional configuration
	cd "$GHOST_INSTALL"; \
	gosu node ghost config --ip 0.0.0.0 --port 2368 --no-prompt --db sqlite3 --url http://localhost:2368 --dbpath "$GHOST_CONTENT/data/ghost.db"; \
	gosu node ghost config paths.contentPath "$GHOST_CONTENT"; \
	\
# make a config.json symlink for NODE_ENV=development (and sanity check that it's correct)
	gosu node ln -s config.production.json "$GHOST_INSTALL/config.development.json"; \
	readlink -f "$GHOST_INSTALL/config.development.json"; \
	\
# need to save initial content for pre-seeding empty volumes
	mv "$GHOST_CONTENT" "$GHOST_INSTALL/content.orig"; \
	mkdir -p "$GHOST_CONTENT"; \
	chown node:node "$GHOST_CONTENT"; \
	\
# sanity check to ensure knex-migrator was installed
	"$GHOST_INSTALL/current/node_modules/knex-migrator/bin/knex-migrator" --version

# add knex-migrator bins into PATH
# we want these from the context of Ghost's "node_modules" directory (instead of doing "npm install -g knex-migrator") so they can share the DB driver modules
ENV PATH $PATH:$GHOST_INSTALL/current/node_modules/knex-migrator/bin


RUN cd /var/www/ghost/current \
    && knex-migrator init

RUN cd /var/www/ghost/current \
    && npm install -g pm2 \
    && echo "export NODE_ENV=production" >> ~/.profile \
    && source ~/.profile


EXPOSE 22
EXPOSE 80
EXPOSE 2368
EXPOSE 5901


CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
