<form class="layui-form">
    <div class="dialogModem">
        <div class="layui-row">
            <div class="layui-col-md7">
                <div id="machineMap">
                </div>
            </div>
            <div class="layui-col-md5">
                <table class="layui-hide" lay-data="{id:'terminalList'}" lay-filter="filterTerminal" id="terminalList">
                </table>
                <script type="text/html" id="terminalBar">
                    <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="location">定位</a>
                </script>
            </div>
        </div>
        <div id="modemSetting">
            <input type="button" class="layui-btn layui-btn-sm" lay-filter="sysTime" value="校 时" />
            <input type="button" class="layui-btn layui-btn-sm" lay-filter="commonRadio" value="正常广播" />
            <input type="button" class="layui-btn layui-btn-sm" lay-filter="emergencyRadio" value="应急广播" />
            <input type="button" class="layui-btn layui-btn-sm" lay-filter="closeRadio" value="关闭广播" />
            <div class="modemStatusInfo">
                适配器广播信息：<span id="modemStatusInfo">无</span>
            </div>
            <hr class="layui-bg-gray">
            <input type="hidden" name="Guid">
            <div class="layui-row">
                <div class="layui-col-md6">
                    <div class="layui-form-item">
                        <label class="layui-form-label">普通音源</label>
                        <div class="layui-input-block">
                            <select name="CommonSource">     
                            </select>
                        </div>
                    </div>
                </div>
                <div class="layui-col-md6">
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
                        <label class="layui-form-label">优先级</label>
                        <div class="layui-input-block">
                            <select name="Priority">
                                                    <option value="1">上级优先</option>     
                                                    <option value="2">下级优先</option>                                      
                                                </select>
                        </div>
                    </div>
                </div>
                <div class="layui-col-md6">
                    <div class="layui-form-item">
                        <label class="layui-form-label">播出频率</label>
                        <div class="layui-input-block">
                            <input type="text" name="PlayFrequency" lay-verify="required|double" lay-verType="tips" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                </div>
            </div>
            <div class="layui-row">
                <div class="layui-col-md6">
                    <div class="layui-form-item">
                        <label class="layui-form-label">上级主频</label>
                        <div class="layui-input-block">
                            <input type="text" name="MainFrequency" lay-verify="required|double" lay-verType="tips" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-col-md6">
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
            </div>
            <div class="layui-row">
                <div class="layui-col-md6">
                    <div class="layui-form-item">
                        <label class="layui-form-label">上级副频</label>
                        <div class="layui-input-block">
                            <input type="text" name="ViceFrequency" lay-verify="required|double" lay-verType="tips" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-col-md6">
                    <div class="layui-form-item">
                        <label class="layui-form-label">电话密码</label>
                        <div class="layui-input-block">
                            <input type="text" name="TelPWD" lay-verify="required" lay-verType="tips" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                </div>
            </div>
            <div class="layui-row">
                <div class="layui-col-md6">
                    <div class="layui-form-item">
                        <label class="layui-form-label">播出衰减</label>
                        <div class="layui-input-block">
                            <input type="text" name="PlayAttenuation" lay-verify="required|int" lay-verType="tips" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                </div>
            </div>
            <div class="layui-row">
                <div class="layui-col-md6">
                    <div class="layui-form-item">
                        <div class="layui-input-block">
                            <button class="layui-btn" lay-submit lay-filter="*">立即下发</button>
                            <button type="button" class="layui-btn layui-btn-primary" lay-filter="refresh">
                                <i class="fa fa-refresh"></i>
                                刷 新
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>