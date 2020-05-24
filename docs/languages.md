# Languages

- [Top languages](#top-languages)
- [Recent languages](#recent-languages)

## Top languages

Get the top 30 user languages ([ISO-639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)).

### Request

```
GET /domains/:domainId/languages?sorting=top
GET /domains/:domainId/languages?sorting=top&range=daily
GET /domains/:domainId/languages?sorting=top&range=weekly
GET /domains/:domainId/languages?sorting=top&range=monthly
GET /domains/:domainId/languages?sorting=top&range=allTime
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
				"id": {
					"siteLanguage": "de"
				},
				"count": 1
			}
		}
	]
}
```

## Recent languages

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
				"id": {
					"siteLanguage": "de"
				},
				"created": "2019-09-19T15:54:00.020Z"
			}
		}
	]
}
```