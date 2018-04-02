define(function(require, exports, module) {
    'use strict';
    var common = require('common');
    var api = require('api');
    require('underscore');

    // 模板
    var tpls = {
        index: require('../../tpl/dataDictionary/index'),
        add: require('../../tpl/dataDictionary/add')
    };

    var dataDictionary = function() {};

    $.extend(dataDictionary.prototype, {
        init: function() {
            common.renderContent(tpls.index);
            this.initTree();
            this.initTable();
            this.event();
        },
        initTree: function() {
            var setting = {};
            var zNodes = [{
                    name: "父节点1 - 展开",
                    open: true,
                    children: [{
                            name: "父节点11 - 折叠",
                            children: [
                                { name: "叶子节点111" },
                                { name: "叶子节点112" },
                                { name: "叶子节点113" },
                                { name: "叶子节点114" }
                            ]
                        },
                        {
                            name: "父节点12 - 折叠",
                            children: [
                                { name: "叶子节点121" },
                                { name: "叶子节点122" },
                                { name: "叶子节点123" },
                                { name: "叶子节点124" }
                            ]
                        },
                        { name: "父节点13 - 没有子节点", isParent: true }
                    ]
                },
                {
                    name: "父节点2 - 折叠",
                    children: [{
                            name: "父节点21 - 展开",
                            open: true,
                            children: [
                                { name: "叶子节点211" },
                                { name: "叶子节点212" },
                                { name: "叶子节点213" },
                                { name: "叶子节点214" }
                            ]
                        },
                        {
                            name: "父节点22 - 折叠",
                            children: [
                                { name: "叶子节点221" },
                                { name: "叶子节点222" },
                                { name: "叶子节点223" },
                                { name: "叶子节点224" }
                            ]
                        },
                        {
                            name: "父节点23 - 折叠",
                            children: [
                                { name: "叶子节点231" },
                                { name: "叶子节点232" },
                                { name: "叶子节点233" },
                                { name: "叶子节点234" }
                            ]
                        }
                    ]
                },
                { name: "父节点3 - 没有子节点", isParent: true }
            ];

            $.fn.zTree.init($("#tree"), setting, zNodes);
        },
        initTable: function() {
            layui.use(['table'], function() {
                var table = layui.table;
                table.render({
                    elem: '#userTbList',
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
        event: function() {}
    });

    var _dataDictionary = new dataDictionary();

    exports.init = function() {
        _dataDictionary.init();
    };
});