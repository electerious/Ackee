# FAQ

- [Features](#features)
- [Configuration](#configuration)
- [Comparison](#comparison)
- [Definitions](#definitions)

## Features

### Can I import my nginx logs?

Ackee uses a JS snippet to aggregate data. Nginx logs won't work, but it might be possible to use the API of Ackee to build a custom import script.

### Does Ackee support multiple user-accounts?

Ackee only works with one user and it's not planned to add support for multiple user-accounts. Ackee is however lightweight enough to create one Ackee instance per user. All instances can be connected to the same MongoDB.

## Configuration

### How to reset my password?

You can change the [username and password environment variables](../README.md#username-and-password) whenever you want. Just make sure you restart Ackee after changing those.

#### How to reset my account?

There's no "account" in Ackee. Just delete your database or switch to a different one.

## Comparison

### How does Ackee compare to Matomo (Piwik)?

Matomo is more like Google Analytics in the way it works and what you can do with it. Ackee will never be a replacement if you are looking for a full-featured marketing analytics platform with tons of options and insights. Ackee tries to be less. Lightweight, easy to install and with a good balance between analytics and privacy.

Ackee is the right tool for you if Matomo offers more than you need and when you put a focus on the privacy of your users.

### How does Ackee compare to Fathom?

Ackee and Fathom are very similar. Both in the way they display data and how they process it. The biggest advantages at the moment of writing:

- Ackee offers a documented REST API that lets you build upon it. The API can be used for custom import scripts or apps that display your current visitor stats in the menu bar. The possibilities are endless.
- Ackee allows you to track more than just page/site views (browser, system, etc.). This is optional and off by default, but great for people/companies that need more insights.

## Definitions

### Views > Unique site views

The unique amount of site views. Each user increases this value when visiting a domain for the first time a day.

Examples:

- User visits three pages of a domain => The count increases by one
- The same user visits your page at the end of the day => The count won't increase because the user is a returning user
- The same user visits two pages a on the next day => The count increases by one because new day = new user

### Views > Total page views

The total amount of page views. Each visit or reload of a page will increase this value.

Examples:

- User views three pages of a domain => The count increases by three
- User reloads the same page two times => The count increases by three (initial visit + first reload + second reload)

### Pages > Top pages

The 25 pages of a domain with the most views. Each visit or reload of a page will increase this value. The views aren't unique, because Ackee can't track returning users for individual pages.

Examples:

- User visits three pages of a domain => The count of each page increases by one
- User reloads the same page two times => The count of the page increases by three (initial visit + first reload + second reload)

### Pages > Recent pages

The last 25 page visits of the last 7 days. Sorted by time.

### Referrers > Top referrers

The top 25 pages from which your visitors have come in the last 7 days. Sorted by popularity.

### Referrers > Recent referrers

The last 25 pages from which your visitors have come in the last 7 days. Sorted by time.

### Languages > Top languages

The top 25 user languages of the last 7 days. Sorted by popularity.

The user language is the language of the user's browser.

### Languages > Recent languages

The last 25 user languages from the last 7 days. Sorted by time.