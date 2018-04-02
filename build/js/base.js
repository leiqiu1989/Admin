define("base", [], function() {
    var basicUrl = '../js';

    seajs.config({
        base: basicUrl,
        charset: 'utf-8',
        alias: {
            ajaxform: 'plugin/jquery.form.js',
            underscore: 'plugin/underscore-min.js',
            api: 'common/api.js',
            app: 'app.js',
            router: 'common/router.js',
            common: 'common/common.js',
            map: 'common/map.js'
        }
    });
});
seajs.use("base");