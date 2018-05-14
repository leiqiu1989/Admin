define(function(require, exports, module) {
    var router = require('router');
    var common = require('common');
    var api = require('api');

    var app = {
        _init: function() {
            var me = this;
            router.init({
                beforeLoad: function(mod, href) {
                    var _len = $('#content').size();
                    if (!_len) {
                        require.async('./../tpl/main/index', function(tpl) {
                            $('#app').empty().html(template.compile(tpl)());
                            layui.use('element', function() {
                                var element = layui.element;
                                element.render();
                            });
                            me.selectMenu(href, mod);
                            me.event();
                        });
                    }
                    return true;
                }
            }).run();
        },
        selectMenu: function(href, mod) {
            var currTarget = $('a[href="#' + mod + '/index"');
            if (currTarget.size() > 0 || href.indexOf(mod) > -1) {
                $('ul[lay-filter="sidebar"] dd').removeClass('layui-this');
                currTarget.parent().addClass('layui-this');
                var li = $(currTarget).closest('li');
                if (li.find('dl').size() > 0) {
                    li.siblings().removeClass('layui-nav-itemed');
                    li.addClass('layui-nav-itemed')
                }
            }
        },
        event: function() {
            $('.js-logout').on('click', function() {
                common.layConfirm('确认退出系统？', function() {
                    common.ajax(api.logOut, {}, function(res) {
                        if (res && res.success) {
                            common.changeHash('#login/index');
                        }
                    });
                });
            });
        }
    };
    module.exports = app;
});