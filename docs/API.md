# API

Ackee features a GraphQL API that allows you to build custom tools upon Ackee. Everything you see in the UI is made from data delivered by the API.

Here are a few resources to help you get started with GraphQL:

- https://graphql.org/learn/
- https://www.howtographql.com

## Playground

GraphQL Playground is a graphical, interactive, in-browser GraphQL IDE. It allows you to play and experiment with the API of Ackee.

Simply run Ackee with `NODE_ENV` set to `development` and visit the `/graphql` playground in your browser. You can do so by adding `NODE_ENV=development` to the environment of your `docker-compose.yml` or by using `yarn start:dev`. Only use this mode on your local machine as Ackee runs slower when in development mode.

Try the [🔮 live playground](https://demo.ackee.electerious.com/graphql) of the Ackee demo.

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

The token is valid for one day and will be renewed on every request made with it. You can modify the TTL (time to live) in [the options](Options.md#ttl).

### Use token

Protected queries and mutations need to include the `Authorization` HTTP header. Replace `tokenId` with the token `id` from the previous step.

```json
{
  "Authorization": "Bearer tokenId"
}
```

## Queries

Queries are used to receive data. Here are a few examples:

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
			referrers(sorting: TOP) {
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

## Mutations

Mutations are used to add, update or delete data. Here are a few examples:

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