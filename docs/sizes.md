# Sizes

- [Get browser widths](#get-browser-widths)
- [Get browser heights](#get-browser-heights)
- [Get screen widths](#get-screen-widths)
- [Get screen heights](#get-screen-heights)

## Get browser widths

Get the top 30 browser widths.

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

## Get browser heights

Get the top 30 browser heights.

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

## Get screen widths

Get the top 30 screen widths.

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

## Get screen heights

Get the top 30 screen heights.

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