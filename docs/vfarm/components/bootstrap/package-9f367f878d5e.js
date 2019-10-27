// package metadata file for Meteor.js

/* jshint strict:false */
/* global Package:true */

Package.describe({
  name: 'twbs:bootstrap',  // http://atmospherejs.com/twbs/bootstrap
  summary: 'The most popular front-end framework for developing responsive, mobile first projects on the web.',
  version: '3.3.7',
  git: 'https://github.com/twbs/bootstrap.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');
  api.use('jquery', 'client');
  var assets = [
    'dist/fonts/glyphicons-halflings-regular-f4769f9bdb74.eot',
    'dist/fonts/glyphicons-halflings-regular-f72146688399.svg',
    'dist/fonts/glyphicons-halflings-regular-e18bbf611f2a.ttf',
    'dist/fonts/glyphicons-halflings-regular-fa2772327f55.woff',
    'dist/fonts/glyphicons-halflings-regular-448c34a56d69.woff2'
  ];
  if (api.addAssets) {
    api.addAssets(assets, 'client');
  } else {
    api.addFiles(assets, 'client', { isAsset: true });
  }
  api.addFiles([
    'dist/css/bootstrap-a28e9034f127.css',
    'dist/js/bootstrap-bed87d23107c.js'
  ], 'client');
});
