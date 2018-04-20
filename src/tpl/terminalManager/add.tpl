<div class="layui-single-title">
    <span class="layui-breadcrumb">
        <a href="#terminalManager/index">
            终端管理
        </a>
        <span lay-separator="">/</span>
    <a>
        <cite>新增终端设备信息</cite>
    </a>
    </span>
</div>
<div class="layui-tab layui-tab-patch">
    <ul class="layui-tab-title">
        <li class="layui-this">基础信息</li>
    </ul>
    <div class="layui-tab-content">
        <div class="layui-tab-item layui-show">
            <form id="frmTerminalInfo" class="layui-form">
                <input type="hidden" name="Id" value="<%= Id %>">
                <input type="hidden" name="Guid" value="<%= Guid %>">
                <input type="hidden" name="AreaCode" value="<%= AreaCode %>">
                <div class="layui-row">
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">终端名称</label>
                            <div class="layui-input-block">
                                <input type="text" name="ModemName" value="<%= ModemName %>" lay-verify="required" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">Mac地址</label>
                            <div class="layui-input-block">
                                <input type="text" name="Mac" value="<%= Mac %>" lay-verify="required" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">IP地址</label>
                            <div class="layui-input-block">
                                <input type="text" name="ModemIp" value="<%= ModemIp %>" lay-verify="required" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">IP端口</label>
                            <div class="layui-input-block">
                                <input type="text" name="ModemPort" value="<%= ModemPort %>" lay-verify="required|number" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">终端类型</label>
                            <div class="layui-input-block">
                                <select name="Type">
                                    <option value="调制器">调制器</option>    
                                    <option value="收扩机">收扩机</option>                                       
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">优先级</label>
                            <div class="layui-input-block">
                                <select name="Priority">
                                    <option value="1">上级优先</option>     
                                    <option value="2">下级优先</option>                                      
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">播出频率</label>
                            <div class="layui-input-block">
                                <input type="text" name="PlayFrequency" value="<%= PlayFrequency %>" lay-verify="required|number" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">播出衰减</label>
                            <div class="layui-input-block">
                                <input type="text" name="PlayAttenuation" value="<%= PlayAttenuation %>" lay-verify="required|number" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">上级主频</label>
                            <div class="layui-input-block">
                                <input type="text" name="MainFrequency" value="<%= MainFrequency %>" lay-verify="required|number" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">上级副频</label>
                            <div class="layui-input-block">
                                <input type="text" name="ViceFrequency" value="<%= ViceFrequency %>" lay-verify="required|number" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">普通音源</label>
                            <div class="layui-input-block">
                                <select name="CommonSource">                                                    
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">应急音源</label>
                            <div class="layui-input-block">
                                <select name="EmergencySource">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-md6">
                        <div class="layui-form-item">
                            <label class="layui-form-label">所属区域</label>
                            <div class="layui-input-block">
                                <input type="text" name="AreaName" value="<%= ADNM %>" autocomplete="off" readonly placeholder="" class="layui-input layui-input-chose">
                                <button class="layui-btn" id="choseArea">选 择</button>
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">设备类型</label>
                            <div class="layui-input-block">
                                <select name="ModemTypeId">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-md6">
                        <div class="layui-form-item">
                            <label class="layui-form-label">经纬度</label>
                            <div class="layui-input-block">
                                <input type="text" name="lnglat" value="<%= lnglat %>" lay-verify="" autocomplete="off" readonly placeholder="" class="layui-input layui-input-chose">
                                <button class="layui-btn" id="choseLngLat">选 择</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">电话验证</label>
                            <div class="layui-input-block">
                                <select name="VerifyType">
                                    <option value="1">密码验证</option>     
                                    <option value="2">白名单验证</option>         
                                    <option value="3">白名单加密码验证</option>                                  
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">电话密码</label>
                            <div class="layui-input-block">
                                <input type="text" name="TelPWD" value="<%= TelPWD %>" lay-verify="required" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">安装地址</label>
                            <div class="layui-input-block">
                                <input type="text" name="Adress" value="<%= Adress %>" autocomplete="off" placeholder="" class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-md6">
                        <div class="layui-form-item">
                            <label class="layui-form-label">备 注</label>
                            <div class="layui-input-block">
                                <textarea placeholder="请输入内容" name="Description" class="layui-textarea">
                                    <%= Description %>
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">启用状态</label>
                            <div class="layui-input-block">
                                <input type="radio" name="Status" value="0" title="启用">
                                <input type="radio" name="Status" value="1" title="禁用">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">当前状态</label>
                            <div class="layui-input-block">
                                <!-- <input type="checkbox" name="open" lay-skin="switch" lay-filter="switchTest" title="离线"> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <div class="layui-input-block">
                                <button class="layui-btn" lay-submit lay-filter="*">立即提交</button>
                                <button type="button" class="layui-btn layui-btn-primary js-back">返回</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>