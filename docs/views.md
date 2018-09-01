# Views

- [Get all views](#get-all-views)

## Get all views

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