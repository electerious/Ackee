# Sizes

- [Get browser resolutions](#get-browser-resolutions)
- [Get browser widths](#get-browser-widths)
- [Get browser heights](#get-browser-heights)
- [Get screen resolutions](#get-screen-resolutions)
- [Get screen widths](#get-screen-widths)
- [Get screen heights](#get-screen-heights)

## Get browser resolutions

Get the top 30 browser resolutions.

### Request

```
GET /domains/:domainId/sizes?type=browser_resolution
GET /domains/:domainId/sizes?type=browser_resolution&range=weekly
GET /domains/:domainId/sizes?type=browser_resolution&range=monthly
GET /domains/:domainId/sizes?type=browser_resolution&range=allTime
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
	"type": "sizes",
	"data": [
		{
			"type": "size",
			"data": {
				"id": {
					"browserWidth": "1920",
					"browserHeight": "1080"
				},
				"count": 1
			}
		}
	]
}
```

## Get browser widths

Get the top 30 browser widths.

### Request

```
GET /domains/:domainId/sizes?type=browser_width
GET /domains/:domainId/sizes?type=browser_width&range=weekly
GET /domains/:domainId/sizes?type=browser_width&range=monthly
GET /domains/:domainId/sizes?type=browser_width&range=allTime
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
	"type": "sizes",
	"data": [
		{
			"type": "size",
			"data": {
				"id": "1920",
				"count": 1
			}
		}
	]
}
```

## Get browser heights

Get the top 30 browser heights.

### Request

```
GET /domains/:domainId/sizes?type=browser_height
GET /domains/:domainId/sizes?type=browser_height&range=weekly
GET /domains/:domainId/sizes?type=browser_height&range=monthly
GET /domains/:domainId/sizes?type=browser_height&range=allTime
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
	"type": "sizes",
	"data": [
		{
			"type": "size",
			"data": {
				"id": "1080",
				"count": 1
			}
		}
	]
}
```

## Get screen resolutions

Get the top 30 screen resolutions.

### Request

```
GET /domains/:domainId/sizes?type=screen_resolution
GET /domains/:domainId/sizes?type=screen_resolution&range=weekly
GET /domains/:domainId/sizes?type=screen_resolution&range=monthly
GET /domains/:domainId/sizes?type=screen_resolution&range=allTime
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
	"type": "sizes",
	"data": [
		{
			"type": "size",
			"data": {
				"id": {
					"screenWidth": "1920",
					"screenHeight": "1080"
				},
				"count": 1
			}
		}
	]
}
```

## Get screen widths

Get the top 30 screen widths.

### Request

```
GET /domains/:domainId/sizes?type=screen_width
GET /domains/:domainId/sizes?type=screen_width&range=weekly
GET /domains/:domainId/sizes?type=screen_width&range=monthly
GET /domains/:domainId/sizes?type=screen_width&range=allTime
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
	"type": "sizes",
	"data": [
		{
			"type": "size",
			"data": {
				"id": "1920",
				"count": 1
			}
		}
	]
}
```

## Get screen heights

Get the top 30 screen heights.

### Request

```
GET /domains/:domainId/sizes?type=height
GET /domains/:domainId/sizes?type=height&range=weekly
GET /domains/:domainId/sizes?type=height&range=monthly
GET /domains/:domainId/sizes?type=height&range=allTime
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
	"type": "sizes",
	"data": [
		{
			"type": "size",
			"data": {
				"id": "1080",
				"count": 1
			}
		}
	]
}
```