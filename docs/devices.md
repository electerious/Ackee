# Devices

- [Get top devices without model](#get-top-devices-without-model)
- [Get top devices with model](#get-top-devices-with-model)
- [Get recent devices without model](#get-recent-devices-without-model)
- [Get recent devices with model](#get-recent-devices-with-model)

## Get top devices without model

Get the top 30 devices without the model.

### Request

```
GET /domains/:domainId/devices?sorting=top&type=noModel
GET /domains/:domainId/devices?sorting=top&type=noModel&range=weekly
GET /domains/:domainId/devices?sorting=top&type=noModel&range=monthly
GET /domains/:domainId/devices?sorting=top&type=noModel&range=allTime
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
	"type": "devices",
	"data": [
		{
			"type": "device",
			"data": {
				"id": "Apple",
				"count": 1
			}
		}
	]
}
```

## Get top devices with model

Get the top 30 devices with the model.

### Request

```
GET /domains/:domainId/devices?sorting=top&type=withModel
GET /domains/:domainId/devices?sorting=top&type=withModel&range=weekly
GET /domains/:domainId/devices?sorting=top&type=withModel&range=monthly
GET /domains/:domainId/devices?sorting=top&type=withModel&range=allTime
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
	"type": "devices",
	"data": [
		{
			"type": "device",
			"data": {
				"id": {
					"deviceManufacturer": "Apple",
					"deviceName": "iPad"
				},
				"count": 1
			}
		}
	]
}
```

## Get recent devices without model

Get the 30 most recent devices without the model.

### Request

```
GET /domains/:domainId/devices?sorting=recent&type=noModel
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
	"type": "devices",
	"data": [
		{
			"type": "device",
			"data": {
				"id": "Apple",
				"created": "2019-09-19T15:54:00.020Z"
			}
		}
	]
}
```

## Get recent devices with model

Get the 30 most recent devices with the model.

### Request

```
GET /domains/:domainId/devices?sorting=recent&type=withModel
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
	"type": "devices",
	"data": [
		{
			"type": "device",
			"data": {
				"id": {
					"deviceManufacturer": "Apple",
					"deviceName": "iPad"
				},
				"created": "2019-09-19T15:54:00.020Z"
			}
		}
	]
}
```