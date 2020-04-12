# Browsers

- [Get top browsers without version](#get-top-browsers-without-version)
- [Get top browsers with version](#get-top-browsers-with-version)
- [Get recent browsers without version](#get-recent-browsers-without-version)
- [Get recent browsers with version](#get-recent-browsers-with-version)

## Get top browsers without version

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

## Get top browsers with version

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

## Get recent browsers without version

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

## Get recent browsers with version

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