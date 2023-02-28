# Get started

Ackee is a simple analytics tool that consists of two parts:

1) A node server running on a server of your choice
2) A tracking script that talks to that server

The node server shows you the UI and receives the request from all of your sites, while the tracking script is set up on each site you want to analyze. Since normally your site and your analytics server are running on the same machine, a subdomain is recommended to proxy all requests from that subdomain to the node server. The following guides help you to set up Ackee on an infrastructure of your choice.

- [With Docker Compose](#with-docker-compose)
- [With Docker](#with-docker)
- [With Helm](#with-helm)
- [Without Docker](#without-docker)
- [With Netlify](#with-netlify)
- [With Vercel](#with-vercel)
- [With Heroku](#with-heroku)
- [With Qovery](#with-qovery)
- [With Render](#with-render)
- [With Railway](#with-railway)
- [With Koyeb](#with-koyeb)
- [With Easypanel](#with-easypanel)

## With Docker Compose

### 1. Create the configuration

Pull the project and create a [`.env` file](https://www.npmjs.com/package/dotenv) in the root to store all environment variables in one file.

```
ACKEE_USERNAME=username
ACKEE_PASSWORD=password
```

Only those two are required to run Ackee with the existing `docker-compose.yml`. Take a look at the [options](Options.md) for a detailed explanation.

### 2. Run Ackee

Run this command in the root of the project to use the predefined `docker-compose.yml`. It contains everything you need, including MongoDB and Ackee.

```sh
docker-compose up
```

> 💡 Add the `-d` flag to the Docker command to run the services in the background.

### 3. Open Ackee

Ackee will output the URL it's listening on once the server is running. Visit the URL with your browser and complete the finial steps using the interface.

### 4. Get Ackee online

Ackee now runs on port `3000` and is only accessible from you local network. It's recommended to use a reverse proxy in front of Ackee. The following guides will help you through this steps.

- [SSL and HTTPS](SSL%20and%20HTTPS.md)
- [CORS headers](CORS%20headers.md)

## With Docker

### 1. Setup MongoDB

Ackee requires a running MongoDB instance. The easiest way to install MongoDB is by using [Docker](https://www.docker.com). Skip this step if you have MongoDB installed or visit the [website of MongoDB](https://www.mongodb.com) for alternative setups.

```sh
docker run -p 27017:27017 --name mongo mongo
```

For persistent storage, mount a host directory to the container directory `/data/db`, which is identified as a potential mount point in the mongo Dockerfile. When starting a new container, Docker will use the volume of the previous container and copy it to the new container, ensuring that no data gets lost.

```sh
docker run -p 27017:27017 -v /path/to/local/folder:/data/db --name mongo mongo
```

> 💡 Add the `-d` flag to the Docker command to run MongoDB in the background.

Explanation:

- `-p` makes port `27017` available at port `27017` on the host
- `-v` mounts `/path/to/local/folder` to `/data/db` of the container
- `--name` sets the container name to `mongo`
- `mongo` is the name of the image

### 2. Run Ackee

```sh
docker run -p 3000:3000 -e ACKEE_MONGODB='mongodb://mongo:27017/ackee' -e ACKEE_USERNAME='username' -e ACKEE_PASSWORD='password' --link mongo --name ackee electerious/ackee
```

> 💡 Add the `-d` flag to the Docker command to run Ackee in the background.

Explanation:

- `-p` makes port `3000` available at port `3000` on the host
- `-e` sets [environment variables](Options.md) required by Ackee
- `--link` links Ackee with the `mongo` container
- `--name` sets the container name to `ackee`
- `electerious/ackee` is the name of the image

### 3. Open Ackee

Ackee will output the URL it's listening on once the server is running. Visit the URL with your browser and complete the finial steps using the interface.

### 4. Get Ackee online

Ackee now runs on port `3000` and is only accessible from you local network. It's recommended to use a reverse proxy in front of Ackee. The following guides will help you through this steps.

- [SSL and HTTPS](SSL%20and%20HTTPS.md)
- [CORS headers](CORS%20headers.md)

## With Helm

### 1. Create `values.yaml`

Based on the [default `values.yaml`](https://github.com/suda/charts/blob/main/charts/ackee/values.yaml) create your own with overrides as needed.

### 2. Deploy with `helm`

```
helm repo add suda https://suda.github.io/charts/
helm repo update
helm install ackee-release suda/ackee -n ackee -f values.yaml
```

If you're using the `ingress-nginx`, enabling the ingress will set the necessary annotations to enable CORS.

## Without Docker

### 1. Install dependencies

Ackee dependents on …

- [Node.js](https://nodejs.org/en/) (v14 or newer)
- [yarn](https://yarnpkg.com/en/)
- [MongoDB](https://www.mongodb.com) (v4.4 or newer)

Make sure to install and update all dependencies before you continue. The installation instructions for the individual dependencies can be found on the linked websites.

### 2. Create the configuration

Pull the project and configure Ackee using environment variables or create a [`.env` file](https://www.npmjs.com/package/dotenv) in the root of the project to store all variables in one file.

```
ACKEE_MONGODB=mongodb://localhost:27017/ackee
ACKEE_USERNAME=username
ACKEE_PASSWORD=password
```

Only those three are required to run Ackee. Take a look at the [options](Options.md) for a detailed explanation.

The [MongoDB connection string](https://docs.mongodb.com/manual/reference/connection-string/) is used to connect to your MongoDB. It should also contain the username and password of your MongoDB instance when required.

The username and password variables are used to secure your Ackee interface/API.

### 3. Install Ackee

Install all required dependencies.

```sh
yarn install
```

### 4. Run Ackee

Ackee will output the URL it's listening on once the server is running. Visit the URL with your browser and complete the finial steps using the interface.

```sh
yarn start
```

### 5. Get Ackee online

Ackee now runs on port `3000` and is only accessible from you local network. It's recommended to use a reverse proxy in front of Ackee. The following guides will help you through this steps.

- [SSL and HTTPS](SSL%20and%20HTTPS.md)
- [CORS headers](CORS%20headers.md)

## With Netlify

### 1. Deploy to Netlify

[![Deploy](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/electerious/Ackee)

### 2. Configure Ackee

- You need to have a MongoDB instance running (e.g. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Set a username and password to protect your interface
- Ensure that you're using the correct CORS headers by setting [`ACKEE_ALLOW_ORIGIN`](CORS%20headers.md#platforms-as-a-service-configuration).

### 3. Updating Ackee

Netlify adds a forked version of Ackee to your GitHub repositories. You can always [pull the newest code](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/syncing-a-fork) from the original project. Pushing those changes to your repository will automatically deploy the new version of Ackee on Netlify.

## With Vercel

### 1. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Felecterious%2FAckee&env=ACKEE_USERNAME,ACKEE_PASSWORD,ACKEE_MONGODB,ACKEE_ALLOW_ORIGIN&envDescription=Environment%20variables%20needed%20to%20configure%20the%20user%20and%20database%20connection&envLink=https%3A%2F%2Fgithub.com%2Felecterious%2FAckee%2Fblob%2Fmaster%2Fdocs%2FOptions.md)

When prompted to select a directory, select the root directory.

### 2. Configure Ackee

* Set the build command: `yarn build`
* Set the output directory: `dist`
* Set environment variables `ACKEE_USERNAME`, `ACKEE_PASSWORD`, `ACKEE_MONGODB`, and `ACKEE_ALLOW_ORIGIN`.

### 3. Updating Ackee

Vercel adds a forked version of Ackee to your GitHub repositories. You can always [pull the newest code](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/syncing-a-fork) from the original project. Pushing those changes to your repository will automatically deploy the new version of Ackee on Vercel.

## With Heroku

### 1. Deploy to Heroku

Deploy to Heroku by clicking this button:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/electerious/Ackee)

### 2. Configure Ackee

- You need to have a MongoDB instance running, either hosting it yourself, using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or by using a (paid) add-on like [ObjectRocket MongoDB](https://elements.heroku.com/addons/ormongo). This is as simple as typing `heroku addons:create ormongo:2-wt --app <YOUR_APP_NAME>` using the CLI, or using the web dashboard; more details at the [official documentation](https://devcenter.heroku.com/articles/managing-add-ons). You'll need to provide connection details to Ackee dyno, either from the web dashboard or via command line, e.g. `heroku config:add "ACKEE_MONGODB=mongodb://<host>:<port>/<db>"`
- Ensure that you're using the correct CORS headers by setting [`ACKEE_ALLOW_ORIGIN`](CORS%20headers.md#platforms-as-a-service-configuration).

### 3. Updating Ackee

The easiest way to update Ackee once hosted on Heroku is to clone the repo down, pull the latest changes from Ackee, and then push them back up to Heroku. You'll need the Heroku CLI and Git for this to work.

In your application view, you'll find instructions under the `Deploy` tab on how to clone down the project. It should look something like below:

```sh
heroku login
heroku git:clone -a <your ackee applicaton name>
```

You'll then want to add the Ackee repo as origin, pull the latest changes, and push it back up to Heroku.

```sh
git remote add origin https://github.com/electerious/Ackee.git
git pull origin master
git push heroku master
```

After your application re-deploys you'll have the latest version of Ackee!

## With Qovery

[Qovery](https://qovery.com) is a fully-managed cloud platform that runs on your AWS, GCP, Azure and Digital Ocean account where you can host static sites, backend APIs, databases, cron jobs, and all your other apps in one place.

### 1. Create a Qovery account.

Visit the [Qovery dashboard](https://console.qovery.com) to create an account if you don't already have one.

### 2. Create a project

Click on "Create a new project" and give a name to your project.

### 3. Add an application

Click on "Create an application" then choose "I have an application" and select your GitHub or GitLab repository where your Ackee app is located.

Select "MongoDB" service then choose a version. Give the database a name and continue with "Next".

Click on "Deploy".

Chat with Qovery developers on [Discord](https://discord.qovery.com) if you need help.

## With Render

You can use [Render's](https://render.com/) one-click deploy button to get up and running with Ackee in minutes.

Click **Deploy to Render** below and follow the prompts to set up Ackee on Render.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/render-examples/ackee)

Once your deploy has finished, you are ready to start using Ackee! Visit the URL for your service to login. You can get your login credentials from the `ACKEE_USERNAME` and `ACKEE_PASSWORD` environment variables in the **Environment** tab of your service. By default, your username will be `render` and your password will be a randomly generated string.

## With Railway

You can use the [Railway](https://railway.app/) button for a one-click deployment and have Ackee running within minutes.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/starters/ackee)

Upon clicking the button, you will be asked to set the `ACKEE_USERNAME` and `ACKEE_PASSWORD` environment variables. Once you do that, everything should just work on it's own. Railway will automatically provision the MongoDB database for you and also link it to your Ackee deployment!

## With Koyeb

[Koyeb](https://www.koyeb.com) is a developer-friendly serverless platform to deploy apps globally. The platform lets you seamlessly run Docker containers, web apps, and APIs with git-based deployment, native autoscaling, free SSL, a global edge network, and built-in service mesh and discovery.

### 1. Configure Ackee

- You need to have a MongoDB instance running (e.g. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Ensure that you're using the correct CORS headers by setting [`ACKEE_ALLOW_ORIGIN`](CORS%20headers.md#platforms-as-a-service-configuration)
- Have the [Koyeb CLI](https://www.koyeb.com/docs/cli/installation) installed which is the fastest way to deploy Ackee

### 2. Deploy Ackee

Before deploying Ackee on Koyeb, create three secrets to securely store your Ackee username, password, and your MongoDB URL.
In your terminal execute the following to create the secrets:

```sh
$ koyeb secret create mongodb-url
✔ Enter your secret: mongodb://<username>:<password>@<host>:<port>/<db>

$ koyeb secret create ackee-username
✔ Enter your secret: <ackee_username>

$ koyeb secret create ackee-password
✔ Enter your secret: <ackee_password>
```

Once you’ve created the secrets, you can deploy Ackee. In your terminal run the following command to create a new Koyeb App and deploy the Ackee service.

```sh
koyeb app init ackee --docker electerious/ackee --ports 3000:http --routes /:3000 --env ACKEE_USERNAME=@ackee-username --env ACKEE_PASSWORD=@ackee-password --env ACKEE_MONGODB=@mongodb-url --env ACKEE_ALLOW_ORIGIN="https://example.com"
```

Your Ackee service is being deployed. To retrieve the Ackee URL run:

```
$ koyeb app get ackee
ID                                  	NAME     	DOMAINS                         	UPDATED AT
30de8301-05b1-4131-a842-28e608900000	ackee   	ackee-<YOUR_KOYEB_ORG>.koyeb.app	2021-07-06 11:58:01.143967 +0000 UTC
```

Open the URL to access Ackee.

## With Easypanel

[Easypanel](https://easypanel.io) it's a modern server control panel. You can use it to deploy Ackee on your own server.

[![Deploy to Easypanel](https://easypanel.io/img/deploy-on-easypanel-40-outline.svg)](https://easypanel.io/docs/templates/ackee)

1. Create a VM that runs Ubuntu on your cloud provider.
2. Install Easypanel using the instructions from the website.
3. Create a new project.
4. Install Ackee using the dedicated template.
