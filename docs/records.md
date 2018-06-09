# Records

- [Add a record](#add-a-record)
- [Update a record](#update-a-record)

## Add a record

### Request

```
POST /domains/:domainId/records
```

```json
{
	"siteLocation": "https://example.com/index.html",
	"siteReferrer": "https://example.com/referrer.html",
	"siteTitle": "Example",
	"siteLanguage": "en",
	"screenWidth": 2560,
	"screenHeight": 1440,
	"screenColorDepth": 32,
	"deviceName": "iPad",
	"deviceManufacturer": "Apple",
	"osName": "iOS",
	"osVersion": "9.0.1",
	"browserName": "Safari",
	"browserVersion": "9.0.1",
	"browserWidth": 1000,
	"browserHeight": 900
}
```

### Headers

| Name | Example |
|:-----------|:------------|
| Authorization | `Authorization: Bearer :tokenId` |

### Parameters

| Name | Type | Description |
|:-----------|:------------|:------------|
| siteLocation | String | URL of the site. |
| siteReferrer | String | URL of the document that loaded the current document. |
| siteTitle | String | Title of the site. |
| siteLanguage | String | Language version of the browser. |
| screenWidth | Number | The width of the screen in pixels. |
| screenHeight | Number | The height of the screen in pixels. |
| screenColorDepth | Number | The bit depth of the color palette for displaying images (in bits per pixel). |
| deviceName | String | The name of the product hosting the browser. |
| deviceManufacturer | String | The name of the product's manufacturer. |
| osName | String |  The family of the OS. |
| osVersion | String | The version of the OS. |
| browserName | String | The name of the browser/environment. |
| browserVersion | String | The browser/environment version. |
| browserWidth | Number | The width of the screen in pixels. |
| browserHeight | Number | The height of the screen in pixels. |

### Response

```
Status: 201 Created
Location: /domains/:domainId/records/:recordId
```

```json
{
	"type": "record",
	"data": {
		"id": ":recordId",
		"siteLocation": "https://example.com/index.html",
		"siteReferrer": "https://example.com/referrer.html",
		"siteTitle": "Example",
		"siteLanguage": "en",
		"screenWidth": 2560,
		"screenHeight": 1440,
		"screenColorDepth": 32,
		"deviceName": "iPad",
		"deviceManufacturer": "Apple",
		"osName": "iOS",
		"osVersion": "9.0.1",
		"browserName": "Safari",
		"browserVersion": "9.0.1",
		"browserWidth": 1000,
		"browserHeight": 900,
		"created": "1475491394341",
		"updated": "1475491394341"
	}
}
```

## Update a record

It's not possible to update attributes of a record. An record PATCH will only update `updated`.

### Request

```
PATCH /domains/:domainId/records/:recordId
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
	"type": "record",
	"data": {
		"id": ":recordId",
		"siteLocation": "https://example.com/index.html",
		"siteReferrer": "https://example.com/referrer.html",
		"siteTitle": "Example",
		"siteLanguage": "en",
		"screenWidth": 2560,
		"screenHeight": 1440,
		"screenColorDepth": 32,
		"deviceName": "iPad",
		"deviceManufacturer": "Apple",
		"osName": "iOS",
		"osVersion": "9.0.1",
		"browserName": "Safari",
		"browserVersion": "9.0.1",
		"browserWidth": 1000,
		"browserHeight": 900,
		"created": "1475491394341",
		"updated": "1475491394341"
	}
}
```