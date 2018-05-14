<div class="p20">
    <form class="layui-form">
        <div class="layui-form-item">
            <label class="layui-form-label">音源</label>
            <div class="layui-input-block">
                <input type="hidden" name="Id" value="<%= Id %>">
                <select name="PlaySourceType" lay-filter="playSourceType" lay-verify="required" lay-verType="tips">                                                    
                </select>
            </div>
        </div>
        <div class="layui-form-item hidden" id="frequencyContainer">
            <label class="layui-form-label">电台</label>
            <div class="layui-input-block">
                <select name="BroadCastingId">
                </select>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">所属区域</label>
            <div class="layui-input-block">
                <input type="text" name="AreaName" value="<%= AreaName %>" lay-verify="required" lay-verType="tips" disabled readonly autocomplete="off" class="layui-input layui-input-searchTree">
                <input type="hidden" name="ADCD" value="<%= ADCD %>">
                <input type="hidden" name="AreaCode" value="<%= AreaCode %>">
                <button type="button" class="layui-btn layui-btn-normal" id="choseArea">选 择</button>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">时间范围</label>
            <div class="layui-input-block">
                <input type="text" id="TimeRange" name="TimeRange" readonly lay-verify="required" lay-verType="tips" autocomplete="off" class="layui-input" placeholder="">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">是否启用</label>
            <div class="layui-input-block">
                <input type="checkbox" lay-filter="Status" lay-skin="primary" checked />
                <input type="hidden" name="Status" value="1">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">周期</label>
            <div class="layui-input-block">
                <input type="checkbox" lay-filter="PeriodEveryDay" title="每天" checked lay-skin="primary" />
                <input type="checkbox" lay-filter="Period" value="7" title="周一" disabled lay-skin="primary" />
                <input type="checkbox" lay-filter="Period" value="6" title="周二" disabled lay-skin="primary" />
                <input type="checkbox" lay-filter="Period" value="5" title="周三" disabled lay-skin="primary" />
                <input type="checkbox" lay-filter="Period" value="4" title="周四" disabled lay-skin="primary" />
                <input type="checkbox" lay-filter="Period" value="3" title="周五" disabled lay-skin="primary" />
                <input type="checkbox" lay-filter="Period" value="2" title="周六" disabled lay-skin="primary" />
                <input type="checkbox" lay-filter="Period" value="1" title="周日" disabled lay-skin="primary" />
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button type="button" class="layui-btn" lay-submit lay-filter="addTimeBroadCast">立即提交</button>
            </div>
        </div>
    </form>
</div>