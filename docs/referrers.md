# Referrers

- [Get top referrers](#get-top-referrers)
- [Get recent referrers](#get-recent-referrers)

## Get top referrers

Get the top 25 referrers of the last 7 days.

### Request

```
GET /domains/:domainId/referrers?sorting=top
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
	"type": "referrers",
	"data": [
		{
			"type": "referrer",
			"data": {
				"id": "https://www.example.com/",
				"count": 1
			}
		}
	]
}
```

## Get recent referrers

Get the 25 most recent referrers.

### Request

```
GET /domains/:domainId/referrers?sorting=recent
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
	"type": "referrers",
	"data": [
		{
			"type": "referrer",
			"data": {
				"id": "https://www.example.com/",
				"created": "2019-09-19T15:54:00.020Z"
			}
		}
	]
}
```