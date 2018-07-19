/**
 *  requirejs config file
 */

require.config({
    baseUrl: requirePath.ROOTURL, /* www */
    paths: {
        'jquery': 'components/jquery/dist/jquery.min',
        'bootstrap': 'components/bootstrap/dist/js/bootstrap.min',
        'common': 'static/js/common'
    },
    urlArgs: requirePath.JSVERSION,
    shim: {
        'bootstrap': ['jquery'],
        'jquery': {
            exports: '$'
        }
    }
});
