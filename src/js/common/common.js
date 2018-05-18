define(function(require, exports, module) {
    'use strict';

    var api = require('api');
    var map = require('map');
    var constVal = require('constVal');
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
        // dialog
        layUIDialog: function(opt) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.open($.extend(opt, { offset: opt.offset || '60px' }));
            });
        },
        // loading
        loading: function(callback) {
            layer.load(0, {
                shade: [0.2, '#333']
            });
        },
        // close all
        closeAllLayer: function(type) {
            type = type || 'loading'
            layer.closeAll(type); //关闭加载层
        },
        // message
        layMsg: function(content, callback) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.msg(content, {
                    offset: 'auto',
                    icon: 1,
                    time: 2000
                }, function() {
                    callback && callback();
                });
            });
        },
        // alert
        layAlert: function(content, opt) {
            opt = opt || {};
            var options = $.extend({ icon: 2 }, opt);
            layer.alert(content, options);
            return false;
        },
        // confirm
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
        // 数组删除插入
        spliceArrayData: function(opt) {
            opt = opt || {
                sourceArray: [],
                spliceArray: [],
                filterField: ''
            }
            var soruce = _.map(opt.sourceArray, function(item) {
                return item[opt.filterField];
            });
            _.each(opt.spliceArray, function(item) {
                var index = _.indexOf(soruce, item[opt.filterField]);
                opt.sourceArray.splice(index, 1, item);
            });
            return opt.sourceArray;
        },
        // 数组对象过滤指定字段
        filterArray: function(sourceArray, fields) {　
            sourceArray = sourceArray || [];
            fields = fields || [];
            var len = fields.length;
            var array = [];
            _.each(sourceArray, function(item) {
                var result = [];
                for (var i = 0; i < len; i++) {
                    // number类型判断为true
                    var value = item[fields[i]];
                    if (_.isNumber(value)) {
                        result.push(true);
                    } else {
                        result.push(!!value);
                    }
                }
                var flag = _.every(result, _.identity)
                flag && array.push(item);
            });
            return array;
        },
        // 验证频率
        frequencyRangeValidate: function(value) {
            if (!value || !(/^\d+(?:\.\d{1,2})?$/.test(value)) || value < constVal.minFrequency || value > constVal.maxFrequency) {
                return false;
            }
            return true;
        },
        // 实时刷新modem数据
        timingModemData: function(guid, callback) {
            var me = this;
            this.loading();
            setTimeout(function() {
                common.ajax(api.timingData, { guid: guid }, function(res) {
                    if (res && res.IsSuccess) {
                        var modem = res.Data;
                        callback && callback(modem);
                    }
                    me.closeAllLayer();
                });
            }, 20000);
        },
        // 适配器下发命令（白名单，电台，定时广播）
        instructIssue: function(param, oldData, callback) {
            var url = api.instructIssue;
            this.ajax(url, JSON.stringify(param), function(res) {
                if (res && res.success) {
                    var msg = res.msg;
                    common.layMsg(msg);
                    // 下发成功之后，删除IsDelete标识符
                    var delIds = param.delIds;
                    if (delIds) {
                        var delArray = delIds.split('');
                        _.each(delArray, function(id) {
                            var rt = _.find(oldData, function(item) {
                                return item.Id == parseInt(id);
                            });
                            if (rt && _.has(rt, 'IsDelete')) {
                                delete rt['IsDelete']
                            }
                        });
                    }
                    common.timingModemData(param.guid, function(modem) {
                        callback && callback(modem);
                    });
                }
            }, {
                type: 'POST',
                contentType: 'application/json;charset=utf-8'
            });
        },
        // 设备指令下发
        deviceSendIssue: function(param, callback) {
            var me = this;
            var url = api.deviceSendIssue;
            this.ajax(url, JSON.stringify(param), function(res) {
                if (res && res.success) {
                    var msg = res.msg;
                    me.layMsg(msg);
                    callback && callback();
                }
            }, {
                type: 'POST',
                contentType: 'application/json;charset=utf-8'
            });
        },
        // init form
        renderForm: function(callback) {
            var me = this;
            layui.use('form', function() {
                var form = layui.form;
                // 自定义验证
                form.verify({
                    int: [
                        /^\+?[0-9][0-9]*$/, '只能输入大于等于0的正整数'
                    ],
                    double: [
                        /^\d+(?:\.\d{1,2})?$/, '只能输入数字，保留2位小数'
                    ],
                    frequencyRange: function(value) {
                        var rt = me.frequencyRangeValidate(value);
                        if (!rt) {
                            return '频率格式或者范围不正确，有效范围87.00-108.00'
                        }
                    }
                });
                form.render();
                if (callback) {
                    callback(form);
                }
            });
        },
        // 渲染element组件
        renderElement: function(opt) {
            opt = opt || {
                eventFilter: '',
                callback: null
            };
            layui.use('element', function() {
                var element = layui.element;
                element.on(opt.eventFilter, function(data) {
                    opt.callback && opt.callback(data);
                });
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
        // 周期转换函数
        transPeriod: function(period, index) {
            if (period) {
                var charArray = period.split('');
                var rt = !!parseInt(charArray[index], 10);
                return rt ? '<i class="fa fa-check green"></i>' : '';
            }
            return '';
        },
        // 设置radio和checkbox选中
        setRadioCheckValue: function(container, filters) {
            filters = filters || [];
            _.each(filters, function(filter, i) {
                $(container).find(filters[i]).attr('checked', true);
            });
        },
        // 获取select文案
        getSelectText: function(el, containerEl) {
            return this.$(el, containerEl).children('option:selected').text();
        },
        // 赋值表单数据
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
        // 初始化initCode
        initCode: function(el, selVal) {
            var opt = {
                el: el,
                textField: 'name',
                valueField: 'value',
                selectValue: selVal
            };
            var data = [{
                name: '',
                value: ''
            }];
            for (var i = 0; i < 100; i++) {
                var val = i < 10 ? '0' + i : i + '';
                data.push({
                    name: val,
                    value: val
                });
            }
            opt.data = data;
            this.initSelect(opt);
        },
        // 初始化下拉框
        initSelect: function(opt) {
            opt = $.extend({
                el: '',
                data: [],
                textField: opt.textField || 'name',
                valueField: opt.valueField || 'value',
                selectValue: '',
                addEmptyItem: false,
                formatText: null
            }, opt);
            var html = opt.addEmptyItem ? '<option value="">请选择</option>' : '';
            $.each(opt.data, function(index, item) {
                var _value = item[opt.valueField];
                html += (opt.selectValue && opt.selectValue == _value) ?
                    '<option value="' + item[opt.valueField] + '" selected>' + (opt.formatText ? opt.formatText(item) : item[opt.textField]) + '</option>' :
                    '<option value="' + item[opt.valueField] + '">' + (opt.formatText ? opt.formatText(item) : item[opt.textField]) + '</option>'
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
        // 初始化树
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
                expandAllFlag: false, //展开所有菜单
                expandChildFlag: false, //展开子级菜单
                checkEnable: false,
                isDevice: false // 是否是适配器
            };
            if (!opt.isDevice) {
                opt.dataFilter = function(data) {
                    data = _.filter(data, function(item) {
                        return !item.IsDevice;
                    });
                    return data;
                }
            }
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
                    zTree.expandAll(opt.expandAllFlag);
                    if (opt.expandChildFlag) {
                        var nodes = zTree.getNodes();
                        for (var i = 0; i < nodes.length; i++) { //设置节点展开
                            zTree.expandNode(nodes[i], true, false, true);
                        }
                    }
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
        // 递归查找区域全称
        recursionNode: function(ztree, node, areaNameArray) {
            var pNode = node.getParentNode();
            if (pNode) {
                areaNameArray.unshift(pNode.ADNM);
                this.recursionNode(ztree, pNode, areaNameArray);
            }
            return areaNameArray.join('');
        },
        // 地图标点弹出框
        mapDialog: function(containerEl, callBack) {
            var me = this;
            $(containerEl).on('click', '#choseLngLat', function() {
                var _point = null;
                var lng = $(this).prevAll(':hidden[name="Lng"]').val();
                var lat = $(this).prevAll(':hidden[name="Lat"]').val();
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
                            callBack && callBack(_point);
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
        // 区域弹出框
        areaDialog: function(containerEl, callBack, opt) {
            var me = this;
            opt = opt || {};
            $(containerEl).on('click', '#choseArea', function() {
                var treeNodeData = null;
                var tpl = require('../../tpl/common/areaIndex');
                me.layUIDialog({
                    title: opt.title || '区域选择',
                    type: 1,
                    content: tpl,
                    area: ['300px', '500px'],
                    success: function(layerEl) {
                        me.initTree($.extend({
                            url: api.getAreaList,
                            param: {},
                            treeId: 'commonTree',
                            idKey: 'ADCD',
                            pIdKey: 'ParentCode',
                            name: 'ADNM',
                            hasSearchClick: true,
                            callback: function(e, treeId, treeNode) {
                                treeNodeData = treeNode
                            }
                        }, opt));
                    },
                    btnAlign: 'r',
                    btn: ['确 定', '关 闭'],
                    yes: function(index) {
                        var rt = true;
                        if (callBack) {
                            if (!treeNodeData) {
                                me.layAlert('请选择一条数据进行操作');
                                return false;
                            }
                            rt = callBack(treeNodeData);
                        }
                        (_.isUndefined(rt) || rt) && layer.close(index);
                    },
                    btn2: function(index) {
                        layer.close(index)
                    }
                });
                return false;
            });
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
            return $.ajax($.extend({
                    type: opt.type || 'GET',
                    url: url,
                    data: param,
                    dataType: 'json',
                    cache: false,
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function(res) {
                        // 代表未登陆
                        if (res && res.ErrorCode) {
                            var msg = res.Message || '系统错误,请联系管理员';
                            me.layAlert(msg, {
                                yes: function() {
                                    layer.closeAll();
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
                .always(function() {});
        },
        $: function(el, container) {
            container = container || '#content'
            return $(container).find(el);
        }
    };
    return common;
});