<div class="p20">
    <div class="layui-form layui-form-patch">
        <div class="layui-form-item">
            <label class="layui-form-label">播发频次</label>
            <div class="layui-input-block">
                <input type="radio" name="sex" value="单次" title="单次" checked="">
                <input type="radio" name="sex" value="每天" title="每天">
                <input type="radio" name="sex" value="每周" title="每周">
            </div>
        </div>
        <div class="layui-form">
            <div class="layui-form-item">
                <label class="layui-form-label">启停时间</label>
                <div class="layui-input-block">
                    <input type="text" class="layui-input w-300" placeholder="" />
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label"></label>
                <div class="layui-input-block">
                    节目时长小于启停时间段时，将循环播放指定的内容
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">播发区域</label>
                <div class="layui-input-block clearfix">
                    <input type="text" class="layui-input layui-input-dialog-chose" placeholder="" />
                    <button class="layui-btn">选 择</button>
                </div>
            </div>
            <hr class="layui-bg-gray">
            <div class="layui-form-item">
                <label class="layui-form-label">节目来源</label>
                <div class="layui-input-block ">
                    <input type="radio" name="source" value="本地音源" title="本地音源" checked="">
                    <input type="radio" name="source" value="文转语" title="媒资库">
                </div>
            </div>

            <div class="layui-form-item">
                <label class="layui-form-label">音源设备</label>
                <div class="layui-input-block ">
                    <input type="radio" name="equipment" value="设备器01" title="设备器01">
                </div>
            </div>

            <div class="layui-form-item">
                <label class="layui-form-label">音源通道</label>
                <div class="layui-input-block ">
                    <input type="radio" name="chose" value="MP3" title="MP3" checked>
                    <input type="radio" name="chose" value="线路1" title="线路1">
                    <input type="radio" name="chose" value="线路2" title="线路2">
                    <input type="radio" name="chose" value="收音机" title="收音机">
                    <input type="radio" name="chose" value="麦克风" title="麦克风">
                    <input type="radio" name="chose" value="报警" title="报警">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">广播状态</label>
                <div class="layui-input-block ">
                    <input type="radio" name="chose" value="启用" title="启用" checked>
                    <input type="radio" name="chose" value="禁用" title="禁用">
                </div>
            </div>
        </div>
    </div>
</div>