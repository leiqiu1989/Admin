<div class="layui-layout layui-layout-admin">
    <div class="layui-header">
        <div class="layui-logo">村村响管理平台</div>
        <!-- 头部区域（可配合layui已有的水平导航） -->
        <ul class="layui-nav layui-layout-left">
            <li class="layui-nav-item"><a href="">设备状态</a></li>
            <li class="layui-nav-item"><a href="">播出状态</a></li>
            <li class="layui-nav-item"><a href="">快捷方式</a></li>
            <li class="layui-nav-item">
                <a href="javascript:;">消息提醒<span class="layui-badge">99</span></a>
            </li>
        </ul>
        <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item">
                <a href="javascript:;">
                    <img src="http://t.cn/RCzsdCq" class="layui-nav-img"> admin【都江堰市管理系统】
                </a>
                <dl class="layui-nav-child">
                    <dd><a href="">修改密码</a></dd>
                </dl>
            </li>
            <li class="layui-nav-item"><a href="#login/index">退出系统</a></li>
        </ul>
    </div>
    <div class="layui-side layui-bg-black">
        <div class="layui-side-scroll">
            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
            <ul class="layui-nav layui-nav-tree" lay-filter="sidebar">
                <li class="layui-nav-item layui-nav-itemed">
                    <a class="" href="javascript:;">
                        <i class="fa fa-gear"></i> 系统管理
                    </a>
                    <dl class="layui-nav-child">
                        <dd>
                            <a href="#user/index">
                                <i class="fa fa-user"></i> 用户管理
                            </a>
                        </dd>
                        <dd>
                            <a href="#role/index">
                                <i class="fa fa-user-secret"></i> 角色管理
                            </a>
                        </dd>
                        <dd>
                            <a href="#department/index">
                                <i class="fa fa-group"></i> 部门管理
                            </a>
                        </dd>
                        <dd>
                            <a href="#menu/index">
                                <i class="fa fa-navicon"></i> 菜单管理
                            </a>
                        </dd>
                        <dd>
                            <a href="#dataDictionary/index">
                                <i class="fa fa-book"></i> 数据字典
                            </a>
                        </dd>
                        <!-- <dd><a href="javascript:">系统主题</a></dd> -->
                        <dd>
                            <a href="#shortCut/index">
                                <i class="fa fa-chain-broken"></i> 快捷方式库管理
                            </a>
                        </dd>
                        <dd>
                            <a href="javascript:">
                                <i class="fa fa-chain"></i> 我的快捷方式
                            </a>
                        </dd>
                        <dd>
                            <a href="javascript:">
                                <i class="fa fa-long-arrow-right"></i> 指令端迁移
                            </a>
                        </dd>
                        <dd>
                            <a href="javascript:">
                                <i class="fa fa-pencil"></i> 日志查询
                            </a>
                        </dd>
                    </dl>
                </li>
                <li class="layui-nav-item">
                    <a href="javascript:;">
                        <i class="fa fa-microchip"></i> 设备管理
                    </a>
                    <dl class="layui-nav-child">
                        <dd>
                            <a href="#equipmentDetail/index">
                                <i class="fa fa-newspaper-o"></i> 设备入库清单
                            </a>
                        </dd>
                        <dd>
                            <a href="#frontEndInstallDetail/index">
                                <i class="fa fa-tasks"></i> 前端安装清单
                            </a>
                        </dd>
                        <dd>
                            <a href="#terminalInstallDetail/index">
                                <i class="fa fa-server"></i> 终端安装清单
                            </a>
                        </dd>
                        <dd>
                            <a href="#equipmentAudit/index">
                                <i class="fa fa-check"></i> 设备审核
                            </a>
                        </dd>
                        <dd>
                            <a href="#frontEndManager/index">
                                <i class="fa fa-tag"></i> 前端管理
                            </a>
                        </dd>
                        <dd>
                            <a href="#terminalManager/index">
                                <i class="fa fa-tags"></i> 终端管理
                            </a>
                        </dd>
                        <dd>
                            <a href="#comprehensiveQuery/index">
                                <i class="fa fa-list"></i> 综合查询
                            </a>
                        </dd>
                    </dl>
                </li>
                <li class="layui-nav-item">
                    <a href="javascript:;">
                        <i class="fa fa-wifi"></i> 云市场
                    </a>
                    <dl class="layui-nav-child">
                        <dd>
                            <a href="#startBroadcast/index">
                                <i class="fa fa-volume-up"></i> 启动广播
                            </a>
                        </dd>
                        <dd>
                            <a href="#timingBroadcast/index">
                                <i class="fa fa-volume-down"></i> 定时广播
                            </a>
                        </dd>
                        <dd>
                            <a href="#broadcastList/index">
                                <i class="fa fa-list-alt"></i> 广播列表
                            </a>
                        </dd>
                    </dl>
                </li>
                <li class="layui-nav-item">
                    <a href="#areaManager/index">
                        <i class="fa fa-map"></i> 区域管理
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <!-- 内容主体区域 -->
    <div class="layui-body" id="content">
    </div>
    <!-- 底部固定区域 -->
    <!-- <div class="layui-footer">
        © layui.com - 底部固定区域
    </div> -->
</div>