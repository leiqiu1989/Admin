define(function(require, exports, module) {
    var router = require('router');
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
                            me.selectMenu(href);
                        });
                    }
                    return true;
                }
            }).run();
        },
        selectMenu: function(href) {
            var currTarget = $('a[href="#' + href + '"');
            if (currTarget.size() > 0) {
                $('ul[lay-filter="sidebar"] dd').removeClass('layui-this');
                currTarget.parent().addClass('layui-this');
                var li = $(currTarget).closest('li');
                if (li.find('dl').size() > 0) {
                    li.siblings().removeClass('layui-nav-itemed');
                    li.addClass('layui-nav-itemed')
                }
            }
        },
    };
    module.exports = app;
});