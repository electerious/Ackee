<div align="center">

<img src="https://s.electerious.com/images/ackee/icon.png" title="Ackee" alt="Ackee logo" width="128">

# Ackee

[![Travis Build Status](https://travis-ci.org/electerious/Ackee.svg?branch=master)](https://travis-ci.org/electerious/Ackee) [![Coverage Status](https://coveralls.io/repos/github/electerious/Ackee/badge.svg?branch=master)](https://coveralls.io/github/electerious/Ackee?branch=master) [![Dependencies](https://david-dm.org/electerious/Ackee.svg)](https://david-dm.org/electerious/Ackee#info=dependencies) [![Mentioned in Awesome Selfhosted](https://awesome.re/mentioned-badge.svg)](https://github.com/awesome-selfhosted/awesome-selfhosted) [![Donate via PayPal](https://img.shields.io/badge/paypal-donate-009cde.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CYKBESW577YWE)

Self-hosted, Node.js based analytics tool for those who care about privacy. Ackee runs on your own server, analyses the traffic of your websites and provides useful statistics in a minimal interface.

[🌍 Website](https://ackee.electerious.com) | [🔮 Live Demo](https://demo.ackee.electerious.com) | [🧸 GraphQL Playground](https://demo.ackee.electerious.com/api)

<br/>

![Ackee in a browser](https://s.electerious.com/images/ackee/readme.png)

</div>

## Contents

- 🚀 [Get started](#get-started)
- 📄 [Introduction](#introduction)
- 📚 [Documentation](#documentation)
- ➕ [More](#more)

## Get started

Get Ackee up and running…

- […with Docker Compose](docs/Get%20started.md#with-docker-compose)
- […with Docker](docs/Get%20started.md#with-docker)
- […with Helm](docs/Get%20started.md#with-helm)
- […without Docker](docs/Get%20started.md#without-docker)
- […with Heroku](docs/Get%20started.md#with-heroku)

And configure Ackee and your server correctly…

- […with environment variables](docs/Options.md)
- […with SSL and HTTPS enabled](docs/SSL%20and%20HTTPS.md)
- […with CORS headers](docs/CORS%20headers.md)

Take a look at the [FAQ](docs/FAQ.md) if you have any questions left.

## Introduction

### What is Ackee?

Ackee is a web app you install on your server to analyse the traffic of your sites.

### Why Ackee?

Ackee is lightweight, easy to install and has a good balance between analytics and privacy. It features a GraphQL API and web interface and tracks only what's necessary.

It's is the right tool for you if you care about privacy and don't need a full-features marketing analytics platform like Google Analytics or Matomo.

### Benefits of Ackee?

- Self-hosted
- Lightweight and easy to install
- Modern and fast architecture
- Beautiful and focused interface
- No unique user tracking and no cookies
- Fully documented GraphQL API

### How does it work?

You run the Ackee server which then waits for requests through its API.

The API of Ackee accepts information about your visitors sent to it using [ackee-tracker](https://github.com/electerious/ackee-tracker). It's a small script you add to your sites, similar to the JavaScript tracking snippet provided by Google Analytics.

The interface of Ackee lets you view and analyse your tracked information.

## Documentation

### Installation

Get Ackee up and running…

- […with Docker Compose](docs/Get%20started.md#with-docker-compose)
- […with Docker](docs/Get%20started.md#with-docker)
- […with Helm](docs/Get%20started.md#with-helm)
- […without Docker](docs/Get%20started.md#without-docker)
- […with Heroku](docs/Get%20started.md#with-heroku)

### API

Ackee features a [GraphQL API](docs/API.md) that allows you to build custom tools upon Ackee. Everything you see in the UI is made from data delivered by the API.

### Options

Ackee uses environment variables and supports [`.env` files](https://www.npmjs.com/package/dotenv) in the root of the project if you want to store all variables in one file. [Options &#187;](docs/Options.md)

## More

More documentation and guides are located in [the /docs folder](docs/). Also take a look at the [FAQ](docs/FAQ.md) if you have any questions left.

### Donate

I am working hard on continuously developing and maintaining Ackee. Please consider making a donation to keep the project going strong and me motivated.

- [Become a GitHub sponsor](https://github.com/sponsors/electerious)
- [Donate via PayPal](https://paypal.me/electerious)
- [Buy me a coffee](https://www.buymeacoffee.com/electerious)

### Related

- [ackee-tracker](https://github.com/electerious/ackee-tracker) - Transfer data to Ackee
- [gatsby-plugin-ackee-tracker](https://github.com/Burnsy/gatsby-plugin-ackee-tracker) - Gatsby plugin for Ackee
- [Soapberry](https://wordpress.org/plugins/soapberry/) - WordPress plugin for Ackee
- [Ackee-PHP](https://github.com/BrookeDot/ackee-php) - A PHP Class for Ackee
- [use-ackee](https://github.com/electerious/use-ackee) - Use Ackee in React
- [nuxt-ackee](https://github.com/bdrtsky/nuxt-ackee) - Nuxt.js module for Ackee
- [django-ackee-middleware](https://github.com/suda/django-ackee-middleware) - Django middleware for Ackee
