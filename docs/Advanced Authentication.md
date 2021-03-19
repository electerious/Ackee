# Advanced Authentication

If you don't want to use the internal authentication method (username & password), you must leave the username **and** password blank.

When you do so, the authentication is disabled completely, but no tokens can be generated!

## Integrate custom authenticator
You need to protect all ackee routes except `/api`, which is the GraphQL endpoint for the tracker and must be accessible for everyone to work properly