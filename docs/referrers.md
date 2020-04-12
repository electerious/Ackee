# Referrers

- [Get top referrers](#get-top-referrers)
- [Get new referrers](#get-new-referrers)
- [Get recent referrers](#get-recent-referrers)

## Get top referrers

Get the top 30 referrers.

### Request

```
GET /domains/:domainId/referrers?sorting=top
GET /domains/:domainId/referrers?sorting=top&range=weekly
GET /domains/:domainId/referrers?sorting=top&range=monthly
GET /domains/:domainId/referrers?sorting=top&range=allTime
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

## Get new referrers

Get the 30 most recent referrers who have linked to your site for the first time.

### Request

```
GET /domains/:domainId/referrers?sorting=new
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
				"count": 1,
				"created": "2019-09-19T15:54:00.020Z"
			}
		}
	]
}
```

## Get recent referrers

Get the 30 most recent referrers.

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