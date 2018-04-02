define(function(require, exports, module) {
    'use strict';

    // 模板
    var tpls = {
        index: require('../../tpl/login/index')
    };

    var login = function() {};

    $.extend(login.prototype, {
        init: function() {
            $('#app').empty().html(template.compile(tpls.index)());
        }
    });

    var _login = new login();

    exports.init = function() {
        _login.init();
    };
});