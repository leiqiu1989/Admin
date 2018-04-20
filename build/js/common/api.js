define(function(require, exports, module) {
    'use strict';

    // 测试服域名
    var remoteUrl = '//192.168.0.200:88/apiserver';

    /*接口API*/
    var api = {
        // 登陆
        login: remoteUrl + '/api/Account/Login',
        // 获取播发源
        getPlaySource: remoteUrl + '/api/Common/getPlaySourceType',
        // 获取区域列表
        getAreaList: remoteUrl + '/api/Common/getAreaTree',
        // 获取部门tree
        getDepartMent: remoteUrl + '/api/Department/getDeptTree',
        // 获取设备类型
        getModemType: remoteUrl + '/api/Common/getModeTypeList',
        // 获取设备列表
        getModemList: remoteUrl + '/api/Modem/getModemListByAreaCode',
        // 新增设备
        addModem: remoteUrl + '/api/Modem/AddModem',
        // 设备详情
        detailModem: remoteUrl + '/api/Modem/GetDetailById',
        // 编辑设备
        updateModem: remoteUrl + '/api/Modem/UpdateModem',
        // 删除设备
        deleteModem: remoteUrl + '/api/Modem/DeleteModem',
        // 新增部门
        addDepartment: remoteUrl + '/api/Department/AddDepartMent',
        // 编辑部门
        updateDepartment: remoteUrl + '/api/Department/EditDepartment',
        // 部门详情
        detailDepartment: remoteUrl + '/api/Department/GetDepartmentByUserId',
        // 部门删除
        deleteDepartment: remoteUrl + '/api/Department/DeleteDepartment',
        // 用户列表
        getUserList: remoteUrl + '/api/Department/getUserList',
        // 根据部门id获取user
        getUserListByDeptId: remoteUrl + '/api/Department/getUserListByDeptId',
        // 获取用户列表
        getUserList: remoteUrl + '/api/User/getUserList',
        // 根据userId获取用户信息
        getUserByUserId: remoteUrl + '/api/User/GetUserByUserId',
        // 新增用户
        addUser: remoteUrl + '/api/User/AddUser',
        // 编辑用户
        editUser: remoteUrl + '/api/User/EditUser',
        // 删除用户
        deleteUser: remoteUrl + '/api/User/DeleteUser'
    };
    return api;
});