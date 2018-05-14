define(function(require, exports, module) {
    'use strict';

    var map = function() {
        // 公共变量
        this._map = null;
    };

    map.prototype = {
        reset: function() {
            this._map = null;
        },
        init: function(el, opt, callback) {
            var me = this;
            opt = opt || {};
            this.reset();
            this._map = new BMap.Map(el, {
                enableMapClick: false
            });
            if (opt.defaultPoint) {
                this.setCenterAndZoom([opt.defaultPoint]);
            } else {
                var localCity = new BMap.LocalCity();
                //根据IP定位地图
                localCity.get(function(result) {
                    var cityName = result.name;
                    me._map.centerAndZoom(cityName);
                    me._map.addEventListener('load', function() {
                        if (callback) callback(me._map);
                    });
                });
            }
            // 最大、最小缩放级别
            //this._map.setMinZoom(12);
            //this._map.setMaxZoom(19);
            //启用滚轮缩放
            this._map.enableScrollWheelZoom();
            // 添加地图平移控件
            if (opt.addNavigation) {
                this._map.addControl(new BMap.NavigationControl());
            }
            this._map.addEventListener('zoomend', function(e, ab, c) {
                console.log(me._map.getZoom());
            });
        },
        // 清除所有覆盖物
        clearOverlays: function() {
            this._map.clearOverlays();
        },
        getMap: function() {
            return this._map;
        },
        // 设置中心点和zoom
        setCenterAndZoom: function(mapPoints) {
            var view = this._map.getViewport(eval(mapPoints));
            var mapZoom = view.zoom;
            var centerPoint = view.center;
            this._map.centerAndZoom(centerPoint, mapZoom);
        },
        // 生成地图points
        generateMapPoints: function(data) {
            var mapPoints = [];
            $.each(data, function(index, item) {
                var point = new BMap.Point(item.Lng, item.Lat);
                mapPoints.push(point);
            });
            return mapPoints;
        }
    };
    var _map = new map();

    module.exports = _map;

});