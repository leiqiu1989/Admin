define(function(require, exports, module) {
    'use strict';
    var common = require('common');
    var api = require('api');
    var constVal = require('constVal');
    require('underscore');

    // 模板
    var tpls = {
        addTimeBroadCast: require('../../tpl/frontEndManager/addTimeBroadCast')
    };

    var timeBroadCast = function() {};

    $.extend(timeBroadCast.prototype, {
        init: function(modelTypeId, timerBroadCastData, broadcastingListData) {
            // 电台list
            this.broadcastingListData = broadcastingListData || [];
            // 定时广播table
            this.timeBroadCastTable = null;
            // 定时广播list
            this.timeBroadCastListData = this.generateTimerBroadCastData();
            if (timerBroadCastData.length > 0) {
                this.timeBroadCastListData = common.spliceArrayData({
                    sourceArray: this.timeBroadCastListData,
                    spliceArray: timerBroadCastData,
                    filterField: 'Id'
                });
            }
            this.modelTypeId = modelTypeId || null;
            this.initTableList();
        },
        // 生成白名单数据
        generateTimerBroadCastData: function() {
            var array = [];
            for (var i = 0, len = constVal.timeBroadCastCount; i < len; i++) {
                array.push({
                    Id: i,
                    StartTime: '',
                    EndTime: '',
                    Status: '',
                    AreaCode: '',
                    PlaySourceTypeName: '',
                    Frequency: '',
                    AreaName: '',
                    Period: ''
                });
            }
            return array;
        },
        initTableList: function() {
            var me = this;
            layui.use(['table'], function() {
                var table = layui.table;
                table.render({
                    elem: '#timeBroadCastTbList',
                    page: false,
                    height: 'full-250',
                    limit: constVal.timeBroadCastCount,
                    limits: [constVal.timeBroadCastCount],
                    data: me.timeBroadCastListData,
                    cols: [
                        [ //表头                           
                            { title: 'ID', field: 'Id' },
                            { title: '开始时间', field: 'StartTime' },
                            { title: '结束时间', field: 'EndTime' },
                            {
                                title: '状态',
                                field: 'Status',
                                templet: function(d) {
                                    var status = parseInt(d.Status);
                                    return _.isNaN(status) ? '' : (status ? '启用' : '停用');
                                }
                            },
                            { title: '音源', field: 'PlaySourceTypeName' },
                            {
                                title: '电台',
                                field: 'Frequency',
                                templet: function(d) {
                                    return d.Frequency || '';
                                }
                            },
                            { title: '地址', field: 'AreaName', width: 200 },
                            {
                                title: '每天',
                                field: 'Period',
                                templet: function(d) {
                                    return common.transPeriod(d.Period, 0);
                                }
                            },
                            {
                                title: '周一',
                                field: 'Period',
                                templet: function(d) {
                                    return common.transPeriod(d.Period, 7);
                                }
                            },
                            {
                                title: '周二',
                                field: 'Period',
                                templet: function(d) {
                                    return common.transPeriod(d.Period, 6);
                                }
                            },
                            {
                                title: '周三',
                                field: 'Period',
                                templet: function(d) {
                                    return common.transPeriod(d.Period, 5);
                                }
                            },
                            {
                                title: '周四',
                                field: 'Period',
                                templet: function(d) {
                                    return common.transPeriod(d.Period, 4);
                                }
                            },
                            {
                                title: '周五',
                                field: 'Period',
                                templet: function(d) {
                                    return common.transPeriod(d.Period, 3);
                                }
                            },
                            {
                                title: '周六',
                                field: 'Period',
                                templet: function(d) {
                                    return common.transPeriod(d.Period, 2);
                                }
                            },
                            {
                                title: '周日',
                                field: 'Period',
                                templet: function(d) {
                                    return common.transPeriod(d.Period, 1);
                                }
                            },
                            {
                                title: '操作',
                                width: 150,
                                align: 'left',
                                toolbar: '#timerBroadCastBar'
                            }
                        ]
                    ]
                });
                table.on('tool(timerBoradCastTb)', function(evt) {
                    var layEvent = evt.event;
                    var data = evt.data;
                    if (layEvent == 'edit') {
                        me.addTimeBroadCast(data);
                    } else if (layEvent == 'delete') {
                        var result = _.find(me.timeBroadCastListData, function(item) { return item.Id == data.Id });
                        if (result) {
                            var timerBroadCast = {};
                            _.each(_.keys(result), function(item) {
                                timerBroadCast[item] = (item == 'Id' ? result[item] : '');
                            });
                            // 删除-添加标识，下发指令需要传递
                            timerBroadCast.IsDelete = true;
                            me.saveTimerBroadCastData(timerBroadCast);
                        }
                    }
                });
                me.timeBroadCastTable = table;
            });
        },
        getPlaySourceType: function(modemId, selectVal, callback) {
            if (modemId) {
                common.ajax(api.getPlaySource, { modemTypeId: modemId }, function(res) {
                    if (res && res.IsSuccess) {
                        common.initSelect({
                            el: 'select[name="PlaySourceType"]',
                            data: res.Data,
                            valueField: 'Id',
                            textField: 'SourceName',
                            selectValue: selectVal || ''
                        });
                        callback && callback();
                    }
                });
            }
        },
        // 编辑初始化控件
        editInitControl: function(data, layero) {
            // 收音机-显示电台
            if (data.PlaySourceType == 4) {
                common.$('#frequencyContainer', layero).removeClass('hidden');
            }
            if (data.Status) {
                var _statusChkEl = common.$(':checkbox[lay-filter="Status"]', layero);
                var _statusEl = common.$(':hidden[name="Status"]', layero);
                var _status = parseInt(data.Status);
                // 未启用的情况
                if (!_status) {
                    _statusChkEl.removeAttr('checked');
                    _statusEl.val(0);
                }
            }
            if (data.Period) {
                var charPeriodArray = data.Period.split('');
                // 不是每天的情况
                var periodChks = common.$(':checkbox[lay-filter="Period"]', layero);
                if (charPeriodArray[0] == '0') {
                    common.$(':checkbox[lay-filter="PeriodEveryDay"]', layero).removeAttr('checked');
                    // 移除第一个元素(代表每天)
                    charPeriodArray.shift();
                    _.each(charPeriodArray, function(item, index) {
                        var value = parseInt(charPeriodArray[index]);
                        var chk = $(periodChks[periodChks.length - (index + 1)]);
                        chk.removeAttr('disabled');
                        value && chk.attr('checked', true);
                    });
                }
            }
            common.renderForm();
        },
        validateData: function(data) {
            // 如果音源为收音机，则电台必选
            if (data.PlaySourceType == '4' && !data.Frequency) {
                common.layAlert('电台不能为空');
                return false;
            }
            if (!this.checkTime(data.StartTime, data.EndTime)) {
                common.layAlert('结束时间不能大于开始时间');
                return false;
            }
            return true;
        },
        checkTime: function(startTime, endTime) {
            if (!startTime || !endTime) {
                return false;
            }
            var startArray = startTime.split(':');
            var endArray = endTime.split(':');
            var curDate = new Date();
            var _year = curDate.getFullYear();
            var _month = curDate.getMonth() + 1;
            var _date = curDate.getDate();
            var startTime = new Date(_year, _month, _date, startArray[0], startArray[1]);
            var endTime = new Date(_year, _month, _date, endArray[0], endArray[1]);
            return startTime <= endTime;
        },
        // 保存定时广播数据
        saveTimerBroadCastData: function(data, callback) {
            var me = this;
            var ids = _.map(me.timeBroadCastListData, function(item) {
                return item.Id;
            });
            var _index = _.indexOf(ids, data.Id);
            me.timeBroadCastListData.splice(_index, 1, data);
            callback && callback();
            me.timeBroadCastTable.reload('timeBroadCastTbList', {
                data: me.timeBroadCastListData
            });
        },
        // 编辑定时广播
        addTimeBroadCast: function(data) {
            var me = this;
            var _html = template.compile(tpls.addTimeBroadCast)(data);
            var title = '编辑广播信息';
            common.layUIDialog({
                title: title,
                type: 1,
                content: _html,
                area: ['500px', '480px'],
                success: function(layero, index) {
                    // 选择区域
                    common.areaDialog(layero, function(treeNode) {
                        common.$(':text[name="AreaName"]', layero).val(treeNode.FullAreaName);
                        common.$(':hidden[name="ADCD"]', layero).val(treeNode.ADCD);
                        common.$(':hidden[name="AreaCode"]', layero).val(treeNode.FullInitCode);
                    });
                    common.initDateTime({
                        elem: '#TimeRange',
                        type: 'time',
                        range: true,
                        format: 'HH:mm',
                        value: (data.StartTime && data.EndTime) ? data.StartTime + ' - ' + data.EndTime : ''
                    });
                    // 电台设置                    
                    common.initSelect({
                        el: 'select[name="BroadCastingId"]',
                        data: me.broadcastingListData,
                        valueField: 'Id',
                        textField: 'Frequency',
                        selectValue: data.BroadCastingId || '',
                        formatText: function(item) {
                            return item.Id + '-' + item.Frequency;
                        }
                    });
                    // 获取播放源类型列表                    
                    me.getPlaySourceType(me.modelTypeId, data.PlaySourceType, function() {
                        // 编辑                        
                        me.editInitControl(data, layero);

                        common.renderForm(function(form) {
                            form.on('submit(addTimeBroadCast)', function(data) {
                                var submitData = {};
                                var tiemArray = data.field.TimeRange.split(' - ');
                                var everyDayCheck = common.$(':checkbox[lay-filter="PeriodEveryDay"]', layero);
                                var period = '00000000';
                                if (everyDayCheck.is(':checked')) {
                                    period = '10000000';
                                } else {
                                    var periodChks = common.$(':checkbox[lay-filter="Period"]', layero);
                                    var charArray = period.split('');
                                    _.each(periodChks, function(chk, i) {
                                        if ($(chk).is(':checked')) {
                                            var index = parseInt($(chk).val());
                                            charArray.splice(index, 1, '1');
                                        }
                                    });
                                    period = charArray.join('');
                                }
                                var frequencyIsHidden = common.$('#frequencyContainer', layero).is(':hidden');
                                if (frequencyIsHidden) {
                                    data.field.BroadCastingId = 0;
                                }
                                var playSourceTypeName = common.getSelectText('select[name="PlaySourceType"]', layero);
                                var tempData = {
                                    StartTime: tiemArray[0],
                                    EndTime: tiemArray[1],
                                    Period: period,
                                    PlaySourceTypeName: playSourceTypeName,
                                    Frequency: frequencyIsHidden ? 0 : common.getSelectText('select[name="BroadCastingId"]', layero).split('-')[1]
                                }
                                var submitData = $.extend(data.field, tempData);
                                submitData.Id = parseInt(submitData.Id);
                                var valid = me.validateData(submitData);
                                if (valid) {
                                    me.saveTimerBroadCastData(submitData, function() {
                                        layer.close(index);
                                    });
                                }
                                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                            });
                            // 周期-复选框勾选
                            form.on('checkbox(PeriodEveryDay)', function(chk) {
                                var checked = chk.elem.checked;
                                if (!checked) {
                                    common.$(':checkbox[lay-filter="Period"]', layero).removeAttr('disabled');
                                } else {
                                    common.$(':checkbox[lay-filter="Period"]', layero).removeAttr('checked').attr('disabled', true);
                                }
                                common.renderForm();
                            });
                            // 状态-复选框
                            form.on('checkbox(Status)', function(chk) {
                                var checked = chk.elem.checked;
                                common.$(':hidden[name="Status"]', layero).val(checked ? 1 : 0);
                            });
                            // 音源选择
                            form.on('select(playSourceType)', function(item) {
                                var isShow = item.value == '4'; // 播放源为收音机，则显示电台                                
                                common.$('#frequencyContainer', layero).closest('.layui-form-item')[isShow ? 'removeClass' : 'addClass']('hidden');
                            });
                        });
                    });
                }
            });
        },
        getSubmitData: function() {
            return _.map(this.timeBroadCastListData, function(item, index) {
                return {
                    Id: item.Id,
                    ADCD: item.ADCD,
                    StartTime: item.StartTime,
                    EndTime: item.EndTime,
                    Period: item.Period,
                    AreaCode: item.AreaCode,
                    Status: parseInt(item.Status),
                    PlaySourceType: item.PlaySourceType,
                    BroadCastingId: item.BroadCastingId || null
                }
            });
        },
        // 获取指令下发参数
        getInstructIssue: function() {
            debugger;
            var delIds = _.map(_.filter(this.timeBroadCastListData, function(item) {
                return item.IsDelete;
            }), function(item) {
                return item.Id;
            });
            var list = common.filterArray(this.getSubmitData() || [], ['StartTime', 'EndTime', 'ADCD',
                'Period', 'Status', 'PlaySourceType'
            ]);
            return {
                list: list,
                delIds: delIds.join('')
            };
        }
    });

    var _timeBroadCast = new timeBroadCast();

    exports.init = function(typeId, timerBroadCast, broadcastingListData) {
        _timeBroadCast.init(typeId, timerBroadCast, broadcastingListData);
    };
    exports.changeModemTypeId = function(typeId) {
        _timeBroadCast.modelTypeId = typeId;
    }
    exports.setTBroadCastingData = function(data) {
        _timeBroadCast.broadcastingListData = data;
    }
    exports.getSubmitData = function() {
        return _timeBroadCast.getSubmitData();
    }
    exports.getTable = function() {
        return _timeBroadCast.timeBroadCastTable;
    }
    exports.getInstructIssue = function() {
        return _timeBroadCast.getInstructIssue();
    }
    exports.getTimeBroadCastListData = function() {
        return _timeBroadCast.timeBroadCastListData;
    }
    exports.setTimeBroadCastListData = function(data) {
        _timeBroadCast.timeBroadCastListData = data;
    }
    exports.destoryTable = function() {
        _timeBroadCast.timeBroadCastTable = null;
    }
});