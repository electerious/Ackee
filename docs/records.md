# Records

- [Add a record](#add-a-record)
- [Update a record](#update-a-record)

## Add a record

Ackee uses the IP and user-agent to identify a user. A new record with an existing identification will remove all data from previous records, even when the new record contains less information than the previous record.

### Request

```
POST /domains/:domainId/records
```

```json
{
	"siteLocation": "https://example.com/index.html",
	"siteReferrer": "https://example.com/referrer.html",
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

| Name | Type | Required | Description |
|:-----------|:------------|:------------|:------------|
| siteLocation | String | true | URL of the site. |
| siteReferrer | String | false | URL of the document that loaded the current document. |
| siteLanguage | String | false | Language version of the browser. |
| screenWidth | Number | false | The width of the screen in pixels. |
| screenHeight | Number | false | The height of the screen in pixels. |
| screenColorDepth | Number | false | The bit depth of the color palette for displaying images (in bits per pixel). |
| deviceName | String | false | The name of the product hosting the browser. |
| deviceManufacturer | String | false | The name of the product's manufacturer. |
| osName | String | false | The family of the OS. |
| osVersion | String | false | The version of the OS. |
| browserName | String | false | The name of the browser/environment. |
| browserVersion | String | false | The browser/environment version. |
| browserWidth | Number | false | The width of the screen in pixels. |
| browserHeight | Number | false | The height of the screen in pixels. |

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
		"domainId": ":domainId",
		"siteLocation": "https://example.com/index.html",
		"siteReferrer": "https://example.com/referrer.html",
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

It's not possible to update attributes of a record. An record PATCH will only update `updated`, which is used to determine the time a user spent on a page.

The response might contain less data than initially added to the record. That's the case when a record has been anonymized, after a new record with an existing user identification has been added.

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
		"domainId": ":domainId",
		"siteLocation": "https://example.com/index.html",
		"siteReferrer": "https://example.com/referrer.html",
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