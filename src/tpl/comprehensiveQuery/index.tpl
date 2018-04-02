<div class="layui-row">
    <div class="layui-col-md12">
        <hr class="layui-bg-gray">
        <div class="layui-form">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">所属区域</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input" placeholder="" />
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">设备类型</label>
                    <div class="layui-input-inline">
                        <select name="interest" lay-filter="aihao">
                            <option value="">请选择</option>
                            <option value="0">适配器</option>
                            <option value="1">IP播控器</option>
                            <option value="2">收扩机</option>
                            <option value="3">IP音柱</option>
                        </select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">设备状态</label>
                    <div class="layui-input-inline">
                        <select name="interest" lay-filter="aihao">
                                <option value="">请选择</option>
                                <option value="0">适配器</option>
                                <option value="1">IP播控器</option>
                                <option value="2">收扩机</option>
                                <option value="3">IP音柱</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="layui-form-item no-margin">
                <div class="layui-inline">
                    <label class="layui-form-label">接入方式</label>
                    <div class="layui-input-inline">
                        <select name="interest" lay-filter="aihao">
                                <option value="">请选择</option>
                                <option value="0">IP播发</option>
                                <option value="1">RDS播发</option>
                        </select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">启用状态</label>
                    <div class="layui-input-inline">
                        <select name="interest" lay-filter="aihao">
                                <option value="">请选择</option>
                                <option value="0">启用</option>
                                <option value="1">禁用</option>
                            </select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">Mac地址</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input" placeholder="输入设备Mac地址">
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
            <div class="layui-form-item layui-form-item-toolbar mb10">
                <label>总数：<span>0</span></label>
                <label>应急广播：<span>0</span></label>
                <label>日常广播：<span>0</span></label>
                <label>待机：<span>0</span></label>
                <label>离线：<span class="red">0</span></label>
            </div>
            <table class="layui-hide" id="roleTbList">
            </table>
        </div>
    </div>
</div>