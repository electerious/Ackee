# Tokens

- [Create a token](#create-a-token)
- [Delete a token](#delete-a-token)

## Create a token

A token stays valid for as long as specified in the [TTL option](../README.md#ttl). Using a token will reset the timeout.

### Request

```
POST /tokens
```

```json
{
	"username": "username",
	"password": "password"
}
```

### Parameters

| Name | Type | Description |
|:-----------|:------------|:------------|
| username | String | [Username of Ackee](../README.md#username-and-password). |
| password | String | [Password of Ackee](../README.md#username-and-password). |

### Response

```
Status: 201 Created
Location: /tokens/:tokenId
```

```json
{
	"type": "token",
	"data": {
		"id": ":tokenId",
		"created": "1526999812",
		"updated": "1526999812"
	}
}
```

## Delete a token

### Request

```
DELETE /tokens/:tokenId
```

### Response

```
Status: 204 No Content
```