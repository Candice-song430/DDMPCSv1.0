(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fb4e1c80"],{"0329":function(t,e,a){"use strict";a("06a1")},"06a1":function(t,e,a){},3626:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tab-container"},[a("el-tag",[t._v("对象个数 ："+t._s(t.tableData.length))]),a("el-tag",[t._v("属性个数 ："+t._s(t.tableHeader.length))]),a("el-tabs",{staticStyle:{"margin-top":"15px"},attrs:{type:"border-card"},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{key:t.tabMapOptions[1].key,attrs:{label:t.tabMapOptions[1].label,name:t.tabMapOptions[1].key}},[a("el-row",t._l(t.tableHeader,(function(e,r){return a("el-col",{key:e+"pie",staticStyle:{"margin-top":"10px"},attrs:{span:20,offset:2}},[a("el-card",{attrs:{"body-style":{padding:"0px"}}},[a("div",{staticStyle:{width:"900px",height:"600px"},attrs:{id:e+"pie"}}),a("div",{staticStyle:{padding:"14px"}},[a("span",[t._v(t._s(e))])])])],1)})),1)],1),a("el-tab-pane",{key:t.tabMapOptions[2].key,attrs:{label:t.tabMapOptions[2].label,name:t.tabMapOptions[2].key}},[a("el-row",t._l(t.tableHeader,(function(e,r){return a("el-col",{key:e+"bar",staticStyle:{"margin-top":"10px"},attrs:{span:25,offset:1}},[a("el-card",{directives:[{name:"show",rawName:"v-show",value:"ajlb"!==e||"案件类别"!==e,expression:"o !== 'ajlb' || o !== '案件类别'"}],attrs:{"body-style":{padding:"0px"}}},[a("div",{staticStyle:{width:"1050px",height:"600px"},attrs:{id:e+"bar"}}),a("div",{staticStyle:{padding:"14px","text-align":"center"}},[a("span",{staticStyle:{float:"left"}},[t._v(t._s(e))]),a("el-button",{attrs:{type:"primary",round:""},on:{click:function(e){return t.swapSingleXY(r)}}},[t._v("横纵坐标转换")])],1)])],1)})),1)],1),a("el-tab-pane",{key:t.tabMapOptions[3].key,attrs:{label:t.tabMapOptions[3].label,name:t.tabMapOptions[3].key}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","highlight-current-row":""}},[t.tableData.length?a("el-table-column",{attrs:{type:"index",label:"编号"}}):t._e(),t._l(t.tableHeader,(function(t){return a("el-table-column",{key:t,attrs:{prop:t,label:t}})}))],2)],1)],1)],1)},n=[],i=(a("99af"),a("cb29"),a("d3b7"),a("6062"),a("3ca3"),a("ddb0"),a("a630"),a("159b"),a("b0c0"),a("e9c4"),a("313e")),o=a.n(i),s={name:"Data-Analysis",components:{},data:function(){return{barSeries:[],pieDatas:[],tableData:[],tableHeader:[],tabMapOptions:[{label:"数据信息",key:"1"},{label:"饼状图",key:"2"},{label:"柱状图",key:"3"},{label:"原始数据",key:"4"}],activeName:"4",swapXY:[],crimeNames:[],crimeNameIndex:0}},watch:{activeName:function(t){this.$router.push("".concat(this.$route.path,"?tab=").concat(t))}},created:function(){var t=this.$route.params.excelData;this.tableData=t.results,this.tableHeader=t.header,this.swapXY=new Array(this.tableHeader.length).fill(!1);var e=this.$route.query.tab;e&&(this.activeName=e)},mounted:function(){this.initPie(),this.initBar()},methods:{swapSingleXY:function(t){var e=this;this.swapXY[t]=!this.swapXY[t];var a=this.tableHeader,r=this.tableData,n=this.crimeNameIndex,i=this.crimeNames,s=o.a.init(document.getElementById(a[t]+"bar"));if(s.clear(),this.swapXY[t]){for(var l={},c=0;c<i.length;c++)l[i[c]]={};for(var p=new Set,u=0;u<r.length;u++)void 0==l[r[u][a[n]]][r[u][a[t]]]?l[r[u][a[n]]][r[u][a[t]]]=1:l[r[u][a[n]]][r[u][a[t]]]++,p.add(r[u][a[t]]);p=Array.from(p);var d=[],f=[];for(var h in l){f.push(h);var b=l[h],v=[];for(var y in b)v.push(b[y]);d.push({data:v,name:h,type:"bar",stack:"search engine",barWidth:20})}var g={toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"value"},yAxis:{type:"category",data:p},series:d,legend:{data:f,type:"scroll",show:!0,orient:"vertical",left:5,top:10,formatter:function(t){var e=0;return d.forEach((function(a){a.name==t&&a.data.forEach((function(t){e+=t}))})),"".concat(t,":[").concat(e,"]")}},grid:{left:120},label:{show:!0}};s.setOption(g)}else{for(var m={},x=0;x<i.length;x++)m[i[x]]=0;l={};for(var w=0;w<r.length;w++)void 0==l[r[w][a[t]]]&&(l[r[w][a[t]]]=JSON.parse(JSON.stringify(m))),l[r[w][a[t]]][r[w][a[n]]]++;d=[],f=[];for(var h in l){f.push(h);var S=l[h];v=[];for(var y in S)v.push(S[y]);d.push({data:v,name:h,type:"bar",stack:"search engine",barWidth:20})}g={toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"category",data:i},yAxis:{type:"value"},series:d,legend:{data:f,show:!0,type:"scroll",orient:"vertical",left:5,top:10,formatter:function(a){var r=0;return e.barSeries[t].forEach((function(t){t.name==a&&t.data.forEach((function(t){r+=t}))})),"".concat(a,":[").concat(r,"]")}},grid:{left:120},label:{show:!0}};s.setOption(g)}},initBar:function(){for(var t,e=this,a=this.tableHeader,r=this.tableData,n=new Set,i=0;i<a.length;i++)if("ajlb"===a[i]||"案件类别"===a[i]){t=i;for(var s=0;s<r.length;s++)n.add(r[s][a[i]]);n=Array.from(n);break}this.crimeNames=n,this.crimeNameIndex=t;for(var l={},c=0;c<n.length;c++)l[n[c]]=0;for(var p=function(i){if("ajlb"===a[i]||"案件类别"===a[i])return"continue";d=o.a.init(document.getElementById(a[i]+"bar")),f={};for(var s=0;s<r.length;s++)void 0==f[r[s][a[i]]]&&(f[r[s][a[i]]]=JSON.parse(JSON.stringify(l))),f[r[s][a[i]]][r[s][a[t]]]++;for(v in console.log(f),h=[],b=[],f){b.push(v);var c=f[v];for(g in y=[],c)y.push(c[g]);h.push({data:y,name:v,type:"bar",stack:"search engine",barWidth:20})}e.barSeries.push(h),m={toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"category",data:n},yAxis:{type:"value"},series:h,legend:{data:b,show:!0,type:"scroll",orient:"vertical",left:5,top:10,formatter:function(t){var a=0;return e.barSeries[i].forEach((function(e){e.name==t&&e.data.forEach((function(t){a+=t}))})),"".concat(t,":[").concat(a,"]")}},grid:{left:120},label:{show:!0}},d.setOption(m)},u=0;u<a.length;u++){var d,f,h,b,v,y,g,m;p(u)}},initPie:function(){for(var t=this,e=this.tableHeader,a=this.tableData,r=function(r){i=o.a.init(document.getElementById(e[r]+"pie")),s={};for(var n=0;n<a.length;n++)void 0!==s[a[n][e[r]]]?s[a[n][e[r]]]=s[a[n][e[r]]]+1:s[a[n][e[r]]]=1;for(p in l=[],c=[],s)l.push(p),c.push({value:s[p],name:p});t.pieDatas.push(c),u={toolbox:{feature:{saveAsImage:{}}},tooltip:{trigger:"item",formatter:"{b} : {c} | ({d}%)"},legend:{orient:"vertical",left:10,data:l,top:10,formatter:function(e){var a,n=0;t.pieDatas[r].forEach((function(t){n+=t.value,t.name==e&&(a=t.value)}));var i=Math.round(a/n*100);return"".concat(e,":[").concat(a,", ").concat(i,"%]")},textStyle:{fontSize:"30px"}},series:[{name:"访问来源",type:"pie",radius:"55%",center:["50%","50%"],data:c}]},i.setOption(u)},n=0;n<e.length;n++){var i,s,l,c,p,u;r(n)}}}},l=s,c=(a("0329"),a("2877")),p=Object(c["a"])(l,r,n,!1,null,"683304bc",null);e["default"]=p.exports},"81d5":function(t,e,a){"use strict";var r=a("7b0b"),n=a("23cb"),i=a("50c4");t.exports=function(t){var e=r(this),a=i(e.length),o=arguments.length,s=n(o>1?arguments[1]:void 0,a),l=o>2?arguments[2]:void 0,c=void 0===l?a:n(l,a);while(c>s)e[s++]=t;return e}},cb29:function(t,e,a){var r=a("23e7"),n=a("81d5"),i=a("44d2");r({target:"Array",proto:!0},{fill:n}),i("fill")},e9c4:function(t,e,a){var r=a("23e7"),n=a("d066"),i=a("d039"),o=n("JSON","stringify"),s=/[\uD800-\uDFFF]/g,l=/^[\uD800-\uDBFF]$/,c=/^[\uDC00-\uDFFF]$/,p=function(t,e,a){var r=a.charAt(e-1),n=a.charAt(e+1);return l.test(t)&&!c.test(n)||c.test(t)&&!l.test(r)?"\\u"+t.charCodeAt(0).toString(16):t},u=i((function(){return'"\\udf06\\ud834"'!==o("\udf06\ud834")||'"\\udead"'!==o("\udead")}));o&&r({target:"JSON",stat:!0,forced:u},{stringify:function(t,e,a){var r=o.apply(null,arguments);return"string"==typeof r?r.replace(s,p):r}})}}]);