# Views

- [Unique site views](#unique-site-views)
- [Total page views](#total-page-views)

## Unique site views

Get the unique amount of visits per day, month or year for the last 14 intervals. Entries without views are omitted. A user is unique when he visits a site for the first time a day.

### Request

```
GET /domains/:domainId/views?type=unique&interval=daily
GET /domains/:domainId/views?type=unique&interval=monthly
GET /domains/:domainId/views?type=unique&interval=yearly
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

## Total page views

Get the total amount of visits per day, month or year for the last 14 intervals. Entries without views are omitted.

### Request

```
GET /domains/:domainId/views?type=total&interval=daily
GET /domains/:domainId/views?type=total&interval=monthly
GET /domains/:domainId/views?type=total&interval=yearly
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