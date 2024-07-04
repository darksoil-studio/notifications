var r=Object.defineProperty;var d=(t,e,a)=>e in t?r(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var n=(t,e,a)=>d(t,typeof e!="symbol"?e+"":e,a);import{B as i}from"./notifications-client.DTvnyhJf.js";/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function l(t){class e extends t{constructor(){super(...arguments);n(this,"__dispose");n(this,"w",new i.subtle.Watcher(()=>{this.requestUpdate()}))}performUpdate(){if(this.isUpdatePending===!1)return;const s=this.__dispose,c=new i.Computed(()=>{super.performUpdate()});this.w.watch(c),this.__dispose=()=>{this.w.unwatch(c)},c.get(),s==null||s()}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){var s;super.disconnectedCallback(),(s=this.__dispose)==null||s.call(this)}}return e}export{l as S};
