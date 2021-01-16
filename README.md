<div align="center">

<img src="https://s.electerious.com/images/ackee/icon.png" title="Ackee" alt="Ackee logo" width="128">

# Ackee

![Build](https://github.com/electerious/Ackee/workflows/Build/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/electerious/Ackee/badge.svg?branch=master)](https://coveralls.io/github/electerious/Ackee?branch=master) [![Mentioned in Awesome Selfhosted](https://awesome.re/mentioned-badge.svg)](https://github.com/awesome-selfhosted/awesome-selfhosted) [![Donate via PayPal](https://img.shields.io/badge/paypal-donate-009cde.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CYKBESW577YWE)

Self-hosted, Node.js based analytics tool for those who care about privacy. Ackee runs on your own server, analyzes the traffic of your websites and provides useful statistics in a minimal interface.

[🌍 Website](https://ackee.electerious.com) | [🔮 Live Demo](https://demo.ackee.electerious.com) | [🧸 GraphQL Playground](https://demo.ackee.electerious.com/api)

<br/>

![Ackee in a browser](https://s.electerious.com/images/ackee/readme.png)

</div>

## 👋 Introduction

Ackee is a self-hosted analytics tool that cares about privacy. We believe that you don't need to track every aspect of your visitors. Ackee keeps tracked data anonymized to avoid that users are identifiable, while still providing helpful insights. It's the right tool for everyone who doesn't need a full-featured marketing analytics platform like Google Analytics or Matomo.

- **Self-hosted**: Ackee runs on your own server and is 100% open-source
- **Modern technologies**: Lightweight Node.js and MongoDB architecture
- **Beautiful**: Minimal and focused interface
- **No cookies**: No unique user tracking and therefore no required cookie message
- **Events**: Track button clicks, newsletter subscriptions and more
- **GraphQL API**: Fully documented GraphQL API that allows you to build new tools upon Ackee

## 🚀 Get started

Get Ackee up and running…

- […with Docker Compose](docs/Get%20started.md#with-docker-compose)
- […with Docker](docs/Get%20started.md#with-docker)
- […with Helm](docs/Get%20started.md#with-helm)
- […without Docker](docs/Get%20started.md#without-docker)
- […with Netlify](docs/Get%20started.md#with-netlify)
- […with Vercel](docs/Get%20started.md#with-vercel)
- […with Heroku](docs/Get%20started.md#with-heroku)
- […with Render](docs/Get%20started.md#with-render)

And configure Ackee and your server correctly…

- […with environment variables](docs/Options.md)
- […with SSL and HTTPS enabled](docs/SSL%20and%20HTTPS.md)
- […with CORS headers](docs/CORS%20headers.md)

Take a look at the [FAQ](docs/FAQ.md) if you have any questions left.

## 📚 Documentation

Documentation and guides are located in [the /docs folder](docs/). Also take a look at the [FAQ](docs/FAQ.md) if you have any questions left.

### API

Ackee features a [GraphQL API](docs/API.md) that allows you to build custom tools upon Ackee. Everything you see in the UI is made from data delivered by the API.

### Options

Ackee uses environment variables and supports [`.env` files](https://www.npmjs.com/package/dotenv) in the root of the project if you want to store all variables in one file. [Options &#187;](docs/Options.md)

## Miscellaneous

### Donate

I am working hard on continuously developing and maintaining Ackee. Please consider making a donation to keep the project going strong and me motivated.

- [Become a GitHub sponsor](https://github.com/sponsors/electerious)
- [Donate via PayPal](https://paypal.me/electerious)
- [Buy me a coffee](https://www.buymeacoffee.com/electerious)

### Articles

- [Quit Google Analytics, Self-hosted Gatsby Statistics with Ackee](https://dev.to/aleccool213/quit-google-analytics-self-hosted-gatsby-statistics-with-ackee-4011)
- [Getting Ackee up and running with Heroku 🇪🇸](https://rubenr.dev/blog/ackee-analitica-web-sencilla/)
- [Why I Self-Host My Website Analytics](https://mbuffett.com/posts/why-i-self-host-my-analytics/)

### Related

- [ackee-tracker](https://github.com/electerious/ackee-tracker) - Transfer data to Ackee
- [ackee-bitbar](https://github.com/electerious/ackee-bitbar) - Ackee stats in your macOS menu bar
- [ackee-lighthouse](https://github.com/electerious/ackee-lighthouse) - Send Lighthouse reports to Ackee
- [ackee-report](https://github.com/BetaHuhn/ackee-report) - CLI tool to generate performance reports
- [gatsby-plugin-ackee-tracker](https://github.com/Burnsy/gatsby-plugin-ackee-tracker) - Gatsby plugin for Ackee
- [Soapberry](https://wordpress.org/plugins/soapberry/) - WordPress plugin for Ackee
- [Ackee-PHP](https://github.com/BrookeDot/ackee-php) - A PHP Class for Ackee
- [use-ackee](https://github.com/electerious/use-ackee) - Use Ackee in React
- [nuxt-ackee](https://github.com/bdrtsky/nuxt-ackee) - Nuxt.js module for Ackee
- [ngx-ackee-wrapper](https://github.com/oakify/ngx-ackee-wrapper) - Angular wrapper for Ackee
- [django-ackee-middleware](https://github.com/suda/django-ackee-middleware) - Django middleware for Ackee
- [gridsome-plugin-ackee](https://github.com/DenzoNL/gridsome-plugin-ackee) - Gridsome plugin for Ackee
- [vuepress-plugin-ackee](https://github.com/spekulatius/vuepress-plugin-ackee) - VuePress plugin for Ackee

### Links

- [Follow Ackee on Twitter](https://twitter.com/getackee)
- [Vote for Ackee on ProductHunt](https://www.producthunt.com/posts/ackee)
