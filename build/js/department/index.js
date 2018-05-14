define(function(require, exports, module) {
    'use strict';
    var common = require('common');
    var api = require('api');
    require('underscore');

    // 模板
    var tpls = {
        index: require('../../tpl/department/index'),
        add: require('../../tpl/department/add')
    };

    var department = function() {};

    $.extend(department.prototype, {
        init: function() {
            var me = this;
            common.renderContent(tpls.index);
            this.initDeptTree();
            this.initTable();
            this.event();
        },
        initDeptTree: function() {
            var me = this;
            this.parentId = 0;
            this.parentName = null;
            this.sort = null;
            common.initTree({
                url: api.getDepartMent,
                param: {},
                treeId: 'departmentTree',
                idKey: 'Id',
                pIdKey: 'ParentId',
                name: 'DepartmentName',
                hasSearchClick: true,
                expandAllFlag: true,
                callback: function(e, treeId, treeNode) {
                    me.parentId = treeNode.Id;
                    me.parentName = treeNode.DepartmentName;
                    me.sort = treeNode.Sort;
                    me.initTable({
                        deptId: me.getchildIds().join()
                    });
                }
            });
        },
        initTable: function(where) {
            layui.use(['table'], function() {
                var table = layui.table;
                table.render({
                    elem: '#deptTbList',
                    url: where ? api.getUserListByDeptId : api.getUserList,
                    where: where || {},
                    request: {
                        pageName: 'pageIndex',
                        limitName: 'pageSize'
                    },
                    page: {
                        limit: 20,
                        layout: ['count']
                    },
                    height: 'full-90',
                    cols: [
                        [ //表头                            
                            {
                                title: '登录名',
                                field: 'UserId'
                            },
                            {
                                title: '姓名',
                                field: 'UserName'
                            },
                            {
                                title: '启用',
                                field: 'IsAble',
                                templet: function(d) {
                                    return d.IsAble ? '是' : '否'
                                }
                            },
                            {
                                title: '改密',
                                field: 'IfChangePwd',
                                templet: function(d) {
                                    return d.IsAble ? '是' : '否'
                                }
                            },
                            {
                                title: '添加时间',
                                field: 'AddDate'
                            }
                        ]
                    ]
                });
            });
        },
        editDialog: function(data) {
            var me = this;
            data = data || {};
            var isAdd = _.isEmpty(data) && me.parentId > 0;
            var _obj = {
                isAdd: isAdd
            }
            isAdd && (_obj.parentName = me.parentName);
            var _html = template.compile(tpls.add)($.extend(data, _obj));
            common.layUIDialog({
                title: data.Id ? '编辑部门' : '新增部门',
                type: 1,
                content: _html,
                area: ['400px', '300px'],
                success: function(layero, index) {
                    common.renderForm(function(form) {
                        form.on('submit(*)', function(data) {
                            var submitData = $.extend(data.field, isAdd ? {
                                ParentId: me.parentId
                            } : {});
                            var url = submitData.Id ? api.updateDepartment : api.addDepartment;
                            common.ajax(url, JSON.stringify(submitData), function(res) {
                                if (res && res.success) {
                                    layer.closeAll();
                                    me.initDeptTree();
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
        getchildIds: function() {
            var ids = [];

            function recursion(children) {
                if (children && children.length > 0) {
                    _.each(children, function(item, index) {
                        ids.push(item.Id);
                        if (item.children) {
                            recursion(item.children);
                        }
                    });
                }
            }
            if (this.parentId) {
                var treeObj = $.fn.zTree.getZTreeObj("departmentTree");
                var nodes = treeObj.getNodesByParam("Id", this.parentId, null);
                if (nodes.length > 0) {
                    var node = nodes[0];
                    recursion(node.children);
                    ids.push(node.Id);
                }
            }
            return ids;
        },
        event: function() {
            var me = this;
            $('#content').off().on('click', '.js-add', function() {
                me.editDialog();
            }).on('click', '.js-edit', function() {
                if (!me.parentId) {
                    common.layAlert('请选择一个部门进行编辑');
                    return false;
                }
                me.editDialog({
                    Id: me.parentId,
                    DepartmentName: me.parentName,
                    Sort: me.sort
                });
            }).on('click', '.js-del', function() {
                if (!me.parentId) {
                    common.layAlert('请选择一个部门进行删除');
                    return false;
                }
                common.layConfirm('确定删除该部门?如果有子部门也会同时删除', function() {
                    // 获取当前节点以及子节点id                    
                    var ids = me.getchildIds();
                    common.ajax(api.deleteDepartment, {
                        departmentIds: ids.join()
                    }, function(res) {
                        if (res && res.success) {
                            me.initDeptTree();
                        }
                    });
                });
            });
        }
    });

    var _department = new department();

    exports.init = function() {
        _department.init();
    };
});