# Contributing

Thanks for taking the time to contribute to this project!

## How to help?

There are multiple tasks you can do in order to help us, for example:

- file an issue to report bugs or your specific needs
- contribute to existing issues
- write a PR to improve the project

## Contributing workflow

In order to make a code contribution, create a fork of Ackee by clicking the "Fork" button on [GitHub](https://github.com/electerious/Ackee) and cloning the repo to your local machine.

Please use the `develop` branch as a base for your contribution and make your changes on a new branch.

Ensure that you open an issue to discuss the changes before submitting a PR.

Once you're finished, push your branch to your repo and create a pull request!

## Development mode

Simply run Ackee with `NODE_ENV` set to `development` to get access to [Apollo Sandbox](https://docs.ackee.electerious.com/#/docs/API#playground). You can do this by adding `NODE_ENV=development` to the environment of your `docker-compose.yml` or by running:

```sh
npm run dev
```

## Code Quality

### Linting and Formatting

Ackee uses [ESLint](https://eslint.org/) for linting and [Prettier](https://prettier.io/) for code formatting. It's recommended to add the corresponding extensions to your editor.

To check for linting and formatting issues, run:

```sh
npm run lint
```

To automatically fix linting issues and format your code before committing, run:

```sh
npm run format
```

## Testing

Tests require Node.js 24.12+ or 26+ and use an in-memory MongoDB instance. No separate MongoDB server is needed for tests.

To make sure your changes didn't break anything, use the `test` task to run all tests:

```sh
npm run test
```

That's it, happy coding!
