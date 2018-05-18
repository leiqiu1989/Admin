define(function(require, exports, module) {
    'use strict';

    // 测试服域名
    var remoteUrl = '//localhost:18099';

    /*接口API*/
    var api = {
        // 登陆
        login: remoteUrl + '/api/Account/Login',
        // 登出
        logOut: remoteUrl + '/api/Account/Logout',
        // 获取播发源
        getPlaySource: remoteUrl + '/api/Common/getPlaySourceType',
        // 获取区域列表
        getAreaList: remoteUrl + '/api/Common/getAreaTree',
        // 修改区域信息（ADNM，InitCode）
        updateAreaInfo: remoteUrl + '/api/Common/updateAreaInfo',
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
        deleteUser: remoteUrl + '/api/User/DeleteUser',
        // 获取终端设备
        getTerminalList: remoteUrl + '/api/Terminal/List',
        // 新增终端设备
        addTerminal: remoteUrl + '/api/Terminal/Add',
        // 编辑终端设备
        editTerminal: remoteUrl + '/api/Terminal/Edit',
        // 获取终端设备详情
        getTerminalDetail: remoteUrl + '/api/Terminal/getTerminalDetail',
        // 删除（更改状态,不真实删除）
        changeStatus: remoteUrl + '/api/Terminal/changeStatus',
        // 控制适配器
        controlModem: remoteUrl + '/api/Modem/ControlModem',
        // 定时返回最新modem
        timingData: remoteUrl + '/api/Modem/TimingData',
        // 发送数据到适配器
        sendDataToTerminal: remoteUrl + '/api/Modem/SendDataToTerminal',
        // 手动刷新适配器数据
        refreshData: remoteUrl + '/api/Modem/RefreshData',
        // 适配器编辑-下发命令
        instructIssue: remoteUrl + '/api/Modem/InstructIssue',
        // 根据适配器获取终端列表
        getTerminaInfoByModem: remoteUrl + '/api/Terminal/GetTerminaInfoByModem',
        // 设备指令下发
        deviceSendIssue: remoteUrl + '/api/Modem/DeviceSendIssue',
        // 设备校时
        sysTimer: remoteUrl + '/api/Modem/SystemTimer'
    };
    return api;
});