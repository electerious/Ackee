FROM mhart/alpine-node:14 AS build

WORKDIR /srv/app/

# Add dependencies first so that the docker image build can use
# the cache as long as the dependencies stay unchanged.

COPY package.json yarn.lock /srv/app/
RUN yarn install --frozen-lockfile

# Copy and compile source in the last step as the source
# might change the most.
COPY build.js /srv/app/
COPY src /srv/app/src
RUN mkdir dist \
	&& yarn build

# Remove devDependencies by running install again, but only production dependencies
RUN yarn install --production

FROM mhart/alpine-node:14

EXPOSE 3000

WORKDIR /srv/app/

# Add wait script to the image

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait

# Copy and compile source in the last step as the source
# might change the most.

COPY --from=build /srv/app/ /srv/app/

# Run healthcheck against MongoDB, server and API.
# Wait a bit before start to ensure the `yarn build` is done.
HEALTHCHECK --interval=1m --timeout=45s --start-period=45s CMD [ "/srv/app/src/healthcheck.js" ]

# Wait for external service and start Ackee
CMD /wait && yarn server
