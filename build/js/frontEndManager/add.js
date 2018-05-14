define(function(require, exports, module) {
    'use strict';
    var common = require('common');
    var api = require('api');
    var constVal = require('constVal');
    var timingBroadCast = require('./timeBroadCast');
    require('underscore');

    // 模板
    var tpls = {
        add: require('../../tpl/frontEndManager/add'),
        editWhite: require('../../tpl/frontEndManager/editWhite')
    };

    var addFrontEnd = function() {};

    $.extend(addFrontEnd.prototype, {
        init: function(guid) {
            var me = this;
            // 适配器唯一序号           
            this.Guid = guid;
            // 能否切换tab(新增未保存基础信息，不能切换,编辑无限制)
            this.switchTab = !!guid;
            // 每次初始化对象，销毁timingBroadCastTable属性
            timingBroadCast.destoryTable();
            this.initTemplate(guid, function(data) {
                data = data || {
                    ModemInfo: {},
                    WhiteList: [],
                    BroadCastList: [],
                    TimerBroadCast: []
                };
                var modeInfo = data.ModemInfo;
                me.initProperty(data);
                var isEdit = !_.isEmpty(modeInfo);
                me.isEdit = isEdit;
                common.renderContent(tpls.add, $.extend(modeInfo, { isEdit: isEdit, title: isEdit ? '编辑终端设备信息' : '新增终端设备信息' }));

                common.renderElement({
                    eventFilter: 'tab(modemTab)',
                    callback: function(evt) {
                        var index = evt.index;
                        if (index == 0) {
                            return false;
                        }
                        if (me.switchTab) {
                            switch (index) {
                                case 1:
                                    // 白名单
                                    !me.whiteTable && me.initWhiteList();
                                    break;
                                case 2:
                                    // 电台
                                    !me.broadcastingTable && me.initBroadcasting();
                                    break;
                                case 3:
                                    // 定时广播
                                    var timeBroadCastTable = timingBroadCast.getTable();
                                    if (!timeBroadCastTable) {
                                        timingBroadCast.init(me.modelTypeId, data.TimerBroadCast, me.filterBroadCast());
                                    }
                                    break;
                            }
                        } else {
                            $(evt.elem).find('ul.layui-tab-title > li:eq(0)').click();
                            common.layAlert('基础数据未保存并下发,不能进程该操作');
                            return false;
                        }
                    }
                });
                if (isEdit) {
                    var els = [
                        'select[name="Priority"]',
                        ':text[name="PlayFrequency"]',
                        ':text[name="PlayAttenuation"]',
                        ':text[name="MainFrequency"]',
                        ':text[name="ViceFrequency"]',
                        'select[name="CommonSource"]',
                        'select[name="EmergencySource"]',
                        'select[name="VerifyType"]',
                        ':text[name="TelPWD"]'
                    ]
                    _.each(els, function(el) {
                        common.$(el).attr('disabled', true);
                    });
                }
                me.initControl(modeInfo);

                // 地图标点
                common.mapDialog('#frmFrontEndInfo', function(point) {
                    common.$(':text[name="txtLngLat"]').val(point.lng + ',' + point.lat);
                    common.$(':hidden[name="Lng"]').val(point.lng);
                    common.$(':hidden[name="Lat"]').val(point.lat);
                });
                // 区域选择
                common.areaDialog('#frmFrontEndInfo', function(treeNode) {
                    common.$(':text[name="ADNM"]').val(treeNode.FullAreaName || '');
                    common.$(':hidden[name="ADCD"]').val(treeNode.ADCD || '');
                    common.$(':hidden[name="AreaCode"]').val(treeNode.FullInitCode || '');
                });
                me.event();
            });
        },
        // 生成白名单数据
        generateWhiteData: function() {
            var array = [];
            for (var i = 0, len = constVal.whiteCount; i < len; i++) {
                array.push({
                    Id: i + 1,
                    TelPhone: '',
                    Password: '',
                    AreaCode: '',
                    AreaName: ''
                });
            }
            return array;
        },
        // 生成电台数据
        generateBroadCastData: function() {
            var array = [];
            for (var i = 0, len = constVal.broadcastingCount; i < len; i++) {
                array.push({
                    Id: i + 1,
                    Frequency: ''
                });
            }
            return array;
        },
        initProperty: function(data) {
            this.whiteListData = this.generateWhiteData();
            // 编辑-则替换掉初始数据
            if (data.WhiteList.length > 0) {
                this.whiteListData = common.spliceArrayData({
                    sourceArray: this.whiteListData,
                    spliceArray: data.WhiteList,
                    filterField: 'Id'
                });
            }
            this.whiteTable = null;
            this.broadcastingListData = this.generateBroadCastData();
            if (data.BroadCastList.length > 0) {
                this.broadcastingListData = common.spliceArrayData({
                    sourceArray: this.broadcastingListData,
                    spliceArray: data.BroadCastList,
                    filterField: 'Id'
                });
            }
            this.broadcastingTable = null;
            this.modelTypeId = null;
        },
        initTemplate: function(guid, callback) {
            if (guid) {
                common.ajax(api.detailModem, { guid: guid }, function(res) {
                    if (res && res.success) {
                        var data = res.data;
                        callback && callback(data);
                    }
                });
            } else {
                callback && callback();
            }
        },
        getPlaySourceType: function(modemId, commonSourceId, emergencySourceId) {
            if (modemId) {
                common.ajax(api.getPlaySource, { modemTypeId: modemId }, function(res) {
                    if (res && res.IsSuccess) {
                        common.initSelect({
                            el: 'select[name="CommonSource"]',
                            data: res.Data,
                            valueField: 'Id',
                            textField: 'SourceName',
                            addEmptyItem: true,
                            selectValue: commonSourceId || ''
                        });
                        common.initSelect({
                            el: 'select[name="EmergencySource"]',
                            data: res.Data,
                            valueField: 'Id',
                            textField: 'SourceName',
                            addEmptyItem: true,
                            selectValue: emergencySourceId || ''
                        });
                        common.renderForm();
                    }
                });
            }
        },
        initControl: function(data) {
            var me = this;
            // 获取设备类型
            common.ajax(api.getModemType, {}, function(res) {
                if (res && res.IsSuccess) {
                    var modemData = res.Data;
                    me.modelTypeId = data.ModemTypeId ? data.ModemTypeId : (modemData.length >= 1 ? modemData[0].TypeId : null);
                    common.initSelect({
                        el: 'select[name="ModemTypeId"]',
                        data: modemData,
                        valueField: 'TypeId',
                        textField: 'Description',
                        selectValue: data.ModemTypeId || ''
                    });
                    me.getPlaySourceType(me.modelTypeId, data.CommonSource, data.EmergencySource);
                    // form render
                    common.renderForm(function(form) {
                        form.on('select(modemType)', function(item) {
                            if (item.value) {
                                me.getPlaySourceType(item.value);
                                timingBroadCast.changeModemTypeId(item.value);
                            }
                        });
                        form.on('submit(*)', function(data) {
                            var submitData = data.field;
                            submitData.WhiteList = common.filterArray(me.whiteListData, ['TelPhone', 'Password', 'ADCD']);
                            submitData.RadioList = common.filterArray(me.broadcastingListData, ['Frequency']);
                            submitData.TimerBroadCastList = common.filterArray(timingBroadCast.getSubmitData() || [], ['StartTime', 'EndTime', 'ADCD',
                                'Period', 'Status', 'PlaySourceType'
                            ]);
                            var url = submitData.Guid ? api.updateModem : api.addModem;
                            // 启用状态-默认启用
                            submitData.Status = true;
                            common.ajax(url, JSON.stringify(submitData), function(res) {
                                if (res && res.success) {
                                    me.switchTab = true;
                                    var msg = submitData.Guid ? '适配器修改成功!' : '适配器新增成功!';
                                    common.layMsg(msg);
                                    if (submitData.Guid) {
                                        common.changeHash('#frontEndManager/index');
                                    } else {
                                        $(data.elem).addClass('layui-btn-disabled');
                                    }
                                }
                            }, {
                                type: 'POST',
                                contentType: 'application/json;charset=utf-8'
                            });
                            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                        });
                    });
                }
            });
        },
        // 初始化白名单列表
        initWhiteList: function() {
            var me = this;
            layui.use(['table'], function() {
                var table = layui.table;
                table.render({
                    elem: '#whiteTbList',
                    page: false,
                    height: me.isEdit ? 'full-250' : 'full-200',
                    limit: constVal.whiteCount,
                    limits: [constVal.whiteCount],
                    data: me.whiteListData,
                    cols: [
                        [ //表头                            
                            { title: 'ID', field: 'Id', width: 100 },
                            { title: '电话号码', field: 'TelPhone', width: 200 },
                            { title: '密码', field: 'Password', width: 200 },
                            { title: '区域', field: 'AreaCode', width: 250 },
                            { title: '区域名称', field: 'AreaName', width: 250 },
                            {
                                title: '操作',
                                width: 200,
                                align: 'left',
                                toolbar: '#modemWhiteBar'
                            }
                        ]
                    ]
                });
                table.on('tool(whiteTb)', function(evt) {
                    var layEvent = evt.event;
                    var data = evt.data;
                    if (layEvent == 'edit') {
                        me.editWhite(data);
                    } else if (layEvent == 'delete') {
                        var result = _.find(me.whiteListData, function(item) { return item.Id == data.Id });
                        if (result) {
                            var whiteData = {};
                            _.each(_.keys(result), function(item) {
                                whiteData[item] = (item == 'Id' ? result[item] : '');
                            });
                            // 删除-添加标识，下发指令需要传递
                            whiteData.IsDelete = true;
                            me.saveWhiteData(whiteData);
                        }
                    }
                });
                me.whiteTable = table;
            });
        },
        // 保存白名单数据
        saveWhiteData: function(data, callback) {
            var me = this;
            var ids = _.map(me.whiteListData, function(item) {
                return item.Id;
            });
            var _index = _.indexOf(ids, data.Id);
            me.whiteListData.splice(_index, 1, data);
            callback && callback();
            me.whiteTable.reload('whiteTbList', {
                data: me.whiteListData
            });
        },
        // 编辑白名单
        editWhite: function(data) {
            var me = this;
            var _html = template.compile(tpls.editWhite)(data);
            var title = '编辑白名单信息';
            common.layUIDialog({
                title: title,
                type: 1,
                content: _html,
                area: ['500px', '300px'],
                success: function(layero, index) {
                    // 选择区域
                    common.areaDialog(layero, function(treeNode) {
                        common.$(':text[name="AreaName"]', layero).val(treeNode.FullAreaName);
                        common.$(':hidden[name="ADCD"]', layero).val(treeNode.ADCD);
                        common.$(':hidden[name="AreaCode"]', layero).val(treeNode.FullInitCode);
                    });
                    common.renderForm(function(form) {
                        form.on('submit(saveWhite)', function(formData) {
                            var data = formData.field;
                            data.Id = parseInt(data.Id);
                            me.saveWhiteData(data, function() {
                                layer.close(index);
                            });
                            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                        });
                    });
                }
            });
        },
        // 初始化电台列表
        initBroadcasting: function() {
            var me = this;
            layui.use(['table'], function() {
                var table = layui.table;
                table.render({
                    elem: '#broadcastingTbList',
                    page: false,
                    height: me.isEdit ? 'full-250' : 'full-200',
                    limit: constVal.whiteCount,
                    limits: [constVal.whiteCount],
                    data: me.broadcastingListData,
                    cols: [
                        [ //表头                            
                            { title: 'ID', field: 'Id', width: 100 },
                            { title: '频率', field: 'Frequency', width: 300 },
                            {
                                title: '操作',
                                width: 200,
                                align: 'left',
                                toolbar: '#broadCastBar'
                            }
                        ]
                    ]
                });
                // 电台绑定事件
                table.on('tool(broadCastBarTb)', function(evt) {
                    var layEvent = evt.event;
                    var data = evt.data;
                    if (layEvent == 'edit') {
                        me.editBroadcasting(data);
                    } else if (layEvent == 'delete') {
                        var result = _.find(me.broadcastingListData, function(item) { return item.Id == data.Id });
                        if (result) {
                            var broadCastData = {};
                            _.each(_.keys(result), function(item) {
                                broadCastData[item] = (item == 'Id' ? result[item] : '');
                            });
                            // 删除-添加标识，下发指令需要传递
                            broadCastData.IsDelete = true;
                            me.saveBroadCastData(broadCastData);
                        }
                    }
                });
                me.broadcastingTable = table;
            });
        },
        // 保存电台数据
        saveBroadCastData: function(data, callback) {
            var me = this;
            var ids = _.map(me.broadcastingListData, function(item) {
                return item.Id;
            });
            var _index = _.indexOf(ids, data.Id);
            me.broadcastingListData.splice(_index, 1, data);
            callback && callback();
            me.broadcastingTable.reload('broadcastingTbList', {
                data: me.broadcastingListData
            });
            // 设置电台列表到定时广播(过滤掉没有值的电台数据)
            timingBroadCast.setTBroadCastingData(me.filterBroadCast());
        },
        filterBroadCast: function() {
            var filterBroadCast = _.filter(this.broadcastingListData, function(item) {
                return !!item.Frequency;
            });
            return filterBroadCast;
        },
        // 编辑电台
        editBroadcasting: function(data) {
            var me = this;
            var title = '编辑电台信息';
            layer.prompt({
                title: title,
                value: data.Frequency
            }, function(value, index, elem) {
                value = $.trim(value);
                var rt = common.frequencyRangeValidate(value);
                if (!rt) {
                    common.layAlert('频率格式或者范围不正确，有效范围87.00-108.00');
                    return false;
                }
                data.Frequency = value;
                me.saveBroadCastData(data, function() {
                    layer.close(index);
                });
            });
        },
        // 获取指令下发公共参数
        getIssueCommonParam: function(data, filterField) {
            var delIds = _.map(_.filter(data, function(item) {
                return item.IsDelete;
            }), function(item) {
                return item.Id;
            });
            var list = common.filterArray(data, filterField);
            return {
                guid: this.Guid,
                list: list,
                delIds: delIds.join('')
            };
        },
        event: function() {
            var me = this;
            $('#content').on('click', '.js-back', function() {
                common.changeHash('#frontEndManager/index');
            }).on('click', 'button[lay-filter="whiteIssue"]', function() {
                // 白名单-指令下发
                var param = $.extend(me.getIssueCommonParam(me.whiteListData, ['TelPhone', 'Password', 'ADCD']), { type: 'white' });
                common.instructIssue(param, me.whiteListData, function(modem) {
                    var _whiteList = modem.WhiteList || [];
                    me.whiteListData = common.spliceArrayData({
                        sourceArray: me.whiteListData,
                        spliceArray: _whiteList,
                        filterField: 'Id'
                    });
                    me.whiteTable.reload('whiteTbList', {
                        data: me.whiteListData
                    });
                });
            }).on('click', 'button[lay-filter="broadCastingIssue"]', function() {
                // 电台-指令下发
                var param = $.extend(me.getIssueCommonParam(me.broadcastingListData, ['Frequency']), { type: 'broadCasting' });
                common.instructIssue(param, me.broadcastingListData, function(modem) {
                    var _radioList = modem.RadioList || [];
                    me.broadcastingListData = common.spliceArrayData({
                        sourceArray: me.broadcastingListData,
                        spliceArray: _radioList,
                        filterField: 'Id'
                    });
                    me.broadcastingTable.reload('broadcastingTbList', {
                        data: me.broadcastingListData
                    });
                });
            }).on('click', 'button[lay-filter="timeBroadCastIssue"]', function() {
                // 定时广播-指令下发
                var timeBroadCastListData = timingBroadCast.getTimeBroadCastListData();
                var param = $.extend(timingBroadCast.getInstructIssue(), { type: 'timerBroadCast', guid: me.Guid });
                common.instructIssue(param, timeBroadCastListData, function(modem) {
                    var _timerBroadCastList = modem.TimerBroadCastList || [];
                    timeBroadCastListData = common.spliceArrayData({
                        sourceArray: timeBroadCastListData,
                        spliceArray: _timerBroadCastList,
                        filterField: 'Id'
                    });
                    timingBroadCast.setTimeBroadCastListData(timeBroadCastListData);
                    var timerBroadCastTable = timingBroadCast.getTable();
                    timerBroadCastTable.reload('timeBroadCastTbList', {
                        data: timeBroadCastListData
                    });
                });
            });
        }
    });

    var _addFrontEnd = new addFrontEnd();

    exports.init = function(param) {
        _addFrontEnd.init(param.guid);
    };
});