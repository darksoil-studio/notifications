const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/api-docs.CFj9ogh6.js","assets/chunks/api-viewer-tabs.bc9mZ4w5.js","assets/chunks/tslib.es6.kHcLnhpD.js","assets/chunks/api-demo.Bsqmng5d.js","assets/chunks/profiles-context.BZq5h__U.js","assets/chunks/notifications-client.yU5uhUDs.js","assets/chunks/provide.DR7pqAa5.js","assets/chunks/property.BX-X1PKQ.js","assets/chunks/signal-watcher.BSmBpaeV.js","assets/chunks/notifications-context.-stNkKXw.js","assets/chunks/context.Ct8THdkx.js","assets/chunks/my-notifications-list.VeAMvdcA.js"])))=>i.map(i=>d[i]);
import{v as r,V as t,c as d,a2 as k,j as m,o as g}from"./chunks/framework.Ci_nqXbM.js";import{d as E,P as u,a as y,b as f,N as b,c as v,s as _,e as w,S as n,f as P,w as A,Q as x,k as D,m as j}from"./chunks/notifications-client.yU5uhUDs.js";const N=JSON.parse('{"title":"<my-notifications-list>","description":"","frontmatter":{},"headers":[],"relativePath":"elements/my-notifications-list.md","filePath":"elements/my-notifications-list.md"}'),C={name:"elements/my-notifications-list.md"},L=Object.assign(C,{setup(I){return r(async()=>{await t(()=>import("./chunks/api-docs.CFj9ogh6.js"),__vite__mapDeps([0,1,2])),await t(()=>import("./chunks/api-demo.Bsqmng5d.js"),__vite__mapDeps([3,1,2])),await t(()=>import("./chunks/profiles-context.BZq5h__U.js"),__vite__mapDeps([4,2,5,6,7,8])),customElements.get("notifications-context")||await t(()=>import("./chunks/notifications-context.-stNkKXw.js"),__vite__mapDeps([9,6,7,5,10])),customElements.get("my-notifications-list")||await t(()=>import("./chunks/my-notifications-list.VeAMvdcA.js").then(i=>i.i),__vite__mapDeps([11,5,7,8,10]));const a=await E(),s=new u(a,Array.from(a.keys())[0]),l=new y(new f(s,"notifications_test")),e=new b,o=new v(e,"notifications_test"),p=await _();await e.create_notification(p);const c=new w(o,{types:{type1:{name:"Hello!",description:"something",title(i){return new n.State({status:"completed",value:i})},onClick:i=>alert(`clicked notification of group: ${i}`),contents:i=>{const h=P(i.entry.content);return new n.State({status:"completed",value:{iconSrc:A(j),body:h.body}})}}}});x(D`
    <profiles-context .store=${l}>
      <notifications-context .store=${c}>
        <api-demo src="custom-elements.json" only="my-notifications-list" exclude-knobs="store">
        </api-demo>
      </notifications-context>
    </profiles-context>
  `,document.querySelector("element-demo"))}),(a,s)=>(g(),d("div",null,s[0]||(s[0]=[k(`<h1 id="my-notifications-list" tabindex="-1"><code>&lt;my-notifications-list&gt;</code> <a class="header-anchor" href="#my-notifications-list" aria-label="Permalink to &quot;\`&lt;my-notifications-list&gt;\`&quot;">​</a></h1><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><ol start="0"><li><p>If you haven&#39;t already, <a href="/notifications/setup.html">go through the setup for the module</a>.</p></li><li><p>Import the <code>&lt;my-notifications-list&gt;</code> element somewhere in the javascript side of your web-app like this:</p></li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@holochain-open-dev/notifications/dist/elements/my-notifications-list.js&#39;</span></span></code></pre></div><ol start="2"><li>Use it in the html side of your web-app like this:</li></ol><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-7RjzP" id="tab-_ojLIdN" checked><label for="tab-_ojLIdN">Lit</label><input type="radio" name="group-7RjzP" id="tab-AyakBar"><label for="tab-AyakBar">React</label><input type="radio" name="group-7RjzP" id="tab-2HLUhf9"><label for="tab-2HLUhf9">Angular</label><input type="radio" name="group-7RjzP" id="tab-bjzmmOe"><label for="tab-bjzmmOe">Vue</label><input type="radio" name="group-7RjzP" id="tab-arJc6VB"><label for="tab-arJc6VB">Svelte</label></div><div class="blocks"><div class="language-html vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">my-notifications-list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">my-notifications-list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">my-notifications-list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">my-notifications-list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">my-notifications-list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">my-notifications-list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">my-notifications-list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">my-notifications-list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">my-notifications-list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">my-notifications-list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div></div></div><div class="warning custom-block github-alert"><p class="custom-block-title">WARNING</p><p>Like all the elements in this module, <code>&lt;my-notifications-list&gt;</code> needs to be placed inside an initialized <code>&lt;notifications-context&gt;</code>.</p></div><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Here is an interactive demo of the element:</p><element-demo></element-demo><h2 id="api-reference" tabindex="-1">API Reference <a class="header-anchor" href="#api-reference" aria-label="Permalink to &quot;API Reference&quot;">​</a></h2><p><code>&lt;my-notifications-list&gt;</code> is a <a href="https://web.dev/articles/custom-elements-v1" target="_blank" rel="noreferrer">custom element</a>, which means that it can be used in any web app or website. Here is the reference for its API:</p>`,12),m("api-docs",{src:"custom-elements.json",only:"my-notifications-list"},null,-1)])))}});export{N as __pageData,L as default};
