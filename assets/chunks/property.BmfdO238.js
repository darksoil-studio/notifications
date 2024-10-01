import{u as l,o as u}from"./notifications-client._qanSsIB.js";/**
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
 */const g=t=>(s,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(t,s)}):customElements.define(t,s)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const d={attribute:!0,type:String,converter:l,reflect:!1,hasChanged:u},p=(t=d,s,e)=>{const{kind:r,metadata:i}=e;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),o.set(e.name,t),r==="accessor"){const{name:n}=e;return{set(a){const c=s.get.call(this);s.set.call(this,a),this.requestUpdate(n,c,t)},init(a){return a!==void 0&&this.P(n,void 0,t),a}}}if(r==="setter"){const{name:n}=e;return function(a){const c=this[n];s.call(this,a),this.requestUpdate(n,c,t)}}throw Error("Unsupported decorator location: "+r)};function v(t){return(s,e)=>typeof e=="object"?p(t,s,e):((r,i,o)=>{const n=i.hasOwnProperty(o);return i.constructor.createProperty(o,n?{...r,wrapped:!0}:r),n?Object.getOwnPropertyDescriptor(i,o):void 0})(t,s,e)}export{m as a,v as n,b as s,g as t};
