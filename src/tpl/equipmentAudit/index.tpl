<div class="layui-row layui-col-space10">
    <div class="layui-col-md2">
        <div class="layui-panel">
            <div class="layui-title">
                区域列表
            </div>
            <div class="layui-content">
                <div class="layui-form">
                    <div class="layui-form-item layui-form-item-search">
                        <input type="text" name="username" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" />
                        <button class="layui-btn layui-btn-normal"><i class="layui-icon">&#xe615;</i></button>
                    </div>
                    <div class="layui-form-item">
                        <ul id="tree" class="ztree"></ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="layui-col-md10">
        <div class="layui-form">
            <div class="layui-form-item">
                <button class="layui-btn layui-btn-sm js-add"><i class="layui-icon">&#xe616;</i>审 核</button>
            </div>
            <table class="layui-hide" id="userTbList">
            </table>
        </div>
    </div>
</div>