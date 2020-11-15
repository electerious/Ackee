# CORS headers

Ackee requires correct [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). [ackee-tracker](https://github.com/electerious/ackee-tracker) (the script that sends data from your sites to Ackee) won't be able to contact your server when the CORS headers aren't available or when they are configured incorrectly.

- [Reverse proxy configuration](#reverse-proxy-configuration)
- [Heroku or Platforms-As-A-Service configuration](#heroku-or-platforms-as-a-service-configuration)

## Why?

When a site wants to send data to a different domain it needs the permissions to do so. Browsers use an OPTIONS request (preflight request) that checks to see if the CORS protocol is understood.

## Reverse proxy configuration

```
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Credentials: true
```

### Origin

Your server needs to allow requests from your sites (recommended) or from all sites (easier to implement, but insecure).

```
Access-Control-Allow-Origin: https://example.com
```

```
Access-Control-Allow-Origin: *
```

The `Access-Control-Allow-Origin` header only allows one domain or a wildcard (`*`). Take a look at our [advanced configuration](SSL%20and%20HTTPS.md#advanced-configuration) if you want to allow requests from multiple domains without using the insecure wildcard.

### Methods

[ackee-tracker](https://github.com/electerious/ackee-tracker) needs the permission to send GET, POST, PATCH and OPTIONS requests to the server.

```
Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS
```

### Headers

The `Access-Control-Allow-Headers` header is used in response to a preflight request to indicate which HTTP headers can be used when making the actual request.

```
Access-Control-Allow-Headers: Content-Type
```

### Credentials

The `Access-Control-Allow-Credentials` header tells the browser to include the `ackee_ignore` cookie in requests even when you're on a different (sub-)domain. This allows Ackee to ignore your own visits when the [`ignoreOwnVisits` option in ackee-tracker](https://github.com/electerious/ackee-tracker#-options) is enabled and when your browser doesn't block third-party cookies.

> ℹ️ Some browsers strictly block third-party cookies when Ackee runs on a different domain than the site you're visiting. Therefore, it may happen that your own visits still find their way into your statistics, even when the option `ignoreOwnVisits` is turned on.

```
Access-Control-Allow-Credentials: true
```

## Heroku or Platforms-As-A-Service configuration

If you are running Ackee on a platform which handles SSL for you, you may want a quick solution for setting CORS headers instead of using a [reverse proxy](SSL%20and%20HTTPS.md).

As an environment variable, you will need to set:

```
ACKEE_ALLOW_ORIGIN="https://example.com"
```

The proper header value for `Access-Control-Allow-Origin` will be set with the other headers being the recommended values.

It's also possible to allow requests from all domains (not recommended) or from multiple domains:

```
ACKEE_ALLOW_ORIGIN="*"
```

```
ACKEE_ALLOW_ORIGIN="https://example.com,https://example2.com"
```