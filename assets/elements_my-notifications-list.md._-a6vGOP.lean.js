const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/api-docs.6GVAIKQB.js","assets/chunks/api-viewer-tabs.bc9mZ4w5.js","assets/chunks/tslib.es6.kHcLnhpD.js","assets/chunks/api-demo.Bsqmng5d.js","assets/chunks/profiles-context.CvdzetXF.js","assets/chunks/notifications-client.BJG9_19-.js","assets/chunks/provide.BtLfUF4R.js","assets/chunks/property.DeN3Blhb.js","assets/chunks/signal-watcher.Bh9-PO9t.js","assets/chunks/notifications-context.BqASDK0x.js","assets/chunks/context.BqsaLEwE.js","assets/chunks/my-notifications-list.CiSEY9SE.js"])))=>i.map(i=>d[i]);
import{y as h,X as i,o as c,c as d,a3 as r,j as k}from"./chunks/framework.D_KCp5cu.js";import{d as m,P as E,a as g,b as u,N as y,c as f,s as b,e as _,j as v,x as A}from"./chunks/notifications-client.BJG9_19-.js";const w=r("",12),P=k("api-docs",{src:"custom-elements.json",only:"my-notifications-list"},null,-1),x=[w,P],T=JSON.parse('{"title":"<my-notifications-list>","description":"","frontmatter":{},"headers":[],"relativePath":"elements/my-notifications-list.md","filePath":"elements/my-notifications-list.md"}'),D={name:"elements/my-notifications-list.md"},R=Object.assign(D,{setup(C){return h(async()=>{await i(()=>import("./chunks/api-docs.6GVAIKQB.js"),__vite__mapDeps([0,1,2])),await i(()=>import("./chunks/api-demo.Bsqmng5d.js"),__vite__mapDeps([3,1,2])),await i(()=>import("./chunks/profiles-context.CvdzetXF.js"),__vite__mapDeps([4,2,5,6,7,8])),customElements.get("notifications-context")||await i(()=>import("./chunks/notifications-context.BqASDK0x.js"),__vite__mapDeps([9,6,7,5,10])),customElements.get("my-notifications-list")||await i(()=>import("./chunks/my-notifications-list.CiSEY9SE.js").then(p=>p.n),__vite__mapDeps([11,5,8,7,10]));const t=await m(),s=new E(t,Array.from(t.keys())[0]),n=new g(new u(s,"notifications_test")),a=new y,e=new f(a,"notifications_test"),l=await b(e);await a.create_notification(l);const o=new _(e);v(A`
    <profiles-context .store=${n}>
      <notifications-context .store=${o}>
        <api-demo src="custom-elements.json" only="my-notifications-list" exclude-knobs="store">
        </api-demo>
      </notifications-context>
    </profiles-context>
  `,document.querySelector("element-demo"))}),(t,s)=>(c(),d("div",null,x))}});export{T as __pageData,R as default};
