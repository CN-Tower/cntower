/**
 *  requirejs config file
 */

require.config({
    baseUrl: requirePath.ROOTURL, /* www */
    paths: {
        'jquery': 'components/jquery/dist/jquery.min',
        'bootstrap': 'components/bootstrap/dist/js/bootstrap.min',
        'common': '/js/common',
        'angular': 'components/angular/angular.min',
        'angular-route': 'components/angular-route/angular-route.min',
        'angular-resource': 'components/angular-resource/angular-resource.min',
        'lodash': 'components/lodash/lodash',
        'lazyload': 'components/jquery_lazyload/jquery.lazyload'
    },
    urlArgs: requirePath.JSVERSION,
    shim: {
        'bootstrap': ['jquery'],
        'jquery': {
            exports: '$'
        },
        'angular-route': ['angular'],
        'lazyload': {
            deps: ['jquery']
        }
        //'lazyload': ['jquery']
    }
});
