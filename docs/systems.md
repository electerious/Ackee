# Systems

- [Get top systems without version](#get-top-systems-without-version)
- [Get top systems with version](#get-top-systems-with-version)
- [Get recent systems without version](#get-recent-systems-without-version)
- [Get recent systems with version](#get-recent-systems-with-version)

## Get top systems without version

Get the top 30 systems without the version.

### Request

```
GET /domains/:domainId/systems?sorting=top&type=noVersion
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

## Get top systems with version

Get the top 30 systems with the version.

### Request

```
GET /domains/:domainId/systems?sorting=top&type=withVersion
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

## Get recent systems without version

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

## Get recent systems with version

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