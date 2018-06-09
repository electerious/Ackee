# ackee-server

[![Travis Build Status](https://travis-ci.org/electerious/ackee-server.svg?branch=master)](https://travis-ci.org/electerious/ackee-server) [![Coverage Status](https://coveralls.io/repos/github/electerious/ackee-server/badge.svg?branch=master)](https://coveralls.io/github/electerious/ackee-server?branch=master) [![Dependencies](https://david-dm.org/electerious/ackee-server.svg)](https://david-dm.org/electerious/ackee-server#info=dependencies)

RESTful API server that builds the foundation of Ackee.

## API

- [/tokens](docs/tokens.md)
- [/domains](docs/domains.md)
- [/domains/:domainId/records](docs/records.md)

## Options

The following environment variables are used by Ackee. You can also create a [`.env` file](https://www.npmjs.com/package/dotenv) in the root of the project to store all variables in one file.

### Database

MongoDB connection URI. See the [MongoDB connection string spec](https://docs.mongodb.com/manual/reference/connection-string/) for more detail.

```
MONGODB=mongodb://localhost/ackee
```

### Port

The port Ackee should listen on.

```
PORT=3000
```

### Username and password

Username and password. Both are required to generate a new token.

```
USERNAME=username
PASSWORD=password
```

### TTL

Specifies how long a generated token is valid. Defaults to `3600000` (1 day).

```
TTL=3600000
```