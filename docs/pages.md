# Pages

- [Get top pages](#get-top-pages)
- [Get recent pages](#get-recent-pages)

## Get top pages

Get the top 30 pages.

### Request

```
GET /domains/:domainId/pages?sorting=top
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
	"type": "pages",
	"data": [
		{
			"type": "page",
			"data": {
				"id": "https://example.com/",
				"count": 1
			}
		}
	]
}
```

## Get recent pages

Get the 30 most recent page views.

### Request

```
GET /domains/:domainId/pages?sorting=recent
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
	"type": "pages",
	"data": [
		{
			"type": "page",
			"data": {
				"id": "https://example.com/",
				"created": "2019-09-19T15:54:00.020Z"
			}
		}
	]
}
```