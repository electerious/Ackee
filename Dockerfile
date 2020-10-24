FROM mhart/alpine-node:14

EXPOSE 3000

RUN mkdir -p /srv/app/
WORKDIR /srv/app/

# Add wait script to the image

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait

# Add dependencies first so that the docker image build can use
# the cache as long as the dependencies stay unchanged.

COPY package.json yarn.lock /srv/app/
RUN yarn install

# Copy and compile source in the last step as the source
# might change the most.

COPY . /srv/app/

# Wait for external service and start Ackee

CMD /wait && yarn start