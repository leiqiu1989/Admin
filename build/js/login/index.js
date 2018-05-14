define(function(require, exports, module) {
    'use strict';
    var common = require('common');
    var api = require('api');

    // 模板
    var tpls = {
        index: require('../../tpl/login/index')
    };

    var login = function() {};

    $.extend(login.prototype, {
        init: function() {
            $('#app').empty().html(template.compile(tpls.index)());
            common.renderForm(function(form) {
                form.on('submit(*)', function(data) {
                    common.loading();
                    var submitData = data.field;
                    var url = api.login;
                    common.ajax(url, submitData, function(res) {
                        common.closeAllLayer();
                        if (res && res.success) {
                            var token = res.Token;
                            common.changeHash('#main/index');
                        } else {
                            common.layAlert('系统登陆失败');
                            return false;
                        }
                    });
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                });
            });
        }
    });

    var _login = new login();

    exports.init = function() {
        _login.init();
    };
});