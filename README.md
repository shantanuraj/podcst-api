# [podcst-api](https://data.podcst.app)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Podcst API is a thin wrapper around the iTunes Search API.

It also offers a robust JSON feed parser for RSS podcast feeds.
The API optionally connects to a Redis instance to cache the responses.

The aim of this project is to provide an API for the [podcst.app](https://podcst.app) website.
Also [open-source](https://github.com/shantanuraj/podcst-web).

## Architecture

This project uses the [gitflow](https://github.com/nvie/gitflow) branching model.
See the [development](#development) section below for additional details.

- [master](https://github.com/shantanuraj/podcst-api/tree/master) is the production branch
- [develop](https://github.com/shantanuraj/podcst-api/tree/develop) is the active branch where commits are made

### Prerequisites

* [Node](https://nodejs.org/)   - node version 8+ for using latest ES2016+ featuers
* [yarn](https://yarnpkg.com/)  - package manager

### Getting the Source Code

Once the prerequisites are installed on your system, you can clone this repository with `git` and install the code dependencies using `yarn`.

```bash
git clone https://github.com/shantanuraj/podcst-api
yarn
```

## Development

The project uses the excellent [now CLI](https://github.com/zeit/now-cli) tool from [zeit.co](https://zeit.co).

```bash
# dev invokes the `now dev` command to run a local server on port 3000
yarn dev
```

> **Note:** Code changes are hot-reloaded when running `yarn dev`.

## Running Unit Tests

None yet but when they (hopefully exist)

```bash
yarn test
```

## Deployment

The production releases of this website will be hosted on AWS

The following steps, documented here for reference, they require authorized credentails for AWS.
These can only be done by an AWS account administrator (such as [shantanuraj](https://github.com/shantanuraj)).


```shell
# deploy invokes the `now` command to deploy the code to Zeit's infrastructure
yarn deploy
```

## Built With

* [TypeScript](https://www.typescriptlang.org/) - ***Much Nicer JavaScript***
* [Koa](https://koajs.com/) - Simple Web-server
* [now](https://zeit.co/now) - Serverless deployments

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for process details on
collaborating on this project.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For available versions of this softare, see the ([releases on this repository](https://github.com/shantanuraj/podcst-api/releases)).

## Authors

See the list of [contributors][Contributor List] who participated in this project.

[Contributor List]:https://github.com/shantanuraj/podcst-api/contributors

## License

This project is licensed under the MIT License - see the
[LICENSE](LICENSE.md) file for details

## Acknowledgments

* [README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
