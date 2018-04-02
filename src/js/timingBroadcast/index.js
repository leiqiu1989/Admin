define(function(require, exports, module) {
    'use strict';
    var common = require('common');
    var api = require('api');
    require('underscore');

    // 模板
    var tpls = {
        index: require('../../tpl/timingBroadcast/index'),
        add: require('../../tpl/timingBroadcast/add')
    };

    var timingBroadcast = function() {};

    $.extend(timingBroadcast.prototype, {
        init: function() {
            common.renderContent(tpls.index);
            common.renderForm();
            common.initDateTime({
                elem: '#auditDate',
                range: true
            });
            this.initTable();
            this.event();
        },
        initTable: function() {
            layui.use(['table'], function() {
                var table = layui.table;
                table.render({
                    elem: '#roleTbList',
                    url: '/demo/table/user/',
                    page: true,
                    cols: [
                        [ //表头
                            { field: 'id', title: 'ID', width: 80, sort: true },
                            { field: 'username', title: '用户名', width: 80 },
                            { field: 'sex', title: '性别', width: 80, sort: true },
                            { field: 'city', title: '城市', width: 80 },
                            { field: 'sign', title: '签名', width: 170 },
                            { field: 'experience', title: '积分', width: 80, sort: true },
                            { field: 'score', title: '评分', width: 80, sort: true },
                            { field: 'classify', title: '职业', width: 80 },
                            { field: 'wealth', title: '财富', width: 135, sort: true }
                        ]
                    ]
                });
            });
        },
        event: function() {
            $('#content').off().on('click', '.js-add', function() {
                var _html = template.compile(tpls.add)()
                common.layUIDialog({
                    title: '新增定时广播',
                    type: 1,
                    content: _html,
                    area: ['750px', '500px'],
                    success: function() {
                        common.renderForm();
                    },
                    btnAlign: 'c',
                    btn: ['保 存', '重 置'],
                    yes: function() {
                        alert('yes');
                    },
                    btn2: function() {
                        alert('reset');
                    }
                })
            });
        }
    });

    var _timingBroadcast = new timingBroadcast();

    exports.init = function() {
        _timingBroadcast.init();
    };
});