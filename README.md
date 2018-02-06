
![CircleCI](https://circleci.com/gh/fairlance/frontend.svg?style=shield&circle-token=9b0675253c5da2ddfe28bec4067e841c94c0a44c
 "")


# Fairlance frontend aurelia-skeleton-webpack


```shell
npm install
```

```shell
npm start
```
## Bundling

To build a development bundle (output to /dist) execute:

```shell
npm run build
```

To build an optimized, minified production bundle (output to /dist) execute:

```shell
npm run build:prod
```

To test either the development or production build execute:

```shell
npm run server:prod
```

The production bundle includes all files that are required for deployment.

## Resource and bundling configuration

You may want to separate out parts of your code to other files.
This can be done by specifying a build resource object inside `package.json`. 

For example, if you wanted to lazy-load the /users path of the skeleton you could define it as follows:

```js
// (package.json)
"aurelia": {
  "build": {
    "resources": [
      {
        "path": "users",
        "bundle": "users",
        "lazy": true
      }
    ]
  }
},
```

The "path" field can be either a string or an array of strings. 
The string should be a path, relative to the src or in case of an external resource, as a require path (e.g. `aurelia-plugin/some-resource.html`).
`.js`, `.ts` and `.html` extensions are optional and will be resolved automatically.
The bundle setting is recursive, therefore any files required by the specified path will also be contained by the bundle, unless they are also contained by another one (iteration is done from first to last resource).

Resources must also be specified in case Aurelia is supposed to load an external file or an external module that was not defined as a resource by any of the dependencies.
Since the syntax is still relatively new, most Aurelia plugins don't define their resources. 
There might also be reasons not to declare those resources, in case the plugin is to be consumed only partially.
If you'd like to use external resources, you should declare them yourself, like so:

```js
// (package.json)
"aurelia": {
  "build": {
    "resources": [
      "aurelia-some-ui-plugin/dropdown",
      "aurelia-some-ui-plugin/checkbox"
    ]
  }
},
```

You can also combine both features to separate out plugins or resources for lazy-loading:

```js
// (package.json)
"aurelia": {
  "build": {
    "resources": [
      {
        "path": "aurelia-animator-css",
        "bundle": "animator",
        "lazy": true
      },


## Running The Unit Tests

To run the unit tests:

```shell
npm test
```

## Running The E2E Tests
Integration tests are performed with [Protractor](http://angular.github.io/protractor/#/).

1. Place your E2E-Tests into the folder ```test/e2e/src```

2. Run the tests by invoking

  ```shell
  npm run e2e
  ```

### Running e2e tests manually

1. Make sure your app runs and is accessible

  ```shell
  WEBPACK_PORT=19876 npm start
  ```

3. Once bundle is ready, run the E2E-Tests in another console

  ```shell
  npm run e2e:start
  ```
