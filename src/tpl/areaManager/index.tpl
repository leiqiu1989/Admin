<div class="layui-row layui-col-space10">
    <div class="layui-col-md2">
        <div class="layui-panel">
            <div class="layui-title">
                区域列表
            </div>
            <div class="layui-content">
                <div class="layui-form">
                    <div class="layui-form-item">
                        <ul id="tree" class="ztree ztree-patch"></ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="layui-col-md10">
        <fieldset class="layui-elem-field layui-field-title">
            <legend>区域信息</legend>
        </fieldset>
        <div class="lay-ui-row">
            <div class="layui-col-md4">
                <div class="layui-form">
                    <div class="layui-form-item">
                        <label class="layui-form-label">名称</label>
                        <div class="layui-input-block">
                            <input type="hidden" name="ADCD">
                            <input type="text" name="ADNM" lay-verify="required" lay-vertype="tips" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">编号</label>
                        <div class="layui-input-block">
                            <select name="InitCode">
                            </select>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-block">
                            <button class="layui-btn" lay-submit lay-filter="save">保 存</button>
                            <button class="layui-btn" lay-submit lay-filter="saveChild">添加子级并保存</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>