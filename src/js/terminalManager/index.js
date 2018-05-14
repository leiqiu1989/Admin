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
                    elem: '#terminalTbList',
                    url: api.getTerminalList,
                    page: {
                        limit: 20,
                        layout: ['count', 'prev', 'page', 'next']
                    },
                    height: 'full-130',
                    cols: [
                        [ //表头
                            { title: '', field: 'Id', type: 'checkbox' },
                            { title: '设备名称', field: 'TerminalName', width: 120 },
                            { title: '物理地址', field: 'Mac', width: 150 },
                            { title: '逻辑地址', field: 'FullLogicalAddress', width: 100 },
                            { title: '所属区域', field: 'ADNM', minWidth: 250 },
                            { title: '音量', field: 'Volume', width: 60 },
                            {
                                title: '接收主频',
                                field: 'MainFrequency',
                                width: 100,
                                templet: function(d) {
                                    return d.MainFrequency.toFixed(2);
                                }
                            },
                            {
                                title: '接收副频',
                                field: 'ViceFrequency',
                                width: 100,
                                templet: function(d) {
                                    return d.ViceFrequency.toFixed(2);
                                }
                            },
                            {
                                title: '状态',
                                field: 'Status',
                                width: 60,
                                templet: function(d) {
                                    return '<span class="green">启用</span>';
                                }
                            },
                            {
                                title: '安装时间',
                                field: 'InstallDate',
                                width: 110,
                                templet: function(d) {
                                    return d.InstallDate ? new Date(d.InstallDate).format('yyyy-MM-dd') : '';
                                }
                            },
                            { title: '安装地址', field: 'InstallAddress', width: 100 },
                            { title: '备注', field: 'Description', width: 100 }
                        ]
                    ]
                });
                me.table = table;
            });
        },
        changeStatus: function(data) {
            var me = this;
            common.layConfirm('确定要停用该设备?', function() {
                common.ajax(api.changeStatus, { id: data.Id, status: 1 }, function(res) {
                    if (res && res.success) {
                        me.table.reload('terminalTbList');
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
                    var rt = common.getSelectedRow(me.table, 'terminalTbList');
                    rt.success && common.changeHash('#terminalManager/add/', { id: rt.data.Id });
                })
                .on('click', '.js-status', function() {
                    var rt = common.getSelectedRow(me.table, 'terminalTbList');
                    rt.success && me.changeStatus(rt.data);
                });
        }
    });

    var _terminalManager = new terminalManager();

    exports.init = function() {
        _terminalManager.init();
    };
});