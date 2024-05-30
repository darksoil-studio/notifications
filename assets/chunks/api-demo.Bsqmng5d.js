import{f as ce,j as ue,t as ye,k as $e,D as Ie,A as pe,l as we,p as xe,q as je,v as Fe,x,u as Se,o as ae,r as Ne,T as Re,s as Pe,n as S,M as He,m as Ue,h as ze,e as We,g as Xe,a as _e,b as qe,i as de,d as Ve}from"./api-viewer-tabs.bc9mZ4w5.js";import{_ as N}from"./tslib.es6.kHcLnhpD.js";const Y=[],Ze=(n,e)=>{Y[n]=e},I=Object.freeze({HOST:"host",KNOB:"knob",SLOT:"slot",PREFIX:"prefix",SUFFIX:"suffix",WRAPPER:"wrapper"}),B=n=>n instanceof HTMLTemplateElement,fe=(n,e)=>t=>{const{element:s,target:r}=t.dataset;return s===n&&r===e},J=n=>B(n)?n.content.firstElementChild:null,W=(n,e,t)=>Y[n].find(fe(e,t)),Ge=(n,e,t)=>Y[n].filter(fe(e,t)),re=(n,e,t)=>Y[n].some(fe(e,t));/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ee=n=>Fe(n)?n._$litType$.h:n.strings,Je=ce(class extends ue{constructor(n){super(n),this.tt=new WeakMap}render(n){return[n]}update(n,[e]){const t=ye(this.et)?Ee(this.et):null,s=ye(e)?Ee(e):null;if(t!==null&&(s===null||t!==s)){const r=$e(n).pop();let a=this.tt.get(t);if(a===void 0){const i=document.createDocumentFragment();a=Ie(pe,i),a.setConnected(!1),this.tt.set(t,a)}we(a,[r]),xe(a,void 0,r)}if(s!==null){if(t===null||t!==s){const r=this.tt.get(s);if(r!==void 0){const a=$e(r).pop();je(n),xe(n,void 0,a),we(n,[a])}}this.et=e}else this.et=void 0;return this.render(e)}});class he{get data(){return this._data}set data(e){this._data=e,this.updateData(e)}updateData(e){this.host.isConnected&&this.host.requestUpdate()}constructor(e,t){this._data=[],(this.host=e).addController(this),this.el=t}clear(){this.data=[]}destroy(){this.host.removeController(this)}}class Qe extends he{constructor(e,t,s){super(e,t),s.forEach(({name:r})=>{t.addEventListener(r,a=>{const i="-changed";if(r.endsWith(i)){const{knob:o}=e.getKnob(r.replace(i,""));e.syncKnob(t,o)}this.data=[...this.data,a]})})}}const Ye=n=>n[0].toUpperCase()+n.slice(1),Le=n=>Ye(n===""?"content":n),et=(n,e)=>{const{name:t,value:s}=n;return x`
    <input
      id=${e}
      type="text"
      .value=${String(s)}
      data-name=${t}
      part="input"
    />
  `},ke=(n,e)=>{const{name:t,knobType:s,value:r,options:a}=n;let i;return s==="select"&&Array.isArray(a)?i=x`
      <select id=${e} data-name=${t} data-type=${s} part="select">
        ${a.map(o=>x`<option value=${o}>${o}</option>`)}
      </select>
    `:s==="boolean"?i=x`
      <input
        id=${e}
        type="checkbox"
        .checked=${!!r}
        data-name=${t}
        data-type=${s}
        part="checkbox"
      />
    `:i=x`
      <input
        id=${e}
        type=${s==="number"?"number":"text"}
        .value=${r==null?"":String(r)}
        data-name=${t}
        data-type=${s}
        part="input"
      />
    `,i},tt=(n,e)=>{const{name:t,content:s}=n;return x`
    <input
      id=${e}
      type="text"
      .value=${s}
      data-type="slot"
      data-slot=${t}
      part="input"
    />
  `},G=(n,e,t,s)=>{const r=n.map(a=>{const{name:i}=a,o=`${t}-${i||"default"}`,u=t==="slot"?Le(i):i;return x`
      <tr>
        <td>
          <label for=${o} part="knob-label">${u}</label>
        </td>
        <td>${s(a,o)}</td>
      </tr>
    `});return x`
    <h3 part="knobs-header" ?hidden=${n.length===0}>${e}</h3>
    <table>
      ${r}
    </table>
  `};class nt extends he{constructor(e,t,s,r){super(e,t),this.enabled=!re(s,t.localName,I.SLOT),this.data=r.sort((a,i)=>a.name===""?1:i.name===""?-1:a.name.localeCompare(i.name)).map(a=>({...a,content:Le(a.name)}))}setValue(e,t){this.data=this.data.map(s=>s.name===e?{...s,content:t}:s)}updateData(e){super.updateData(e),this.enabled&&this.el.isConnected&&e&&e.length&&(this.el.innerHTML="",e.forEach(t=>{let s;const{name:r,content:a}=t;r?(s=document.createElement("div"),s.setAttribute("slot",r),s.textContent=a):s=document.createTextNode(a),this.el.appendChild(s)}))}}class st extends he{constructor(e,t,s){if(super(e,t),s.length){const r=getComputedStyle(t);this.data=s.map(a=>{let i=a.default?Se(a.default):r.getPropertyValue(a.name);const o=a;return i&&(i=i.trim(),o.default=i,o.value=i),o})}}setValue(e,t){this.data=this.data.map(s=>s.name===e?{...s,value:t}:s)}updateData(e){super.updateData(e),e.length&&e.forEach(t=>{const{name:s,value:r}=t;r&&(r===t.default?this.el.style.removeProperty(s):this.el.style.setProperty(s,r))})}}const at=n=>{const e=n,t="undefined";return"value"in n&&n.value===void 0&&(e.value=t),` detail: ${JSON.stringify(n).replace(`"${t}"`,t)}`},rt=n=>x`
  ${n.map(e=>x`
      <p part="event-record">
        event:
        ${e.type}.${e.detail==null?pe:at(e.detail)}
      </p>
    `)}
`;function ot(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var it={text:function(n){return ot(n)},join:function(n){return n.join("")},wrap:function(n,e){return'<span class="'+n+'">'+e+"</span>"}};/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var j=function(){return j=Object.assign||function(e){for(var t,s=1,r=arguments.length;s<r;s++){t=arguments[s];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},j.apply(this,arguments)};function oe(n){return n&&n.source||n}var lt={exec:function(){return null}};function z(n,e,t){return new RegExp(oe(e),"m"+(n.case_insensitive?"i":"")+(t?"g":""))}function ct(n){var e=[];function t(o){for(var u=0,v=e;u<v.length;u++){var h=v[u],f=h[0],b=h[1];if(o===f)return b}}var s=[];function r(o){if(!(!o.variants||!o.variants.length)){for(var u=0,v=s;u<v.length;u++){var h=v[u],f=h[0],b=h[1];if(o===f)return b}var g=o.variants.map(function(k){return j({},o,{variants:void 0},k)});return s.push([o,g]),g}}function a(o,u,v){var h=t(o);if(h)return h;var f={lexemesRe:z(n,o.lexemes||/\w+/,!0),relevance:o.relevance==null?1:o.relevance,contains:[],terminators:lt,subLanguage:o.subLanguage==null?void 0:typeof o.subLanguage=="string"?[o.subLanguage]:o.subLanguage};e.push([o,f]),o.className&&(f.className=o.className),o.illegal&&(f.illegalRe=z(n,o.illegal));for(var b=0,g=["endsParent","endsWithParent","skip","excludeBegin","excludeEnd","returnBegin","returnEnd"];b<g.length;b++){var k=g[b];o[k]&&(f[k]=!0)}var d;if(u){var m=o.beginKeywords?"\\b("+o.beginKeywords.split(/\s+/).join("|")+")\\b":o.begin||/\B|\b/;o.begin=m,f.beginRe=z(n,m);var E=!o.end&&!o.endsWithParent?/\B|\b/:o.end;E&&(o.end=E,f.endRe=z(n,E)),d=oe(E)||"",o.endsWithParent&&v&&(d+=(E?"|":"")+v)}var y=o.keywords||o.beginKeywords;if(y){var p={},F=function(l,c){n.case_insensitive&&(c=c.toLowerCase());for(var w=c.split(/\s+/),T=0,U=w;T<U.length;T++){var Z=U[T],A=Z.split(/\|/),D=A[0],be=A[1];p[D]=[l,be?Number(be):1]}};if(typeof y=="string")F("keyword",y);else for(var C in y)F(C,y[C]);f.keywords=p}var $=[];if(o.contains&&o.contains.length){for(var K=0,O=o.contains;K<O.length;K++)for(var H=O[K],P=H==="self"?o:H,X=r(P)||P.endsWithParent&&[j({},P)]||[P],M=0,_=X;M<_.length;M++){var q=_[M];$.push(q)}f.contains=$.map(function(l){return a(l,f,d)})}o.starts&&(f.starts=a(o.starts,u,v));var V=$.map(function(l){return l.beginKeywords?"\\.?("+l.begin+")\\.?":l.begin}).concat([d,o.illegal]).map(oe).filter(Boolean);return V.length&&(f.terminators=z(n,V.join("|"),!0)),f}var i=a(n);return n.case_insensitive&&(i.case_insensitive=!0),i}var Q={},Ke={};function ut(n){return"lexemesRe"in n}function pt(n){if(Q[n.name]=n,n.aliases)for(var e=0,t=n.aliases;e<t.length;e++){var s=t[e];Ke[s]=n.name}}function dt(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];for(var t=0,s=n;t<s.length;t++){var r=s[t];pt(r)}}function ft(){return Object.keys(Q)}function ie(n){n=(n||"").toLowerCase(),n=Ke[n]||n;var e=Q[n];if(e)return ut(e)?e:Q[n]=ct(e)}var ht="\\b\\d+(\\.\\d+)?",Oe={begin:"\\\\[\\s\\S]",relevance:0},ve={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[Oe]},ge={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[Oe]},vt={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/};function ee(n,e,t){t===void 0&&(t={});var s=j({className:"comment",begin:n,end:e,contains:[]},t),r=s.contains;return r&&(r.push(vt),r.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|XXX):",relevance:0})),s}ee("//","$");var le=ee("/\\*","\\*/");ee("#","$");var Ae={className:"number",begin:ht+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},gt="[A-Za-z0-9\\._:-]+",te={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:gt,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/},{begin:/'/,end:/'/},{begin:/[^\s"'=<>`]+/}]}]}]},mt={name:"xml",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist"],case_insensitive:!0,contains:[{className:"meta",begin:"<!DOCTYPE",end:">",relevance:10,contains:[{begin:"\\[",end:"\\]"}]},ee("<!--","-->",{relevance:10}),{begin:"<\\!\\[CDATA\\[",end:"\\]\\]>",relevance:10},{className:"meta",begin:/<\?xml/,end:/\?>/,relevance:10},{begin:/<\?(php)?/,end:/\?>/,subLanguage:"php",contains:[{begin:"/\\*",end:"\\*/",skip:!0}]},{className:"tag",begin:"<style(?=\\s|>|$)",end:">",keywords:{name:"style"},contains:[te],starts:{end:"</style>",returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:"<script(?=\\s|>|$)",end:">",keywords:{name:"script"},contains:[te],starts:{end:"<\/script>",returnEnd:!0,subLanguage:["actionscript","javascript","handlebars","xml"]}},{className:"tag",begin:"</?",end:"/?>",contains:[{className:"name",begin:/[^\/><\s]+/,relevance:0},te]}]};function ne(n,e){var t=n&&n.exec(e);return t&&t.index===0||!1}function me(n,e,t,s,r,a){var i=[{content:[]}];function o(l){var c=i[0].content;typeof l=="string"&&c.length&&typeof c[c.length-1]=="string"?c[c.length-1]+=l:c.push(l)}function u(l){o(e.text(l))}function v(l,c){c||(l=n.classPrefix+l),i.unshift({className:l,content:[]})}function h(l){l=n.classPrefix+l,i.push({className:l,content:[]})}function f(){if(i.length<2)throw"unbalanced";var l=i.shift(),c=l.className,w=l.content,T=e.join(w);o(c?e.wrap(c,T):T)}function b(l,c){if(ne(l.endRe,c)){for(;l.endsParent&&l.parent;l=l.parent);return l}if(l.endsWithParent&&l.parent)return b(l.parent,c)}function g(){if(!p.keywords){u($);return}var l=0;p.lexemesRe.lastIndex=0;for(var c=p.lexemesRe.exec($);c;){u($.substring(l,c.index));var w=y.case_insensitive?c[0].toLowerCase():c[0],T=p.keywords.hasOwnProperty(w)&&p.keywords[w];T?(K+=T[1],v(T[0],!1),u(c[0]),f()):u(c[0]),l=p.lexemesRe.lastIndex,c=p.lexemesRe.exec($)}u($.substr(l))}function k(l){var c=l.length==1&&l[0];if(c&&!ie(c)){u($);return}var w=c?me(n,e,c,$,!0,F[c]):De(n,e,$,l.length?p.subLanguage:void 0);p.relevance>0&&(K+=w.relevance),c&&w.top&&(F[c]=w.top),v(w.language,!0),o(w.value),f()}function d(){p.subLanguage!=null?k(p.subLanguage):g(),$=""}function m(l){l.className&&v(l.className,!1),p=Object.create(l,{parent:{value:p}})}function E(l,c){if($+=l,c==null)return d(),0;for(var w,T=0,U=p.contains;T<U.length;T++){var Z=U[T];if(ne(Z.beginRe,c)){w=Z;break}}if(w)return w.skip?$+=c:(w.excludeBegin&&($+=c),d(),!w.returnBegin&&!w.excludeBegin&&($=c)),m(w),w.returnBegin?0:c.length;var A=b(p,c);if(A){var D=p;D.skip?$+=c:(D.returnEnd||D.excludeEnd||($+=c),d(),D.excludeEnd&&($=c));do p.className&&f(),!p.skip&&!p.subLanguage&&(K+=p.relevance),p=p.parent;while(p!==A.parent);return A.starts&&m(A.starts),D.returnEnd?0:c.length}if(!r&&ne(p.illegalRe,c))throw new Error('Illegal lexeme "'+c+'" for mode "'+(p.className||"<unnamed>")+'"');return $+=c,c.length||1}var y=ie(t);if(!y)throw new Error('Unknown language: "'+t+'"');var p=a||y,F={},C;for(C=p;C&&C!==y;C=C.parent)C.className&&h(C.className);var $="",K=0;try{for(var O=void 0,H=void 0,P=0;p.terminators.lastIndex=P,O=p.terminators.exec(s),!!O;)H=E(s.substring(P,O.index),O[0]),P=O.index+H;for(E(s.substr(P)),C=p;C.parent;C=C.parent)C.className&&f();if(i.length!=1)throw"unbalanced";var X=i[0],M=X.className,_=X.content,q=e.join(_),V=M?e.wrap(M,q):q;return{language:t,relevance:K,value:V,top:p}}catch(l){if(l.message&&l.message.indexOf("Illegal")!==-1)return{language:t,relevance:0,value:e.text(s)};throw l}}function De(n,e,t,s){s===void 0&&(s=n.languages||ft());var r={language:"",relevance:0,value:e.text(t)};if(t!=""){for(var a=r,i=s.filter(ie),o=0,u=i;o<u.length;o++){var v=u[o],h=me(n,e,v,t,!1);h.relevance>a.relevance&&(a=h),h.relevance>r.relevance&&(a=r,r=h)}a.language&&(r.second_best=a)}return r}var bt={classPrefix:"hljs-",useBr:!1};function yt(n,e){return e===void 0&&(e={}),{render:n,options:j({},bt,e)}}function $t(n,e,t){var s=n.render,r=n.options;return typeof t=="string"?me(r,s,t,e,!1):De(r,s,e,t)}const wt={begin:/[\w-]+\(/,returnBegin:!0,contains:[{className:"built_in",begin:/[\w-]+/},{begin:/\(/,end:/\)/,contains:[ve,ge,Ae]}]},xt={className:"attribute",begin:/\S/,end:":",excludeEnd:!0,starts:{endsWithParent:!0,excludeEnd:!0,contains:[wt,Ae,ge,ve,le,{className:"number",begin:"#[0-9A-Fa-f]+"},{className:"meta",begin:"!important"}]}},Et="[a-zA-Z-][a-zA-Z0-9_-]*",kt={begin:/(?:[A-Z_.-]+|--[a-zA-Z0-9_-]+)\s*:/,returnBegin:!0,end:";",endsWithParent:!0,contains:[xt]},Ct={name:"css",case_insensitive:!0,illegal:/[=/|'$]/,contains:[le,{className:"selector-attr",begin:/\[/,end:/\]/,illegal:"$",contains:[ve,ge]},{className:"selector-tag",begin:Et,relevance:0},{begin:"{",end:"}",illegal:/\S/,contains:[le,kt]}]};dt(Ct,mt);const Tt=yt(it,{classPrefix:""}),{PREFIX:St,SLOT:Nt,SUFFIX:Rt,WRAPPER:Pt}=I,L="  ",Lt=(n,e)=>{if(!n)return n;const t=n.replace(/\t/g,L).split(`
`),s=t.reduce((r,a)=>{if(/^\s*$/.test(a))return r;const i=a.match(/^(\s*)/),o=i&&i[0].length;return r===null||o<r?o:r},null);return t.map(r=>e+r.substr(s)).join(`
`)},se=(n,e)=>{const t=n.innerHTML.replace(/\s+$/,"").replace(/(="")/g,"");return Lt(t,e)},Kt=(n,e,t,s,r)=>{let a="";const i=W(n,e,St);B(i)&&(a+=`${se(i,"").trim()}
`);let o="",u=null;const v=W(n,e,Pt),h=J(v);if(h){o=L;const d=h.outerHTML.match(/<([a-z]+)[^>]*>/);d&&(u=h.tagName.toLowerCase(),a+=`${d[0]}
${L}`)}a+=`<${e}`,Object.keys(t).sort((d,m)=>d>m?1:-1).forEach(d=>{const{value:m,knobType:E,attribute:y}=t[d],p=y||d;switch(E){case"boolean":a+=m?` ${p}`:"";break;case"select":a+=m!==""?` ${p}="${m}"`:"";break;default:a+=m!=null?` ${p}="${m}"`:"";break}}),a+=">";const f=W(n,e,Nt);B(f)?a+=`${se(f,`${o}${L}`)}
${o}`:s.length&&(s.length===1&&!s[0].name?a+=s[0].content:(a+=s.reduce((d,m)=>{const{name:E,content:y}=m,p=E?`<div slot="${E}">${y}</div>`:y;return`${d}
${o}${L}${p}`},""),a+=`
${o}`)),a+=`</${e}>`,u&&(a+=`
</${u}>`);const b=W(n,e,Rt);B(b)&&(a+=`
${se(b,"").trim()}
`);const g=r.filter(d=>d.value!==d.default);g.length&&(a+=`
<style>
${L}${e} {
`,g.forEach(d=>{d.value&&(a+=`${L}${L}${d.name}: ${d.value};
`)}),a+=`${L}}
</style>`);const{value:k}=$t(Tt,a,["xml","css"]);return x`<pre><code>${ae(k)}</code></pre>`},Be=n=>{const{knobType:e,default:t}=n;switch(e){case"boolean":return t!=="false";case"number":return Number(t);default:return Se(t)}},Ot=(n="")=>n.replace(" | undefined","").replace(" | null",""),At=(n,e="")=>{let t=n.filter(({name:s,readonly:r})=>!e.includes(s)&&!r);return t=t.map(s=>{var a;const r={...s,knobType:Ot((a=s.type)==null?void 0:a.text)};return typeof r.default=="string"&&(r.value=Be(r)),r}),t},Dt=(n,e)=>Ge(e,n,I.KNOB).map(t=>{const{attr:s,type:r}=t.dataset;let a=null;if(s){if(r==="select"){const i=J(t),o=i?Array.from(i.children).filter(u=>u instanceof HTMLOptionElement).map(u=>u.value):[];i instanceof HTMLSelectElement&&o.length>1&&(a={name:s,attribute:s,knobType:r,options:o})}(r==="string"||r==="boolean")&&(a={name:s,attribute:s,knobType:r})}return a}).filter(Boolean),Bt=(n,e)=>n.filter(t=>{const{name:s,knobType:r}=t,a=Be(t);return e[s]!==a||r==="boolean"&&a});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ce=ce(class extends ue{constructor(n){if(super(n),n.type!==Ne.CHILD)throw Error("templateContent can only be used in child bindings")}render(n){return this.vt===n?Re:(this.vt=n,document.importNode(n.content,!0))}}),{HOST:Mt,PREFIX:It,SLOT:jt,SUFFIX:Ft,WRAPPER:Ht}=I,Ut=(n,e)=>{const{knobs:t}=e;Object.keys(t).forEach(s=>{const{attribute:r,value:a,custom:i}=t[s];i&&r?typeof a=="string"&&a?n.setAttribute(r,a):n.removeAttribute(r):n[s]=a})},Te=n=>typeof n=="object"&&Promise.resolve(n)===n;async function zt(n){let e=!1;const t=n,s=t.updateComplete;Te(s)&&(await s,e=!0);const r=t.componentOnReady?t.componentOnReady():!1;return Te(r)&&(await r,e=!0),e||await new Promise(requestAnimationFrame),t}class Wt extends ue{constructor(e){if(super(e),e.type!==Ne.CHILD)throw new Error("renderer only supports binding to element")}render(e){return pe}update(e,[t]){var E;const s=(E=e.options)==null?void 0:E.host,{tag:r}=t,a=[],[i,o,u,v,h]=[Mt,It,Ft,jt,Ht].map(y=>W(t.id,r,y)),f=J(h),b=f?f.localName:"";let g=s.querySelector(r);if(g){const y=s.querySelector('[part="demo-output"]'),p=g.parentElement;if(p&&(p===y||p.localName===b))return Ut(g,t),Re}const k=`</${r}>`,d=J(i);B(o)&&a.push(Ce(o));let m=d?d.outerHTML:`<${r}>${k}`;if(B(v)&&(m=m.replace(k,`${v.innerHTML}${k}`)),b){const y=ae(`
        <${b}>
          ${m}
        </${b}>
      `);a.push(y)}else a.push(ae(m));return B(u)&&a.push(Ce(u)),Promise.resolve().then(()=>{g=s.querySelector(r),g&&zt(g).then(()=>{g.dispatchEvent(new CustomEvent("rendered",{detail:{component:g},bubbles:!0,composed:!0}))})}),x`${a}`}}const Xt=ce(Wt);class R extends Pe{constructor(){super(...arguments),this.copyBtnText="copy",this.cssProps=[],this.events=[],this.slots=[],this.tag="",this.props=[],this.exclude="",this.defined=!1}createRenderRoot(){return this}render(){var g,k,d;const{tag:e}=this;if(!this.defined)return x`
        <div part="warning">
          Element ${e} is not defined. Have you imported it?
        </div>
      `;const[t,s,r,a,i]=[this.cssProps,this.events,this.slots,this.customKnobs,this.propKnobs].map(m=>m.length===0),o=this.vid,u=((g=this.eventsController)==null?void 0:g.data)||[],v=((k=this.slotsController)==null?void 0:k.data)||[],h=((d=this.stylesController)==null?void 0:d.data)||[],f=r||re(o,e,I.SLOT),b=i&&a;return x`
      <div part="demo-output" @rendered=${this.onRendered}>
        ${Xt({id:o,tag:e,knobs:this.knobs})}
      </div>
      <api-viewer-tabs part="demo-tabs">
        <api-viewer-tab slot="tab" part="tab">Source</api-viewer-tab>
        <api-viewer-panel slot="panel" part="tab-panel">
          <button @click=${this._onCopyClick} part="button">
            ${this.copyBtnText}
          </button>
          <div part="demo-snippet">
            ${Kt(o,e,this.knobs,v,h)}
          </div>
        </api-viewer-panel>
        <api-viewer-tab slot="tab" part="tab" ?hidden=${b&&f}>
          Knobs
        </api-viewer-tab>
        <api-viewer-panel slot="panel" part="tab-panel">
          <div part="knobs">
            <section
              ?hidden=${b}
              part="knobs-column"
              @change=${this._onPropChanged}
            >
              ${G(this.propKnobs,"Properties","prop",ke)}
              ${G(this.customKnobs,"Attributes","attr",ke)}
            </section>
            <section
              ?hidden=${f}
              part="knobs-column"
              @change=${this._onSlotChanged}
            >
              ${G(v,"Slots","slot",tt)}
            </section>
          </div>
        </api-viewer-panel>
        <api-viewer-tab slot="tab" part="tab" ?hidden=${t}>
          Styles
        </api-viewer-tab>
        <api-viewer-panel slot="panel" part="tab-panel">
          <div part="knobs" ?hidden=${t}>
            <section part="knobs-column" @change=${this._onCssChanged}>
              ${G(h,"Custom CSS Properties","css-prop",et)}
            </section>
          </div>
        </api-viewer-panel>
        <api-viewer-tab id="events" slot="tab" part="tab" ?hidden=${s}>
          Events
        </api-viewer-tab>
        <api-viewer-panel slot="panel" part="tab-panel">
          <div part="event-log" ?hidden=${s}>
            <button
              @click=${this._onLogClear}
              ?hidden=${!u.length}
              part="button"
            >
              Clear
            </button>
            ${Je(u.length?rt(u):x`
                    <p part="event-record">
                      Interact with component to see the event log.
                    </p>
                  `)}
          </div>
        </api-viewer-panel>
      </api-viewer-tabs>
    `}willUpdate(e){if(e.has("tag")){const{tag:t}=this;this.defined=!!customElements.get(t),this.defined||customElements.whenDefined(t).then(()=>{this.tag===t&&(this.defined=!0)}),this.knobs={},this.propKnobs=At(this.props,this.exclude),this.customKnobs=Dt(this.tag,this.vid)}}updated(e){if(e.has("tag")&&e.get("tag")){const t=this.renderRoot.querySelector("api-viewer-tabs");t&&t.selectFirst()}}_onLogClear(){var t;(t=this.eventsController)==null||t.clear();const e=this.querySelector("#events");e&&e.focus()}_onCopyClick(){const e=this.renderRoot.querySelector('[part="demo-snippet"] code');if(e){const t=document.createRange();t.selectNodeContents(e);const s=window.getSelection();s.removeAllRanges(),s.addRange(t);try{document.execCommand("copy"),this.copyBtnText="done"}catch(r){console.error(r),this.copyBtnText="error"}setTimeout(()=>{this.copyBtnText="copy"},1e3),s.removeAllRanges()}}onRendered(e){const{component:t}=e.detail;this.initKnobs(t),this.initEvents(t),this.initSlots(t),this.initStyles(t)}initEvents(e){const t=this.eventsController;t&&t.destroy(),this.eventsController=new Qe(this,e,this.events)}initKnobs(e){re(this.vid,this.tag,I.HOST)&&Bt(this.propKnobs,e).forEach(s=>{this.syncKnob(e,s)})}initSlots(e){const t=this.slotsController;t&&t.destroy(),this.slotsController=new nt(this,e,this.vid,this.slots)}initStyles(e){const t=this.stylesController;t&&t.destroy(),this.stylesController=new st(this,e,this.cssProps)}getKnob(e){const t=a=>a.name===e||a.attribute===e;let s=this.propKnobs.find(t),r=!1;return s||(s=this.customKnobs.find(t),r=!0),{knob:s,custom:r}}setKnobs(e,t,s,r,a=!1){this.knobs={...this.knobs,[e]:{knobType:t,value:s,attribute:r,custom:a}}}syncKnob(e,t){const{name:s,knobType:r,attribute:a}=t,i=e[s];this.setKnobs(s,r,i,a),this.propKnobs=this.propKnobs.map(o=>o.name===s?{...o,value:i}:o)}_onCssChanged(e){var s;const t=e.composedPath()[0];(s=this.stylesController)==null||s.setValue(t.dataset.name,t.value)}_onPropChanged(e){const t=e.composedPath()[0],{name:s,type:r}=t.dataset;let a;switch(r){case"boolean":a=t.checked;break;case"number":a=t.value===""?null:Number(t.value);break;default:a=t.value}const{knob:i,custom:o}=this.getKnob(s);this.setKnobs(s,r,a,i.attribute,o)}_onSlotChanged(e){var s;const t=e.composedPath()[0];(s=this.slotsController)==null||s.setValue(t.dataset.slot,t.value)}}N([S()],R.prototype,"copyBtnText",void 0);N([S({attribute:!1})],R.prototype,"cssProps",void 0);N([S({attribute:!1})],R.prototype,"events",void 0);N([S({attribute:!1})],R.prototype,"slots",void 0);N([S()],R.prototype,"tag",void 0);N([S({attribute:!1})],R.prototype,"props",void 0);N([S()],R.prototype,"exclude",void 0);N([S({type:Number})],R.prototype,"vid",void 0);N([S({attribute:!1})],R.prototype,"customKnobs",void 0);N([S({attribute:!1})],R.prototype,"knobs",void 0);N([S({attribute:!1})],R.prototype,"propKnobs",void 0);N([S({type:Boolean})],R.prototype,"defined",void 0);customElements.define("api-demo-layout",R);async function _t(n,e,t,s,r,a=""){const i=await n;if(!ze(i))return We;const o=Xe(i,t),u=_e(i,o,s),v=qe(u.members);return x`
    <header part="header">
      <div part="header-title">&lt;${u.name}&gt;</div>
      <nav>
        <label part="select-label">
          <select
            @change=${e}
            .value=${s||""}
            ?hidden=${o.length===1}
            part="select"
          >
            ${o.map(h=>x`<option value=${h.name}>${h.name}</option>`)}
          </select>
        </label>
      </nav>
    </header>
    <api-demo-layout
      .tag=${u.name}
      .props=${v}
      .events=${u.events??[]}
      .slots=${u.slots??[]}
      .cssProps=${u.cssProperties??[]}
      .exclude=${a}
      .vid=${r}
      part="demo-container"
    ></api-demo-layout>
  `}let qt=0;class Me extends He(Pe){constructor(){super(),this._id=qt++}render(){return x`
      ${Ue(_t(this.jsonFetched,this._onSelect,this.only,this.selected,this._id,this.excludeKnobs))}
    `}_onSelect(e){this.selected=e.target.value}}N([S({type:String,attribute:"exclude-knobs"})],Me.prototype,"excludeKnobs",void 0);const Vt=de`
  pre {
    margin: 0;
    color: black;
    background: none;
    font-family: var(--ave-monospace-font);
    font-size: 0.875rem;
    text-align: left;
    white-space: pre-wrap;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
    text-shadow: none;
  }

  code {
    font-family: inherit;
  }

  .comment {
    color: slategray;
  }

  .attr,
  .selector-tag {
    color: #690;
  }

  .css {
    color: #333;
  }

  .built_in {
    color: #dd4a68;
  }

  .meta {
    color: #e90;
    font-weight: bold;
  }

  .string {
    color: #07a;
  }

  .tag {
    color: #999;
  }

  .attribute,
  .name,
  .number {
    color: #905;
  }
`,Zt=de`
  [part='button'] {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    text-transform: uppercase;
    border: none;
    border-radius: 0.25em;
    cursor: pointer;
    background: var(--ave-button-background, rgba(0, 0, 0, 0.3));
    color: var(--ave-button-color, #fff);
  }

  [part='button']:focus,
  [part='button']:hover {
    background: var(--ave-button-active-background, rgba(0, 0, 0, 0.6));
  }

  api-demo-layout {
    display: block;
  }

  [part='demo-tabs'],
  [part='demo-output'] {
    border-top: solid 1px var(--ave-border-color);
  }

  [part='demo-tabs'] [part='tab-panel'] {
    box-sizing: border-box;
    position: relative;
    background: #fafafa;
  }

  [part='demo-output'] {
    padding: 1.5rem;
    text-align: initial;
    transform: translateZ(0);
    overflow: hidden;
  }

  [part='demo-snippet'] {
    padding: 0.75rem 1rem;
  }

  .source {
    position: relative;
  }

  [part='knobs'] {
    display: flex;
    padding: 0 1rem 1rem;
  }

  [part='knobs-column'] {
    flex-shrink: 1;
  }

  [part='knobs-column']:not(:only-child) {
    flex-basis: 50%;
  }

  [part='knobs-header'] {
    font-size: 1rem;
    font-weight: bold;
    margin: 1rem 0 0.25rem;
  }

  td {
    padding: 0.25rem 0.25rem 0.25rem 0;
    font-size: 0.9375rem;
    white-space: nowrap;
  }

  [part='event-log'] {
    padding: 0 1rem;
    min-height: 50px;
    max-height: 200px;
    overflow: auto;
  }

  [part='event-record'] {
    margin: 0 0 0.25rem;
    font-family: var(--ave-monospace-font);
    font-size: 0.875rem;
  }

  [part='event-record']:first-of-type {
    margin-top: 1rem;
  }

  [part='event-record']:last-of-type {
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    [part='knobs'] {
      flex-direction: column;
    }

    [part='knobs-column']:not(:last-child) {
      margin-bottom: 1rem;
    }

    [part='input'] {
      max-width: 8rem;
    }
  }
`,Gt=de`
  ${Zt}
  ${Vt}
`;class Jt extends Me{static get styles(){return[Ve,Gt]}firstUpdated(){this.setTemplates()}setTemplates(e){Ze(this._id,e||Array.from(this.querySelectorAll("template")))}}customElements.define("api-demo",Jt);export{Jt as ApiDemo};
