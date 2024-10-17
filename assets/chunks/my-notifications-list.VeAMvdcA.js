import{i as w,h as wt,R as _t,k as d,S as Pt,D as Dt,w as H,o as ct,p as ut,n as Ft,q as Rt,r as jt,t as Ut}from"./notifications-client.yU5uhUDs.js";import{s as qt,a as l,n as Ht,t as Wt}from"./property.BX-X1PKQ.js";import{S as Zt}from"./signal-watcher.BSmBpaeV.js";import{n as Gt}from"./context.Ct8THdkx.js";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class dt{constructor(e,o,r,s){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(i,a)=>{this.unsubscribe&&(this.unsubscribe!==a&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=i,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(i,a)),this.unsubscribe=a},this.host=e,o.context!==void 0){const i=o;this.context=i.context,this.callback=i.callback,this.subscribe=i.subscribe??!1}else this.context=o,this.callback=r,this.subscribe=s??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new qt(this.context,this.t,this.subscribe))}}/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function xt({context:t,subscribe:e}){return(o,r)=>{typeof r=="object"?r.addInitializer(function(){new dt(this,{context:t,callback:s=>{o.set.call(this,s)},subscribe:e})}):o.constructor.addInitializer(s=>{new dt(s,{context:t,callback:i=>{s[r]=i},subscribe:e})})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function S(t){return l({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yt=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function kt(t,e){return(o,r,s)=>{const i=a=>{var b;return((b=a.renderRoot)==null?void 0:b.querySelector(t))??null};return Yt(o,r,{get(){return i(this)}})}}const Xt=[w`
    .row {
      display: flex;
      flex-direction: row;
    }
    .column {
      display: flex;
      flex-direction: column;
    }
    .small-margin {
      margin-top: 6px;
    }
    .big-margin {
      margin-top: 23px;
    }

    .fill {
      flex: 1;
      height: 100%;
    }

    .title {
      font-size: 20px;
    }

    .center-content {
      align-items: center;
      justify-content: center;
    }

    .placeholder {
      color: var(--sl-color-gray-700);
    }

    .flex-scrollable-parent {
      position: relative;
      display: flex;
      flex: 1;
    }

    .flex-scrollable-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .flex-scrollable-x {
      max-width: 100%;
      overflow-x: auto;
    }
    .flex-scrollable-y {
      max-height: 100%;
      overflow-y: auto;
    }
    :host {
      color: var(--sl-color-neutral-1000);
    }

    sl-card {
      display: flex;
    }
    sl-card::part(base) {
      flex: 1;
    }
    sl-card::part(body) {
      display: flex;
      flex: 1;
    }
    sl-drawer::part(body) {
      display: flex;
    }
  `];/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ct=t=>(...e)=>({_$litDirective$:t,values:e});class St{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,r){this.t=e,this._$AM=o,this.i=r}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class tt extends Event{constructor(e){super(tt.eventName,{bubbles:!0,composed:!0,cancelable:!1}),this.routes=e}}tt.eventName="lit-routes-connected";var E=w`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,Et=Object.defineProperty,Jt=Object.defineProperties,Kt=Object.getOwnPropertyDescriptor,Qt=Object.getOwnPropertyDescriptors,ht=Object.getOwnPropertySymbols,te=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable,bt=(t,e,o)=>e in t?Et(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,V=(t,e)=>{for(var o in e||(e={}))te.call(e,o)&&bt(t,o,e[o]);if(ht)for(var o of ht(e))ee.call(e,o)&&bt(t,o,e[o]);return t},zt=(t,e)=>Jt(t,Qt(e)),n=(t,e,o,r)=>{for(var s=r>1?void 0:r?Kt(e,o):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(s=(r?a(e,o,s):a(s))||s);return r&&s&&Et(e,o,s),s},Lt=(t,e,o)=>{if(!e.has(t))throw TypeError("Cannot "+o)},oe=(t,e,o)=>(Lt(t,e,"read from private field"),e.get(t)),re=(t,e,o)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,o)},se=(t,e,o,r)=>(Lt(t,e,"write to private field"),e.set(t,o),o),F,m=class extends wt{constructor(){super(),re(this,F,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e)})}emit(t,e){const o=new CustomEvent(t,V({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(o),o}static define(t,e=this,o={}){const r=customElements.get(t);if(!r){try{customElements.define(t,e,o)}catch{customElements.define(t,class extends e{},o)}return}let s=" (unknown version)",i=s;"version"in e&&e.version&&(s=" v"+e.version),"version"in r&&r.version&&(i=" v"+r.version),!(s&&i&&s===i)&&console.warn(`Attempted to register <${t}>${s}, but <${t}>${i} has already been registered.`)}attributeChangedCallback(t,e,o){oe(this,F)||(this.constructor.elementProperties.forEach((r,s)=>{r.reflect&&this[s]!=null&&this.initialReflectedProperties.set(s,this[s])}),se(this,F,!0)),super.attributeChangedCallback(t,e,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,o)=>{t.has(o)&&this[o]==null&&(this[o]=e)})}};F=new WeakMap;m.version="2.17.1";m.dependencies={};n([l()],m.prototype,"dir",2);n([l()],m.prototype,"lang",2);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const et=Ct(class extends St{constructor(t){var e;if(super(t),t.type!==$t.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var r,s;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in e)e[i]&&!((r=this.nt)!=null&&r.has(i))&&this.st.add(i);return this.render(e)}const o=t.element.classList;for(const i of this.st)i in e||(o.remove(i),this.st.delete(i));for(const i in e){const a=!!e[i];a===this.st.has(i)||(s=this.nt)!=null&&s.has(i)||(a?(o.add(i),this.st.add(i)):(o.remove(i),this.st.delete(i)))}return _t}}),J=new Set,$=new Map;let x,ot="ltr",rt="en";const At=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(At){const t=new MutationObserver(Mt);ot=document.documentElement.dir||"ltr",rt=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function Tt(...t){t.map(e=>{const o=e.$code.toLowerCase();$.has(o)?$.set(o,Object.assign(Object.assign({},$.get(o)),e)):$.set(o,e),x||(x=e)}),Mt()}function Mt(){At&&(ot=document.documentElement.dir||"ltr",rt=document.documentElement.lang||navigator.language),[...J.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}let ie=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){J.add(this.host)}hostDisconnected(){J.delete(this.host)}dir(){return`${this.host.dir||ot}`.toLowerCase()}lang(){return`${this.host.lang||rt}`.toLowerCase()}getTranslationData(e){var o,r;const s=new Intl.Locale(e.replace(/_/g,"-")),i=s==null?void 0:s.language.toLowerCase(),a=(r=(o=s==null?void 0:s.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&r!==void 0?r:"",b=$.get(`${i}-${a}`),f=$.get(i);return{locale:s,language:i,region:a,primary:b,secondary:f}}exists(e,o){var r;const{primary:s,secondary:i}=this.getTranslationData((r=o.lang)!==null&&r!==void 0?r:this.lang());return o=Object.assign({includeFallback:!1},o),!!(s&&s[e]||i&&i[e]||o.includeFallback&&x&&x[e])}term(e,...o){const{primary:r,secondary:s}=this.getTranslationData(this.lang());let i;if(r&&r[e])i=r[e];else if(s&&s[e])i=s[e];else if(x&&x[e])i=x[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof i=="function"?i(...o):i}date(e,o){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),o).format(e)}number(e,o){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),o).format(e)}relativeTime(e,o,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(e,o)}};var Vt={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};Tt(Vt);var ne=Vt,st=class extends ie{};Tt(ne);function U(t,e){const o=V({waitUntilFirstUpdate:!1},e);return(r,s)=>{const{update:i}=r,a=Array.isArray(t)?t:[t];r.update=function(b){a.forEach(f=>{const c=f;if(b.has(c)){const u=b.get(c),_=this[c];u!==_&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[s](u,_)}}),i.call(this,b)}}}var K="";function ft(t){K=t}function ae(t=""){if(!K){const e=[...document.getElementsByTagName("script")],o=e.find(r=>r.hasAttribute("data-shoelace"));if(o)ft(o.getAttribute("data-shoelace"));else{const r=e.find(i=>/shoelace(\.min)?\.js($|\?)/.test(i.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(i.src));let s="";r&&(s=r.getAttribute("src")),ft(s.split("/").slice(0,-1).join("/"))}}return K.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var le={name:"default",resolver:t=>ae(`assets/icons/${t}.svg`)},ce=le,pt={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},ue={name:"system",resolver:t=>t in pt?`data:image/svg+xml,${encodeURIComponent(pt[t])}`:""},de=ue,he=[ce,de],Q=[];function be(t){Q.push(t)}function fe(t){Q=Q.filter(e=>e!==t)}function vt(t){return he.find(e=>e.name===t)}var pe=w`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ve=(t,e)=>(t==null?void 0:t._$litType$)!==void 0;var L=Symbol(),O=Symbol(),W,Z=new Map,g=class extends m{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var o;let r;if(e!=null&&e.spriteSheet)return this.svg=d`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(r=await fetch(t,{mode:"cors"}),!r.ok)return r.status===410?L:O}catch{return O}try{const s=document.createElement("div");s.innerHTML=await r.text();const i=s.firstElementChild;if(((o=i==null?void 0:i.tagName)==null?void 0:o.toLowerCase())!=="svg")return L;W||(W=new DOMParser);const b=W.parseFromString(i.outerHTML,"text/html").body.querySelector("svg");return b?(b.part.add("svg"),document.adoptNode(b)):L}catch{return L}}connectedCallback(){super.connectedCallback(),be(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),fe(this)}getIconSource(){const t=vt(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const{url:e,fromLibrary:o}=this.getIconSource(),r=o?vt(this.library):void 0;if(!e){this.svg=null;return}let s=Z.get(e);if(s||(s=this.resolveIcon(e,r),Z.set(e,s)),!this.initialRender)return;const i=await s;if(i===O&&Z.delete(e),e===this.getIconSource().url){if(ve(i)){if(this.svg=i,r){await this.updateComplete;const a=this.shadowRoot.querySelector("[part='svg']");typeof r.mutator=="function"&&a&&r.mutator(a)}return}switch(i){case O:case L:this.svg=null,this.emit("sl-error");break;default:this.svg=i.cloneNode(!0),(t=r==null?void 0:r.mutator)==null||t.call(r,this.svg),this.emit("sl-load")}}}render(){return this.svg}};g.styles=[E,pe];n([S()],g.prototype,"svg",2);n([l({reflect:!0})],g.prototype,"name",2);n([l()],g.prototype,"src",2);n([l()],g.prototype,"label",2);n([l({reflect:!0})],g.prototype,"library",2);n([U("label")],g.prototype,"handleLabelChange",1);n([U(["name","src","library"])],g.prototype,"setIcon",1);g.define("sl-icon");const me=Ht("hc_zome_profiles/store");let G=!1;const mt=new Pt.subtle.Watcher(()=>{G||(G=!0,queueMicrotask(()=>{G=!1;for(const t of mt.getPending())t.get();mt.watch()}))});/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ge=t=>typeof t!="string"&&"strTag"in t,ye=(t,e,o)=>{let r=t[0];for(let s=1;s<t.length;s++)r+=e[s-1],r+=t[s];return r};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const we=t=>ge(t)?ye(t.strings,t.values):t;let Y=we;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class _e{constructor(){this.settled=!1,this.promise=new Promise((e,o)=>{this._resolve=e,this._reject=o})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */for(let t=0;t<256;t++)(t>>4&15).toString(16)+(t&15).toString(16);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let xe=new _e;xe.resolve();var ke=w`
  :host {
    --border-radius: var(--sl-border-radius-pill);
    --color: var(--sl-color-neutral-200);
    --sheen-color: var(--sl-color-neutral-300);

    display: block;
    position: relative;
  }

  .skeleton {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 1rem;
  }

  .skeleton__indicator {
    flex: 1 1 auto;
    background: var(--color);
    border-radius: var(--border-radius);
  }

  .skeleton--sheen .skeleton__indicator {
    background: linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));
    background-size: 400% 100%;
    animation: sheen 8s ease-in-out infinite;
  }

  .skeleton--pulse .skeleton__indicator {
    animation: pulse 2s ease-in-out 0.5s infinite;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    :host {
      --color: GrayText;
    }
  }

  @keyframes sheen {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`,it=class extends m{constructor(){super(...arguments),this.effect="none"}render(){return d`
      <div
        part="base"
        class=${et({skeleton:!0,"skeleton--pulse":this.effect==="pulse","skeleton--sheen":this.effect==="sheen"})}
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `}};it.styles=[E,ke];n([l()],it.prototype,"effect",2);it.define("sl-skeleton");/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const It="important",$e=" !"+It,gt=Ct(class extends St{constructor(t){var e;if(super(t),t.type!==$t.ATTRIBUTE||t.name!=="style"||((e=t.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,o)=>{const r=t[o];return r==null?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(t,[e]){const{style:o}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const r of this.ft)e[r]==null&&(this.ft.delete(r),r.includes("-")?o.removeProperty(r):o[r]=null);for(const r in e){const s=e[r];if(s!=null){this.ft.add(r);const i=typeof s=="string"&&s.endsWith($e);r.includes("-")||i?o.setProperty(r,i?s.slice(0,-11):s,i?It:""):o[r]=s}}return _t}});var Ce=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=o=>{const r=o.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===t.ELEMENT_NODE){const e=t;if(e.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const p=t=>t??Dt;var Se=w`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nt=Symbol.for(""),Ee=t=>{if((t==null?void 0:t.r)===Nt)return t==null?void 0:t._$litStatic$},j=(t,...e)=>({_$litStatic$:e.reduce((o,r,s)=>o+(i=>{if(i._$litStatic$!==void 0)return i._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${i}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+t[s+1],t[0]),r:Nt}),yt=new Map,ze=t=>(e,...o)=>{const r=o.length;let s,i;const a=[],b=[];let f,c=0,u=!1;for(;c<r;){for(f=e[c];c<r&&(i=o[c],(s=Ee(i))!==void 0);)f+=s+e[++c],u=!0;c!==r&&b.push(i),a.push(f),c++}if(c===r&&a.push(e[r]),u){const _=a.join("$$lit$$");(e=yt.get(_))===void 0&&(a.raw=a,yt.set(_,e=a)),o=b}return t(e,...o)},R=ze(d);var v=class extends m{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=!!this.href,e=t?j`a`:j`button`;return R`
      <${e}
        part="base"
        class=${et({"icon-button":!0,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${p(t?void 0:this.disabled)}
        type=${p(t?void 0:"button")}
        href=${p(t?this.href:void 0)}
        target=${p(t?this.target:void 0)}
        download=${p(t?this.download:void 0)}
        rel=${p(t&&this.target?"noreferrer noopener":void 0)}
        role=${p(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${p(this.name)}
          library=${p(this.library)}
          src=${p(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};v.styles=[E,Se];v.dependencies={"sl-icon":g};n([kt(".icon-button")],v.prototype,"button",2);n([S()],v.prototype,"hasFocus",2);n([l()],v.prototype,"name",2);n([l()],v.prototype,"library",2);n([l()],v.prototype,"src",2);n([l()],v.prototype,"href",2);n([l()],v.prototype,"target",2);n([l()],v.prototype,"download",2);n([l()],v.prototype,"label",2);n([l({type:Boolean,reflect:!0})],v.prototype,"disabled",2);v.define("sl-icon-button");var Le=w`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`,Bt=class extends m{constructor(){super(...arguments),this.localize=new st(this)}render(){return d`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};Bt.styles=[E,Le];var A=new WeakMap,T=new WeakMap,M=new WeakMap,X=new WeakSet,P=new WeakMap,Ae=class{constructor(t,e){this.handleFormData=o=>{const r=this.options.disabled(this.host),s=this.options.name(this.host),i=this.options.value(this.host),a=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!r&&!a&&typeof s=="string"&&s.length>0&&typeof i<"u"&&(Array.isArray(i)?i.forEach(b=>{o.formData.append(s,b.toString())}):o.formData.append(s,i.toString()))},this.handleFormSubmit=o=>{var r;const s=this.options.disabled(this.host),i=this.options.reportValidity;this.form&&!this.form.noValidate&&((r=A.get(this.form))==null||r.forEach(a=>{this.setUserInteracted(a,!0)})),this.form&&!this.form.noValidate&&!s&&!i(this.host)&&(o.preventDefault(),o.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),P.set(this.host,[])},this.handleInteraction=o=>{const r=P.get(this.host);r.includes(o.type)||r.push(o.type),r.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const o=this.form.querySelectorAll("*");for(const r of o)if(typeof r.checkValidity=="function"&&!r.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const o=this.form.querySelectorAll("*");for(const r of o)if(typeof r.reportValidity=="function"&&!r.reportValidity())return!1}return!0},(this.host=t).addController(this),this.options=V({form:o=>{const r=o.form;if(r){const i=o.getRootNode().querySelector(`#${r}`);if(i)return i}return o.closest("form")},name:o=>o.name,value:o=>o.value,defaultValue:o=>o.defaultValue,disabled:o=>{var r;return(r=o.disabled)!=null?r:!1},reportValidity:o=>typeof o.reportValidity=="function"?o.reportValidity():!0,checkValidity:o=>typeof o.checkValidity=="function"?o.checkValidity():!0,setValue:(o,r)=>o.value=r,assumeInteractionOn:["sl-input"]},e)}hostConnected(){const t=this.options.form(this.host);t&&this.attachForm(t),P.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),P.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction)})}hostUpdated(){const t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,A.has(this.form)?A.get(this.form).add(this.host):A.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),T.has(this.form)||(T.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),M.has(this.form)||(M.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const t=A.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),T.has(this.form)&&(this.form.reportValidity=T.get(this.form),T.delete(this.form)),M.has(this.form)&&(this.form.checkValidity=M.get(this.form),M.delete(this.form)),this.form=void 0))}setUserInteracted(t,e){e?X.add(t):X.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){const o=document.createElement("button");o.type=t,o.style.position="absolute",o.style.width="0",o.style.height="0",o.style.clipPath="inset(50%)",o.style.overflow="hidden",o.style.whiteSpace="nowrap",e&&(o.name=e.name,o.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(r=>{e.hasAttribute(r)&&o.setAttribute(r,e.getAttribute(r))})),this.form.append(o),o.click(),o.remove()}}getForm(){var t;return(t=this.form)!=null?t:null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){const e=this.host,o=!!X.has(e),r=!!e.required;e.toggleAttribute("data-required",r),e.toggleAttribute("data-optional",!r),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&o),e.toggleAttribute("data-user-valid",t&&o)}updateValidity(){const t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){const e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||t==null||t.preventDefault()}},nt=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze(zt(V({},nt),{valid:!1,valueMissing:!0}));Object.freeze(zt(V({},nt),{valid:!1,customError:!0}));var Te=w`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`,h=class extends m{constructor(){super(...arguments),this.formControlController=new Ae(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new Ce(this,"[default]","prefix","suffix"),this.localize=new st(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:nt}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity())}render(){const t=this.isLink(),e=t?j`a`:j`button`;return R`
      <${e}
        part="base"
        class=${et({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${p(t?void 0:this.disabled)}
        type=${p(t?void 0:this.type)}
        title=${this.title}
        name=${p(t?void 0:this.name)}
        value=${p(t?void 0:this.value)}
        href=${p(t&&!this.disabled?this.href:void 0)}
        target=${p(t?this.target:void 0)}
        download=${p(t?this.download:void 0)}
        rel=${p(t?this.rel:void 0)}
        role=${p(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?R` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?R`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${e}>
    `}};h.styles=[E,Te];h.dependencies={"sl-icon":g,"sl-spinner":Bt};n([kt(".button")],h.prototype,"button",2);n([S()],h.prototype,"hasFocus",2);n([S()],h.prototype,"invalid",2);n([l()],h.prototype,"title",2);n([l({reflect:!0})],h.prototype,"variant",2);n([l({reflect:!0})],h.prototype,"size",2);n([l({type:Boolean,reflect:!0})],h.prototype,"caret",2);n([l({type:Boolean,reflect:!0})],h.prototype,"disabled",2);n([l({type:Boolean,reflect:!0})],h.prototype,"loading",2);n([l({type:Boolean,reflect:!0})],h.prototype,"outline",2);n([l({type:Boolean,reflect:!0})],h.prototype,"pill",2);n([l({type:Boolean,reflect:!0})],h.prototype,"circle",2);n([l()],h.prototype,"type",2);n([l()],h.prototype,"name",2);n([l()],h.prototype,"value",2);n([l()],h.prototype,"href",2);n([l()],h.prototype,"target",2);n([l()],h.prototype,"rel",2);n([l()],h.prototype,"download",2);n([l()],h.prototype,"form",2);n([l({attribute:"formaction"})],h.prototype,"formAction",2);n([l({attribute:"formenctype"})],h.prototype,"formEnctype",2);n([l({attribute:"formmethod"})],h.prototype,"formMethod",2);n([l({attribute:"formnovalidate",type:Boolean})],h.prototype,"formNoValidate",2);n([l({attribute:"formtarget"})],h.prototype,"formTarget",2);n([U("disabled",{waitUntilFirstUpdate:!0})],h.prototype,"handleDisabledChange",1);h.define("sl-button");var Me=w`
  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`,q=class extends m{constructor(){super(...arguments),this.vertical=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};q.styles=[E,Me];n([l({type:Boolean,reflect:!0})],q.prototype,"vertical",2);n([U("vertical")],q.prototype,"handleVerticalChange",1);q.define("sl-divider");var Ve=[{max:276e4,value:6e4,unit:"minute"},{max:72e6,value:36e5,unit:"hour"},{max:5184e5,value:864e5,unit:"day"},{max:24192e5,value:6048e5,unit:"week"},{max:28512e6,value:2592e6,unit:"month"},{max:1/0,value:31536e6,unit:"year"}],k=class extends m{constructor(){super(...arguments),this.localize=new st(this),this.isoTime="",this.relativeTime="",this.date=new Date,this.format="long",this.numeric="auto",this.sync=!1}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.updateTimeout)}render(){const t=new Date,e=new Date(this.date);if(isNaN(e.getMilliseconds()))return this.relativeTime="",this.isoTime="","";const o=e.getTime()-t.getTime(),{unit:r,value:s}=Ve.find(i=>Math.abs(o)<i.max);if(this.isoTime=e.toISOString(),this.relativeTime=this.localize.relativeTime(Math.round(o/s),r,{numeric:this.numeric,style:this.format}),clearTimeout(this.updateTimeout),this.sync){let i;r==="minute"?i=D("second"):r==="hour"?i=D("minute"):r==="day"?i=D("hour"):i=D("day"),this.updateTimeout=window.setTimeout(()=>this.requestUpdate(),i)}return d` <time datetime=${this.isoTime} title=${this.relativeTime}>${this.relativeTime}</time> `}};n([S()],k.prototype,"isoTime",2);n([S()],k.prototype,"relativeTime",2);n([l()],k.prototype,"date",2);n([l()],k.prototype,"format",2);n([l()],k.prototype,"numeric",2);n([l({type:Boolean})],k.prototype,"sync",2);function D(t){const o={second:1e3,minute:6e4,hour:36e5,day:864e5}[t];return o-Date.now()%o}k.define("sl-relative-time");var Ie=Object.defineProperty,Ne=Object.getOwnPropertyDescriptor,at=(t,e,o,r)=>{for(var s=r>1?void 0:r?Ne(e,o):e,i=t.length-1,a;i>=0;i--)(a=t[i])&&(s=(r?a(e,o,s):a(s))||s);return r&&s&&Ie(e,o,s),s};let C=class extends Zt(wt){renderNotificationGroup(t,e,o,r){const s=o.notifications.length===1;return d`<div
				class="row"
				style=${gt({"background-color":t?"var(--sl-color-neutral-100)":"var(--sl-color-neutral-0)",padding:"8px",cursor:"pointer",gap:"8px","align-items":"center"})}
				@click=${()=>{const i=o.notifications[o.notifications.length-1];this.notificationsStore.notificationsConfig.types[i.record.entry.notification_type].onClick(o.group)}}
			>
				${s?d`<sl-icon
							style="font-size: 1.3rem; padding: 0 8px;"
							src="${o.notifications[0].contents.iconSrc}"
						></sl-icon>`:d``}
				<div
					class="column"
					style=${gt({flex:"1",gap:s?"0":"8px"})}
				>
					${o.notifications.map(i=>d`
							<div class="row" style="gap: 8px; align-items: center">
								${s?d``:d`<sl-icon src="${i.contents.iconSrc}"></sl-icon>`}
								<span>${i.contents.body}</span>
							</div>
						`)}
					<span class="placeholder">${o.title}</span>
				</div>

				<div
					class="column"
					style="align-items: end; flex: 1; align-self: stretch"
				>
					<div style="flex: 1;">
						${e?d``:d`
									<sl-icon-button
										.src=${H(Rt)}
										id="dismiss-single-notification"
										@click=${i=>{this.notificationsStore.client.dismissNotifications(o.notifications.map(a=>a.record.actionHash)),i.stopPropagation()}}
									></sl-icon-button>
								`}
					</div>
					<sl-relative-time
						style="color: grey; text-align: right"
						.date=${new Date(o.timestamp)}
					></sl-relative-time>
				</div>
			</div>

			${r?d``:d`<sl-divider style="--spacing: 0"></sl-divider>`} `}notificationInfo(t){const e=this.notificationsStore.notifications.get(t).entry.get(),o=this.notificationsStore.notifications.get(t).deletes.get();if(e.status!=="completed")return e;if(o.status!=="completed")return o;const r=this.notificationsStore.notificationsConfig.types[e.value.entry.notification_type].contents(e.value).get(),s=this.notificationsStore.notificationsConfig.types[e.value.entry.notification_type].title(e.value.entry.notification_group).get();return r.status!=="completed"?r:s.status!=="completed"?s:{status:"completed",value:{record:e.value,deletes:o.value,title:s.value,contents:r.value}}}getNotificationsGroups(){const t=this.notificationsStore.unreadNotifications.get(),e=this.notificationsStore.readNotifications.get();if(t.status!=="completed")return t;if(e.status!=="completed")return e;const o=ct(ut(t.value,(c,u)=>this.notificationInfo(u))),r=ct(ut(e.value,(c,u)=>this.notificationInfo(u)));if(o.status!=="completed")return o;if(r.status!=="completed")return r;const s={};for(const[c,u]of Array.from(o.value.entries()))s[u.record.entry.notification_type]||(s[u.record.entry.notification_type]={}),s[u.record.entry.notification_type][u.record.entry.notification_group]||(s[u.record.entry.notification_type][u.record.entry.notification_group]=[]),s[u.record.entry.notification_type][u.record.entry.notification_group].push({read:!1,notificationInfo:u});for(const[c,u]of Array.from(r.value.entries()))s[u.record.entry.notification_type]||(s[u.record.entry.notification_type]={}),s[u.record.entry.notification_type][u.record.entry.notification_group]||(s[u.record.entry.notification_type][u.record.entry.notification_group]=[]),s[u.record.entry.notification_type][u.record.entry.notification_group].push({read:!0,notificationInfo:u});const i=[],a=[],b=[],f=[];for(const[c,u]of Object.entries(s))for(const[_,z]of Object.entries(u)){const I=z.some(y=>y.notificationInfo.record.entry.persistent&&y.notificationInfo.deletes.length===0),N=z.some(y=>!y.read),lt=z.map(y=>y.notificationInfo.record.action.timestamp);lt.sort((y,Ot)=>Ot-y);const B={group:_,notifications:z.map(y=>y.notificationInfo),title:z[0].notificationInfo.title,timestamp:lt[0]};I&&N&&i.push(B),I&&!N&&a.push(B),!I&&N&&b.push(B),!I&&!N&&f.push(B)}return i.sort((c,u)=>u.timestamp-c.timestamp),b.sort((c,u)=>u.timestamp-c.timestamp),a.sort((c,u)=>u.timestamp-c.timestamp),f.sort((c,u)=>u.timestamp-c.timestamp),{status:"completed",value:{unreadPersistent:i,readPersistent:a,unreadNonPersistent:b,readNonPersistent:f}}}notificationCount(){const t=Ft([this.notificationsStore.unreadNotifications.get(),this.notificationsStore.readNotifications.get()]);return t.status!=="completed"?3:t.value[0].size+t.value[1].size}render(){const t=this.getNotificationsGroups(),e=this.notificationCount();switch(t.status){case"pending":return d`<div
					style="display: flex; flex-direction: column; justify-content: center; flex: 1; margin: 16px "
				>
					${Array.from({length:e}).map((f,c)=>d`
							<div class="row" style="gap: 12px">
								<sl-skeleton
									effect="pulse"
									style="height: 16px; width: 16px;"
								></sl-skeleton>
								<sl-skeleton
									effect="pulse"
									style="height: 16px; min-width: 250px;"
								></sl-skeleton>
							</div>
							${c<e-1?d`<sl-divider></sl-divider>`:d``}
						`)}
				</div>`;case"error":return d`<display-error
					.headline=${Y("Error fetching the notifications")}
					.error=${t.error}
				></display-error>`;case"completed":const{unreadPersistent:o,readPersistent:r,unreadNonPersistent:s,readNonPersistent:i}=t.value,a=s.length+i.length,b=o.length+r.length;return a>0||b>0?d`
							<div class="column" style="flex: 1">
								<div class="column">
									${o.map((f,c)=>this.renderNotificationGroup(!1,!0,f,c===o.length-1))}
									${o.length>0&&r.length>0?d`<sl-divider style="--spacing: 0"></sl-divider>`:d``}
									${r.map((f,c)=>this.renderNotificationGroup(!0,!0,f,c===r.length-1))}
								</div>
								<div class="column">
									${a>0?d`
												${b>0?d`
															<sl-divider style="--spacing: 0"></sl-divider>
														`:d``}
												<div class="row" style="justify-content: end">
													<sl-button
														variant="text"
														@click=${()=>this.notificationsStore.client.dismissNotifications([...Array.from([]).concat(...s.map(f=>f.notifications.map(c=>c.record.actionHash))),...Array.from([]).concat(...i.map(f=>f.notifications.map(c=>c.record.actionHash)))])}
														size="small"
													>
														<sl-icon
															slot="prefix"
															.src=${H(jt)}
														></sl-icon>
														${Y("Dismiss")}</sl-button
													>
												</div>

												<sl-divider style="--spacing: 0"></sl-divider>
												<div class="column">
													${s.map((f,c)=>this.renderNotificationGroup(!1,!1,f,c===s.length-1))}
													${s.length>0&&i.length>0?d`<sl-divider
																style="--spacing: 0"
															></sl-divider>`:d``}
													${i.map((f,c)=>this.renderNotificationGroup(!0,!1,f,c===i.length-1))}
												</div>
											`:d``}
								</div>
							</div>
						`:d`
							<div class="column center-content" style="padding: 20px; flex: 1">
								<sl-icon
									.src=${H(Ut)}
									style="color: grey; height: 64px; width: 48px;"
								></sl-icon>
								<span class="placeholder"
									>${Y("You don't have any notifications")}</span
								>
							</div>
						`}}};C.styles=[Xt,w`
			sl-icon-button::part(base) {
				padding: 0 !important;
			}
		`];at([xt({context:Gt,subscribe:!0})],C.prototype,"notificationsStore",2);at([xt({context:me,subscribe:!0})],C.prototype,"profilesStore",2);C=at([Wt("my-notifications-list")],C);const Re=Object.freeze(Object.defineProperty({__proto__:null,get MyNotifications(){return C}},Symbol.toStringTag,{value:"Module"}));export{Ce as H,st as L,et as R,m as S,n as _,zt as a,V as b,E as c,g as d,kt as e,xt as f,gt as g,Bt as h,Re as i,Y as m,me as p,S as r,Xt as s,p as t,U as w};
