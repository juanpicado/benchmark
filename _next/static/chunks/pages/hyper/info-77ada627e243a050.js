(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[475],{1841:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hyper/info",function(){return n(6336)}])},5371:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var i=n(4521),r=n(2647),a=n(7198);function l(e){let{type:t,data:n}=e;return(0,i.tZ)(a.x1,{options:{responsive:!0,interaction:{intersect:!1},scales:{x:{display:!0,title:{text:"date",display:!0}},y:{display:!0,title:{display:!0,text:t}}},plugins:{legend:{position:"top"},title:{display:!0,text:"".concat(t)}}},data:n})}r.kL.register(r.uw,r.f$,r.od,r.jn,r.Dx,r.u,r.De)},6336:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return E},default:function(){return O}});var i=n(4521),r=n(5518),a=n.n(r),l=n(959);let d=(0,l.createContext)({}),o=()=>(0,l.useContext)(d),c=e=>{let{filters:t,children:n}=e,{versions:r,customRange:a}=t,[o,c]=a,[s,u]=(0,l.useState)(o),[h,Z]=(0,l.useState)(c),[p,f]=(0,l.useState)(r);return(0,i.tZ)(d.Provider,{value:{from:s,to:h,setFrom:u,setTo:Z,versionsSelected:p,versions:r,setVersionsSelected:f},children:n})};var s=n(5723),u=n(4617),h=n(7055),Z=n(5812),p=n(8222),f=n(9512),m=n(7037),b=n(1701),y=n(6606);function v(){let{from:e,to:t,versionsSelected:n,versions:r,setTo:a,setFrom:l}=o(),d=e=>t=>{console.log(t.target.checked,e)};return(0,i.tZ)(b.Z,{sx:{bgcolor:"background.paper",boxShadow:1,margin:2,borderRadius:2,p:2,minWidth:300},children:(0,i.tZ)(h._,{dateAdapter:u.y,children:(0,i.BX)(p.ZP,{container:!0,spacing:2,children:[(0,i.tZ)(p.ZP,{item:!0,xs:4,children:(0,i.tZ)(Z.M,{label:"From",value:e,onChange(e){l(e.valueOf())},renderInput:e=>(0,i.tZ)(s.Z,{...e})})}),(0,i.tZ)(p.ZP,{item:!0,xs:4,children:(0,i.tZ)(Z.M,{label:"To",value:t,onChange(e){a(e.valueOf())},renderInput:e=>(0,i.tZ)(s.Z,{...e})})}),(0,i.tZ)(p.ZP,{item:!0,xs:4,children:(0,i.tZ)("div",{})}),(0,i.BX)(p.ZP,{item:!0,xs:8,children:[(0,i.tZ)(y.Z,{}),n?n.map(e=>(0,i.tZ)(f.Z,{control:(0,i.tZ)(m.Z,{defaultChecked:!0}),label:e,onChange:d(e)},e)):null]})]})})})}var x=n(5453),w=n.n(x),_=n(5371),g=n(4637),k=n.n(g),B=n(2699);let C={3:"#bea925",4:"#be4d25",5:"#49be25",6:"#2596be"},X=n(7281);function N(e,t){let n=[],i=Object.keys(e).reduce((i,r)=>{if(!i[r]){let a=e[r].map(e=>(n.push(Number(e.timestamp)),{x:Number(e.timestamp),y:e[t]}));i.push({label:r,borderColor:C[r],backgroundColor:C[r],borderWidth:.8,cubicInterpolationMode:"monotone",tension:10,data:(0,B.sortBy)(a,["x"]),spanGaps:!0})}return i},[]);return console.log("labels",n),{labels:n.sort(),datasets:i}}function P(e){let{dataInfo:t}=e,{from:n,to:r}=o(),a=function(e,t){let n=(0,B.cloneDeep)(e),{from:i,to:r}=t,a=Object.keys(n.data);return a.forEach(e=>{n.data[e]=n.data[e].filter(e=>{let t=e.timestamp>=i&&e.timestamp<=r;return t})}),n}(t,{from:n,to:r});return console.log("data",a),(0,i.BX)("div",{children:[(0,i.tZ)("h1",{children:"Metadata"}),(0,i.BX)("div",{className:"flex flex-row flex-wrap",style:{width:"100%"},children:[(0,i.tZ)("div",{style:{width:"100%"},children:(0,i.tZ)(_.Z,{type:"mean",data:N(a.data,"mean")})}),(0,i.tZ)("div",{style:{width:"100%"},children:(0,i.tZ)(_.Z,{type:"median",data:N(a.data,"median")})}),(0,i.tZ)("div",{style:{width:"100%"},children:(0,i.tZ)(_.Z,{type:"min",data:N(a.data,"min")})}),(0,i.tZ)("div",{style:{width:"100%"},children:(0,i.tZ)(_.Z,{type:"max",data:N(a.data,"max")})})]})]})}k().extend(X);var E=!0;function O(e){let{dataInfo:t}=e;return(0,i.BX)("div",{children:[(0,i.BX)(a(),{children:[(0,i.tZ)("title",{children:"Verdaccio benchmark with hyperfine"}),(0,i.tZ)("meta",{name:"description",content:"Verdaccio benchmark with hyperfine"}),(0,i.tZ)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,i.BX)("main",{children:[(0,i.tZ)("div",{children:(0,i.tZ)(w(),{href:"/",children:"Back"})}),(0,i.BX)(c,{filters:t.filters,children:[(0,i.tZ)(v,{}),(0,i.tZ)(P,{dataInfo:t})]})]})]})}}},function(e){e.O(0,[508,201,453,172,112,774,888,179],function(){return e(e.s=1841)}),_N_E=e.O()}]);