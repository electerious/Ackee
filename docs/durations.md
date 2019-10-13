# Durations

- [Get average durations](#get-average-durations)
- [Get detailed durations](#get-detailed-durations)

## Get average durations

Get the average time users spend on your site per day for the last 14 days. Days without entries are omitted.

### Request

```
GET /domains/:domainId/durations?type=average
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

## Get detailed durations

Get the time users spend on your sites, grouped by similar durations in an interval of 15s. Includes data from the last 7 days. Durations above 30m will be grouped together.

The included average is the average time users spend on your site for the last 7 days. Each item includes the same average.

### Request

```
GET /domains/:domainId/durations?type=detailed
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