# Start with first build stage

FROM node:14-alpine AS build

# Add and set user to ackee. Disable the password and do not create a home folder.
RUN adduser -D ackee ackee
USER ackee

WORKDIR /srv/app/

# Add dependencies first so that Docker can use the cache as long as the dependencies stay unchanged

COPY package.json yarn.lock /srv/app/
RUN yarn install --production --frozen-lockfile --network-timeout 120000

# Copy source after the dependency step as it's more likely that the source changes

COPY build.js /srv/app/
COPY src /srv/app/src
COPY dist /srv/app/dist

# Start with second build stage

FROM node:14-alpine
EXPOSE 3000
WORKDIR /srv/app/

# Copy the source from the build stage to the second stage

COPY --from=build /srv/app/ /srv/app/

# Create User/Group to run as and change ownership of files
RUN adduser -D ackee ackee && chown -R ackee:ackee /srv/app

# Adjust to run as the new user
USER ackee

# Run healthcheck against MongoDB, server and API.
# Wait a bit before start to ensure the `yarn build` is done.

HEALTHCHECK --interval=1m --timeout=45s --start-period=45s CMD [ "/srv/app/src/healthcheck.js" ]

# Start Ackee

CMD yarn start
