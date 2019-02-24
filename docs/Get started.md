# Get started

## Requirements

Ackee dependents on …

- [Node.js](https://nodejs.org/en/) (v8.11.0 or newer)
- [yarn](https://yarnpkg.com/en/)
- [MongoDB](https://www.mongodb.com)

Make sure to install and update all dependencies before you fork and setup Ackee.

## Setup

- [With Docker](#with-docker)
- [Without Docker](#without-docker)

### With Docker

#### 1. MongoDB

Ackee requires a running MongoDB instance. The easiest way to install MongoDB is by using [Docker](https://www.docker.com). Skip this step if you have MongoDB installed or visit the [website of MongoDB](https://www.mongodb.com) for alternative setups.

```
docker run -d -p 27017:27017 --name mongo mongo
```

For persistent storage, mount a host directory to the container directory `/data/db`, which is identified as a potential mount point in the mongo Dockerfile. When starting a new container, Docker will use the volume of the previous container and copy it to the new container, ensuring that no data gets lost.

```
docker run -d -p 27017:27017 -v /path/to/local/folder:/data/db --name mongo mongo
```

Explanation:

- `-d` runs MongoDB in the background
- `-p` makes port `27017` available at port `27017` on the host
- `-v` mounts `/path/to/local/folder` to `/data/db` of the container
- `--name` sets the container name to `mongo`
- `mongo` is the name of the image

#### 2. Start Ackee

```
docker run -d -p 3000:3000 -e MONGODB='mongodb://mongo:27017/ackee' -e USERNAME='username' -e PASSWORD='password' --link mongo --name ackee electerious/ackee
```

It's also possible to create a [`.env` file](https://www.npmjs.com/package/dotenv) to store all variables in one file.

> The --env-file flag takes a filename as an argument and expects each line to be in the VAR=VAL format, mimicking the argument passed to --env. Comment lines need only be prefixed with #.

```
docker run -d -p 3000:3000 --env-file .env --link mongo --name ackee electerious/ackee
```

Explanation:

- `-d` runs Ackee in the background
- `-p` makes port `3000` available at port `3000` on the host
- `-e` sets [environment variables](../README.md#Options) required by Ackee
- `--env-file` sets [environment variables](../README.md#Options) using an [`.env` file](https://www.npmjs.com/package/dotenv)
- `--link` links Ackee with the `mongo` container
- `--name` sets the container name to `ackee`
- `electerious/ackee` is the name of the image

### Without Docker

#### 1. MongoDB

Ackee requires a running MongoDB instance. Visit the [website of MongoDB](https://www.mongodb.com) for installation instructions.

#### 2. Configuration

Configure Ackee using environment variables or create a [`.env` file](https://www.npmjs.com/package/dotenv) in the root of the project to store all variables in one file.

```
MONGODB=mongodb://localhost:27017/ackee
USERNAME=username
PASSWORD=password
```

The [README](../README.md#Options) contains a detailed explanation of all available options, but only those three are required to run Ackee.

The [MongoDB connection string](https://docs.mongodb.com/manual/reference/connection-string/) is used to connect to your MongoDB. It should also contain the username and password of your MongoDB instance when required.

The username and password variables are used to secure your Ackee interface/API.

#### 3. Installation

Install all required dependencies.

```
yarn
```

#### 4. Start Ackee

Run Ackee. It will output the URL it's listening on once the server is running. Visit the URL with your browser and complete the finial steps in the interface.

```
yarn start
```