# Get started

## Requirements

Ackee dependents on …

- [Node.js](https://nodejs.org/en/) (v8.11.0 or newer)
- [npm](https://www.npmjs.com)
- [MongoDB](https://www.mongodb.com)

Make sure to install and update all dependencies before you fork and setup Ackee.

## Setup

### 1. MongoDB

Ackee requires a running MongoDB instance. The easiest way to install MongoDB is by using [Docker](https://www.docker.com). Skip this step if you have MongoDB installed or visit the [website of MongoDB](https://www.mongodb.com) for alternative setups.

```
docker run -p 27017:27017 -d mongo
```

### 2. Configuration

Configure Ackee using environment variables or create a [`.env` file](https://www.npmjs.com/package/dotenv) in the root of the project to store all variables in one file.

```
MONGODB=mongodb://localhost/ackee
USERNAME=username
PASSWORD=password
```

The [README](../README.md#Options) contains a detailed explanation of all available options, but only those three are required to run Ackee.

The [MongoDB connection string](https://docs.mongodb.com/manual/reference/connection-string/) is used to connect to your MongoDB. It should also contain the username and password of your MongoDB instance when required.

The username and password variables are used to secure your Ackee interface/API.

### 3. Installation

Install all required dependencies.

```
npm install
```

### 4. Start Ackee

Run Ackee. It will output the URL it's listening on once the server is running. Visit the URL with your browser and complete the finial steps in the interface.

```
npm start
```