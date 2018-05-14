define(function(require, exports, module) {
    'use strict';
    var common = require('common');
    var api = require('api');
    require('underscore');

    // 模板
    var tpls = {
        add: require('../../tpl/terminalManager/add')
    };

    var addTerminal = function() {};

    $.extend(addTerminal.prototype, {
        init: function(id) {
            var me = this;
            this.initTemplate(id, function(data) {
                common.renderContent(tpls.add, data);
                me.initControl(data);
                // 地图标点
                common.mapDialog('#frmTerminalInfo', function(point) {
                    common.$(':text[name="txtLngLat"]').val(point.lng + ',' + point.lat);
                    common.$(':hidden[name="Lng"]').val(point.lng);
                    common.$(':hidden[name="Lat"]').val(point.lat);
                });
                // 适配器选择
                common.areaDialog('#frmTerminalInfo', function(treeNode) {
                    if (!treeNode.IsDevice) {
                        common.layAlert('只能选择适配器');
                        return false;
                    }
                    common.$(':text[name="ADNM"]').val(treeNode.FullAreaName || '');
                    common.$(':hidden[name="ADCD"]').val(treeNode.ADCD || '');
                    common.$(':hidden[name="ModemId"]').val(treeNode.InitCode || '');
                }, {
                    isDevice: true,
                    dataFilter: function(data) {
                        _.each(data, function(item) {
                            if (item.IsDevice) {
                                item.icon = '../img/device.png';
                            }
                        });
                        return data;
                    },
                    title: '适配器选择'
                });
                me.event();
            });
        },
        initTemplate: function(id, callback) {
            if (id) {
                common.ajax(api.getTerminalDetail, { id: id }, function(res) {
                    if (res && res.IsSuccess) {
                        var data = res.Data || {};
                        data.InstallDate = new Date(data.InstallDate).format('yyyy-MM-dd');
                        callback && callback(data);
                    }
                });
            } else {
                callback && callback();
            }
        },
        initControl: function(data) {
            data = data || {};
            common.initCode('select[name="LogicalAddress"]', data.LogicalAddress || '');
            common.initSelect({
                el: 'select[name="Status"]',
                data: [{
                    name: '正常',
                    value: 0
                }, {
                    name: '作废',
                    value: 1
                }],
                selectValue: data.selectValue || ''
            });
            common.initDateTime({
                elem: 'input[name="InstallDate"]'
            });
            common.renderForm(function(form) {
                form.on('submit(*)', function(data) {
                    var submitData = data.field;
                    if (submitData.ADCD.indexOf('-') != -1) {
                        submitData.ADCD = submitData.ADCD.split('-')[0];
                    }
                    var url = submitData.Id ? api.editTerminal : api.addTerminal;
                    common.ajax(url, JSON.stringify(submitData), function(res) {
                        if (res && res.success) {
                            var msg = submitData.Id ? '终端修改成功!' : '终端新增成功!';
                            common.layMsg(msg);
                            common.changeHash('#terminalManager/index');
                        }
                    }, {
                        type: 'POST',
                        contentType: 'application/json;charset=utf-8'
                    });
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                });
            });
        },
        event: function() {
            var me = this;
            $('#content').off().on('click', '.js-back', function() {
                common.changeHash('#terminalManager/index');
            });
        }
    });

    var _addTerminal = new addTerminal();

    exports.init = function(param) {
        _addTerminal.init(param.id);
    };
});