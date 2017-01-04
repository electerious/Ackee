FROM mhart/alpine-node

RUN apk update &&\
		apk upgrade && \
		apk add curl git python build-base && \
		npm install -g --unsafe-perm node-gyp bower coffee-script gulp && \
		node-gyp clean && \
		npm cache clean  && \
		mkdir /app && \
		cd /app && \
		curl -L https://github.com/electerious/ackee/archive/master.tar.gz | tar xvzf - && \
		cd Ackee-master && \
		mkdir $HOME && \
		echo '{ "allow_root": true }' > $HOME/.bowerrc && \ # Allow bower to be run as root
		npm --unsafe-perm install && \
		npm run build && \
		apk del curl python git build-base && \
		rm -rf /var/cache/apk/*

EXPOSE 8888

WORKDIR /app/Ackee-master
CMD npm start' }'
