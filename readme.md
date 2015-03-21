# Ackee

#### A great looking self-hosted website analytics tool

![Ackee](http://l.electerious.com/uploads/big/e730b2816e0299546214c5b8241661fc.png)

Ackee is a polished, easy-to-use website analytics tool, which runs on your own server. It helps you to track your sites, know more about your visitors and to analyze your traffic.

## Installation

To use Ackee, everything you need is a server or computer with Node.js. Follow the instructions to install Ackee on your server. [Installation &#187;](docs/Installation.md)

## How to use

You can use Ackee right after the installation. Here are some advanced features to get the most out of it.

### Add Sites

To track your sites, you need to add an individual code to the HTML-body of them. You can get the code from the menu on the top right corner of Ackee. 

### Settings

There are several settings allowing you to configure Ackee. [Settings &#187;](docs/Settings.md)

### Update

Updating is as easy as it should be. [Update &#187;](docs/Update.md)

### Keyboard Shortcuts

These shortcuts will help you to use Ackee even faster. [Keyboard Shortcuts &#187;](docs/Keyboard Shortcuts.md)

### Build

The repository of Ackee is uncompiled and needs to be compiled before you can execute it. This is done automatically when running `npm install` or you can compile the source manually using `npm run build`. Make sure you recompile Ackee after changing or updating files.

## Leafs

Ackee has a modular architecture, which allows you to extend it to your own needs. Modules are called "Leafs". Each Leaf represents one panel in the interface. Ackee comes with some preinstalled Leafs and lets you easily install more.

### Catalogue

Here's a list of all available Leafs. Made your own? [Notify me!](mailto:ackee@electerious.com)

| Name | Included | Description | Link |
|:-----------|:------------|:------------|:------------|
| Pages | Yes | See which pages your visitors visit the most. | - |
| Referrers | Yes | See where your visitors are from. | - |
| Users | Yes | Know everything about your visitors. | - |
| Visits | Yes | The amount of visitors visualized in stats. | - |

### Install

Each Leaf has its own folder in `leafs/`. To install one, follow the given steps:

1. Download your Leaf
2. Stop Ackee
3. Put the whole folder in `leafs/`
4. Run `npm run build`
5. Start Ackee

### Remove

Follow the given steps to remove a Leaf you don't want to use anymore:

1. Stop Ackee
2. Open `leafs/` and remove the folder of the Leaf
3. Run `npm run build`
4. Start Ackee

## Troubleshooting

Take a look at the [FAQ](docs/FAQ.md) if you have problems.

## License

Copyright (C) 2015 [Tobias Reich](http://electerious.com)  

[![license](http://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/deed.en_US)

[Ackee](http://purl.org/dc/terms/) by [Tobias Reich](http://electerious.com) is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/deed.en_US). Based on a work at [https://github.com/electerious/Ackee](https://github.com/electerious/Ackee).
