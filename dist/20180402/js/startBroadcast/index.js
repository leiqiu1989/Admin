define("startBroadcast/index",["common","api","underscore","../../tpl/startBroadcast/index"],function(t,e,i){"use strict";var n=t("common");t("api");t("underscore");var d={index:t("../../tpl/startBroadcast/index")},r=function(){};$.extend(r.prototype,{init:function(){n.renderContent(d.index),n.renderForm(),n.initDateTime({elem:"#auditDate",range:!0}),this.initTable(),this.event()},initTable:function(){layui.use(["table"],function(){var t=layui.table;t.render({elem:"#roleTbList",url:"/demo/table/user/",page:!0,cols:[[{field:"id",title:"ID",width:80,sort:!0},{field:"username",title:"用户名",width:80},{field:"sex",title:"性别",width:80,sort:!0},{field:"city",title:"城市",width:80},{field:"sign",title:"签名",width:170},{field:"experience",title:"积分",width:80,sort:!0},{field:"score",title:"评分",width:80,sort:!0},{field:"classify",title:"职业",width:80},{field:"wealth",title:"财富",width:135,sort:!0}]]})})},event:function(){}});var l=new r;e.init=function(){l.init()}});