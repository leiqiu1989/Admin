define(function(require, exports, module) {
    'use strict';

    // 测试服域名
    var remoteUrl = '//openapi.dev-ag.56qq.com';

    /*接口API*/
    var api = {
        // 获取企业信息
        getInfo: remoteUrl + '/abc/org/info/get',
        // 图片上传
        upload: remoteUrl + '/abc/org/register/pic/upload',
        // 注册
        register: remoteUrl + '/abc/org/register',
        // 获取订单列表
        billList: remoteUrl + '/abc/bill/list',
        // 发布货源
        publish: remoteUrl + '/abc/cargo/publish'
    };
    return api;
});