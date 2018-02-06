
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
