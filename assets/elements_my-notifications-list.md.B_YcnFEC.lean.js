const __vite__fileDeps=["assets/chunks/api-docs.BhxiCO2N.js","assets/chunks/api-viewer-tabs.bc9mZ4w5.js","assets/chunks/tslib.es6.kHcLnhpD.js","assets/chunks/api-demo.Bsqmng5d.js","assets/chunks/profiles-context.WRema_5-.js","assets/chunks/notifications-client.BUika-ET.js","assets/chunks/provide.Dm_wVTQI.js","assets/chunks/property.BM0hLk1L.js","assets/chunks/signal-watcher.BAw_Erig.js","assets/chunks/context.DlKLWoS2.js","assets/chunks/notifications-context.D5XGaOOX.js","assets/chunks/context.bt9QXqlo.js","assets/chunks/my-notifications-list.mJuEgxYN.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{y as h,X as i,o as c,c as r,a3 as d,j as k}from"./chunks/framework.Dz0868N9.js";import{d as m,P as g,a as E,b as u,N as y,c as f,s as b,e as _,j as v,x as w}from"./chunks/notifications-client.BUika-ET.js";const A=d("",12),x=k("api-docs",{src:"custom-elements.json",only:"my-notifications-list"},null,-1),P=[A,x],I=JSON.parse('{"title":"<my-notifications-list>","description":"","frontmatter":{},"headers":[],"relativePath":"elements/my-notifications-list.md","filePath":"elements/my-notifications-list.md"}'),D={name:"elements/my-notifications-list.md"},L=Object.assign(D,{setup(N){return h(async()=>{await i(()=>import("./chunks/api-docs.BhxiCO2N.js"),__vite__mapDeps([0,1,2])),await i(()=>import("./chunks/api-demo.Bsqmng5d.js"),__vite__mapDeps([3,1,2])),await i(()=>import("./chunks/profiles-context.WRema_5-.js"),__vite__mapDeps([4,2,5,6,7,8,9])),customElements.get("notifications-context")||await i(()=>import("./chunks/notifications-context.D5XGaOOX.js"),__vite__mapDeps([10,6,7,5,11])),customElements.get("my-notifications-list")||await i(()=>import("./chunks/my-notifications-list.mJuEgxYN.js").then(p=>p.n),__vite__mapDeps([12,5,8,7,11]));const t=await m(),s=new g(t,Array.from(t.keys())[0]),n=new E(new u(s,"notifications_test")),a=new y,e=new f(a,"notifications_test"),l=await b(e);await a.create_notification(l);const o=new _(e);v(w`
    <profiles-context .store=${n}>
      <notifications-context .store=${o}>
        <api-demo src="custom-elements.json" only="my-notifications-list" exclude-knobs="store">
        </api-demo>
      </notifications-context>
    </profiles-context>
  `,document.querySelector("element-demo"))}),(t,s)=>(c(),r("div",null,P))}});export{I as __pageData,L as default};
