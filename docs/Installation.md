### 1. Requirements

- `node` [Node.js](http://nodejs.org) v0.10 or later
- `npm` [Node Packaged Modules](https://www.npmjs.org)
- `bower` [Bower](http://bower.io)
- `gulp` [Gulp](http://gulpjs.com/)
- `coffee` [Coffee](http://coffeescript.org)

After [installing Node.js](http://nodejs.org) you can use the included `npm` package manager to install the global requirements with the following command:

	npm install -g bower coffee-script gulp
	
### 2. Download

You can get the latest version of Ackee with `git`:

	git clone https://github.com/electerious/Ackee.git
	
Or you can use the [direct download](https://github.com/electerious/Ackee/archive/master.zip).

### 3. Install

Before starting Ackee, you need to install all required dependencies using `npm`. This command will also install the `bower` dependencies and build Ackee using `gulp`:

	npm install

### 4. Start

That's it! Now you can start Ackee with the following command and begin to track your sites:

	npm start
	
We recommend to use `forever` to run Ackee in production. [Forever](https://github.com/nodejitsu/forever) is a simple CLI tool for ensuring that a given script runs continuously.

	forever start -c 'npm start' ./

If you have trouble, take a look at the [FAQ](FAQ.md).
