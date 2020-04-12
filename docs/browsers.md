# Browsers

- [Top browsers without version](#top-browsers-without-version)
- [Top browsers with version](#top-browsers-with-version)
- [Recent browsers without version](#recent-browsers-without-version)
- [Recent browsers with version](#recent-browsers-with-version)

## Top browsers without version

Get the top 30 browsers without the version.

### Request

```
GET /domains/:domainId/browsers?sorting=top&type=noVersion
GET /domains/:domainId/browsers?sorting=top&type=noVersion&range=weekly
GET /domains/:domainId/browsers?sorting=top&type=noVersion&range=monthly
GET /domains/:domainId/browsers?sorting=top&type=noVersion&range=allTime
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
	"type": "browsers",
	"data": [
		{
			"type": "browser",
			"data": {
				"id": "Safari",
				"count": 1
			}
		}
	]
}
```

## Top browsers with version

Get the top 30 browsers with the version.

### Request

```
GET /domains/:domainId/browsers?sorting=top&type=withVersion
GET /domains/:domainId/browsers?sorting=top&type=withVersion&range=weekly
GET /domains/:domainId/browsers?sorting=top&type=withVersion&range=monthly
GET /domains/:domainId/browsers?sorting=top&type=withVersion&range=allTime
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
	"type": "browsers",
	"data": [
		{
			"type": "browser",
			"data": {
				"id": {
					"browserName": "Safari",
					"browserVersion": "5.1"
				},
				"count": 1
			}
		}
	]
}
```

## Recent browsers without version

Get the 30 most recent browsers without the version.

### Request

```
GET /domains/:domainId/browsers?sorting=recent&type=noVersion
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
	"type": "browsers",
	"data": [
		{
			"type": "browser",
			"data": {
				"id": "Safari",
				"created": "2019-09-19T15:54:00.020Z"
			}
		}
	]
}
```

## Recent browsers with version

Get the 30 most recent browsers with the version.

### Request

```
GET /domains/:domainId/browsers?sorting=recent&type=withVersion
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
	"type": "browsers",
	"data": [
		{
			"type": "browser",
			"data": {
				"id": {
					"browserName": "Safari",
					"browserVersion": "5.1"
				},
				"created": "2019-09-19T15:54:00.020Z"
			}
		}
	]
}
```