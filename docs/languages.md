# Languages

- [Get languages](#get-languages)

## Get languages

Get the top 25 user languages ([ISO-639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)) of the last 7 days.

### Request

```
GET /domains/:domainId/languages
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