const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/api-docs.6GVAIKQB.js","assets/chunks/api-viewer-tabs.bc9mZ4w5.js","assets/chunks/tslib.es6.kHcLnhpD.js","assets/chunks/api-demo.Bsqmng5d.js","assets/chunks/profiles-context.CTn4nlkH.js","assets/chunks/notifications-client.BPN4HXTv.js","assets/chunks/provide.C1Njoeja.js","assets/chunks/property.CxBSxXjq.js","assets/chunks/signal-watcher.Df3ivjzs.js","assets/chunks/notifications-context.r1IJ36Jx.js","assets/chunks/context.Dz-EYhNW.js","assets/chunks/my-notifications-icon-button.B3QYmla-.js","assets/chunks/my-notifications-list.CVjqVNTy.js"])))=>i.map(i=>d[i]);
import{y as c,X as t,o as p,c as h,a3 as r,j as d}from"./chunks/framework.D_KCp5cu.js";import{d as k,P as m,a as u,b as E,N as g,c as b,s as y,e as f,j as _,x as v}from"./chunks/notifications-client.BPN4HXTv.js";const A=r("",12),x=d("api-docs",{src:"custom-elements.json",only:"my-notifications-icon-button"},null,-1),P=[A,x],I=JSON.parse('{"title":"<my-notifications-icon-button>","description":"","frontmatter":{},"headers":[],"relativePath":"elements/my-notifications-icon-button.md","filePath":"elements/my-notifications-icon-button.md"}'),w={name:"elements/my-notifications-icon-button.md"},j=Object.assign(w,{setup(D){return c(async()=>{await t(()=>import("./chunks/api-docs.6GVAIKQB.js"),__vite__mapDeps([0,1,2])),await t(()=>import("./chunks/api-demo.Bsqmng5d.js"),__vite__mapDeps([3,1,2])),await t(()=>import("./chunks/profiles-context.CTn4nlkH.js"),__vite__mapDeps([4,2,5,6,7,8])),customElements.get("notifications-context")||await t(()=>import("./chunks/notifications-context.r1IJ36Jx.js"),__vite__mapDeps([9,6,7,5,10])),customElements.get("my-notifications-icon-button")||await t(()=>import("./chunks/my-notifications-icon-button.B3QYmla-.js"),__vite__mapDeps([11,12,5,8,7,10,2]));const i=await k(),s=new m(i,Array.from(i.keys())[0]),n=new u(new E(s,"notifications_test")),a=new g,e=new b(a,"notifications_test"),o=await y(e);await a.create_notification(o);const l=new f(e);_(v`
    <profiles-context .store=${n}>
      <notifications-context .store=${l}>
        <api-demo src="custom-elements.json" only="my-notifications-icon-button" exclude-knobs="store">
        </api-demo>
      </notifications-context>
    </profiles-context>
  `,document.querySelector("element-demo"))}),(i,s)=>(p(),h("div",null,P))}});export{I as __pageData,j as default};
