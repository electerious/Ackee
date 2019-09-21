# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Top and recent languages
- Top and recent pages in a dedicated view
- Comparison bars for "Views per page"
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