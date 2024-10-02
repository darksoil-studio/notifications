import{s as d}from"./property.cpXOlI5j.js";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class p{get value(){return this.o}set value(t){this.setValue(t)}setValue(t,e=!1){const i=e||!Object.is(t,this.o);this.o=t,i&&this.updateObservers()}constructor(t){this.subscriptions=new Map,this.updateObservers=()=>{for(const[e,{disposer:i}]of this.subscriptions)e(this.o,i)},t!==void 0&&(this.value=t)}addCallback(t,e,i){if(!i)return void t(this.value);this.subscriptions.has(t)||this.subscriptions.set(t,{disposer:()=>{this.subscriptions.delete(t)},consumerHost:e});const{disposer:o}=this.subscriptions.get(t);t(this.value,o)}clearCallbacks(){this.subscriptions.clear()}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let b=class extends Event{constructor(t){super("context-provider",{bubbles:!0,composed:!0}),this.context=t}};class u extends p{constructor(t,e,i){var o,n;super(e.context!==void 0?e.initialValue:i),this.onContextRequest=s=>{const r=s.composedPath()[0];s.context===this.context&&r!==this.host&&(s.stopPropagation(),this.addCallback(s.callback,r,s.subscribe))},this.onProviderRequest=s=>{const r=s.composedPath()[0];if(s.context!==this.context||r===this.host)return;const a=new Set;for(const[h,{consumerHost:l}]of this.subscriptions)a.has(h)||(a.add(h),l.dispatchEvent(new d(this.context,h,!0)));s.stopPropagation()},this.host=t,e.context!==void 0?this.context=e.context:this.context=e,this.attachListeners(),(n=(o=this.host).addController)==null||n.call(o,this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new b(this.context))}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function f({context:c}){return(t,e)=>{const i=new WeakMap;if(typeof e=="object")return e.addInitializer(function(){i.set(this,new u(this,{context:c}))}),{get(){return t.get.call(this)},set(o){var n;return(n=i.get(this))==null||n.setValue(o),t.set.call(this,o)},init(o){var n;return(n=i.get(this))==null||n.setValue(o),o}};{t.constructor.addInitializer(s=>{i.set(s,new u(s,{context:c}))});const o=Object.getOwnPropertyDescriptor(t,e);let n;if(o===void 0){const s=new WeakMap;n={get(){return s.get(this)},set(r){i.get(this).setValue(r),s.set(this,r)},configurable:!0,enumerable:!0}}else{const s=o.set;n={...o,set(r){i.get(this).setValue(r),s==null||s.call(this,r)}}}return void Object.defineProperty(t,e,n)}}}export{f as e};
