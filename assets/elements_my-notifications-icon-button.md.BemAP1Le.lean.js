const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/api-docs.6GVAIKQB.js","assets/chunks/api-viewer-tabs.bc9mZ4w5.js","assets/chunks/tslib.es6.kHcLnhpD.js","assets/chunks/api-demo.Bsqmng5d.js","assets/chunks/profiles-context.h05Fe7Ip.js","assets/chunks/notifications-client.DTvnyhJf.js","assets/chunks/provide.Coc-eaNd.js","assets/chunks/property.BSYltigs.js","assets/chunks/signal-watcher.Bp-53PsG.js","assets/chunks/context.D1UMwngN.js","assets/chunks/notifications-context.DVl4utC7.js","assets/chunks/context.BU1p44zF.js","assets/chunks/my-notifications-icon-button.DwWSTpQR.js","assets/chunks/my-notifications-list.BF-RmVMJ.js"])))=>i.map(i=>d[i]);
import{y as c,X as i,o as p,c as h,a3 as r,j as d}from"./chunks/framework.D_KCp5cu.js";import{d as k,P as m,a as u,b as g,N as E,c as b,s as y,e as f,j as _,x as v}from"./chunks/notifications-client.DTvnyhJf.js";const A=r("",12),w=d("api-docs",{src:"custom-elements.json",only:"my-notifications-icon-button"},null,-1),x=[A,w],L=JSON.parse('{"title":"<my-notifications-icon-button>","description":"","frontmatter":{},"headers":[],"relativePath":"elements/my-notifications-icon-button.md","filePath":"elements/my-notifications-icon-button.md"}'),P={name:"elements/my-notifications-icon-button.md"},j=Object.assign(P,{setup(D){return c(async()=>{await i(()=>import("./chunks/api-docs.6GVAIKQB.js"),__vite__mapDeps([0,1,2])),await i(()=>import("./chunks/api-demo.Bsqmng5d.js"),__vite__mapDeps([3,1,2])),await i(()=>import("./chunks/profiles-context.h05Fe7Ip.js"),__vite__mapDeps([4,2,5,6,7,8,9])),customElements.get("notifications-context")||await i(()=>import("./chunks/notifications-context.DVl4utC7.js"),__vite__mapDeps([10,6,7,5,11])),customElements.get("my-notifications-icon-button")||await i(()=>import("./chunks/my-notifications-icon-button.DwWSTpQR.js"),__vite__mapDeps([12,13,5,8,7,11,2,9]));const t=await k(),s=new m(t,Array.from(t.keys())[0]),n=new u(new g(s,"notifications_test")),a=new E,e=new b(a,"notifications_test"),o=await y(e);await a.create_notification(o);const l=new f(e);_(v`
    <profiles-context .store=${n}>
      <notifications-context .store=${l}>
        <api-demo src="custom-elements.json" only="my-notifications-icon-button" exclude-knobs="store">
        </api-demo>
      </notifications-context>
    </profiles-context>
  `,document.querySelector("element-demo"))}),(t,s)=>(p(),h("div",null,x))}});export{L as __pageData,j as default};