# UI

- [Index](#index)
- [Favicon](#favicon)
- [Styles](#styles)
- [Scripts](#scripts)
- [Tracker](#tracker)

## Index

HTML used to display the UI of Ackee.

### Request

```
GET /
GET /index.html
```

### Response

```
Status: 200 OK
```

```html
<!doctype html>
<html lang="en">
	<head>

		<title>Ackee</title>
		…
```

## Favicon

Favicon of Ackee.

### Request

```
GET /favicon.ico
```

### Response

```
Status: 200 OK
```

## Styles

CSS used to display the UI of Ackee.

### Request

```
GET /index.css
```

### Response

```
Status: 200 OK
```

```css
/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;…
```

## Scripts

JS used to display the UI of Ackee.

### Request

```
GET /index.js
```

### Response

```
Status: 200 OK
```

```js
!function(){return function e(t,n,r){function o(i,u){if(!n[i]){if(!t[i]){var l…
```

## Tracker

Tracking script that should be added to the sites you want to track. Equal to [ackee-tracker](https://github.com/electerious/ackee-tracker).

### Request

```
GET /tracker.js
```

### Response

```
Status: 200 OK
```

```js
!function(){return function e(t,n,r){function o(i,u){if(!n[i]){if(!t[i]){var l…
```