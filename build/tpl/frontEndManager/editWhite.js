define(function(){return '<div class="p20"> <form class="layui-form"> <div class="layui-form-item"> <label class="layui-form-label">电话号码</label> <div class="layui-input-block"> <input type="hidden" name="Id" value="<%= Id %>"> <input type="text" name="TelPhone" value="<%= TelPhone %>" lay-verify="required|phone" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">密码</label> <div class="layui-input-block"> <input type="text" name="Password" value="<%= Password %>" lay-verify="required" lay-verType="tips" autocomplete="off" placeholder="" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">所属区域</label> <div class="layui-input-block"> <input type="text" name="AreaName" value="<%= AreaName %>" autocomplete="off" readonly placeholder="" class="layui-input layui-input-searchTree"> <input type="hidden" name="ADCD" value="<%= ADCD %>"> <input type="hidden" name="AreaCode" value="<%= AreaCode %>"> <button type="button" class="layui-btn layui-btn-normal" id="choseArea">选 择</button> </div> </div> <div class="layui-form-item"> <div class="layui-input-block"> <button type="button" class="layui-btn" lay-submit lay-filter="saveWhite">立即提交</button> </div> </div> </form> </div>'});