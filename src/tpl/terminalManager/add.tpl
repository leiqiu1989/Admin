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
                <input type="hidden" name="ADCD" value="<%= ADCD %>">
                <input type="hidden" name="ModemId" value="<%= ModemId %>">
                <div class="layui-row">
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">终端名称</label>
                            <div class="layui-input-block">
                                <input type="text" name="TerminalName" value="<%= TerminalName %>" lay-verify="required" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">物理地址</label>
                            <div class="layui-input-block">
                                <input type="text" name="Mac" value="<%= Mac %>" lay-verify="required" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">音量</label>
                            <div class="layui-input-block">
                                <input type="text" name="Volume" value="<%= Volume %>" lay-verify="required|int" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">逻辑地址</label>
                            <div class="layui-input-block">
                                <select name="LogicalAddress">                                    
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">接收主频</label>
                            <div class="layui-input-block">
                                <input type="text" name="MainFrequency" value="<%= MainFrequency %>" lay-verify="required|number" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">接收副频</label>
                            <div class="layui-input-block">
                                <input type="text" name="ViceFrequency" value="<%= ViceFrequency %>" lay-verify="required|number" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">安装时间</label>
                            <div class="layui-input-block">
                                <input type="text" name="InstallDate" value="<%= InstallDate %>" readonly lay-verify="required" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">安装地址</label>
                            <div class="layui-input-block">
                                <input type="text" name="InstallAddress" value="<%= InstallAddress %>" lay-verify="required" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input">
                            </div>
                        </div>
                    </div>
                    <div class="layui-col-md3">
                        <div class="layui-form-item">
                            <label class="layui-form-label">设备状态</label>
                            <div class="layui-input-block">
                                <select name="Status">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-row">
                    <div class="layui-col-md6">
                        <div class="layui-form-item">
                            <label class="layui-form-label">所属适配器</label>
                            <div class="layui-input-block">
                                <input type="text" name="ADNM" value="<%= ADNM %>" autocomplete="off" readonly placeholder="" class="layui-input layui-input-searchTree">
                                <button class="layui-btn" id="choseArea">选 择</button>
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