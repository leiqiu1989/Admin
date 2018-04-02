<div class="p20">
    <form class="layui-form layui-form-patch">
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">终端名称</label>
                <div class="layui-input-inline">
                    <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入标题" class="layui-input">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">Mac地址</label>
                <div class="layui-input-inline">
                    <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入标题" class="layui-input">
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">终端类型</label>
                <div class="layui-input-inline">
                    <select name="interest">
                        <option value="0">适配器</option>                                           
                    </select>
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">终端型号</label>
                <div class="layui-input-inline">
                    <select name="interest">
                        <option value="0">BW2017型</option>                                           
                    </select>
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">所属区域</label>
                <div class="layui-input-inline">
                    <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入标题" class="layui-input">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">逻辑地址</label>
                <div class="layui-input-inline">
                    <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入标题" class="layui-input">
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">经 度</label>
                <div class="layui-input-inline">
                    <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入标题" class="layui-input">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">纬 度</label>
                <div class="layui-input-inline">
                    <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入标题" class="layui-input">
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">主接收频率(MHz)</label>
                <div class="layui-input-inline">
                    <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入标题" class="layui-input">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">备份接收频率</label>
                <div class="layui-input-inline">
                    <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入标题" class="layui-input">
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">安装地址</label>
                <div class="layui-input-inline">
                    <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入标题" class="layui-input">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">备 注</label>
                <div class="layui-input-inline">
                    <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入标题" class="layui-input">
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">音量</label>
            <div class="layui-input-block">

            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">启用状态</label>
            <div class="layui-input-block">
                <input type="radio" name="status" value="启用" title="启用" checked="">
                <input type="radio" name="status" value="禁用" title="禁用">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">连接方式</label>
            <div class="layui-input-block">
                <input type="radio" name="status" value="0" title="IP播发" checked="">
                <input type="radio" name="status" value="1" title="RDS播发">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">当前状态</label>
            <div class="layui-input-block">
                <input type="checkbox" checked="" name="open" lay-skin="switch" lay-filter="switchTest" title="离线">
            </div>
        </div>
    </form>
</div>