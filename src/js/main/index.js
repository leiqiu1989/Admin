define(function(require, exports, module) {
    'use strict';

    var map = require('map');
    var common = require('common');
    var api = require('api');
    require('underscore');
    // 模板
    var tpls = {
        modem: require('../../tpl/main/modem')
    };

    var index = function() {};

    $.extend(index.prototype, {
        init: function() {
            var me = this;
            this.markerArray = [];
            map.init('content', { addNavigation: true }, function(_map) {
                me.getModemList(_map);
            });
        },
        getModemList: function(_map) {
            var me = this;
            common.ajax(api.getModemList, {}, function(res) {
                if (res) {
                    var data = res.data || [];
                    me.addMarkerClusterer(data, _map);
                }
            });
        },
        // 添加缩放聚合
        addMarkerClusterer: function(data, _map) {
            var markers = [];
            var myicon = new BMap.Icon('./img/mapIcon.png',
                new BMap.Size(18, 26), { imageSize: new BMap.Size(144, 92), // 引用图片实际大小
                    　　　　　　　　　　imageOffset: new BMap.Size(-18, -22) // 图片相对视窗的偏移
                        　　　　　　　　 });
            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                var pt = new BMap.Point(item.Lng, item.Lat);
                var marker = new BMap.Marker(pt, { icon: myicon });
                marker.guid = item.Guid;
                marker.dataInfo = item;
                this.markerArray.push(marker);
                this.addMarkerEvent(marker);
                markers.push(marker);
            }
            var markerClusterer = new BMapLib.MarkerClusterer(_map, {
                markers: markers,
                isAverangeCenter: true,
                styles: [{
                    url: './img/modem.png',
                    size: new BMap.Size(32, 32),
                    textSize: 16
                }]
            });
        },
        addMarkerEvent: function(marker) {
            var me = this;
            marker.addEventListener('click', function(e) {
                var item = marker.dataInfo;
                var _html = template.compile(tpls.modem)();
                common.layUIDialog({
                    title: '适配器信息 - ' + item.ModemName + '(' + item.ModemIp + ' - ' + item.Adress + ')',
                    type: 1,
                    content: _html,
                    area: ['750px', '720px'],
                    offset: 'auto',
                    success: function(layerEl, index) {
                        // 设备初始化
                        map.init('machineMap', {
                            addNavigation: false
                        }, function(_map) {
                            me.addMarker(item.Id, item.Guid, _map);
                            me.initForm(item, layerEl);
                        });
                        me.getModemBroadCastInfo(item, layerEl);
                        // 适配器弹出框-事件
                        // 校时
                        var opt = {
                            guid: item.Guid,
                            layerEl: layerEl
                        }
                        $(layerEl).off().on('click', 'input[lay-filter="sysTime"]', function() {})
                            // 正常广播
                            .on('click', 'input[lay-filter="commonRadio"]', function() {
                                me.controlModem($.extend(opt, { switchModem: true, mode: 1 }));
                            })
                            // 应急广播
                            .on('click', 'input[lay-filter="emergencyRadio"]', function() {
                                me.controlModem($.extend(opt, { switchModem: true, mode: 2 }));
                            })
                            // 关闭广播
                            .on('click', 'input[lay-filter="closeRadio"]', function() {
                                me.controlModem($.extend(opt, { switchModem: false, mode: 2 }));
                            })
                            // 刷新
                            .on('click', 'button[lay-filter="refresh"]', function() {
                                me.refreshData(opt);
                            });
                    }
                });
            });
        },
        refreshData: function(opt) {
            var me = this;
            common.ajax(api.refreshData, { guid: opt.guid }, function(res) {
                if (res && res.success) {
                    //common.layMsg(res.msg);
                    common.timingModemData(opt.guid, function(modem) {
                        me.updateMarkerData(opt.guid, modem);
                        common.setFormData(opt.layerEl, modem);
                        common.renderForm();
                    });
                }
            });
        },
        // 获取适配器广播状态-文案
        getModemBroadCastInfo: function(modem, layerEl) {
            var msg = '广播停止',
                playSourceMsg = '';
            modem = modem || {};
            var lastStatus = modem.LastStatus;
            if (!lastStatus) {
                msg = '适配器未连接';
            }
            var playSource = modem.PlaySource;
            switch (lastStatus) {
                case 1:
                    if (playSource == 128) {
                        playSourceMsg = '应急广播';
                    } else if (playSource == 130) {
                        playSourceMsg = '普通广播'
                    } else if (playSource == 131) {
                        playSource = '定时广播'
                    }
                    msg = playSourceMsg + '- 开';
                    break;
                case 3:
                    msg = 'RDS播放';
                    break;
                case 4:
                    msg = 'RDS转发';
                    break;
            }
            common.$('#modemStatusInfo', layerEl).text(msg)
        },
        controlModem: function(opt) {
            opt = opt || {};
            var me = this;
            common.ajax(api.controlModem, { guid: opt.guid, switchModem: opt.switchModem, mode: opt.mode }, function(res) {
                if (res && res.success) {
                    common.timingModemData(opt.guid, function(modem) {
                        me.updateMarkerData(opt.guid, modem);
                        me.getModemBroadCastInfo(modem, opt.layerEl);
                    });
                } else {
                    var msg = res.msg;
                    common.layAlert(msg);
                    return false;
                }
            });
        },
        getPlaySourceType: function(modemId, commonSourceId, emergencySourceId, callback) {
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
                        callback && callback();
                    }
                });
            }
            callback && callback();
        },
        initForm: function(item, layerEl) {
            var me = this;
            this.getPlaySourceType(item.ModemTypeId, item.CommonSource, item.EmergencySource, function() {
                common.setFormData(layerEl, item);
                common.renderForm(function(form) {
                    form.on('submit(*)', function(data) {
                        var submitData = data.field;
                        var url = api.sendDataToTerminal;
                        common.ajax(url, submitData, function(res) {
                            if (res && res.success) {
                                // var msg = res.msg;
                                // common.layMsg(msg);
                                common.timingModemData(item.Guid, function(modem) {
                                    me.updateMarkerData(item.Guid, modem);
                                    common.setFormData(layerEl, modem);
                                    common.renderForm();
                                });
                            }
                        });
                        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                    });
                });
            });
        },
        // 更新marker绑定数据
        updateMarkerData: function(guid, modem) {
            var marker = _.find(this.markerArray, function(item) {
                return item.guid == guid;
            });
            if (marker) {
                marker.dataInfo = modem;
            }
        },
        // 添加设备
        addMarker: function(modemId, guid, _map) {
            var me = this;
            common.ajax(api.getTerminaInfoByModem, { modemId: modemId }, function(res) {
                if (res && res.IsSuccess) {
                    var data = res.Data;
                    me.initTable(data, _map);
                    // 设备进行聚合
                    var markerArray = [];
                    _.each(data, function(item) {
                        var isChild = !item.Ownered; //是否是下级设备,1代表自身，0代表子级
                        var imageOffset = isChild ? new BMap.Size(-36, -22) : new BMap.Size(0, -22);
                        var myicon = new BMap.Icon('./img/mapIcon.png',
                            new BMap.Size(18, 26), { imageSize: new BMap.Size(144, 92), // 引用图片实际大小
                                　　　　　　　　　　imageOffset: imageOffset // 图片相对视窗的偏移
                                    　　　　　　　　 });
                        var marker = new BMap.Marker(new BMap.Point(item.Lng, item.Lat), { icon: myicon });
                        markerArray.push(marker);
                        me.markerEvent(marker, item, _map);
                        me.markerMenu(marker, item, guid, _map);
                    });
                    var markerClusterer = new BMapLib.MarkerClusterer(_map, {
                        markers: markerArray,
                        isAverangeCenter: true,
                        styles: [{
                            url: './img/terminal.png',
                            size: new BMap.Size(32, 32),
                            textSize: 16
                        }]
                    });
                }
            });
        },
        // 初始化table
        initTable: function(data, _map) {
            var me = this;
            layui.use(['table'], function() {
                var table = layui.table;
                table.render({
                    elem: '#terminalList',
                    data: data,
                    page: {
                        limit: 5,
                        layout: ['count', 'prev', 'page', 'next']
                    },
                    height: '283px',
                    cols: [
                        [ //表头

                            {
                                title: '设备名称',
                                field: 'TerminalName',
                                templet: function(d) {
                                    var cls = d.Ownered ? 'green' : 'red';
                                    return '<span class="' + cls + '">' + d.TerminalName + '</span>';
                                }
                            },
                            {
                                title: '逻辑地址',
                                field: 'FullLogicalAddress',
                                templet: function(d) {
                                    var cls = d.Ownered ? 'green' : 'red';
                                    return '<span class="' + cls + '">' + d.FullLogicalAddress + '</span>';
                                }
                            },
                            { fixed: 'right', width: 70, align: 'center', toolbar: '#terminalBar' }
                        ]
                    ]
                });
                table.on('tool(filterTerminal)', function(obj) {
                    var data = obj.data,
                        layEvent = obj.event;
                    if (layEvent === 'location') {
                        var pt = new BMap.Point(data.Lng, data.Lat);
                        map.setCenterAndZoom([pt]);
                        _map.panTo(pt);
                    }
                });
            });
        },
        // 事件绑定
        markerEvent: function(marker, item, _map) {
            marker.addEventListener('mouseover', function(a, b, c, d) {
                var label = new BMap.Label(item.InstallAddress, {
                    offset: new BMap.Size(20, -15)
                });
                label.setStyle({
                    border: '1px solid #666',
                    padding: '2px'
                });
                marker.setLabel(label);
            });
            marker.addEventListener('mouseout', function(e) {
                var label = e.currentTarget.getLabel();
                _map.removeOverlay(label);
            });
        },
        // 右键菜单
        markerMenu: function(marker, item, guid, _map) {
            var me = this;
            var markerMenu = new BMap.ContextMenu();
            var opt = {
                width: 130
            }
            var _param = {
                guid: guid
            }
            markerMenu.addItem(new BMap.MenuItem('终端开', function() {
                common.deviceSendIssue($.extend(_param, { type: 'terminal_ON', fullLogicalAddress: item.FullLogicalAddress }));
            }, opt));
            markerMenu.addItem(new BMap.MenuItem('终端关', function() {
                common.deviceSendIssue($.extend(_param, { type: 'terminal_OFF', fullLogicalAddress: item.FullLogicalAddress }));
            }, opt));
            markerMenu.addItem(new BMap.MenuItem('终端音量', function() {
                layer.prompt({
                    title: '终端音量',
                    value: '0'
                }, function(value, index, elem) {
                    value = $.trim(value);
                    var valueArray = [];
                    for (var i = 0; i < 10; i++) {
                        valueArray.push(i * 5)
                    }
                    if (!/^\+?[0-9][0-9]*$/.test(value) || _.indexOf(valueArray, parseInt(value)) == -1) {
                        common.layAlert('格式或者范围不正确，有效范围' + valueArray.join(','));
                        return false;
                    }
                    common.deviceSendIssue($.extend(_param, {
                        type: 'terminal_voice',
                        fullLogicalAddress: item.FullLogicalAddress,
                        volume: value
                    }));
                    layer.close(index);
                });
            }, opt));
            markerMenu.addItem(new BMap.MenuItem('终端远程编码', function() {
                common.deviceSendIssue($.extend(_param, { type: 'terminal_RemoteCode', terminalInfo: item }));
            }, opt));
            markerMenu.addItem(new BMap.MenuItem('终端更改接收主频率', function() {
                me.changeFrequency($.extend(_param, {
                    type: 'terminal_mainFre',
                    fullLogicalAddress: item.FullLogicalAddress
                }), {
                    title: '接收主频率',
                    initValue: item.MainFrequency
                });
            }, opt));
            markerMenu.addItem(new BMap.MenuItem('终端更改接收副频率', function() {
                me.changeFrequency($.extend(_param, {
                    type: 'terminal_viceFre',
                    fullLogicalAddress: item.FullLogicalAddress
                }), {
                    title: '接收副频率',
                    initValue: item.ViceFrequency
                });
            }, opt));
            markerMenu.addItem(new BMap.MenuItem('终端全部参赛同步', function() {
                common.deviceSendIssue($.extend(_param, { type: 'terminal_all', terminalInfo: item }));
            }, opt));
            marker.addContextMenu(markerMenu);
        },
        // 设备-更改频率下发
        changeFrequency: function(param, opt) {
            layer.prompt({
                title: opt.title,
                value: opt.initValue
            }, function(value, index, elem) {
                value = $.trim(value);
                var rt = common.frequencyRangeValidate(value);
                if (!rt) {
                    common.layAlert('频率格式或者范围不正确，有效范围87.00-108.00');
                    return false;
                }
                param.frequency = value;
                common.deviceSendIssue(param);
                layer.close(index);
            });
        }
    });

    var _index = new index();

    exports.init = function() {
        _index.init();
    };
});