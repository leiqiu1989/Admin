<div class="layui-row">
    <div class="layui-col-md12">
        <div class="layui-form">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">查询字段1</label>
                    <div class="layui-input-inline">
                        <input type="tel" name="phone" lay-verify="required|phone" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">查询字段2</label>
                    <div class="layui-input-inline">
                        <input type="tel" name="phone" lay-verify="required|phone" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-inline">
                    <div class="layui-input-inline">
                        <button class="layui-btn" lay-submit="" lay-filter="demo1">查 询</button>
                        <button type="reset" class="layui-btn layui-btn-primary">重 置</button>
                    </div>
                </div>
            </div>
            <div class="layui-form-item">
                <button class="layui-btn layui-btn-sm js-add"><i class="layui-icon">&#xe654;</i>新 增</button>
                <button class="layui-btn layui-btn-primary layui-btn-sm js-edit"><i class="layui-icon">&#xe642;</i>修 改</button>
                <button class="layui-btn layui-btn-primary layui-btn-sm js-del"><i class="layui-icon">&#xe640;</i>删 除</button>
            </div>
            <table class="layui-hide" id="roleTbList">
            </table>
        </div>
    </div>
</div>