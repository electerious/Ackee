# Durations

- [Average durations](#average-durations)
- [Detailed durations](#detailed-durations)

## Average durations

Get the average time users spend on your site per day for the last 14 days. Days without entries are omitted.

### Request

```
GET /domains/:domainId/durations?type=average
GET /domains/:domainId/durations?type=average&interval=daily
GET /domains/:domainId/durations?type=average&interval=monthly
GET /domains/:domainId/durations?type=average&interval=yearly
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
	"type": "durations",
	"data": [
		{
			"type": "duration",
			"data": {
				"id": {
					"day": 3,
					"month": 10,
					"year": 2016
				},
				"average": 20000
			}
		}
	]
}
```

## Detailed durations

Get the time users spend on your sites, grouped by similar durations in an interval of 15s. Includes data from the last 7 days. Durations above 30m will be grouped together.

The included average is the average time users spend on your site for the last 7 days. Every item includes the same average.

### Request

```
GET /domains/:domainId/durations?type=detailed
GET /domains/:domainId/durations?sorting=top&range=daily
GET /domains/:domainId/durations?sorting=top&range=weekly
GET /domains/:domainId/durations?sorting=top&range=monthly
GET /domains/:domainId/durations?sorting=top&range=allTime
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
	"type": "durations",
	"data": [
		{
			"type": "duration",
			"data": {
				"id": 20000,
				"average": 20000,
				"count": 1
			}
		}
	]
}
```