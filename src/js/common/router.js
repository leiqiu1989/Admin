define(function(require, exports, module) {
    function router() {}

    $.extend(router.prototype, {
        init: function(options) {
            this.beforeLoad = options.beforeLoad || $.noop;
            this.callback = options.callback || $.noop;
            return this;
        },

        run: function() {

            function getHash() {
                var hash = window.location.hash.replace('#', '');
                return hash ? hash : 'main/index';
            }

            function getModule() {
                var hash = getHash(),
                    arr = hash.split('/'),
                    len = arr.length;

                if (hash.indexOf('=') == -1) {
                    return hash;
                }

                return arr.splice(0, len - 1).join('/');
            }

            function getParam() {
                var hash = getHash(),
                    arr = hash.split('/'),
                    len = arr.length,
                    str = arr[arr.length - 1] || arr.splice(-1);

                if (hash.indexOf('=') == -1) {
                    return {};
                }

                var arr = str[0].split('&'),
                    obj = {};

                for (var i = 0, ii = arr.length; i < ii; ++i) {
                    obj[arr[i].split('=')[0]] = arr[i].split('=')[1];
                }

                return obj;
            }

            //监听hash变化
            window.onhashchange = function() {
                if (!getParam().lg) {
                    this.loadmodule(getModule(), getParam());
                }
            }.bind(this);
            //初始化
            this.loadmodule(getModule(), getParam());
        },

        loadmodule: function(action, param) {
            var me = this;
            var flag = true;
            var mod = action.split('/')[0];
            if (typeof this.beforeLoad === 'function') {
                flag = this.beforeLoad(mod, action);
            }
            if (flag) {
                //加载module目录下对应的模块
                require.async(['./../', action].join('/'), function(o) {
                    if (o) {
                        //运行当前模块
                        o.init(param);
                    } else {
                        console.log('模块加载失败！');
                    }
                });
            }
        }
    });

    module.exports = new router();
});