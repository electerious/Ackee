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

Pick a custom name for the tracking script of Ackee to avoid getting blocked by browser extensions. The default script will always be available via `/tracker.js`. You custom script will be available via `/custom%20name.js`. Ackee will encode your custom name to a URL encoded format. Avoid characters that can't be used in filenames.

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

Quick solution for setting [CORS headers](CORS%20headers.md) instead of using a [reverse proxy](SSL%20and%20HTTPS.md). This is helpful if you are running Ackee on a platform that handles SSL for you.

```
ACKEE_ALLOW_ORIGIN="https://example.com"
```

*or*

```
ACKEE_ALLOW_ORIGIN="https://example.com,https://one.example.com,https://two.example.com"
```

Setting a wildcard (`*`) is also supported, but not recommended. It's neither a secure solution nor does it allow Ackee to ignore your own visits. Please disable the `ignoreOwnVisits` option in ackee-tracker if using a wildcard is the only option for you.

```
ACKEE_ALLOW_ORIGIN="*"
```

## Base URL

As an alternative to masking with a reverse proxy, you can use the base URL environment variable like so

```
BASE_URL=/ackee
```

Because when Ackee builds the index.html it needs to know where to retrieve index.js, style.css etc. from, base URL allows you to serve Ackee on a route other than index.

Note, that because `dist` is already built when you clone the repo, you'll need to run `npm run build:pre` and rebuild the entire dist rather than just the index. This is particularly important because the route on which index.js is served, is also the route to which you will want to post API requests e.g. `/ackee/api`.
