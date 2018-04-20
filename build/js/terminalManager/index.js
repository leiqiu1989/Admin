define(function(require, exports, module) {
    'use strict';
    var common = require('common');
    var api = require('api');
    require('underscore');

    // 模板
    var tpls = {
        index: require('../../tpl/terminalManager/index'),
        add: require('../../tpl/terminalManager/add')
    };

    var terminalManager = function() {};

    $.extend(terminalManager.prototype, {
        init: function() {
            var me = this;
            common.renderContent(tpls.index);

            common.initTree({
                url: api.getAreaList,
                param: {},
                treeId: 'tree',
                idKey: 'ADCD',
                pIdKey: 'ParentCode',
                name: 'ADNM',
                hasSearchClick: true,
                callback: function(e, treeId, treeNode) {
                    me.areaCode = treeNode.ADCD;
                }
            });
            this.initTable();
            this.event();
        },
        initProperty: function() {
            this.areaCode = null;
        },
        initTable: function() {
            var me = this;
            layui.use(['table'], function() {
                var table = layui.table;
                table.render({
                    elem: '#modemTbList',
                    url: api.getModemList,
                    page: true,
                    cols: [
                        [ //表头
                            { title: '', field: 'Id', type: 'checkbox' },
                            { title: '终端名称', field: 'ModemName' },
                            { title: 'MAC地址', field: 'Mac' },
                            { title: 'IP地址', field: 'ModemIp' },
                            { title: 'IP端口', field: 'ModemPort' },
                            { title: '优先级', field: 'Priority' },
                            { title: '播出频率', field: 'PlayFrequency' },
                            { title: '设备状态', field: 'Status' },
                            { title: '播出衰减', field: 'PlayAttenuation' },
                            { title: '上级主频', field: 'MainFrequency' },
                            { title: '上级副频', field: 'ViceFrequency' },
                            { title: '普通音源', field: 'CommonSource' },
                            { title: '应急音源', field: 'EmergencySource' },
                            { title: '所属区域', field: 'AreaCode' },
                            { title: '安装地址', field: 'Adress' },
                            { title: '经 度', field: 'Lng' },
                            { title: '纬 度', field: 'Lat' },
                            { title: '验证类型', field: 'VerifyType' },
                            { title: '电话密码', field: 'TelPWD' },
                            { title: '备注', field: 'Description' }
                        ]
                    ]
                });
                me.table = table;
            });
        },
        deleteRow: function(guid) {
            var me = this;
            common.layConfirm('确定要删除该设备?', function() {
                common.ajax(api.deleteModem, { guid: guid }, function(res) {
                    if (res && res.success) {
                        common.layMsg('设备删除成功!');
                        me.table.reload('modemTbList');
                        return false;
                    }
                });
            });
        },
        event: function() {
            var me = this;
            $('#content').off()
                .on('click', '.js-add', function() {
                    common.changeHash('#terminalManager/add');
                })
                .on('click', '.js-edit', function() {
                    var rt = common.getSelectedRow(me.table, 'modemTbList');
                    rt.success && common.changeHash('#terminalManager/add/', { guid: rt.data.Guid });
                })
                .on('click', '.js-del', function() {
                    var data = common.getSelectedRow(me.table, 'modemTbList');
                    rt.success && me.deleteRow(rt.data.Guid);
                });
        }
    });

    var _terminalManager = new terminalManager();

    exports.init = function() {
        _terminalManager.init();
    };
});