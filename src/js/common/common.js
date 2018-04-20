define(function(require, exports, module) {
    'use strict';

    var api = require('api');
    var map = require('map');
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
        // message
        layMsg: function(content) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.msg(content, {
                    offset: 't'
                });
            });
        },
        layAlert: function(content, opt) {
            opt = opt || {};
            var options = $.extend({ icon: 2 }, opt);
            layer.alert(content, options);
            return false;
        },
        // 确认框
        layConfirm: function(content, callback) {
            layer.confirm(content, {
                btn: ['确定', '取消'] //按钮
            }, function() {
                callback && callback();
                layer.closeAll();
            }, function() {
                layer.closeAll();
            });
        },
        // 初始化form
        renderForm: function(callback) {
            layui.use('form', function() {
                var form = layui.form;
                // 自定义验证
                form.verify({
                    int: [
                        /^\+?[1-9][0-9]*$/, '只能输入大于0的正整数'
                    ]
                });
                form.render();
                if (callback) {
                    callback(form);
                }
            });
        },
        // 获取表格选择的行
        getSelectedRow: function(table, tableId) {
            var checkStatus = table.checkStatus(tableId);
            var len = checkStatus.data.length;
            if (len !== 1) {
                this.layAlert('请选择一条数据进行操作!');
                return {
                    success: false
                };
            }
            var data = checkStatus.data[0];
            return {
                success: true,
                data: data
            };
        },
        // 经纬度分割
        transLngLat: function(lnglat) {
            if (lnglat) {
                var _lnglat = lnglat.split(',');
                return { Lng: parseFloat(_lnglat[0]), Lat: parseFloat(_lnglat[1]) };
            }
            return {};
        },
        // 设置radio和checkbox选中
        setRadioCheckValue: function(container, filters) {
            filters = filters || [];
            _.each(filters, function(filter, i) {
                $(container).find(filters[i]).attr('checked', true);
            });
        },
        // 初始化下拉框
        initSelect: function(opt) {
            opt = opt || {
                el: '',
                data: [],
                textField: opt.textField || 'name',
                valueField: opt.valueField || 'value',
                selectValue: ''
            };
            var html = '';
            $.each(opt.data, function(index, item) {
                var _value = item[opt.valueField];
                html += (opt.selectValue && opt.selectValue == _value) ?
                    '<option value="' + item[opt.valueField] + '" selected>' + item[opt.textField] + '</option>' :
                    '<option value="' + item[opt.valueField] + '">' + item[opt.textField] + '</option>'
            });
            $(opt.el).empty().html(html);
        },
        // 初始化日期
        initDateTime: function(opt) {
            layui.use('laydate', function() {
                var laydate = layui.laydate;
                laydate.render(opt);
            });
        },
        // 渲染右侧区域
        renderContent: function(tpl, data) {
            data = data || {};
            $('#content').removeAttr('style').empty().html(template.compile(tpl)(data));
        },
        // 树查询
        searchTree: function(treeId, txt) {
            var outNodeList = null;
            var nodeList = null;

            var zTree = $.fn.zTree.getZTreeObj(treeId);
            if (txt) {
                nodeList = zTree.getNodes();
                nodeList = zTree.transformToArray(nodeList);
                zTree.hideNodes(nodeList); //先隐藏所有节点
                nodeList = zTree.getNodesByParamFuzzy("ADNM", txt);
                outNodeList = zTree.getNodesByParamFuzzy("ADNM", txt);
                for (var i = 0; i < nodeList.length; i++) {
                    findParent(zTree, nodeList[i]); //递归获取父节点
                    findChild(zTree, nodeList[i]); //递归获取子节点
                }
            } else {
                outNodeList = zTree.transformToArray(zTree.getNodes());
            }
            zTree.showNodes(outNodeList); //再展示匹配到的节点

            function findParent(zTree, node) {
                var pNode = node.getParentNode();
                if (pNode) {
                    outNodeList.push(pNode);
                    findParent(zTree, pNode);
                }
            }

            function findChild(zTree, node) {
                var pNodes = node.children;
                if (pNodes) {
                    for (var i = 0; i < pNodes.length; i++) {
                        outNodeList.push(pNodes[i]);
                        findChild(zTree, pNodes[i]);
                    }
                }
            }
        },
        // 初始化区域
        initTree: function(opt) {
            var me = this;
            opt = opt || {
                url: null,
                param: {},
                treeId: null,
                idKey: null,
                pIdKey: null,
                dataFilter: $.noop,
                callback: $.noop,
                hasSearchClick: false,
                expandFlag: false,
                checkEnable: false
            };
            var setting = {
                view: {
                    selectedMulti: false
                },
                check: {
                    enable: opt.checkEnable
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: opt.idKey,
                        pIdKey: opt.pIdKey,
                        rootPId: null
                    },
                    key: {
                        name: opt.name
                    }
                },
                callback: {
                    onClick: opt.callback
                }
            };
            me.ajax(opt.url, opt.param, function(res) {
                if (res.IsSuccess) {
                    var data = res.Data || [];
                    if (opt.dataFilter) {
                        data = opt.dataFilter(data);
                    }
                    $.fn.zTree.init($('#' + opt.treeId), setting, data);
                    var zTree = $.fn.zTree.getZTreeObj(opt.treeId);
                    zTree.expandAll(opt.expandFlag);
                    if (opt.hasSearchClick) {
                        // 绑定事件
                        $('#btnSearchTree').on('click', function() {
                            var txt = $.trim($(':text[name="treeText"]').val());
                            me.searchTree(opt.treeId, txt);
                        });
                    }
                }
            });
        },
        // 区域和地图弹出框选择
        areaMapDialog: function(containerEl, mapCallBack, treeCallBack) {
            var me = this;

            $(containerEl).off()
                // 选择区域
                .on('click', '#choseArea', function() {
                    var areaCode = null,
                        areaName = null;
                    var tpl = require('../../tpl/common/areaIndex');
                    me.layUIDialog({
                        title: '区域选择',
                        type: 1,
                        content: tpl,
                        area: ['300px', '500px'],
                        success: function(layerEl) {
                            me.initTree({
                                url: api.getAreaList,
                                param: {},
                                treeId: 'commonTree',
                                idKey: 'ADCD',
                                pIdKey: 'ParentCode',
                                name: 'ADNM',
                                hasSearchClick: true,
                                callback: function(e, treeId, treeNode) {
                                    areaCode = treeNode.ADCD;
                                    areaName = treeNode.ADNM;
                                }
                            });
                        },
                        btnAlign: 'r',
                        btn: ['确 定', '关 闭'],
                        yes: function(index) {
                            treeCallBack && treeCallBack(areaCode, areaName);
                            layer.close(index)
                        },
                        btn2: function(index) {
                            layer.close(index)
                        }
                    });
                    return false;
                })
                // 选择地图
                .on('click', '#choseLngLat', function() {
                    var _point = null;
                    var tempData = $(this).prev(':text[name="lnglat"]').data('lnglat')
                    var lng = tempData ? tempData.lng : null;
                    var lat = tempData ? tempData.lat : null;
                    me.layUIDialog({
                        title: '添加标注点',
                        type: 1,
                        content: '<div id="dialogMap" class="full"></div>',
                        area: ['500px', '450px'],
                        success: function() {
                            map.init('dialogMap', null, function() {
                                if (lng && lat) {
                                    var point = new BMap.Point(lng, lat);
                                    var marker = new BMap.Marker(point);
                                    marker.enableDragging();
                                    map.getMap().addOverlay(marker);
                                    _point = point;
                                    dragEvent(marker);
                                }
                            });
                        },
                        btnAlign: 'r',
                        btn: ['添加标注点', '关 闭'],
                        yes: function() {
                            var _map = map.getMap();
                            map.clearOverlays();
                            var mkrTool = new BMapLib.MarkerTool(_map, { autoClose: true, followText: "添加标注点" });
                            mkrTool.open();
                            mkrTool.addEventListener("markend", function(e) {
                                _point = e.marker.point;
                                e.marker.enableDragging();
                                dragEvent(e.marker);
                                mkrTool.close();
                            });
                        },
                        btn2: function(index) {
                            if (_point) {
                                mapCallBack && mapCallBack(_point);
                            }
                            layer.close(index)
                        }
                    });
                    return false;

                    function dragEvent(marker) {
                        marker.addEventListener('dragend', function(e) {
                            _point = e.point;
                        });
                    }
                });
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
            this.loading();
            return $.ajax($.extend({
                    type: opt.type || 'GET',
                    url: url,
                    data: param,
                    dataType: 'json',
                    cache: false,
                    success: function(res) {
                        // 代表未登陆
                        if (res && res.ErrorCode) {
                            var msg = res.Message || '系统错误,请联系管理员';
                            me.layAlert(msg, {
                                yes: function(index) {
                                    layer.close(index)
                                    me.changeHash('#login/index');
                                }
                            });
                        }
                        if (callback && typeof callback === 'function') {
                            callback.call(this, res);
                        }
                    },
                    error: function(a, b, c) {}
                }, opt))
                .always(function() {
                    me.loading('hide');
                });
        },
        $: function(el, container) {
            container = container || '#content'
            return $(container).find(el);
        }
    };
    return common;
});