# Countries

- [Top countries](#top-countries)
- [Recent countries](#recent-countries)

## Top countries

Get the top 30 user countries ([ISO 3166-1 alpha-2 codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

### Request

```
GET /domains/:domainId/countries?sorting=top
GET /domains/:domainId/countries?sorting=top&range=daily
GET /domains/:domainId/countries?sorting=top&range=weekly
GET /domains/:domainId/countries?sorting=top&range=monthly
GET /domains/:domainId/countries?sorting=top&range=allTime
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
	"type": "countries",
	"data": [
		{
			"type": "country",
			"data": {
				"id": "DE",
				"count": 1
			}
		}
	]
}
```

## Recent countries

Get the 30 most recent user countries [ISO 3166-1 alpha-2 codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

### Request

```
GET /domains/:domainId/countries?sorting=recent
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
	"type": "countries",
	"data": [
		{
			"type": "country",
			"data": {
				"id": "DE",
				"created": "2019-09-19T15:54:00.020Z"
			}
		}
	]
}
```