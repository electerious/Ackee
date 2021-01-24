# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [3.0.3] - 2021-01-24

### Added

- Missing breaking change notice in the changelog of version 3.0.0 for those using a wildcard `Access-Control-Allow-Origin` header

### Fixed

- Unknown sizes id when a size is zero (#217)
- Prevent unknown id errors like in #217 for other record properties
- Updated ackee-tracker which re-added `ignoreOwnVisits` for those using a wildcard `Access-Control-Allow-Origin` header

## [3.0.2] - 2021-01-21

### Fixed

- Temporary workaround for missing browser sizes (#217)

## [3.0.1] - 2021-01-21

### Fixed

- UI showing the wrong version
- Server serving an outdated version of ackee-tracker

## [3.0.0] - 2021-01-21

Events, browser navigation and better referrers 🎉

### Highlights

#### Events

Ackee can now [track events](docs/Events.md) like newsletter subscriptions, buttons clicks, checkout sums and more. It's the most requested feature and I'm happy that it's finally a part of Ackee.

#### Browser navigation

You can now use the back and forward buttons to navigate between pages.

#### Referrers 2.0

You can now [specify a `source` parameter in URLs](docs/Enhancing%20referrers.md) (e.g. `https://example.com?source=Newsletter`). Ackee will use the parameter instead of the referrer when available. This allows you the track links from newsletters and other platforms more precisely.

#### Faster startup, smaller size

Ackee previously had to compile all source files before the server was ready. v3 now ships with all files Ackee needs and only builds those containing environment variables. This means running `yarn start` is way faster and the Docker container even smaller.

Oh, and we also reduced the JS file size of the UI by ~60%.

### Breaking changes

#### `Access-Control-Allow-Origin: "*"` not recommended

> This change is relevant for you when using a wildcard as the Access-Control-Allow-Origin.

Using a wildcard (`*`) for the `Access-Control-Allow-Origin` header was never recommended as it's neither a secure solution nor does it allow Ackee to ignore your own visits. Please disable the `ignoreOwnVisits` option in ackee-tracker if you're currently using a wildcard. The [SSL and HTTPS](docs/SSL%20and%20HTTPS.md) guide contains better alternatives.

`ignoreOwnVisits` is now enabled by default and won't work when using a wildcard.

#### New `Access-Control-Allow-Credentials` header

> This change is relevant for everyone.

Ackee requires [a new `Access-Control-Allow-Credentials` header](docs/CORS%20headers.md#credentials) which was previously optional. Make sure to add this header in your server or reverse proxy configuration.

#### ackee-tracker with new `.create` and `.record` syntax

> This change is only relevant for you when using ackee-tracker in the [Manually](https://github.com/electerious/ackee-tracker/blob/master/README.md#manually) or [Programmatic](https://github.com/electerious/ackee-tracker/blob/master/README.md#programmatic) way.

The [changelog of ackee-tracker](https://github.com/electerious/ackee-tracker/blob/master/CHANGELOG.md) contains everything you need to know when updating to the newest version.

#### Referrers require `ReferrerType` in GraphQL API

> This change is relevant for you when using the GraphQL API.

A new parameter is required when requesting referrers via the GraphQL API. The parameter is called `ReferrerType` and can be `WITH_SOURCE`, `NO_SOURCE` or `ONLY_SOURCE`.

#### Referrers can return non URL ids via GraphQL API

> This change is relevant for you when using the GraphQL API.

The `id` of requested referrers was always a URL, but has been changed to a string. That's because [referrers can now include parameters](docs/Enhancing%20referrers.md) (e.g. `source` when using `ackee-tracker`).

### Added

- Browser navigation. It's now possible to navigate using the back and forward button in the browser.
- "Copied to clipboard" message when clicking on an input or textarea that copies to the clipboard (#166)
- Modals can be closed with the ESC key
- Tests for permanent tokens, events and actions
- `source` field for records to track (thanks @BetaHuhn, #185)
- Referrers will now show the `source` parameter when available (thanks @BetaHuhn, #185)
- Use the `s` key to open the settings and `o` to switch to the overview ([Keyboard shortcuts](docs/Keyboard%20shortcuts.md))
- Explanation why data is missing (#192)

### Changed

- Compiled source files are now part of the repo
- Docker container size has been reduced (again)
- Updated build tools allow us to use ~60% less JS in the UI

### Fixed

- Close, delete and submit in modals could be triggered multiple times

## [2.4.1] - 2020-12-20

### Changed

- Updated Dockerfile reduces the size of the Docker build by ~58% (#195, thanks @omBratteng)

### Fixed

- Errors from permanent tokens not showing up in the UI
- Remove console logs from `apollo-server-plugin-http-headers`
- Log GraphQL error instead of `undefined`

## [2.4.0] - 2020-11-15

Ackee now ignores your own visits once you have logged into the dashboard. Make sure to enable the [`ignoreOwnVisits` option in ackee-tracker](https://github.com/electerious/ackee-tracker#-options) to use this feature. It's currently opt-in, because it requires [a new `Access-Control-Allow-Credentials` header](docs/CORS%20headers.md#credentials), which wasn't previously required. It will be turned on by default in the next major release of Ackee.

> ℹ️ Some browsers strictly block third-party cookies when Ackee runs on a different domain than the site you're visiting. Therefore, it may happen that your own visits still find their way into your statistics, even when the option `ignoreOwnVisits` is turned on.

### Added

- Ignore own visits (#100, thanks @yehudab)
- Tons of new tests (#171, thanks @yehudab)

## [2.3.0] - 2020-11-04

This release adds [support for Vercel](docs/Get%20started.md) and updates the included `ackee-tracker` which now ignores bots.

### Added

- Support for Vercel (#180, thanks @elliottsj)
- Contributing guide and issue templates (#184, thanks @BetaHuhn)

### Changed

- ackee-tracker updated to version 4.1.0

## [2.2.0] - 2020-11-01

New tools like [ackee-report](https://github.com/BetaHuhn/ackee-report), [ackee-bitbar](https://github.com/electerious/ackee-bitbar) and the [Ackee iOS widget](https://twitter.com/getackee/status/1320996848623099909) are build upon the powerful API of Ackee. This release makes it even easier to them by introducing permanent tokens. Permanent tokens never expire and are perfect for tools that run in the background. You can create them in the settings of Ackee and use them for authentication in Ackee-powered apps.

### Added

- Permanent tokens (#176, thanks @BetaHuhn)

### Fixed

- Serverless function CORS headers (#175)

## [2.1.1] - 2020-10-28

### Fixed

- Error while deploying to Netlify (#175)

## [2.1.0] - 2020-10-24

This release introduces support for serverless functions. You can now deploy Ackee to Netlify 🚀 It also reduces the memory usage and allows you to build all static files into `/dist` by running `yarn build`. Run `yarn server` to start the server without building those files, again. This reduces the initial startup time. `yarn start` combines both commands for convenience and is still the recommended way to run Ackee.

### Added

- Support for serverless functions and Netlify (#155)
- Added "Deploy to Netlify" to the [Get Started](docs/Get%20started.md) guide
- Build all static files into `/dist` by running `yarn build`
- Start the server without rebuilding static files using `yarn server`

### Changed

- Improved scrollbars on Windows (#153, thanks @Go-Merk)

### Fixed

- Reduce high memory usage by building files in a different step (#170)
- Show only active records in visitor counter (#161)
- Labels in modals sometimes not clickable because of invalid ids

## [2.0.3] - 2020-09-20

### Fixed

- Invalid value error (#165)

## [2.0.2] - 2020-09-20

### Added

- [vuepress-plugin-ackee](https://github.com/spekulatius/vuepress-plugin-ackee)
- [gridsome-plugin-ackee](https://github.com/DenzoNL/gridsome-plugin-ackee)

### Changed

- More relevant data on the dashboard: Ackee now shows the top data of the last 24 hours instead of last 7 days
- Heroku installation docs (#154, thanks @Go-Merk and @aleccool213)

## [2.0.1] - 2020-08-16

This updates improves the look of the README and adds some missing pieces of documentation.

### Added

- [Privacy Policy example](docs/Privacy%20Policy.md) (#122)

## [2.0.0] - 2020-08-15

The first major back-end and front-end rewrite of Ackee with new API, dashboard, active visitors counter and more. Updating is as easy as ever. Simple grab the newest version, ensure that you're using Node.js v14 or higher and start Ackee. That's it!

### Added

- GraphQL API
- Overview with facts and data from all domains
- Facts card with live visitor counter, average visits and durations and the total number of visits today, this month and year
- New navigation that allows you to view stats by domain
- Keyboard shortcuts
- Switch between daily, monthly and yearly durations
- Click on a card headline to view more of this domain or insight
- Support `+srv` connection string modifier for MongoDB urls (#132, thanks @ericsandine)

### Changed

- Improved performance for all aggregations
- Show stale data while loading new data
- Removed detailed durations
- Delete records of a domain when deleting a domain
- Updated the required Node.js version and Docker Node.js version to v14
- Removed "All time" and replaced it with "Last 6 months" for performance reasons

### Fixed

- Sorting of yearly views

## [1.7.1] - 2020-05-15

### Added

- Instructions for using Helm (#109, thanks @suda)
- Instructions for using systemd (#112, thanks @LickABrick)
- Instructions on how to update when hosting on Heroku (#107, thanks @ckipp01)

## [1.7.0] - 2020-04-19

### Added

- Filter bar to quickly change what you're viewing
- [Documention website](https://docs.ackee.electerious.com/#/)
- Browsers, devices and operating systems are now visible in the UI (thanks [@RomainCscn](https://github.com/RomainCscn))
- Browser and screen resolutions allow you to view width and height combined (thanks [@RomainCscn](https://github.com/RomainCscn))
- View the last 24 hours, 7 days, last 30 days or the top entries of all time (thanks [@RomainCscn](https://github.com/RomainCscn))

### Changed

- API returns more entries (25 -> 30)
- Loading design in header

## [1.6.1] - 2020-03-25

### Fixed

- Origin header check for multiple hosts (#84, thanks @jaryl)

## [1.6.0] - 2020-03-06

### Added

- Switch between daily, monthly and yearly views
- `ACKEE_ALLOW_ORIGIN` now supports multiple domains (#79 #82, thanks @jaryl)

### Improved

- JS error handling with React error boundary

### Fixed

- Loading indicator when the sizes-view is loading
- Catch errors when the sizes-view throws an error

## [1.5.0] - 2020-02-16

### Added

- Ackee can track detailed data ([optional](https://github.com/electerious/ackee-tracker#-options)) and now shows more of them in the "Detailed"-menu

## [1.4.3] - 2020-01-12

### Added

- Simply [deploy to Heroku](docs/Get%20started.md#with-heroku) by clicking one button (#72, thanks @aleccool213)
- `ACKEE_ALLOW_ORIGIN` option for [Platforms-As-A-Service](docs/CORS%20headers.md) (#73, thanks @aleccool213)

## [1.4.2] - 2019-12-19

### Changed

- Allow the use of `PORT` instead of `ACKEE_PORT` (#70)
- Improved parts of the documentation

## [1.4.1] - 2019-11-16

### Added

- Related modules in README

### Changed

- Click a Twitter link to see who tweeted the link

## [1.4.0] - 2019-11-05

### Added

- "New referrers"
- Custom tracker URL (#53)

### Fixed

- Incorrect content type for JS files (#54)

## [1.3.0] - 2019-10-19

### Added

- Average and detailed durations

### Changed

- Links now open in a new tab with `rel="noopener"`

### Fixed

- Remove username and password before logging MongoDB connection URI (#50)
- Horizontal scroll on pages with vertical scroll (#52)
- Large numbers in chart view overlapping bars
- "Last 7 days" now shows last 7 days instead of 8
- Title for "Unique site views"
- CORS headers in documentation
- Data fetched twice when navigating in UI
- Abort old fetch calls when they're triggered again

## [1.2.0] - 2019-09-21

### Added

- Top and recent languages
- Comparison bars for "Views per page"

### Changed

- Top and recent pages in a dedicated view
- Hover recent referrers to see the date
- Improved URL normalization for cleaner URLs in "Views per page" and "Referrers"
- Improved logging of errors in the server log
- Improved menu on small screens
- Reset state after pressing "Reload Ackee" in the error overlay to recover from bugs caused by a faulty state

## [1.1.0] - 2019-09-11

> ⚠️ All options / environment variables have been renamed. They're now starting with `ACKEE_` to avoid collisions with other tools. Please update your options accordingly.

### Added

- "Views per page" shows you the top 25 pages of a domain with the most views
- More documentation and FAQ
- Comparison bar behind items in the referrer list
- Normalize `siteLocation` before storing it in the database

### Changed

- "Total views" => "Total page views"
- "Unique views" => "Unique site views"
- `/domains/:domainId/views` response contains a new type

### Fixed

- Login not working because environment variables already in use (#45)

## [1.0.0] - 2019-09-03

### Added

- Everything
