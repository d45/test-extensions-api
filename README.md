# Test website


## Building

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

### Installation

After installing [yarn](https://yarnpkg.com/) and [nodejs](https://nodejs.org/en/download/package-manager), run

```
$ yarn
```

from the `website` subfolder within this repository.

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Creating a Pull Request

To get your changes merged, create a Pull Request.
Github Actions are configured to automatically test for changes.
For simple typo or wording fixes, you don't need a peer review - feel free to just go ahead and merge.
For actual new content, we encourage to get at least one peer review.

Documentation changes which apply right away to the already available Hyper version should be merged directly to `main`.
If your documentation only applies to the upcoming Hyper version, merge your changes into the `upcoming` branch instead.

### Deployment

As soon as your pull request to https://github.com/tableau/test-extensions-api is merged to `main`, the new web page will be deployed automatically within a couple of minutes.
