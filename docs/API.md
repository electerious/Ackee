# API

Ackee features a GraphQL API that allows you to build custom tools upon Ackee. Everything you see in the UI is made from data delivered by the API.

Here are a few resources to help you get started with GraphQL:

- https://graphql.org/learn/
- https://www.howtographql.com

## Playground

GraphQL Playground is a graphical, interactive, in-browser GraphQL IDE. It allows you to play and experiment with the API of Ackee.

Simply run Ackee with `NODE_ENV` set to `development` and visit the `/api` playground in your browser. You can do so by adding `NODE_ENV=development` to the environment of your `docker-compose.yml` or by using `yarn start:dev`. Only use this mode on your local machine as Ackee runs slower when in development mode.

Try the [🔮 live playground](https://demo.ackee.electerious.com/api) of the Ackee demo.

## Authentication

Modifying domains or receiving aggregated data is only possible once you're authenticated. Only the creation of new data is possible without a token.

### Creating a token

The following mutation returns a new token `id` that should be used for authentication. This is what happens in the UI when you submit your username and password.

```graphql
mutation createToken($input: CreateTokenInput!) {
	createToken(input: $input) {
		payload {
			id
		}
	}
}
```

```json
{
  "input": {
    "username": "admin",
    "password": "123456"
  }
}
```

The token is valid for one day and will be renewed on every request made with it. You can modify the TTL (time to live) in [the options](Options.md#ttl). [Create a permanent token]() if you need a token that doesn't expire.

### Use a token

Protected queries and mutations need to include the `Authorization` HTTP header. Replace `tokenId` with the token `id` from the previous step.

```json
{
  "Authorization": "Bearer tokenId"
}
```

### Creating a permanent token

Permanent tokens don't expire and are perfect for tools that run periodically in the background. In this case you want a token that is always valid so you don't have to enter your credentials over and over again.

You can create permanent tokens in the settings of Ackee or via the API. Creating a permanent token requires a valid [Authorization header](#use-a-token). This means that you can only create permanent tokens with a valid (non-permanent) token.

```graphql
mutation createPermanentToken($input: CreatePermanentTokenInput!) {
	createPermanentToken(input: $input) {
		payload {
			id
		}
	}
}
```

```json
{
  "input": {
    "title": "iOS widget"
  }
}
```

### Use a permanent token

Using a permanent token is the same as [using a (non-permanent) token](#use-a-token).

## Time Zone

It's sometimes necessary to know the time zone of the user to accurately group stats by day, month or year. We therefore recommend to include a `Time-Zone` header when requesting data. The time zone should be formatted as a [tz database time zone string](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

The time zone of the server will be used as a fallback.

```json
{
  "Time-Zone": "Europe/Berlin"
}
```

## Queries

Queries are used to receive data. Here are a few examples.

- [Get all domains](#Get%20all%20domains)
- [Get a specific domain](#Get%20a%20specific%20domain)
- [Get facts of domains](#Get%20facts%20of%20domains)
- [Get statistics of domains](#Get%20statistics%20of%20domains)
- [Get events](#Get%20events)

### Get all domains

```graphql
query getDomains {
	domains {
		id
		title
	}
}
```

### Get a specific domain

```graphql
query getDomain($id: ID!) {
	domain(id: $id) {
		id
		title
	}
}
```

```json
{
  "id": "3b8bc3ed-cdcb-492a-bc6d-8d5b2746da0e"
}
```

### Get facts of domains

```graphql
query getDomainsFacts {
	domains {
		facts {
			activeVisitors
			averageViews
			averageDuration
			viewsToday
			viewsMonth
			viewsYear
		}
	}
}
```

### Get statistics of domains

```graphql
query getDomainsStatistics {
	domains {
		statistics {
			durations(interval: DAILY) {
				id
				count
			}
			views(interval: YEARLY, type: UNIQUE) {
				id
				count
			}
			languages(sorting: TOP) {
				id
				count
				created
			}
			browsers(sorting: TOP, type: WITH_VERSION) {
				id
				count
				created
			}
			devices(sorting: TOP, type: WITH_MODEL) {
				id
				count
				created
			}
			pages(sorting: TOP) {
				id
				count
				created
			}
			referrers(sorting: TOP, type: WITH_SOURCE) {
				id
				count
				created
			}
			sizes(sorting: TOP, type: SCREEN_RESOLUTION) {
				id
				count
				created
			}
			systems(sorting: TOP, type: NO_VERSION) {
				id
				count
				created
			}
		}
	}
}
```

### Get events

```graphql
query getEvents {
	events {
		id
		title
		statistics {
			chart(interval: DAILY, type: TOTAL) {
				id
				count
			}
			list(sorting: TOP, type: TOTAL) {
				id
				count
			}
		}
	}
}
```

## Mutations

Mutations are used to add, update or delete data. Here are a few examples.

- [Create a domain](#Create%20a%20domain)
- [Delete a domain](#Delete%20a%20domain)
- [Create a record](#Create%20a%20record)
- [Create an event](#Create%20an%20event)
- [Create an action](#Create%20an%20action)
- [Update an action](#Update%20an%20action)

### Create a domain

```graphql
mutation createDomain($input: CreateDomainInput!) {
	createDomain(input: $input) {
		payload {
			id
			title
		}
	}
}
```

```json
{
  "input": {
    "title": "Domain Title"
  }
}
```

### Delete a domain

```graphql
mutation deleteDomain($id: ID!) {
	deleteDomain(id: $id) {
		success
	}
}
```

```json
{
  "id": "3b8bc3ed-cdcb-492a-bc6d-8d5b2746da0e"
}
```

### Create a record

```graphql
mutation createRecord($domainId: ID!, $input: CreateRecordInput!) {
	createRecord(domainId: $domainId, input: $input) {
		payload {
			id
		}
	}
}
```

```json
{
  "domainId": "3b8bc3ed-cdcb-492a-bc6d-8d5b2746da0e",
  "input": {
    "siteLocation": "https://example.com"
  }
}
```

### Create an event

```graphql
mutation createEvent($input: CreateEventInput!) {
	createEvent(input: $input) {
		payload {
			id
			title
		}
	}
}
```

```json
{
  "input": {
    "title": "Event Title",
    "type": "TOTAL_CHART"
  }
}
```

### Create an action

```graphql
mutation createAction($eventId: ID!, $input: CreateActionInput!) {
	createAction(eventId: $eventId, input: $input) {
		payload {
			id
		}
	}
}
```

```json
{
  "eventId": "c8865d94-9077-420f-86a0-32545bcbf61b",
  "input": {
    "key": "Action Key",
    "value": 1
  }
}
```

### Update an action

```graphql
mutation updateAction($id: ID!, $input: UpdateActionInput!) {
	updateAction(id: $id, input: $input) {
		payload {
			id
		}
	}
}
```

```json
{
  "id": "34df5a09-498f-45c1-822c-6b1f80de5f8c",
  "input": {
    "key": "Action Key",
    "value": null
  }
}
```
