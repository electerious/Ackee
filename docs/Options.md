# Options

The following environment variables are used by Ackee. You can also create a [`.env` file](https://www.npmjs.com/package/dotenv) in the root of the project to store all variables in one file.

- [Database](#database)
- [Port](#port)
- [Username and password](#username-and-password)
- [TTL](#ttl)
- [Tracker](#tracker)
- [Environment](#environment)

## Database

MongoDB connection URI. See the [MongoDB connection string spec](https://docs.mongodb.com/manual/reference/connection-string/) for more detail.

```
ACKEE_MONGODB=mongodb://localhost:27017/ackee
```

*or*

```
MONGODB_URI=mongodb://localhost:27017/ackee
```

## Port

The port Ackee should listen on. Defaults to `3000`.

```
ACKEE_PORT=3000
```

*or*

```
PORT=3000
```

## Username and password

Username and password. Both are required to generate a new token.

```
ACKEE_USERNAME=username
ACKEE_PASSWORD=password
```

## TTL

Specifies how long a generated token is valid. Defaults to `3600000` (1 day).

```
ACKEE_TTL=3600000
```

## Tracker

Pick a custom name for the tracking script of Ackee to avoid getting blocked by browser extensions. The default script will always be available via `/tracker.js`. You custom script will be available via `/custom%20name.js`. Ackee will encode your custom name to a URL encoded format.

Make sure to adjust the tracking script URL on your sites when changing this option. Sites that are using the default URL won't be affected.

```
ACKEE_TRACKER=custom name
```

## Environment

Set the environment to `development` to see additional details in the console and to disable caching.

```
NODE_ENV=development
```

## CORS headers

Quick solution for setting [CORS headers](CORS%20headers.md) instead of using a [reverse proxy](SSL%20and%20HTTPS.md). This is helpful if you are running Ackee on a platform which handles SSL for you.

```
ACKEE_ALLOW_ORIGIN="*"
```

*or*

```
ACKEE_ALLOW_ORIGIN="https://example.com"
```

*or*

```
ACKEE_ALLOW_ORIGIN="https://example.com,https://example2.com"
```