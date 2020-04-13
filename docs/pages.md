# Pages

- [Top pages](#top-pages)
- [Recent pages](#recent-pages)

## Top pages

Get the top 30 pages.

### Request

```
GET /domains/:domainId/pages?sorting=top
GET /domains/:domainId/pages?sorting=top&range=daily
GET /domains/:domainId/pages?sorting=top&range=weekly
GET /domains/:domainId/pages?sorting=top&range=monthly
GET /domains/:domainId/pages?sorting=top&range=allTime
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

## Recent pages

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