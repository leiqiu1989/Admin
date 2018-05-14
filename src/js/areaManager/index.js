define(function(require, exports, module) {
    'use strict';
    var common = require('common');
    var api = require('api');
    require('underscore');

    // 模板
    var tpls = {
        index: require('../../tpl/areaManager/index')
    };

    var areaManager = function() {};

    $.extend(areaManager.prototype, {
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
                expandChildFlag: true,
                callback: function(e, treeId, treeNode) {
                    me.treeNodeCallBack(treeNode);
                }
            });
            common.initCode('select[name="InitCode"]');
            common.renderForm(function(form) {
                form.on('submit(save)', function(data) {
                    var submitData = data.field;
                    if (me.checkValidate(submitData.ADCD)) {
                        me.submit(submitData);
                    }
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                });
                form.on('submit(saveChild)', function(data) {
                    var submitData = data.field;
                    if (me.checkValidate(submitData.ADCD)) {
                        me.submit(submitData);
                    }
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                });
            });
        },
        checkValidate: function(adcd) {
            if (!adcd) {
                common.layAlert('请选择要操作的区域');
                return false;
            }
            return true;
        },
        treeNodeCallBack: function(node) {
            common.$(':text[name="ADNM"]').val(node.ADNM || '');
            common.$(':hidden[name="ADCD"]').val(node.ADCD || '');
            common.$('select[name="InitCode"]')
                .val(node.InitCode)
                .next('div.layui-form-select')
                .find(':text')
                .val(node.InitCode)
                .end()
                .find('dd[lay-value="' + node.InitCode + '"]')
                .addClass('layui-this')
                .siblings()
                .removeClass('layui-this');
        },
        submit: function(data) {
            var url = api.updateAreaInfo;
            common.ajax(url, JSON.stringify(data), function(res) {
                if (res && res.success) {
                    common.layMsg('更新成功', function() {
                        window.location.reload();
                    });
                } else {
                    var msg = res.msg || '数据更新失败,请联系管理员';
                    common.layAlert(msg);
                    return false;
                }
            }, {
                type: 'POST',
                contentType: 'application/json;charset=utf-8'
            });
        }
    });

    var _areaManager = new areaManager();

    exports.init = function() {
        _areaManager.init();
    };
});