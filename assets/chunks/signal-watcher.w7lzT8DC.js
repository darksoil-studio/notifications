var r=Object.defineProperty;var d=(t,e,a)=>e in t?r(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var c=(t,e,a)=>d(t,typeof e!="symbol"?e+"":e,a);import{S as i}from"./notifications-client.XQwwljFU.js";/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function l(t){class e extends t{constructor(){super(...arguments);c(this,"__dispose");c(this,"w",new i.subtle.Watcher(()=>{this.requestUpdate()}))}performUpdate(){if(this.isUpdatePending===!1)return;const s=this.__dispose,n=new i.Computed(()=>{super.performUpdate()});this.w.watch(n),this.__dispose=()=>{this.w.unwatch(n)},n.get(),s==null||s()}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){var s;super.disconnectedCallback(),(s=this.__dispose)==null||s.call(this)}}return e}export{l as S};
