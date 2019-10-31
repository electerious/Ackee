# CORS headers

Ackee requires correct [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). [ackee-tracker](https://github.com/electerious/ackee-tracker) (the script that sends data from your sites to Ackee) won't be able to contact your server when the CORS headers aren't available or when they are configured incorrectly.

## Why?

When a site wants to send data to a different domain it needs the permissions to do so. Browsers use an OPTIONS request (preflight request) that checks to see if the CORS protocol is understood.

## Recommended configuration

```
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### Origin

Your server needs to allow requests from your sites (recommended) or from all sites (easier to implement, but insecure).

```
Access-Control-Allow-Origin: https://example.com
```

```
Access-Control-Allow-Origin: *
```

The `Access-Control-Allow-Origin` header only allows one domain or a wildcard (`*`). Take a look at our [advanced configuration](./SSL%20and%20HTTPS.md#advanced-configuration) if you want to allow requests from multiple domains without using the insecure wildcard.

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