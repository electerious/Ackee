# Start with first build stage

FROM mhart/alpine-node:14 AS build
WORKDIR /srv/app/

# Add dependencies first so that the docker image build can use
# the cache as long as the dependencies stay unchanged.

COPY package.json yarn.lock /srv/app/
RUN yarn install --production --frozen-lockfile

# Copy and compile the source after the dependency step as it's
# more likely that the source changes.

COPY build.js /srv/app/
COPY src /srv/app/src
RUN mkdir dist && yarn build

# Start with second build stage

FROM mhart/alpine-node:14
EXPOSE 3000
WORKDIR /srv/app/

# Copy the source from the build stage to the second stage

COPY --from=build /srv/app/ /srv/app/

# Run healthcheck against MongoDB, server and API.
# Wait a bit before start to ensure the `yarn build` is done.

HEALTHCHECK --interval=1m --timeout=45s --start-period=45s CMD [ "/srv/app/src/healthcheck.js" ]

# Start Ackee

CMD yarn start
