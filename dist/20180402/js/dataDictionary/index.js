define("dataDictionary/index",["common","api","underscore","../../tpl/dataDictionary/index","../../tpl/dataDictionary/add"],function(e,n,i){"use strict";var t=e("common");e("api");e("underscore");var a={index:e("../../tpl/dataDictionary/index"),add:e("../../tpl/dataDictionary/add")},d=function(){};$.extend(d.prototype,{init:function(){t.renderContent(a.index),this.initTree(),this.initTable(),this.event()},initTree:function(){var e={},n=[{name:"父节点1 - 展开",open:!0,children:[{name:"父节点11 - 折叠",children:[{name:"叶子节点111"},{name:"叶子节点112"},{name:"叶子节点113"},{name:"叶子节点114"}]},{name:"父节点12 - 折叠",children:[{name:"叶子节点121"},{name:"叶子节点122"},{name:"叶子节点123"},{name:"叶子节点124"}]},{name:"父节点13 - 没有子节点",isParent:!0}]},{name:"父节点2 - 折叠",children:[{name:"父节点21 - 展开",open:!0,children:[{name:"叶子节点211"},{name:"叶子节点212"},{name:"叶子节点213"},{name:"叶子节点214"}]},{name:"父节点22 - 折叠",children:[{name:"叶子节点221"},{name:"叶子节点222"},{name:"叶子节点223"},{name:"叶子节点224"}]},{name:"父节点23 - 折叠",children:[{name:"叶子节点231"},{name:"叶子节点232"},{name:"叶子节点233"},{name:"叶子节点234"}]}]},{name:"父节点3 - 没有子节点",isParent:!0}];$.fn.zTree.init($("#tree"),e,n)},initTable:function(){layui.use(["table"],function(){var e=layui.table;e.render({elem:"#userTbList",url:"/demo/table/user/",page:!0,cols:[[{field:"id",title:"ID",width:80,sort:!0},{field:"username",title:"用户名",width:80},{field:"sex",title:"性别",width:80,sort:!0},{field:"city",title:"城市",width:80},{field:"sign",title:"签名",width:170},{field:"experience",title:"积分",width:80,sort:!0},{field:"score",title:"评分",width:80,sort:!0},{field:"classify",title:"职业",width:80},{field:"wealth",title:"财富",width:135,sort:!0}]]})})},event:function(){}});var r=new d;n.init=function(){r.init()}});