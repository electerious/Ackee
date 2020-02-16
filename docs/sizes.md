# Sizes

- [Get browser width](#get-browser-width)
- [Get browser height](#get-browser-height)
- [Get screen width](#get-screen-width)
- [Get screen height](#get-screen-height)

## Get browser width

Get the top 25 browser widths of the last 7 days.

### Request

```
GET /domains/:domainId/sizes?type=browser_width
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

## Get browser height

Get the top 25 browser heights of the last 7 days.

### Request

```
GET /domains/:domainId/sizes?type=browser_height
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

## Get screen width

Get the top 25 screen widths of the last 7 days.

### Request

```
GET /domains/:domainId/sizes?type=screen_width
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

## Get screen height

Get the top 25 screen heights of the last 7 days.

### Request

```
GET /domains/:domainId/sizes?type=height
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