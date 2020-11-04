# Contributing

Thanks for taking the time to contribute to this project!

## How to help?

There are multiple tasks you can do in order to help us, for example:

- fill an issue to report bugs or your specific needs
- contribute to existing issues
- write a PR to improve the project

## Contributing workflow

In order to make a code contribution, create a fork of Ackee by clicking the "Fork" button on [GitHub](https://github.com/electerious/Ackee) and cloning the repo to your local machine.

Please use the `develop` branch as a base for your contribution and make your changes on a new branch.

Ensure that you open an issue to discuss the changes before submitting a PR.

Once you're finished, push your branch to your repo and create a pull request!

## Development mode

Simply run Ackee with `NODE_ENV` set to `development` to get access to the [GraphQL Playground](https://docs.ackee.electerious.com/#/docs/API#playground). You can do this by adding `NODE_ENV=development` to the environment of your `docker-compose.yml` or by running:

```sh
yarn start:dev
```

## Linting

[ESlint](https://eslint.org/) is used for linting. It's recommended to add the corresponding extension to your editor. It's also possible to run the `lint` task with the following command:

```sh
yarn lint
```

## Testing

To make sure your changes didn't break anything, use the `test` task to run all tests:

```sh
yarn test
```

That's it, happy coding!
