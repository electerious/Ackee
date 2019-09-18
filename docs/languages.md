# Languages

- [Get top languages](#get-top-languages)
- [Get recent languages](#get-recent-languages)

## Get top languages

Get the top 25 user languages ([ISO-639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)) of the last 7 days.

### Request

```
GET /domains/:domainId/languages?sorting=top
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

Get the 25 most recent user languages ([ISO-639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)).

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
				"id": "de"
			}
		}
	]
}
```