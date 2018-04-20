<div class="layui-row layui-col-space10">
    <div class="layui-col-md2">
        <div class="layui-panel">
            <div class="layui-title">
                区域列表
            </div>
            <div class="layui-content">
                <div class="layui-form">
                    <div class="layui-form-item layui-form-item-search">
                        <input type="text" name="treeText" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" />
                        <button class="layui-btn layui-btn-normal" id="btnSearchTree"><i class="layui-icon">&#xe615;</i></button>
                    </div>
                    <div class="layui-form-item">
                        <ul id="tree" class="ztree ztree-patch"></ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="layui-col-md10">
        <div class="layui-form">
            <div class="layui-form-item">
                <button class="layui-btn layui-btn-sm js-add"><i class="layui-icon">&#xe654;</i>新 增</button>
                <button class="layui-btn layui-btn-primary layui-btn-sm js-edit"><i class="layui-icon">&#xe642;</i>修 改</button>
                <button class="layui-btn layui-btn-primary layui-btn-sm js-del"><i class="layui-icon">&#xe640;</i>删 除</button>
            </div>
            <table class="layui-hide" lay-data="{id:'modemTbList'}" id="modemTbList">
            </table>
        </div>
    </div>
</div>