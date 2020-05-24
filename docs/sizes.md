# Sizes

- [Browser resolutions](#browser-resolutions)
- [Browser widths](#browser-widths)
- [Browser heights](#browser-heights)
- [Screen resolutions](#screen-resolutions)
- [Screen widths](#screen-widths)
- [Screen heights](#screen-heights)

## Browser resolutions

Get the top 30 browser resolutions.

### Request

```
GET /domains/:domainId/sizes?type=browser_resolution
GET /domains/:domainId/sizes?type=browser_resolution&range=daily
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

## Browser widths

Get the top 30 browser widths.

### Request

```
GET /domains/:domainId/sizes?type=browser_width
GET /domains/:domainId/sizes?type=browser_width&range=daily
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
				"id": {
					"browserWidth": "1920"
				},
				"count": 1
			}
		}
	]
}
```

## Browser heights

Get the top 30 browser heights.

### Request

```
GET /domains/:domainId/sizes?type=browser_height
GET /domains/:domainId/sizes?type=browser_height&range=daily
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
				"id": {
					"browserHeight": "1080"
				},
				"count": 1
			}
		}
	]
}
```

## Screen resolutions

Get the top 30 screen resolutions.

### Request

```
GET /domains/:domainId/sizes?type=screen_resolution
GET /domains/:domainId/sizes?type=screen_resolution&range=daily
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

## Screen widths

Get the top 30 screen widths.

### Request

```
GET /domains/:domainId/sizes?type=screen_width
GET /domains/:domainId/sizes?type=screen_width&range=daily
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
				"id": {
					"screenWidth": "1920"
				},
				"count": 1
			}
		}
	]
}
```

## Screen heights

Get the top 30 screen heights.

### Request

```
GET /domains/:domainId/sizes?type=height
GET /domains/:domainId/sizes?type=height&range=daily
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
				"id": {
					"screenHeight": "1080"
				},
				"count": 1
			}
		}
	]
}
```