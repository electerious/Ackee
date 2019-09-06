# Views

- [Get unique site views](#get-unique-site-views)
- [Get total page views](#get-total-page-views)
- [Get views per page](#get-views-per-page)

## Get unique site views

Get the unique amount of visits per day for the last 14 days. Days without entries are omitted. A user is unique when he visits a site for the first time a day.

### Request

```
GET /domains/:domainId/views?type=unique
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
	"type": "chart_views",
	"data": [
		{
			"type": "chart_view",
			"data": {
				"id": {
					"day": 3,
					"month": 10,
					"year": 2016
				},
				"count": 1
			}
		}
	]
}
```

## Get total page views

Get the total amount of visits per day for the last 14 days. Days without entries are omitted.

### Request

```
GET /domains/:domainId/views?type=total
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
	"type": "chart_views",
	"data": [
		{
			"type": "chart_view",
			"data": {
				"id": {
					"day": 3,
					"month": 10,
					"year": 2016
				},
				"count": 1
			}
		}
	]
}
```

## Get views per page

Get the top 25 pages with the most views.

### Request

```
GET /domains/:domainId/views?type=pages
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
	"type": "page_views",
	"data": [
		{
			"type": "page_view",
			"data": {
				"id": "https://www.example.com/",
				"count": 1
			}
		}
	]
}
```