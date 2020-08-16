# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

- Ackee can track detailed data ([optional](https://github.com/electerious/ackee-tracker#options)) and now shows more of them in the "Detailed"-menu

## [1.4.3] - 2020-01-12

### Added

- Simply [deploy to Heroku](docs/Get%20started.md#with-heroku) by clicking one button (#72, thanks @aleccool213)
- `ACKEE_ALLOW_ORIGIN` option for [Heroku or other Platforms-As-A-Service](docs/CORS%20headers.md) (#73, thanks @aleccool213)

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
