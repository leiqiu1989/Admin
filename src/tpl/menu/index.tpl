<div class="layui-row layui-col-space10">
    <div class="layui-col-md3">
        <div class="layui-panel">
            <div class="layui-title">
                菜单列表
            </div>
            <div class="layui-content">
                <ul id="tree" class="ztree"></ul>
            </div>
        </div>
    </div>
    <div class="layui-col-md6">
        <fieldset class="layui-elem-field layui-field-title">
            <legend>菜单属性</legend>
        </fieldset>
        <div class="layui-form">
            <div class="layui-form-item">
                <label class="layui-form-label">类型</label>
                <div class="layui-input-block">
                    <input type="radio" name="sex" value="目录" title="目录" checked="">
                    <input type="radio" name="sex" value="菜单" title="菜单">
                    <input type="radio" name="sex" value="按钮" title="按钮">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">菜单名称</label>
                <div class="layui-input-block">
                    <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入标题" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">上级菜单</label>
                <div class="layui-input-block">
                    <input type="text" name="username" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
                </div>
            </div>

            <div class="layui-form-item">
                <label class="layui-form-label">菜单URL</label>
                <div class="layui-input-block">
                    <input type="tel" name="phone" lay-verify="required|phone" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">授权标识</label>
                <div class="layui-input-block">
                    <input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">显示序号</label>
                <div class="layui-input-block">
                    <input type="text" name="identity" lay-verify="identity" placeholder="" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">图标</label>
                <div class="layui-input-block">
                    <input type="text" name="identity" lay-verify="identity" placeholder="" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-input-block">
                    <button class="layui-btn" lay-submit="" lay-filter="demo1">立即提交</button>
                    <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                </div>
            </div>
        </div>
    </div>
    <div class="layui-col-md3">
    </div>
</div>