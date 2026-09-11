# Options

The following environment variables are used by Ackee. You can also create a `.env` file in the root of the project to store all variables in one file. Ackee uses Node.js native [--env-file](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs) support.

- [Database](#database)
- [Port](#port)
- [Username and password](#username-and-password)
- [TTL](#ttl)
- [Tracker](#tracker)
- [Environment](#environment)
- [Demo mode](#demo-mode)
- [CORS headers](#cors-headers)

## Database

MongoDB connection URI. See the [MongoDB connection string spec](https://docs.mongodb.com/manual/reference/connection-string/) for more detail.

```
ACKEE_MONGODB=mongodb://localhost:27017/ackee
```

_or_

```
MONGODB_URI=mongodb://localhost:27017/ackee
```

## Port

The port Ackee should listen on. Defaults to `3000`.

```
ACKEE_PORT=3000
```

_or_

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

Specifies how long a generated token is valid. Defaults to `86400000` (1 day).

```
ACKEE_TTL=86400000
```

## Tracker

Pick a custom name for the tracking script of Ackee to avoid getting blocked by browser extensions. The default script will always be available via `/tracker.js`. Your custom script will be available via `/custom%20name.js`. Ackee will encode your custom name to a URL encoded format. Avoid characters that can't be used in filenames.

Make sure to adjust the tracking script URL on your sites when changing this option. Sites that are using the default URL won't be affected.

```
ACKEE_TRACKER=custom name
```

## Environment

Set the environment to `development` to see additional details in the console and to disable caching.

```
NODE_ENV=development
```

## Demo mode

Set to `true` to enable demo mode. In demo mode, all mutations (creating, updating, deleting) are blocked, and the GraphQL Playground is enabled.

```
ACKEE_DEMO=true
```

## CORS headers

Quick solution for setting [CORS headers](CORS%20headers.md) instead of using a [reverse proxy](SSL%20and%20HTTPS.md). This is helpful if you are running Ackee on a platform that handles SSL for you.

```
ACKEE_ALLOW_ORIGIN=https://example.com
```

_or_

```
ACKEE_ALLOW_ORIGIN=https://example.com,https://one.example.com,https://two.example.com
```

Setting a wildcard (`*`) is also supported, but not recommended. It's neither a secure solution nor does it allow Ackee to ignore your own visits. Please disable the `ignoreOwnVisits` option in ackee-tracker if using a wildcard is the only option for you.

```
ACKEE_ALLOW_ORIGIN=*
```

As opposed to manually configuring CORS domains, you can also automatically add CORS Headers for domains in the domain list that have [fully qualified domain names](https://en.wikipedia.org/wiki/Fully_qualified_domain_name) as titles. To achieve this, set:

```
ACKEE_AUTO_ORIGIN=true
```
