<div class="layui-row">
    <div class="layui-col-md12">
        <hr class="layui-bg-gray">
        <div class="layui-form">
            <div class="layui-form-item no-margin">
                <div class="layui-inline">
                    <label class="layui-form-label">创建日期</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input" id="auditDate" placeholder="请选择日期区间">
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">定时状态</label>
                    <div class="layui-input-inline">
                        <select name="interest" lay-filter="aihao">
                            <option value="">请选择</option>
                            <option value="0">收扩机</option>
                            <option value="1">IP音柱</option>
                        </select>
                    </div>
                </div>
                <div class="layui-inline">
                    <div class="layui-input-inline">
                        <button class="layui-btn" lay-submit="" lay-filter="demo1">查 询</button>
                        <button type="reset" class="layui-btn layui-btn-primary">重 置</button>
                    </div>
                </div>
            </div>
            <hr class="layui-bg-gray">
            <div class="layui-form-item no-margin">
                <button class="layui-btn layui-btn-sm js-add"><i class="layui-icon">&#xe654;</i>新 增</button>
                <button class="layui-btn layui-btn-primary layui-btn-sm js-del"><i class="layui-icon">&#xe640;</i>删 除</button>
            </div>
            <hr class="layui-bg-gray">
            <table class="layui-hide" id="roleTbList">
            </table>
        </div>
    </div>
</div>