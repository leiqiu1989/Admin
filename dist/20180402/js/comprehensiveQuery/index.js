define("comprehensiveQuery/index",["common","api","underscore","../../tpl/comprehensiveQuery/index"],function(e,i,t){"use strict";var n=e("common");e("api");e("underscore");var r={index:e("../../tpl/comprehensiveQuery/index")},l=function(){};$.extend(l.prototype,{init:function(){n.renderContent(r.index),n.renderForm(),n.initDateTime({elem:"#auditDate",range:!0}),this.initTable(),this.event()},initTable:function(){layui.use(["table"],function(){var e=layui.table;e.render({elem:"#roleTbList",url:"/demo/table/user/",page:!0,cols:[[{field:"id",title:"ID",width:80,sort:!0},{field:"username",title:"用户名",width:80},{field:"sex",title:"性别",width:80,sort:!0},{field:"city",title:"城市",width:80},{field:"sign",title:"签名",width:170},{field:"experience",title:"积分",width:80,sort:!0},{field:"score",title:"评分",width:80,sort:!0},{field:"classify",title:"职业",width:80},{field:"wealth",title:"财富",width:135,sort:!0}]]})})},event:function(){}});var d=new l;i.init=function(){d.init()}});