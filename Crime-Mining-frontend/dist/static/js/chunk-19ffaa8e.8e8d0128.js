(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-19ffaa8e"],{"5def":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tab-container"},[a("el-tag",[t._v("采用的算法 ："+t._s(t.algorithm))]),a("el-tag",{staticStyle:{"margin-left":"10px"},attrs:{type:"success"}},[t._v("原始的属性个数 ："+t._s(t.oldHeader.length))]),a("el-tag",{staticStyle:{"margin-left":"10px"},attrs:{type:"danger"}},[t._v("约简后的属性个数 ："+t._s(t.newHeader.length))]),a("el-tabs",{staticStyle:{"margin-top":"15px"},attrs:{type:"border-card"},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{key:t.tabMapOptions[0].key,attrs:{label:t.tabMapOptions[0].label,name:t.tabMapOptions[0].key}},[a("div",{staticStyle:{width:"100%"}},[t._v("约简后的数据：")]),a("el-table",{staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:t.newResults,border:"","highlight-current-row":"",height:500}},[t.newResults.length?a("el-table-column",{attrs:{type:"index",label:"编号"}}):t._e(),t._l(t.newHeader,(function(t){return a("el-table-column",{key:t,attrs:{prop:t,label:t}})}))],2),a("el-divider"),a("div",{staticStyle:{width:"100%"}},[t._v("原始数据：")]),a("el-table",{staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:t.oldResults,border:"","highlight-current-row":"",height:500}},[t.oldResults.length?a("el-table-column",{attrs:{type:"index",label:"编号"}}):t._e(),t._l(t.oldHeader,(function(t){return a("el-table-column",{key:t,attrs:{prop:t,label:t}})}))],2)],1),a("el-tab-pane",{key:t.tabMapOptions[1].key,attrs:{label:t.tabMapOptions[1].label,name:t.tabMapOptions[1].key}},[a("div",{staticStyle:{width:"100%"}},[t._v("约简后的属性：")]),a("el-table",{staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:t.newAttributes,border:"","highlight-current-row":"",height:100}},t._l(t.attributeHeader,(function(t){return a("el-table-column",{key:t,attrs:{prop:t,label:t}})})),1),a("el-divider"),a("div",{staticStyle:{width:"100%"}},[t._v("原始属性：")]),a("el-table",{staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:t.oldAttributes,border:"","highlight-current-row":"",height:100}},t._l(t.attributeHeader,(function(t){return a("el-table-column",{key:t,attrs:{prop:t,label:t}})})),1)],1)],1)],1)},i=[],n=(a("99af"),a("d3b7"),a("25f0"),a("caad"),a("2532"),a("313e"),a("f12a"),{name:"Data-Reduction-Result",components:{},data:function(){return{attributeHeader:[],oldAttributes:[],newAttributes:[],newResults:[],newHeader:[],oldResults:[],oldHeader:[],tabMapOptions:[{label:"数据的形式",key:"1"},{label:"属性的形式",key:"2"}],activeName:"1",algorithm:""}},watch:{activeName:function(t){this.$router.push("".concat(this.$route.path,"?tab=").concat(t))}},created:function(){var t=this.$route.params.excelData;this.algorithm=this.$route.params.algorithm,this.newResults=t.newResults,this.newHeader=t.newHeader,this.oldResults=t.oldResults,this.oldHeader=t.oldHeader,this.initAttribute(),console.log(t);var e=this.$route.query.tab;e&&(this.activeName=e)},mounted:function(){},methods:{initAttribute:function(){for(var t={},e={},a=this.oldHeader,r=this.newHeader,i=1;i<=a.length;i++){var n=i.toString();this.attributeHeader.push(n),e[n]=a[i-1],t[n]=a[i-1],r.includes(a[i-1])||(t[n]="")}this.newAttributes.push(t),this.oldAttributes.push(e)}}}),l=n,s=(a("bf0d"),a("2877")),o=Object(s["a"])(l,r,i,!1,null,"7f4bf328",null);e["default"]=o.exports},bf0d:function(t,e,a){"use strict";a("d72d")},d72d:function(t,e,a){},f12a:function(t,e,a){"use strict";a.d(e,"a",(function(){return i})),a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return l}));var r=a("b775");function i(t){return Object(r["a"])({url:"/dataReduction/dataPreprocessing",method:"post",data:t,headers:{"Content-Type":"multipart/form-data"},responseType:"blob"})}function n(t){return Object(r["a"])({url:"/dataReduction/dataReductionProcessing",method:"post",data:t,headers:{"Content-Type":"multipart/form-data"},responseType:"blob"})}function l(t){return Object(r["a"])({url:"/dataReduction/algorithms",method:"GET"})}}}]);