# Referrers

- [Get all referrers](#get-all-referrers)

## Get all referrers

Get the top 25 referrers of the last 7 days.

### Request

```
GET /domains/:domainId/referrers
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