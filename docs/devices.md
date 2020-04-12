# Devices

- [Top devices without model](#top-devices-without-model)
- [Top devices with model](#top-devices-with-model)
- [Recent devices without model](#recent-devices-without-model)
- [Recent devices with model](#recent-devices-with-model)

## Top devices without model

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

## Top devices with model

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

## Recent devices without model

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

## Recent devices with model

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