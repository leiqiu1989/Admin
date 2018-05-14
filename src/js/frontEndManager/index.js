define(function(require, exports, module) {
    'use strict';
    var common = require('common');
    var api = require('api');
    require('underscore');

    // 模板
    var tpls = {
        index: require('../../tpl/frontEndManager/index'),
        add: require('../../tpl/frontEndManager/add')
    };

    var frontEndManager = function() {};

    $.extend(frontEndManager.prototype, {
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
                expandChildFlag: true,
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
                    page: {
                        limit: 20,
                        layout: ['count', 'prev', 'page', 'next']
                    },
                    height: 'full-130',
                    cols: [
                        [ //表头
                            { title: '', field: 'Id', type: 'checkbox', fixed: 'left' },
                            { title: '终端名称', field: 'ModemName', fixed: 'left', minWidth: 150 },
                            { title: 'IP地址', field: 'ModemIp', fixed: 'left', minWidth: 150 },
                            { title: 'IP端口', field: 'ModemPort', width: 80 },
                            { title: '所属区域', field: 'ADNM', minWidth: 200 },
                            { title: '设备类型', field: 'ModemTypeName', width: 100 },
                            {
                                title: '优先级',
                                field: 'Priority',
                                width: 100,
                                templet: function(d) {
                                    return d.Priority == 1 ? '上级优先' : (d.Priority == 2 ? '下级优先' : '');
                                }
                            },
                            {
                                title: '播出频率',
                                field: 'PlayFrequency',
                                width: 100,
                                templet: function(d) {
                                    return d.PlayFrequency.toFixed(2);
                                }
                            },
                            { title: '播出衰减', field: 'PlayAttenuation', width: 90 },
                            {
                                title: '上级主频',
                                field: 'MainFrequency',
                                width: 100,
                                templet: function(d) {
                                    return d.MainFrequency.toFixed(2);
                                }
                            },
                            {
                                title: '上级副频',
                                field: 'ViceFrequency',
                                width: 100,
                                templet: function(d) {
                                    return d.ViceFrequency.toFixed(2);
                                }
                            },
                            { title: '普通音源', field: 'CommonSourceName', width: 100 },
                            { title: '应急音源', field: 'EmergencySourceName', width: 100 },
                            { title: '安装地址', field: 'Adress', minWidth: 200 }
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
                    common.changeHash('#frontEndManager/add');
                })
                .on('click', '.js-edit', function() {
                    var rt = common.getSelectedRow(me.table, 'modemTbList');
                    rt.success && common.changeHash('#frontEndManager/add/', { guid: rt.data.Guid });
                });
        }
    });

    var _frontEndManager = new frontEndManager();

    exports.init = function() {
        _frontEndManager.init();
    };
});