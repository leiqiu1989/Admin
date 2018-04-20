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
        init: function(guid) {
            var me = this;
            this.initTemplate(guid, function(data) {
                common.renderContent(tpls.add, data);
                if (data) {
                    common.$(':text[name="lnglat"]').data('lnglat', { 'lng': data.Lng, 'lat': data.Lat });
                    common.$(':radio[value="' + (data.Status ? 1 : 0) + '"]').attr('checked', true);
                }
                me.initControl(data);
                common.areaMapDialog('#frmTerminalInfo', function(point) {
                    common.$(':text[name="lnglat"]').data('lnglat', { 'lng': point.lng, 'lat': point.lat }).val(point.lng + ',' + point.lat);
                }, function(areaCode, areaName) {
                    if (areaCode && areaName) {
                        common.$(':text[name="AreaName"]').val(areaName);
                        common.$(':hidden[name="AreaCode"]').val(areaCode);
                    }
                });
                me.event();
            });
        },
        initTemplate: function(guid, callback) {
            if (guid) {
                common.ajax(api.detailModem, { guid: guid }, function(res) {
                    if (res && res.IsSuccess) {
                        var data = res.Data;
                        data.lnglat = data.Lng + ',' + data.Lat;
                        callback && callback(data);
                    }
                });
            } else {
                callback && callback();
            }
        },
        initControl: function(data) {
            data = data || {};
            common.getBundle(api.getPlaySource, api.getModemType).done(function(resPlaySource, resModemType) {
                if (resPlaySource.IsSuccess && resModemType.IsSuccess) {
                    common.initSelect({
                        el: 'select[name="CommonSource"]',
                        data: resPlaySource.Data,
                        valueField: 'Id',
                        textField: 'SourceName',
                        selectValue: data.CommonSource || ''
                    });
                    common.initSelect({
                        el: 'select[name="EmergencySource"]',
                        data: resPlaySource.Data,
                        valueField: 'Id',
                        textField: 'SourceName',
                        selectValue: data.EmergencySource || ''
                    });
                    common.initSelect({
                        el: 'select[name="ModemTypeId"]',
                        data: resModemType.Data,
                        valueField: 'TypeId',
                        textField: 'Description',
                        selectValue: data.ModemTypeId || ''
                    });
                    common.renderForm(function(form) {
                        form.on('submit(*)', function(data) {
                            var submitData = $.extend(data.field, common.transLngLat(data.field.lnglat));
                            var url = submitData.Guid ? api.updateModem : api.addModem;
                            common.ajax(url, JSON.stringify(submitData), function(res) {
                                if (res && res.success) {
                                    var msg = submitData.Guid ? '设备修改成功!' : '设备新增成功!';
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
                }
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
        _addTerminal.init(param.guid);
    };
});