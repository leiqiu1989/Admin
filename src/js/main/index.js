define(function(require, exports, module) {
    'use strict';

    var map = require('map');


    var index = function() {};

    $.extend(index.prototype, {
        init: function() {
            map.init('content');
        }
    });

    var _index = new index();

    exports.init = function() {
        _index.init();
    };
});