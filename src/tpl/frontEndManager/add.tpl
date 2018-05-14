<div class="layui-single-title">
    <span class="layui-breadcrumb">
    <a href="#frontEndManager/index">
        终端管理
    </a>
    <span lay-separator="">/</span>
    <a>
        <cite><%= title %></cite>
    </a>
    </span>
</div>
<script type="text/html" class="lay-hide" id="modemWhiteBar">
    <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="delete">删除</a>
</script>
<script type="text/html" class="lay-hide" id="broadCastBar">
    <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="delete">删除</a>
</script>
<script type="text/html" class="lay-hide" id="timerBroadCastBar">
    <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="delete">删除</a>
</script>
<div class="layui-tab layui-tab-patch" lay-filter="modemTab">
    <ul class="layui-tab-title">
        <li class="layui-this">基础信息</li>
        <li>白名单设置</li>
        <li>电台设置</li>
        <li>定时广播</li>
    </ul>
    <div class="layui-tab-content">
        <div class="layui-tab-item layui-show">
            <form id="frmFrontEndInfo" class="layui-form">
                <input type="hidden" name="Id" value="<%= Id %>">
                <input type="hidden" name="Guid" value="<%= Guid %>">
                <input type="hidden" name="ADCD" value="<%= ADCD %>">
                <input type="hidden" name="AreaCode" value="<%= AreaCode %>">
                <div class="layui-row">
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">终端名称</label>
                            <div class="layui-input-block">
                                <input type="text" name="ModemName" value="<%= ModemName %>" lay-verify="required" lay-verType="tips" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">Mac地址</label>
                            <div class="layui-input-block">
                                <input type="text" name="Mac" value="<%= Mac %>" lay-verify="required" lay-verType="tips" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">IP地址</label>
                            <div class="layui-input-block">
                                <input type="text" name="ModemIp" value="<%= ModemIp %>" lay-verify="required" lay-verType="tips" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">IP端口</label>
                            <div class="layui-input-block">
                                <input type="text" name="ModemPort" value="<%= ModemPort %>" lay-verify="required|number" lay-verType="tips" autocomplete="off" class="layui-input">
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
                                <input type="text" name="PlayFrequency" value="<%= PlayFrequency %>" lay-verify="required|double|frequencyRange" lay-verType="tips" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">播出衰减</label>
                            <div class="layui-input-block">
                                <input type="text" name="PlayAttenuation" value="<%= PlayAttenuation %>" lay-verify="required|int" lay-verType="tips" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">上级主频</label>
                            <div class="layui-input-block">
                                <input type="text" name="MainFrequency" value="<%= MainFrequency %>" lay-verify="required|double|frequencyRange" lay-verType="tips" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">上级副频</label>
                            <div class="layui-input-block">
                                <input type="text" name="ViceFrequency" value="<%= ViceFrequency %>" lay-verify="required|double|frequencyRange" lay-verType="tips" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">设备类型</label>
                            <div class="layui-input-block">
                                <select name="ModemTypeId" lay-filter="modemType">
                                            </select>
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
                </div>
                <div class="layui-row">
                    <div class="layui-col-md6">
                        <div class="layui-form-item">
                            <label class="layui-form-label">所属区域</label>
                            <div class="layui-input-block">
                                <input type="text" name="ADNM" value="<%= ADNM %>" autocomplete="off" readonly class="layui-input layui-input-searchTree">
                                <button class="layui-btn" id="choseArea">选 择</button>
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
                            <label class="layui-form-label">经纬度</label>
                            <div class="layui-input-block">
                                <input type="text" name="txtLngLat" value="<%= (Lng && Lat) ? (Lng +','+ Lat) : '' %>" autocomplete="off" readonly class="layui-input layui-input-searchTree">
                                <input type="hidden" name="Lng" value="<%= Lng %>">
                                <input type="hidden" name="Lat" value="<%= Lat %>">
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
                                <input type="text" name="TelPWD" value="<%= TelPWD %>" lay-verify="required" lay-verType="tips" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">安装地址</label>
                            <div class="layui-input-block">
                                <input type="text" name="Adress" value="<%= Adress %>" autocomplete="off" class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="layui-row">
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">启用状态</label>
                            <div class="layui-input-block">
                                <input type="radio" name="Status" value="0" title="启用">
                                <input type="radio" name="Status" value="1" title="禁用">
                            </div>
                        </div>
                    </div>
                </div> -->
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
                    <div class="layui-col-md6">
                        <div class="layui-form-item">
                            <div class="layui-input-block">
                                <button class="layui-btn" lay-submit lay-filter="*">
                                            <% if(isEdit){ %> 立即提交 <% }else { %> 保存基础数据并下发<% } %></button>
                                <button type="button" class="layui-btn layui-btn-primary js-back">返回</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="layui-tab-item">
            <button class="layui-btn layui-btn-sm mb10" lay-filter="whiteIssue">指令下发</button>
            <table class="layui-table" lay-filter="whiteTb" id="whiteTbList">
            </table>
        </div>
        <div class="layui-tab-item">
            <button class="layui-btn layui-btn-sm mb10" lay-filter="broadCastingIssue">指令下发</button>
            <table class="layui-table" lay-filter="broadCastBarTb" id="broadcastingTbList">
            </table>
        </div>
        <div class="layui-tab-item">
            <button class="layui-btn layui-btn-sm mb10" lay-filter="timeBroadCastIssue">指令下发</button>
            <table class="layui-table" lay-filter="timerBoradCastTb" id="timeBroadCastTbList">
            </table>
        </div>
    </div>
</div>