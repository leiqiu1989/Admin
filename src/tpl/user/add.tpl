<div class="p20">
    <form class="layui-form">
        <div class="layui-form-item">
            <label class="layui-form-label">登录名</label>
            <div class="layui-input-block">
                <input type="text" name="UserId" value="<%= UserId %>" lay-verify="required" lay-verType="tips" autocomplete="off" placeholder="请输入登录名" class="layui-input">
                <input type="hidden" name="Id" value="<%= Id %>">
            </div>
        </div>
        <%if(isAdd){%>
            <div class="layui-form-item">
                <label class="layui-form-label">登陆密码</label>
                <div class="layui-input-block">
                    <input type="password" name="UserPwd" lay-verify="required" lay-verType="tips" autocomplete="off" class="layui-input" placeholder="请输入登陆密码">
                </div>
            </div>
            <%}%>
                <div class="layui-form-item">
                    <label class="layui-form-label">所属部门</label>
                    <div class="layui-input-block">
                        <input type="text" name="DepartmentName" value="<%= DepartmentName %>" lay-verify="required" disabled readonly autocomplete="off" class="layui-input layui-input-searchTree">
                        <input type="hidden" name="DepartmentId" value="<%= DepartmentId %>">
                        <button type="button" class="layui-btn layui-btn-normal js-selectDept">选择</button>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">姓名</label>
                    <div class="layui-input-block">
                        <input type="text" name="UserName" value="<%= UserName %>" lay-verify="required" lay-verType="tips" autocomplete="off" class="layui-input" placeholder="">
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">是否启用</label>
                    <div class="layui-input-block">
                        <input type="radio" name="IsAble" value="true" title="是">
                        <input type="radio" name="IsAble" value="false" title="否" checked>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">是否改密</label>
                    <div class="layui-input-block">
                        <input type="radio" name="IfChangePwd" value="true" title="是">
                        <input type="radio" name="IfChangePwd" value="false" title="否" checked>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">备注</label>
                    <div class="layui-input-block">
                        <textarea placeholder="请输入内容" name="Description" class="layui-textarea">
                               <%= Description %>
                        </textarea>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button type="button" class="layui-btn" lay-submit lay-filter="*">立即提交</button>
                        <button type="reset" class="layui-btn layui-btn-primary">重 置</button>
                    </div>
                </div>
    </form>
</div>