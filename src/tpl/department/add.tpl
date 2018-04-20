<div class="p20">
    <form class="layui-form">
        <% if(isAdd){ %>
            <div class="layui-form-item">
                <label class="layui-form-label">父级名称</label>
                <div class="layui-input-block">
                    <input type="text" value="<%= parentName %>" readonly disabled lay-verify="required" lay-verType="tips" autocomplete="off" class="layui-input no-border">
                </div>
            </div>
            <% } %>
                <div class="layui-form-item">
                    <label class="layui-form-label">名称</label>
                    <div class="layui-input-block">
                        <input type="text" name="DepartmentName" value="<%= DepartmentName %>" lay-verify="required" lay-verType="tips" autocomplete="off" placeholder="请输入用户名" class="layui-input">
                        <input type="hidden" name="Id" value="<%= Id %>">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">排序号</label>
                    <div class="layui-input-block">
                        <input type="text" name="Sort" lay-verify="required|int" value="<%= Sort %>" lay-verType="tips" autocomplete="off" class="layui-input" placeholder="请输入排序号">
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button class="layui-btn" lay-submit lay-filter="*">立即提交</button>
                        <button type="reset" class="layui-btn layui-btn-primary">重 置</button>
                    </div>
                </div>
    </form>
</div>