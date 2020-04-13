# Systems

- [Top systems without version](#top-systems-without-version)
- [Top systems with version](#top-systems-with-version)
- [Recent systems without version](#recent-systems-without-version)
- [Recent systems with version](#recent-systems-with-version)

## Top systems without version

Get the top 30 systems without the version.

### Request

```
GET /domains/:domainId/systems?sorting=top&type=noVersion
GET /domains/:domainId/systems?sorting=top&type=noVersion&range=daily
GET /domains/:domainId/systems?sorting=top&type=noVersion&range=weekly
GET /domains/:domainId/systems?sorting=top&type=noVersion&range=monthly
GET /domains/:domainId/systems?sorting=top&type=noVersion&range=allTime
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
	"type": "systems",
	"data": [
		{
			"type": "system",
			"data": {
				"id": "Windows",
				"count": 1
			}
		}
	]
}
```

## Top systems with version

Get the top 30 systems with the version.

### Request

```
GET /domains/:domainId/systems?sorting=top&type=withVersion
GET /domains/:domainId/systems?sorting=top&type=withVersion&range=daily
GET /domains/:domainId/systems?sorting=top&type=withVersion&range=weekly
GET /domains/:domainId/systems?sorting=top&type=withVersion&range=monthly
GET /domains/:domainId/systems?sorting=top&type=withVersion&range=allTime
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
	"type": "systems",
	"data": [
		{
			"type": "system",
			"data": {
				"id": {
					"osName": "Windows",
					"osVersion": "7"
				},
				"count": 1
			}
		}
	]
}
```

## Recent systems without version

Get the 30 most recent systems without the version.

### Request

```
GET /domains/:domainId/systems?sorting=recent&type=noVersion
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
	"type": "systems",
	"data": [
		{
			"type": "system",
			"data": {
				"id": "Windows",
				"created": "2019-09-19T15:54:00.020Z"
			}
		}
	]
}
```

## Recent systems with version

Get the 30 most recent systems with the version.

### Request

```
GET /domains/:domainId/systems?sorting=recent&type=withVersion
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
	"type": "systems",
	"data": [
		{
			"type": "system",
			"data": {
				"id": {
					"osName": "Windows",
					"osVersion": "7"
				},
				"created": "2019-09-19T15:54:00.020Z"
			}
		}
	]
}
```