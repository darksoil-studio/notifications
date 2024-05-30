import{_ as N}from"./tslib.es6.kHcLnhpD.js";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=window,Z=M.ShadowRoot&&(M.ShadyCSS===void 0||M.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),Q=new WeakMap;let pt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Z&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Q.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Q.set(e,t))}return t}toString(){return this.cssText}};const Mt=i=>new pt(typeof i=="string"?i:i+"",void 0,Y),Ht=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,o,n)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+i[n+1],i[0]);return new pt(e,i,Y)},Lt=(i,t)=>{Z?i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),o=M.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)})},X=Z?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Mt(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var z;const L=window,tt=L.trustedTypes,Ot=tt?tt.emptyScript:"",et=L.reactiveElementPolyfillSupport,F={toAttribute(i,t){switch(t){case Boolean:i=i?Ot:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},vt=(i,t)=>t!==i&&(t==t||i==i),j={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:vt},W="finalized";let b=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const o=this._$Ep(s,e);o!==void 0&&(this._$Ev.set(o,s),t.push(o))}),t}static createProperty(t,e=j){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,o=this.getPropertyDescriptor(t,s,e);o!==void 0&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(o){const n=this[t];this[e]=o,this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||j}static finalize(){if(this.hasOwnProperty(W))return!1;this[W]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const o of s)this.createProperty(o,e[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const o of s)e.unshift(X(o))}else t!==void 0&&e.push(X(t));return e}static _$Ep(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Lt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=j){var o;const n=this.constructor._$Ep(t,s);if(n!==void 0&&s.reflect===!0){const r=(((o=s.converter)===null||o===void 0?void 0:o.toAttribute)!==void 0?s.converter:F).toAttribute(e,s.type);this._$El=t,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(t,e){var s;const o=this.constructor,n=o._$Ev.get(t);if(n!==void 0&&this._$El!==n){const r=o.getPropertyOptions(n),a=typeof r.converter=="function"?{fromAttribute:r.converter}:((s=r.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?r.converter:F;this._$El=n,this[n]=a.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,s){let o=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||vt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((o,n)=>this[n]=o),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(o=>{var n;return(n=o.hostUpdate)===null||n===void 0?void 0:n.call(o)}),this.update(s)):this._$Ek()}catch(o){throw e=!1,this._$Ek(),o}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var o;return(o=s.hostUpdated)===null||o===void 0?void 0:o.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};b[W]=!0,b.elementProperties=new Map,b.elementStyles=[],b.shadowRootOptions={mode:"open"},et==null||et({ReactiveElement:b}),((z=L.reactiveElementVersions)!==null&&z!==void 0?z:L.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var D;const O=window,y=O.trustedTypes,st=y?y.createPolicy("lit-html",{createHTML:i=>i}):void 0,R="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,G="?"+$,Rt=`<${G}>`,A=document,S=()=>A.createComment(""),x=i=>i===null||typeof i!="object"&&typeof i!="function",$t=Array.isArray,ft=i=>$t(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",B=`[ 	
\f\r]`,w=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,it=/-->/g,ot=/>/g,_=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),nt=/'/g,rt=/"/g,_t=/^(?:script|style|textarea|title)$/i,It=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),zt=It(1),f=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),lt=new WeakMap,m=A.createTreeWalker(A,129,null,!1);function mt(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return st!==void 0?st.createHTML(t):t}const At=(i,t)=>{const e=i.length-1,s=[];let o,n=t===2?"<svg>":"",r=w;for(let a=0;a<e;a++){const l=i[a];let c,h,d=-1,p=0;for(;p<l.length&&(r.lastIndex=p,h=r.exec(l),h!==null);)p=r.lastIndex,r===w?h[1]==="!--"?r=it:h[1]!==void 0?r=ot:h[2]!==void 0?(_t.test(h[2])&&(o=RegExp("</"+h[2],"g")),r=_):h[3]!==void 0&&(r=_):r===_?h[0]===">"?(r=o??w,d=-1):h[1]===void 0?d=-2:(d=r.lastIndex-h[2].length,c=h[1],r=h[3]===void 0?_:h[3]==='"'?rt:nt):r===rt||r===nt?r=_:r===it||r===ot?r=w:(r=_,o=void 0);const v=r===_&&i[a+1].startsWith("/>")?" ":"";n+=r===w?l+Rt:d>=0?(s.push(c),l.slice(0,d)+R+l.slice(d)+$+v):l+$+(d===-2?(s.push(void 0),a):v)}return[mt(i,n+(i[e]||"<?>")+(t===2?"</svg>":"")),s]};class k{constructor({strings:t,_$litType$:e},s){let o;this.parts=[];let n=0,r=0;const a=t.length-1,l=this.parts,[c,h]=At(t,e);if(this.el=k.createElement(c,s),m.currentNode=this.el.content,e===2){const d=this.el.content,p=d.firstChild;p.remove(),d.append(...p.childNodes)}for(;(o=m.nextNode())!==null&&l.length<a;){if(o.nodeType===1){if(o.hasAttributes()){const d=[];for(const p of o.getAttributeNames())if(p.endsWith(R)||p.startsWith($)){const v=h[r++];if(d.push(p),v!==void 0){const Ut=o.getAttribute(v.toLowerCase()+R).split($),T=/([.?@])?(.*)/.exec(v);l.push({type:1,index:n,name:T[2],strings:Ut,ctor:T[1]==="."?bt:T[1]==="?"?yt:T[1]==="@"?Et:P})}else l.push({type:6,index:n})}for(const p of d)o.removeAttribute(p)}if(_t.test(o.tagName)){const d=o.textContent.split($),p=d.length-1;if(p>0){o.textContent=y?y.emptyScript:"";for(let v=0;v<p;v++)o.append(d[v],S()),m.nextNode(),l.push({type:2,index:++n});o.append(d[p],S())}}}else if(o.nodeType===8)if(o.data===G)l.push({type:2,index:n});else{let d=-1;for(;(d=o.data.indexOf($,d+1))!==-1;)l.push({type:7,index:n}),d+=$.length-1}n++}}static createElement(t,e){const s=A.createElement("template");return s.innerHTML=t,s}}function g(i,t,e=i,s){var o,n,r,a;if(t===f)return t;let l=s!==void 0?(o=e._$Co)===null||o===void 0?void 0:o[s]:e._$Cl;const c=x(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==c&&((n=l==null?void 0:l._$AO)===null||n===void 0||n.call(l,!1),c===void 0?l=void 0:(l=new c(i),l._$AT(i,e,s)),s!==void 0?((r=(a=e)._$Co)!==null&&r!==void 0?r:a._$Co=[])[s]=l:e._$Cl=l),l!==void 0&&(t=g(i,l._$AS(i,t.values),l,s)),t}class gt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:o}=this._$AD,n=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:A).importNode(s,!0);m.currentNode=n;let r=m.nextNode(),a=0,l=0,c=o[0];for(;c!==void 0;){if(a===c.index){let h;c.type===2?h=new E(r,r.nextSibling,this,t):c.type===1?h=new c.ctor(r,c.name,c.strings,this,t):c.type===6&&(h=new wt(r,this,t)),this._$AV.push(h),c=o[++l]}a!==(c==null?void 0:c.index)&&(r=m.nextNode(),a++)}return m.currentNode=A,n}v(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class E{constructor(t,e,s,o){var n;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=o,this._$Cp=(n=o==null?void 0:o.isConnected)===null||n===void 0||n}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=g(this,t,e),x(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==f&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):ft(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==u&&x(this._$AH)?this._$AA.nextSibling.data=t:this.$(A.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:o}=t,n=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=k.createElement(mt(o.h,o.h[0]),this.options)),o);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===n)this._$AH.v(s);else{const r=new gt(n,this),a=r.u(this.options);r.v(s),this.$(a),this._$AH=r}}_$AC(t){let e=lt.get(t.strings);return e===void 0&&lt.set(t.strings,e=new k(t)),e}T(t){$t(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,o=0;for(const n of t)o===e.length?e.push(s=new E(this.k(S()),this.k(S()),this,this.options)):s=e[o],s._$AI(n),o++;o<e.length&&(this._$AR(s&&s._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const o=t.nextSibling;t.remove(),t=o}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class P{constructor(t,e,s,o,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,o){const n=this.strings;let r=!1;if(n===void 0)t=g(this,t,e,0),r=!x(t)||t!==this._$AH&&t!==f,r&&(this._$AH=t);else{const a=t;let l,c;for(t=n[0],l=0;l<n.length-1;l++)c=g(this,a[s+l],e,l),c===f&&(c=this._$AH[l]),r||(r=!x(c)||c!==this._$AH[l]),c===u?t=u:t!==u&&(t+=(c??"")+n[l+1]),this._$AH[l]=c}r&&!o&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class bt extends P{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}const jt=y?y.emptyScript:"";class yt extends P{constructor(){super(...arguments),this.type=4}j(t){t&&t!==u?this.element.setAttribute(this.name,jt):this.element.removeAttribute(this.name)}}class Et extends P{constructor(t,e,s,o,n){super(t,e,s,o,n),this.type=5}_$AI(t,e=this){var s;if((t=(s=g(this,t,e,0))!==null&&s!==void 0?s:u)===f)return;const o=this._$AH,n=t===u&&o!==u||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,r=t!==u&&(o===u||n);n&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class wt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){g(this,t)}}const Dt={O:R,P:$,A:G,C:1,M:At,L:gt,R:ft,D:g,I:E,V:P,H:yt,N:Et,U:bt,F:wt},at=O.litHtmlPolyfillSupport;at==null||at(k,E),((D=O.litHtmlVersions)!==null&&D!==void 0?D:O.litHtmlVersions=[]).push("2.8.0");const Bt=(i,t,e)=>{var s,o;const n=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let r=n._$litPart$;if(r===void 0){const a=(o=e==null?void 0:e.renderBefore)!==null&&o!==void 0?o:null;n._$litPart$=r=new E(t.insertBefore(S(),a),a,void 0,e??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var V,q;let H=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Bt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return f}};H.finalized=!0,H._$litElement$=!0,(V=globalThis.litElementHydrateSupport)===null||V===void 0||V.call(globalThis,{LitElement:H});const ht=globalThis.litElementPolyfillSupport;ht==null||ht({LitElement:H});((q=globalThis.litElementVersions)!==null&&q!==void 0?q:globalThis.litElementVersions=[]).push("3.3.3");const fe=Ht`
  :host {
    display: block;
    text-align: left;
    box-sizing: border-box;
    max-width: 800px;
    min-width: 360px;
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, sans-serif;
    border: 1px solid var(--ave-border-color);
    border-radius: var(--ave-border-radius);

    --ave-primary-color: #01579b;
    --ave-secondary-color: rgba(0, 0, 0, 0.54);
    --ave-accent-color: #d63200;
    --ave-border-color: rgba(0, 0, 0, 0.12);
    --ave-border-radius: 4px;
    --ave-header-color: #fff;
    --ave-item-color: rgba(0, 0, 0, 0.87);
    --ave-label-color: #424242;
    --ave-link-color: #01579b;
    --ave-link-hover-color: #d63200;
    --ave-tab-indicator-size: 2px;
    --ave-tab-color: rgba(0, 0, 0, 0.54);
    --ave-tag-background-color: #e2e3e5;
    --ave-tag-border-color: #d6d8db;
    --ave-tag-color: #383d41;
    --ave-monospace-font: Menlo, 'DejaVu Sans Mono', 'Liberation Mono', Consolas,
      'Courier New', monospace;
  }

  :host([hidden]),
  [hidden] {
    display: none !important;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    background: var(--ave-header-background, var(--ave-primary-color));
    border-top-left-radius: var(--ave-border-radius);
    border-top-right-radius: var(--ave-border-radius);
  }

  nav {
    display: flex;
    align-items: center;
  }

  [part='header-title'] {
    color: var(--ave-header-color);
    font-family: var(--ave-monospace-font);
    font-size: 0.875rem;
    line-height: 1.5rem;
  }

  [part='select-label'] {
    margin-left: 0.5rem;
  }

  [part='warning'] {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    header {
      flex-direction: column;
    }

    nav {
      margin-top: 0.5rem;
    }
  }

  @media (prefers-color-scheme: dark) {
    :host {
      background: #fff;
      color: #000;
    }
  }
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:Vt}=Dt,qt=i=>i===null||typeof i!="object"&&typeof i!="function",_e=(i,t)=>(i==null?void 0:i._$litType$)!==void 0,me=i=>{var t;return((t=i==null?void 0:i._$litType$)===null||t===void 0?void 0:t.h)!=null},Ft=i=>i.strings===void 0,ct=()=>document.createComment(""),Ae=(i,t,e)=>{var s;const o=i._$AA.parentNode,n=i._$AB;if(e===void 0){const r=o.insertBefore(ct(),n),a=o.insertBefore(ct(),n);e=new Vt(r,a,i,i.options)}else{const r=e._$AB.nextSibling,a=e._$AM,l=a!==i;if(l){let c;(s=e._$AQ)===null||s===void 0||s.call(e,i),e._$AM=i,e._$AP!==void 0&&(c=i._$AU)!==a._$AU&&e._$AP(c)}if(r!==n||l){let c=e._$AA;for(;c!==r;){const h=c.nextSibling;o.insertBefore(c,n),c=h}}}return e},Wt={},ge=(i,t=Wt)=>i._$AH=t,be=i=>i._$AH,ye=i=>{i._$AR()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ct={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},St=i=>(...t)=>({_$litDirective$:i,values:t});let xt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=(i,t)=>{var e,s;const o=i._$AN;if(o===void 0)return!1;for(const n of o)(s=(e=n)._$AO)===null||s===void 0||s.call(e,t,!1),C(n,t);return!0},I=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while((e==null?void 0:e.size)===0)},kt=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),Yt(t)}};function Kt(i){this._$AN!==void 0?(I(this),this._$AM=i,kt(this)):this._$AM=i}function Zt(i,t=!1,e=0){const s=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(t)if(Array.isArray(s))for(let n=e;n<s.length;n++)C(s[n],!1),I(s[n]);else s!=null&&(C(s,!1),I(s));else C(this,i)}const Yt=i=>{var t,e,s,o;i.type==Ct.CHILD&&((t=(s=i)._$AP)!==null&&t!==void 0||(s._$AP=Zt),(e=(o=i)._$AQ)!==null&&e!==void 0||(o._$AQ=Kt))};let Gt=class extends xt{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),kt(this),this.isConnected=t._$AU}_$AO(t,e=!0){var s,o;t!==this.isConnected&&(this.isConnected=t,t?(s=this.reconnected)===null||s===void 0||s.call(this):(o=this.disconnected)===null||o===void 0||o.call(this)),e&&(C(this,t),I(this))}setValue(t){if(Ft(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Jt{constructor(t){this.G=t}disconnect(){this.G=void 0}reconnect(t){this.G=t}deref(){return this.G}}let Qt=class{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){var t;(t=this.Y)!==null&&t!==void 0||(this.Y=new Promise(e=>this.Z=e))}resume(){var t;(t=this.Z)===null||t===void 0||t.call(this),this.Y=this.Z=void 0}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dt=i=>!qt(i)&&typeof i.then=="function",ut=1073741823;class Xt extends Gt{constructor(){super(...arguments),this._$C_t=ut,this._$Cwt=[],this._$Cq=new Jt(this),this._$CK=new Qt}render(...t){var e;return(e=t.find(s=>!dt(s)))!==null&&e!==void 0?e:f}update(t,e){const s=this._$Cwt;let o=s.length;this._$Cwt=e;const n=this._$Cq,r=this._$CK;this.isConnected||this.disconnected();for(let a=0;a<e.length&&!(a>this._$C_t);a++){const l=e[a];if(!dt(l))return this._$C_t=a,l;a<o&&l===s[a]||(this._$C_t=ut,o=0,Promise.resolve(l).then(async c=>{for(;r.get();)await r.get();const h=n.deref();if(h!==void 0){const d=h._$Cwt.indexOf(l);d>-1&&d<h._$C_t&&(h._$C_t=d,h.setValue(c))}}))}return f}disconnected(){this._$Cq.disconnect(),this._$CK.pause()}reconnected(){this._$Cq.reconnect(this),this._$CK.resume()}}const Se=St(Xt);function Pt(i){return!!i&&Array.isArray(i.modules)&&i.modules.some(t=>{var e,s;return((e=t.exports)==null?void 0:e.some(o=>o.kind==="custom-element-definition"))||((s=t.declarations)==null?void 0:s.some(o=>o.customElement))})}const te=i=>i.kind==="custom-element-definition",ee=i=>i.customElement,Tt=i=>!(i.privacy==="private"||i.privacy==="protected");async function se(i){try{const e=await(await fetch(i)).json();if(Pt(e))return e;throw new Error(`No element definitions found at ${i}`)}catch(t){return console.error(t),null}}function xe(i,t){const e=(i.modules??[]).flatMap(s=>{var o;return((o=s.exports)==null?void 0:o.filter(te))??[]});return t?e.filter(s=>t.includes(s.name)):e}const ke=(i,t,e)=>{var l,c;const s=e?t.findIndex(h=>(h==null?void 0:h.name)===e):0,o=t[s];if(!o)return null;const{name:n,module:r}=o.declaration,a=r?(c=(l=i.modules.find(h=>h.path===r.replace(/^\//,"")))==null?void 0:l.declarations)==null?void 0:c.find(h=>h.name===n):i.modules.flatMap(h=>h.declarations).find(h=>(h==null?void 0:h.name)===n);if(!a||!ee(a))throw new Error(`Could not find declaration for ${e}`);return{customElement:!0,name:o.name,description:a==null?void 0:a.description,slots:a.slots??[],attributes:a.attributes??[],members:a.members??[],events:a.events??[],cssParts:a.cssParts??[],cssProperties:[...a.cssProperties??[]].sort((h,d)=>h.name>d.name?1:-1)}},Pe=(i=[])=>i.filter(t=>t.kind==="field"&&Tt(t)),Te=(i=[])=>i.filter(t=>t.kind==="method"&&Tt(t));/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ie=(i,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,i)}},oe=(i,t,e)=>{t.constructor.createProperty(e,i)};function U(i){return(t,e)=>e!==void 0?oe(i,t,e):ie(i,t)}const Ne=zt`
  <div part="warning">No custom elements found in the JSON file.</div>
`,Ue=i=>{class t extends i{constructor(){super(...arguments),this.jsonFetched=Promise.resolve(null)}willUpdate(){const{src:s}=this;this.manifest?Pt(this.manifest)?(this.lastSrc=void 0,this.jsonFetched=Promise.resolve(this.manifest)):console.error("No custom elements found in the `manifest` object."):s&&this.lastSrc!==s&&(this.lastSrc=s,this.jsonFetched=se(s))}}return N([U()],t.prototype,"src",void 0),N([U({attribute:!1})],t.prototype,"manifest",void 0),N([U({reflect:!0,converter:{fromAttribute:e=>e.split(","),toAttribute:e=>e.join(",")}})],t.prototype,"only",void 0),N([U()],t.prototype,"selected",void 0),t},Me=i=>typeof i=="string"&&i.startsWith("'")&&i.endsWith("'")?i.slice(1,i.length-1):i;function J(i,...t){const e=document.createElement("template");return e.innerHTML=t.reduce((s,o,n)=>s+o+i[n+1],i[0]),e}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class K extends xt{constructor(t){if(super(t),this.et=u,t.type!==Ct.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===u||t==null)return this.ft=void 0,this.et=t;if(t===f)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}K.directiveName="unsafeHTML",K.resultType=1;const He=St(K);let ne=0;const re=J`
  <style>
    :host {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      box-sizing: border-box;
      position: relative;
      max-width: 150px;
      overflow: hidden;
      min-height: 3rem;
      padding: 0 1rem;
      color: var(--ave-tab-color);
      font-size: 0.875rem;
      line-height: 1.2;
      font-weight: 500;
      text-transform: uppercase;
      outline: none;
      cursor: pointer;
      -webkit-user-select: none;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    :host([hidden]) {
      display: none !important;
    }

    :host::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: var(--ave-tab-indicator-size);
      background-color: var(--ave-primary-color);
      opacity: 0;
    }

    :host([selected]) {
      color: var(--ave-tab-selected-color, var(--ave-primary-color));
    }

    :host([selected])::before {
      opacity: 1;
    }

    :host::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: var(--ave-primary-color);
      opacity: 0;
      transition: opacity 0.1s linear;
    }

    :host(:hover)::after {
      opacity: 0.08;
    }

    :host([focus-ring])::after {
      opacity: 0.12;
    }

    :host([active])::after {
      opacity: 0.16;
    }

    @media (max-width: 600px) {
      :host {
        justify-content: center;
        text-align: center;
      }

      :host::before {
        top: auto;
        right: 0;
        width: 100%;
        height: var(--ave-tab-indicator-size);
      }
    }
  </style>
  <slot></slot>
`;class Nt extends HTMLElement{get selected(){return this._selected}set selected(t){this._selected=t,this.setAttribute("aria-selected",String(t)),this.setAttribute("tabindex",t?"0":"-1"),this.toggleAttribute("selected",t)}constructor(){super(),this._mousedown=!1,this._selected=!1,this.attachShadow({mode:"open"}).appendChild(re.content.cloneNode(!0)),this.addEventListener("focus",()=>this._setFocused(!0),!0),this.addEventListener("blur",()=>{this._setFocused(!1),this._setActive(!1)},!0),this.addEventListener("mousedown",()=>{this._setActive(this._mousedown=!0);const e=()=>{this._setActive(this._mousedown=!1),document.removeEventListener("mouseup",e)};document.addEventListener("mouseup",e)})}connectedCallback(){this.setAttribute("role","tab"),this.id||(this.id=`api-viewer-tab-${ne++}`)}_setActive(t){this.toggleAttribute("active",t)}_setFocused(t){this.toggleAttribute("focused",t),this.toggleAttribute("focus-ring",t&&!this._mousedown)}}customElements.define("api-viewer-tab",Nt);let le=0;const ae=J`
  <style>
    :host {
      display: block;
      box-sizing: border-box;
      width: 100%;
      overflow: hidden;
    }

    :host([hidden]) {
      display: none !important;
    }
  </style>
  <slot></slot>
`;class he extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(ae.content.cloneNode(!0))}connectedCallback(){this.setAttribute("role","tabpanel"),this.id||(this.id=`api-viewer-panel-${le++}`)}}customElements.define("api-viewer-panel",he);const ce=J`
  <style>
    :host {
      display: flex;
      border-bottom-left-radius: var(--ave-border-radius);
      overflow: hidden;
    }

    @media (max-width: 600px) {
      :host {
        flex-direction: column;
      }

      .tabs {
        display: flex;
        flex-grow: 1;
        align-self: stretch;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
  </style>
  <div class="tabs">
    <slot name="tab"></slot>
  </div>
  <slot name="panel"></slot>
`;class de extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"});t.appendChild(ce.content.cloneNode(!0));const e=t.querySelectorAll("slot");e[0].addEventListener("slotchange",()=>this._linkPanels()),e[1].addEventListener("slotchange",()=>this._linkPanels()),this.addEventListener("keydown",this.handleEvent),this.addEventListener("click",this.handleEvent)}connectedCallback(){this.setAttribute("role","tablist"),requestAnimationFrame(()=>{this._linkPanels()})}_linkPanels(){const{tabs:t}=this;t.forEach(s=>{const o=s.nextElementSibling;s.setAttribute("aria-controls",o.id),o.setAttribute("aria-labelledby",s.id)});const e=t.find(s=>s.selected)||t[0];this._selectTab(e)}get tabs(){return Array.from(this.querySelectorAll("api-viewer-tab"))}_getAvailableIndex(t,e){const{tabs:s}=this,o=s.length;for(let n=0;typeof t=="number"&&n<o;n++,t+=e||1)if(t<0?t=o-1:t>=o&&(t=0),!s[t].hasAttribute("hidden"))return t;return-1}_prevTab(t){const e=this._getAvailableIndex(t.findIndex(s=>s.selected)-1,-1);return t[(e+t.length)%t.length]}_nextTab(t){const e=this._getAvailableIndex(t.findIndex(s=>s.selected)+1,1);return t[e%t.length]}reset(){this.tabs.forEach(t=>{t.selected=!1}),this.querySelectorAll("api-viewer-panel").forEach(t=>{t.hidden=!0})}selectFirst(){const t=this._getAvailableIndex(0,1);this._selectTab(this.tabs[t%this.tabs.length])}_selectTab(t){this.reset();const e=t.getAttribute("aria-controls"),s=this.querySelector(`#${e}`);s&&(t.selected=!0,s.hidden=!1)}handleEvent(t){const{target:e}=t;if(e&&e instanceof Nt){let s;if(t.type==="keydown"){const{tabs:o}=this;switch(t.key){case"ArrowLeft":case"ArrowUp":s=this._prevTab(o);break;case"ArrowDown":case"ArrowRight":s=this._nextTab(o);break;case"Home":s=o[0];break;case"End":s=o[o.length-1];break;default:return}t.preventDefault()}else s=e;this._selectTab(s),s.focus()}}}customElements.define("api-viewer-tabs",de);export{u as A,Bt as D,Ue as M,f as T,ke as a,Pe as b,Te as c,fe as d,Ne as e,St as f,xe as g,Pt as h,Ht as i,xt as j,be as k,ge as l,Se as m,U as n,He as o,Ae as p,ye as q,Ct as r,H as s,_e as t,Me as u,me as v,zt as x};
