import{u as l,v as u}from"./notifications-client.yU5uhUDs.js";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let b=class extends Event{constructor(s,e,r){super("context-request",{bubbles:!0,composed:!0}),this.context=s,this.callback=e,this.subscribe=r??!1}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function m(t){return t}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const v=t=>(s,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(t,s)}):customElements.define(t,s)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const d={attribute:!0,type:String,converter:l,reflect:!1,hasChanged:u},p=(t=d,s,e)=>{const{kind:r,metadata:a}=e;let o=globalThis.litPropertyMetadata.get(a);if(o===void 0&&globalThis.litPropertyMetadata.set(a,o=new Map),o.set(e.name,t),r==="accessor"){const{name:n}=e;return{set(i){const c=s.get.call(this);s.set.call(this,i),this.requestUpdate(n,c,t)},init(i){return i!==void 0&&this.P(n,void 0,t),i}}}if(r==="setter"){const{name:n}=e;return function(i){const c=this[n];s.call(this,i),this.requestUpdate(n,c,t)}}throw Error("Unsupported decorator location: "+r)};function g(t){return(s,e)=>typeof e=="object"?p(t,s,e):((r,a,o)=>{const n=a.hasOwnProperty(o);return a.constructor.createProperty(o,n?{...r,wrapped:!0}:r),n?Object.getOwnPropertyDescriptor(a,o):void 0})(t,s,e)}export{g as a,m as n,b as s,v as t};
