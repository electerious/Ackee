# Ackee

#### Self-hosted website analytics tool written in Node.js.

![Lychee](https://l.electerious.com/uploads/big/00758c0068ce22324c0f5d91ab0726b5.png)

Ackee helps you to track your sites, know more about your visitors and to analyze your traffic.

## Contents

- [Structure](#structure)
- [Setup](#setup)

## Structure

Ackee is separated into three parts.

- [ackee-server](https://github.com/electerious/ackee-server) A RESTful API server that builds the foundation of Ackee.
- [ackee-tracker](https://github.com/electerious/ackee-tracker) A script which interacts with the REST API of ackee-server. Should be used to feed your server with data from your visitors.
- [ackee-site](https://github.com/electerious/ackee-site) A visual interface which displays the data collected by ackee-server.

## Setup

Setting up all three components isn't hard. Here's how to get started.

1. Set up [ackee-server](https://github.com/electerious/ackee-server) as described in its readme. This can be done using Docker. One command and your server is up and running.
2. **WIP: The UI is currently in work. Use the API of ackee-server in the meanwhile.** Set up [ackee-site](https://github.com/electerious/ackee-site) as described in its readme. The UI allows you to view collected data and to add new domains. Add domains for each site you want to track. Remember the shown userId and domainID. You need them in the next step.
3. Add the tracking-script to your site as described in the [ackee-tracker](https://github.com/electerious/ackee-server) readme. You can install the script using [Bower](https://bower.io) or [npm](https://npmjs.com). Add the userId and domainId from step two and you are done! Now wait for some visitors and see the collected data in the UI.