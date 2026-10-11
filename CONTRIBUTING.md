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

## Team workflow

Version 2.0 is built by the Traceless Squad team. Our process, in short:

1. Every change starts as a ticket `ACKEE-N` on the Trello board, with acceptance criteria.
2. One ticket, one branch from `develop`: `feature/ACKEE-N-short-name`.
3. Small commits, each subject starts with the ticket: `ACKEE-10 Add the sign-up form`.
4. A pull request into `develop`, filled in from the template, with the Definition of Done ticked.
5. CI has to be green and at least one teammate has to approve. Nobody pushes to `develop` or `master` directly.
6. The branch is merged with a merge commit and deleted; the card moves to Done.

Enable the git hooks once after cloning. They lint the staged files and check the commit subject:

```sh
git config core.hooksPath .githooks
```

Details: [coding standards](docs/engineering/coding-standards.md), [CI/CD](docs/engineering/ci-cd.md).

## Development mode

Simply run Ackee with `NODE_ENV` set to `development` to get access to the [GraphQL Playground](https://docs.ackee.electerious.com/#/docs/API#playground). You can do this by adding `NODE_ENV=development` to the environment of your `docker-compose.yml` or by running:

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

To make sure your changes didn't break anything, use the `test` task to run all tests:

```sh
npm run test
```

That's it, happy coding!
