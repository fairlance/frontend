// this file provides a list of unbundled files that
// need to be included when exporting the application
// for production.
module.exports = {
  'list': [
    "index.html",
    "config.js",
    "favicon.ico",
    "LICENSE",
    "jspm_packages/system.js",
    "jspm_packages/system-polyfills.js",
    "jspm_packages/system-csp-production.js",
    "styles/main.css",
    "jspm_packages/github/github/fetch@0.11.0.js",
    "jspm_packages/github/github/fetch@0.11.0/fetch.js",
    "jspm_packages/github/genadis/aurelia-mdl@0.1.2/mdl.js",
    "jspm_packages/github/genadis/encapsulated-mdl@2.1.1.js",
    "jspm_packages/github/genadis/encapsulated-mdl@2.1.1/material.min.js",
    "jspm_packages/github/systemjs/plugin-text@0.0.3.js",
    "jspm_packages/github/systemjs/plugin-text@0.0.3/text.js",
    "node_modules/material-design-lite/material.css",
    "dist/assets/**/*.*"
  ],
  // this section lists any jspm packages that have
  // unbundled resources that need to be exported.
  // these files are in versioned folders and thus
  // must be 'normalized' by jspm to get the proper
  // path.
  'normalize': [
    [
      // include font-awesome.css and its fonts files
      'font-awesome', [
      '/css/font-awesome.min.css',
      '/fonts/*'
      ]
    ]
  ]
};