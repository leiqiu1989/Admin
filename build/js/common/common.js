define(function(require, exports, module) {
    'use strict';

    var api = require('api');
    require('underscore');

    /*js对象扩展*/
    Date.prototype.format = function(format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };

    /**********template helper 公共方法***********/
    template.helper('formateDate', function(key, format) {
        format = format || 'yyyy/MM/dd';
        return !key ? '' : new Date(key).format(format);
    });

    /*公共js*/
    var common = {
        // 弹出框
        layUIDialog: function(opt) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.open($.extend(opt, { offset: '60px' }));
            });
        },
        // 初始化form
        renderForm: function() {
            layui.use('form', function() {
                var form = layui.form;
                form.render();
            });
        },
        // 初始化日期
        initDateTime: function(opt) {
            layui.use('laydate', function() {
                var laydate = layui.laydate;
                laydate.render(opt);
            });
        },
        // 渲染右侧区域
        renderContent: function(tpl) {
            $('#content').removeAttr('style').empty().html(template.compile(tpl)());
        },
        // 自动转换为带时分秒的日期字符串
        transferDateTime: function(time) {
            var result = time;
            if (_.isString(time)) {
                var date = Date.parse(time);
                if (!isNaN(date)) {
                    result = new Date(date);
                }
            }
            if (_.isNumber(time)) {
                result = new Date(time);
            }
            if (_.isDate(result)) {
                return result.format('yyyy-MM-dd hh:mm:ss');
            }
            return result;
        },
        // 检查日期（日期可为空，可不为空）
        checkMayBeEmptyTime: function(startTime, endTime) {
            if (!startTime && !endTime) {
                return true;
            } else if (!startTime || !endTime) {
                this.toast('日期不能为空!');
                return false;
            } else {
                var rtObj = this.equalsTime(startTime, endTime);
                if (!rtObj.result) {
                    this.toast('开始日期不能大于结束日期!');
                }
                return rtObj.result;
            }
        },
        equalsTime: function(startTime, endTime) {
            if (_.isString(startTime)) {
                startTime = Date.parse(startTime.replace(/-/g, "/"));
            } else {
                startTime = Date.parse(startTime);
            }
            if (_.isString(endTime)) {
                endTime = Date.parse(endTime.replace(/-/g, "/"));
            } else {
                endTime = Date.parse(endTime);
            }
            var millisecond = endTime - startTime;
            return {
                result: millisecond > 0,
                diffTimes: millisecond
            }
        },
        // 检查日期（日期为必填）
        checkTime: function(dateTime, ct, interVals) {
            if (!dateTime || !ct) {
                common.toast('日期不能为空！');
                return false;
            }
            var equalResult = this.equalsTime(ct, dateTime);
            if (interVals) {
                var times = interVals * 24 * 60 * 60 * 1000;
                if (!equalResult.result || equalResult.diffTimes > times) {
                    common.toast('时间周期必须小于或等于' + interVals + '天!');
                    return false;
                }
            }
            if (!equalResult.result) {
                common.toast('结束日期必须大于或者开始日期!');
                return false;
            }
            return true;
        },
        // 区间日期,intervals间隔的天数
        initBetweenDateTime: function(startEl, endEl, interVals) {
            var currentDate = new Date().format('yyyy/MM/dd H:m');
            var opts = {
                lang: 'ch',
                timepicker: true,
                format: 'Y/m/d H:i'
            };
            var startOpts = $.extend({}, opts, {
                maxDate: currentDate
            });
            var endOpts = $.extend({}, opts, {
                maxDate: currentDate
            });
            $(startEl).datetimepicker(startOpts);
            $(endEl).datetimepicker(endOpts);
        },
        // 序列化参数
        serialParam: function(data) {
            var str = '';
            if (data && _.isObject(data)) {
                $.each(data, function(key, value) {
                    str += key + '=' + value + '&';
                });
            }
            return str.substring(0, str.length - 1);
        },
        // 更改hash
        changeHash: function(url, param) {
            var timeStamp = param ? '&' : '/';
            window.location.hash = url + this.serialParam(param) + timeStamp + 'time=' + (new Date()).valueOf();
        },
        // 清除sid
        clearData: function() {
            this.setCookie('abc-sid', null, -1);
        },
        // 遮罩层
        loading: function(status, content) {
            content = content || '加载中...';
            status = status || 'show';
            if ($('#glb_loading').size() < 1 && $('#glb_loading_msg').size() < 1) {
                $('<div id="glb_loading"></div>').appendTo('body');
                $('<div id="glb_loading_msg">' + content + '</div>').appendTo('body');
            }
            if (status === 'show') {
                $('#glb_loading,#glb_loading_msg').show();
            } else {
                $('#glb_loading,#glb_loading_msg').hide();
            }
        },
        // set cookie
        setCookie: function(name, value, expireDay) {
            expireDay = expireDay || 7;
            $.cookie(name, value, {
                expires: expireDay
            });
        },
        // get cookie
        getCookie: function(name) {
            return $.cookie(name);
        },
        // set locationStorage
        setlocationStorage: function(key, value) {
            window.localStorage.setItem(key, value);
        },
        // get locationStorage
        getlocationStorage: function(key) {
            return window.localStorage.getItem(key);
        },
        // remove locationStorage
        removeLocationStorage: function(key) {
            window.localStorage.removeItem(key);
        },
        getElValue: function(el, type) {
            type = type || 'value';
            if (type === 'value') {
                return $.trim($(el).val());
            } else {
                return $.trim($(el).text());
            }
        },
        setElValue: function(el, value) {
            $(el).val(value);
        },
        // 获取表单提交数据
        getFormData: function(el) {
            var inputs = $(el).find(':input').not('[data-nosubmit="true"]');
            var formData = {};
            $(inputs).each(function(index, input) {
                var name = null,
                    value = null;
                name = $(input).attr('name');
                if (name) {
                    if ($(input).is(':checkbox')) {
                        var isChecked = $(input).is(':checked');
                        value = isChecked ? $(input).data('chkvalue') : $(input).data('unchkvalue');
                    } else if ($(input)[0].tagName === 'SELECT') {
                        value = $(input).children('option:selected').val();
                    } else {
                        value = $(input).val();
                    }
                    formData[name] = value;
                }
            });
            return formData;
        },
        setFormData: function(el, data) {
            if (data && !$.isEmptyObject(data)) {
                var inputs = $(el).find(':input');
                var name = null;
                $(inputs).each(function(index, input) {
                    name = $(input).attr('name');
                    if (name) {
                        if ($(input)[0].tagName === 'SELECT') {
                            $(input).val(data[name]);
                        } else {
                            $(input).val(data[name]);
                        }
                    }
                });
            }
        },
        getQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        getBundle: function() {
            var urls = Array.prototype.slice.call(arguments);
            var requests = $.map(urls, function(item) {
                if (_.isString(item)) {
                    return $.get(item);
                } else {
                    return item.done ? item : $.get(item.url, item.data);
                }
            });
            var deferred = $.Deferred();
            $.when.apply($, requests).done(function() {
                var args = _.toArray(arguments);
                var result = _.map(args, function(prop) {
                    return _.isArray(prop) ? (prop[1] === 'success' ? prop[0] : prop) : prop;
                });
                deferred.resolve.apply(deferred, result);
            }).fail(function() {
                deferred.reject(arguments);
            });
            return deferred.promise();
        },
        // ajax封装
        ajax: function(url, param, callback, opt) {
            var me = this;
            param = param || {};
            opt = opt || {};
            var sid = this.getCookie('abc-sid');
            if (sid) {
                opt = $.extend({
                    headers: {
                        'abc-sid': sid
                    }
                }, opt);
            }
            this.loading();
            return $.ajax($.extend({
                    type: "POST",
                    url: url,
                    data: param,
                    dataType: 'json',
                    cache: false,
                    success: function(res) {
                        if (callback && typeof callback === 'function') {
                            callback.call(this, res);
                        }
                    },
                    error: function(a, b, c) {
                        debugger;
                    }
                }, opt))
                .always(function() {
                    me.loading('hide');
                });
        }
    };
    return common;
});