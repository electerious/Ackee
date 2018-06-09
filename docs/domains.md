# Domains

- [Get all domains](#get-all-domains)
- [Add a domain](#add-a-domain)
- [Update a domain](#update-a-domain)
- [Delete a domain](#delete-a-domain)

## Get all domains

### Request

```
GET /domains
```

### Headers

| Name | Example |
|:-----------|:------------|
| Authorization | `Authorization: Bearer :tokenId` |

### Response

```
Status: 200 OK
```

```json
{
	"type": "domains",
	"data": [
		{
			"type": "domain",
			"data": {
				"id": ":domainId",
				"title": "Example",
				"pattern": "^https:\/\/example\.com",
				"created": "1475491394341",
				"updated": "1475491394341"
			}
		}
	]
}
```

## Add a domain

### Request

```
POST /domains
```

```json
{
	"title": "Example",
	"pattern": "^https:\/\/example\.com"
}
```

### Headers

| Name | Example |
|:-----------|:------------|
| Authorization | `Authorization: Bearer :tokenId` |

### Parameters

| Name | Type | Description |
|:-----------|:------------|:------------|
| title | String | Title of the domain. |
| pattern | String | JavaScript pattern that matches with your targeted domain. |

### Response

```
Status: 201 Created
Location: /domains/:domainId
```

```json
{
	"type": "domain",
	"data": {
		"id": ":domainId",
		"title": "Example",
		"pattern": "^https:\/\/example\.com",
		"created": "1475491394341",
		"updated": "1475491394341"
	}
}
```

## Update a domain

### Request

```
PATCH /domains/:domainId
```

```json
{
	"title": "Example",
	"pattern": "^https:\/\/example\.com"
}
```

### Headers

| Name | Example |
|:-----------|:------------|
| Authorization | `Authorization: Bearer :tokenId` |

### Parameters

| Name | Type | Description |
|:-----------|:------------|:------------|
| title | String | Title of the domain. |
| pattern | String | JavaScript pattern that matches with your targeted domain. |

### Response

```
Status: 200 OK
```

```json
{
	"type": "domain",
	"data": {
		"id": ":domainId",
		"title": "Example",
		"pattern": "^https:\/\/example\.com",
		"created": "1475491394341",
		"updated": "1475491394341"
	}
}
```

## Delete a domain

### Request

```
DELETE /domains/:domainId
```

### Headers

| Name | Example |
|:-----------|:------------|
| Authorization | `Authorization: Bearer :tokenId` |

### Response

```
Status: 204 No Content
```