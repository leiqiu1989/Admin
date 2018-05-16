define(function(require, exports, module) {
    'use strict';
    var common = require('common');
    var api = require('api');
    require('underscore');

    // 模板
    var tpls = {
        index: require('../../tpl/user/index'),
        add: require('../../tpl/user/add')
    };

    var user = function() {};

    $.extend(user.prototype, {
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
            var me = this;
            layui.use(['table'], function() {
                var table = layui.table;
                table.render({
                    elem: '#userTbList',
                    url: api.getUserList,
                    page: {
                        limit: 20,
                        layout: ['count']
                    },
                    height: 'full-130',
                    cols: [
                        [ //表头
                            { title: '', field: 'Id', type: 'checkbox' },
                            { title: '登录名', field: 'UserId', width: 100 },
                            { title: '姓名', field: 'UserName', width: 120 },
                            { title: '部门', field: 'DepartmentName' },
                            {
                                title: '是否启用',
                                field: 'IsAble',
                                width: 100,
                                templet: function(d) {
                                    return d.IsAble ? '是' : '否'
                                }
                            },
                            {
                                title: '是否改密',
                                field: 'IfChangePwd',
                                width: 100,
                                templet: function(d) {
                                    return d.IsAble ? '是' : '否'
                                }
                            },
                            { title: '添加时间', field: 'AddDate', width: 160 },
                            { title: '描述', field: 'Description' }
                        ]
                    ]
                });
                me.table = table;
            });
        },
        editDialog: function(data) {
            var me = this;
            data = data || {};
            var isAdd = _.isEmpty(data);
            var _html = template.compile(tpls.add)($.extend(data, { isAdd: isAdd }));
            var title = isAdd ? '新增用户信息' : '编辑用户信息';
            common.layUIDialog({
                title: title,
                type: 1,
                content: _html,
                area: ['550px', '570px'],
                success: function(layero, index) {
                    // 设置radio和checkbox的值
                    common.setRadioCheckValue(layero, [':radio[name="IsAble"][value="' + data.IsAble + '"]', ':radio[name="IfChangePwd"][value="' + data.IfChangePwd + '"]']);
                    // 选择部门
                    $(layero).find('.js-selectDept').on('click', function() {
                        common.layUIDialog({
                            title: '部门选择',
                            type: 1,
                            content: '<div id="dialogDept" class="ztree"></div>',
                            area: ['300px', '500px'],
                            success: function(layerEl) {
                                common.initTree({
                                    url: api.getDepartMent,
                                    param: {},
                                    treeId: 'dialogDept',
                                    idKey: 'Id',
                                    pIdKey: 'ParentId',
                                    name: 'DepartmentName',
                                    hasSearchClick: false,
                                    expandAllFlag: true,
                                    checkEnable: true,
                                    dataFilter: function(data) {
                                        return _.map(data, function(item, index) {
                                            item.nocheck = !item.LastLeaf;
                                            return item;
                                        });
                                    },
                                    callback: function(a, b, c) {
                                        var zTree = $.fn.zTree.getZTreeObj('dialogDept');
                                        zTree.checkNode(c, !c.checked, true);
                                    }
                                });
                            },
                            btnAlign: 'r',
                            btn: ['确 定', '关 闭'],
                            yes: function(index) {
                                var zTree = $.fn.zTree.getZTreeObj('dialogDept');
                                var checks = zTree.getCheckedNodes(true);
                                var len = checks.length;
                                checks = _.filter(checks, function(item) {
                                    return item.LastLeaf;
                                });
                                var deptNames = len > 0 ? _.map(checks, function(item) {
                                    return item.DepartmentName;
                                }) : [];
                                var deptIds = len > 0 ? _.map(checks, function(item) {
                                    return item.Id;
                                }) : [];
                                common.$(':text[name="DepartmentName"]', layero).val(deptNames.join());
                                common.$(':hidden[name="DepartmentId"]', layero).val(deptIds.join());
                                layer.close(index);
                            },
                            btn2: function(index) {
                                layer.close(index)
                            }
                        });
                    });
                    common.renderForm(function(form) {
                        form.on('submit(*)', function(data) {
                            var submitData = data.field;
                            var url = submitData.Id ? api.editUser : api.addUser;
                            common.ajax(url, JSON.stringify(submitData), function(res) {
                                if (res && res.success) {
                                    layer.close(index);
                                    me.table.reload('userTbList');
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
        getUserByUserId: function(id) {
            var me = this;
            common.ajax(api.getUserByUserId, { id: id }, function(res) {
                if (res && res.IsSuccess) {
                    var data = res.Data;
                    me.editDialog(data);
                }
            });
        },
        event: function() {
            var me = this;
            $('#content').off().on('click', '.js-add', function() {
                me.editDialog();
            }).on('click', '.js-edit', function() {
                var rt = common.getSelectedRow(me.table, 'userTbList');
                rt.success && me.editDialog(rt.data);
            }).on('click', '.js-del', function() {
                var rt = common.getSelectedRow(me.table, 'userTbList');
                if (rt.success) {
                    common.layConfirm('确定删除该该用户?', function() {
                        common.ajax(api.deleteUser, {
                            idList: rt.data.Id
                        }, function(res) {
                            if (res && res.success) {
                                me.table.reload('userTbList');
                            }
                        });
                    });
                }
            });
        }
    });

    var _user = new user();

    exports.init = function() {
        _user.init();
    };
});