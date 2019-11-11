# Views

- [Get unique site views](#get-unique-site-views)
- [Get total page views](#get-total-page-views)

## Get unique site views

Get the unique amount of visits per day for the last 14 days. Days without entries are omitted. A user is unique when he visits a site for the first time a day.

### Request

```
GET /domains/:domainId/views?type=unique
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

## Get total page views

Get the total amount of visits per day for the last 14 days. Days without entries are omitted.

### Request

```
GET /domains/:domainId/views?type=total
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