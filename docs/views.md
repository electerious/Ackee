# Views

- [Get all views](#get-all-views)

## Get all views

Get the amount of visits per day for the last 14 days. Days without entries are omitted.

### Request

```
GET /domains/:domainId/views
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
	"type": "views",
	"data": [
		{
			"type": "view",
			"data": {
				"id": {
					"day": 3,
					"month": 10,
					"year": 2016
				},
				"count": 1
			}
		}
	]
}
```