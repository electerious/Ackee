# Languages

- [Get top languages](#get-top-languages)
- [Get recent languages](#get-recent-languages)

## Get top languages

Get the top 30 user languages ([ISO-639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)).

### Request

```
GET /domains/:domainId/languages?sorting=top
GET /domains/:domainId/languages?sorting=top&range=weekly
GET /domains/:domainId/languages?sorting=top&range=monthly
GET /domains/:domainId/languages?sorting=top&range=unlimited
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
	"type": "languages",
	"data": [
		{
			"type": "language",
			"data": {
				"id": "de",
				"count": 1
			}
		}
	]
}
```

## Get recent languages

Get the 30 most recent user languages ([ISO-639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)).

### Request

```
GET /domains/:domainId/languages?sorting=recent
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
	"type": "languages",
	"data": [
		{
			"type": "language",
			"data": {
				"id": "de",
				"created": "2019-09-19T15:54:00.020Z"
			}
		}
	]
}
```