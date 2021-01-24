# SSL and HTTPS

Ackee runs a simple server that doesn't support TSL/SSL. This means it's not possible to directly connect via HTTPS. It's recommended to use a reverse proxy instead. This document explains how.

## What is a reverse proxy?

> A reverse proxy is a type of proxy server that retrieves resources on behalf of a client from one or more servers. These resources are then returned to the client, appearing as if they originated from the proxy server itself.

A reverse proxy makes it easy for you to run Ackee on your server along with other services. It also allows you to secure connections using TLS/SSL.

I highly recommend [this article](https://medium.com/intrinsic/why-should-i-use-a-reverse-proxy-if-node-js-is-production-ready-5a079408b2ca) if you want to lean more about reverse proxies.

## Example configurations

### nginx

- [Recommended configuration](#recommended-configuration)
- [Single domain configuration](#single-domain-configuration)
- [Insecure wildcard configuration](#insecure-wildcard-configuration)

#### Recommended configuration

This configuration redirects all requests to the non-www domain `example.com`, secures connections using TSL/SSL and allows CORS requests from a list of known domains.

> 👉 The CORS headers are required so your sites can send data to Ackee, even when their domain is different to the one Ackee uses.

```conf
#
# Set "$cors_header" to avoid "if" inside location context
# https://www.nginx.com/resources/wiki/start/topics/depth/ifisevil/
# https://stackoverflow.com/questions/14499320/how-to-properly-setup-nginx-access-control-allow-origin-into-response-header-bas
#
map $http_origin $cors_header {
    default "";
    ~*^https://([^/]+\.)*(domainone|domaintwo)\.com$ $http_origin;
}

#
# Redirect all www to non-www
#
server {
    listen 80;
    listen 443 ssl;

    server_name www.example.com;

    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    return 301 https://example.com$request_uri;
}

#
# Redirect all non-encrypted to encrypted
#
server {
    listen 80;

    server_name example.com;

    return 301 https://example.com$request_uri;
}

#
# There we go
#
server {
    listen 443 ssl http2;

    server_name example.com;

    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    access_log /var/log/nginx/log/example.com.access.log main;
    error_log  /var/log/nginx/log/example.com.error.log;

    location / {
        add_header          Access-Control-Allow-Origin "$cors_header" always;
        add_header          Access-Control-Allow-Methods "GET, POST, PATCH, OPTIONS" always;
        add_header          Access-Control-Allow-Headers "Content-Type, Authorization, Time-Zone" always;
        add_header          Access-Control-Allow-Credentials "true" always;
        add_header          Strict-Transport-Security "max-age=31536000" always;
        add_header          X-Frame-Options deny;
        proxy_pass          http://localhost:3000;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_redirect      off;
        proxy_buffering     off;
        proxy_set_header    Host $host;
        proxy_set_header    X-Real-IP $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

#### Single domain configuration

This configuration secures all connections using TSL/SSL and allows `https://example.com` to send data to `https://ackee.example.com`.

> ℹ️ This configuration only allows requests from a single domain. Take a look at our [recommended configuration](#recommended-configuration) if you want to allow requests from multiple domains or use the [insecure wildcard configuration](#insecure-wildcard-configuration).

```conf
server {
    listen 443 ssl http2;

    server_name ackee.example.com;

    ssl_certificate     /etc/letsencrypt/live/ackee.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ackee.example.com/privkey.pem;

    access_log /var/log/nginx/log/ackee.example.com.access.log main;
    error_log  /var/log/nginx/log/ackee.example.com.error.log;

    location / {
        add_header          Access-Control-Allow-Origin "https://example.com" always;
        add_header          Access-Control-Allow-Methods "GET, POST, PATCH, OPTIONS" always;
        add_header          Access-Control-Allow-Headers "Content-Type, Authorization, Time-Zone" always;
        add_header          Access-Control-Allow-Credentials "true" always;
        add_header          Strict-Transport-Security "max-age=31536000" always;
        add_header          X-Frame-Options deny;
        proxy_pass          http://localhost:3000;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_redirect      off;
        proxy_buffering     off;
        proxy_set_header    Host $host;
        proxy_set_header    X-Real-IP $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

#### Insecure wildcard configuration

A wildcard (`*`) isn't recommended as it's neither a secure solution nor does it allow Ackee to ignore your own visits. Please disable the `ignoreOwnVisits` option in ackee-tracker if using a wildcard is the only option for you.

```conf
server {
    listen 443 ssl http2;

    server_name ackee.example.com;

    ssl_certificate     /etc/letsencrypt/live/ackee.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ackee.example.com/privkey.pem;

    access_log /var/log/nginx/log/ackee.example.com.access.log main;
    error_log  /var/log/nginx/log/ackee.example.com.error.log;

    location / {
        add_header          Access-Control-Allow-Origin "*" always;
        add_header          Access-Control-Allow-Methods "GET, POST, PATCH, OPTIONS" always;
        add_header          Access-Control-Allow-Headers "Content-Type, Authorization, Time-Zone" always;
        add_header          Strict-Transport-Security "max-age=31536000" always;
        add_header          X-Frame-Options deny;
        proxy_pass          http://localhost:3000;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_redirect      off;
        proxy_buffering     off;
        proxy_set_header    Host $host;
        proxy_set_header    X-Real-IP $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```