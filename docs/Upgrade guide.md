# Upgrade guide

## Upgrading from version 2 to 3

### `Access-Control-Allow-Origin: "*"` not recommended

> This change is relevant for you when using a wildcard as the Access-Control-Allow-Origin.

Using a wildcard (`*`) for the `Access-Control-Allow-Origin` header was never recommended as it's neither a secure solution nor does it allow Ackee to ignore your own visits. Please disable the `ignoreOwnVisits` option in ackee-tracker if you're currently using a wildcard. The [SSL and HTTPS](docs/SSL%20and%20HTTPS.md) guide contains better alternatives.

`ignoreOwnVisits` is now enabled by default and won't work when using a wildcard.

### New `Access-Control-Allow-Credentials` header

> This change is relevant for everyone.

Ackee requires [a new `Access-Control-Allow-Credentials` header](docs/CORS%20headers.md#credentials) which was previously optional. Make sure to add this header in your server or reverse proxy configuration.

### ackee-tracker with new `.create` and `.record` syntax

> This change is only relevant for you when using ackee-tracker in the [Manually](https://github.com/electerious/ackee-tracker/blob/master/README.md#manually) or [Programmatic](https://github.com/electerious/ackee-tracker/blob/master/README.md#programmatic) way.

The [changelog of ackee-tracker](https://github.com/electerious/ackee-tracker/blob/master/CHANGELOG.md) contains everything you need to know when updating to the newest version.

### Referrers require `ReferrerType` in GraphQL API

> This change is relevant for you when using the GraphQL API.

A new parameter is required when requesting referrers via the GraphQL API. The parameter is called `ReferrerType` and can be `WITH_SOURCE`, `NO_SOURCE` or `ONLY_SOURCE`.

### Referrers can return non URL ids via GraphQL API

> This change is relevant for you when using the GraphQL API.

The `id` of requested referrers was always a URL, but has been changed to a string. That's because [referrers can now include parameters](docs/Enhancing%20referrers.md) (e.g. `source` when using `ackee-tracker`).