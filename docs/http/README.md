# HTTP Files

This folder contains `.http` files for manually testing the Ackee GraphQL API. These files can be used with HTTP clients that support the `.http` file format, such as the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension for VS Code or IntelliJ IDEA's built-in HTTP client.

## Files

| File                     | Description                                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| `tokens.http`            | Login (create token) and logout (delete token)                                                      |
| `domains.http`           | Create, read, update, and delete domains                                                            |
| `records.http`           | Create and update tracking records                                                                  |
| `events.http`            | Create, read, update, and delete events                                                             |
| `actions.http`           | Create and update event actions                                                                     |
| `permanent-tokens.http`  | Create, read, update, and delete permanent tokens                                                   |
| `facts.http`             | Fetch domain facts (active visitors, views, durations)                                              |
| `domain-statistics.http` | Domain statistics: browsers, devices, durations, languages, pages, referrers, sizes, systems, views |
| `event-statistics.http`  | Event statistics: chart and list                                                                    |

## Usage

1. Start by running the `createToken` request in `tokens.http` to obtain an access token.
2. When prompted for `accessToken`, enter the token `id` from the login response.
3. Use the token for all authenticated requests.

Requests that create tracking data (`records.http`, `actions.http`) do not require authentication, as they represent client-side tracking calls.
