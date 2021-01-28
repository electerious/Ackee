# Events

With Events, you can track button clicks, newsletter subscriptions, followers and more.

## Privacy disclaimer

Ackee won't track personal information by default, but tracked events might either contain personal behavior patterns or data related to individual users. It's therefore recommended to ask the user for permission before tracking events.

## Usage

### Creating events

Create a new event in the settings of Ackee and you're ready to go. Ackee shows the id and a usage example when you click on an existing event. You can use the code to get started or by taking a look at the documentation of [ackee-tracker](https://github.com/electerious/ackee-tracker).

#### Event type

The event type specifies how Ackee will show the aggregated data in the UI. It can be changed at any time.

- **Chart with total sums**: Shows the aggregated data as a chart. Each day, month or year (depending on the chosen interval) includes the total sum of values.
- **Chart with average values**: Shows the aggregated data as a chart. Each day, month or year (depending on the chosen interval) includes the average value.
- **List with total sums**: Shows the aggregated data as a list. Each entry includes the total sum of values. Perfect when an event contains different actions (e.g. tracking choices).
- **List with average values**: Shows the aggregated data as a list. Each entry includes the average value. Perfect when an event contains different actions (e.g. tracking choices).

### Adding actions

An action should be added to an event whenever the user does what you want to track. It's similar to domains that get filled with records. You can add an action to an event [using the GraphQL API](API.md#Create%20an%20action) or using [ackee-tracker](https://github.com/electerious/ackee-tracker). An action creation can be triggered by anything that executes JS.

Setup:

```js
import * as ackeeTracker from 'ackee-tracker'

const instance = ackeeTracker.create('https://ackee.example.com')
```

Examples:

```js
document.querySelector('#newsletter').addEventListener('click', () => {
	instance.action('1b6e20cb-7c7d-48ca-8cb6-958a55d7a9e3', {
		key: 'Subscription',
		value: 1
	})
})
```

```js
document.querySelector('#buy').addEventListener('click', () => {
	instance.action('513a082c-2cd5-4939-b417-72da2fe1761d', {
		key: 'Checkout',
		value: parseFloat(document.querySelector('#price'))
	})
})
```

```js
setTimeout(() => {
	instance.action('b7e1e5c9-e0a5-470e-bba0-ad8a295a3cfc', {
		key: 'User on site for 5sec',
		value: 1
	})
}, 5000)
```

### Updating actions

It's possible to update existing actions (e.g. when the user cancels a multi-step process). Doing so requires the `actionId` which can be obtained by a callback in the `.action` function.

```js
let actionId

instance.action('1b6e20cb-7c7d-48ca-8cb6-958a55d7a9e3', {
	key: 'Subscription',
	value: 1
}, (_actionId) => {
	actionId = _actionId
})
```

You can then use the `actionId` to change both `key` and `value`. Even resetting an action value is possible by setting the value to `null`.

```js
instance.updateAction(actionId, {
	key: 'Subscription',
	value: null
})
```