var r=Object.defineProperty;var d=(t,e,s)=>e in t?r(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var n=(t,e,s)=>(d(t,typeof e!="symbol"?e+"":e,s),s);import{B as i}from"./notifications-client.dX80mX3r.js";/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function l(t){class e extends t{constructor(){super(...arguments);n(this,"__dispose");n(this,"w",new i.subtle.Watcher(()=>{this.requestUpdate()}))}performUpdate(){if(this.isUpdatePending===!1)return;const a=this.__dispose,c=new i.Computed(()=>{super.performUpdate()});this.w.watch(c),this.__dispose=()=>{this.w.unwatch(c)},c.get(),a==null||a()}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){var a;super.disconnectedCallback(),(a=this.__dispose)==null||a.call(this)}}return e}export{l as S};
