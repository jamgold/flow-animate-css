Package.describe({
  name: 'jamgold:flow-animate-css',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'Simple module to wait for animate.css animations before changing routes',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/jamgold/flow-animate-css.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.6');
  api.use('ecmascript');
  api.mainModule('flow-animate-css.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('flow-animate-css');
  api.mainModule('flow-animate-css-tests.js');
});
