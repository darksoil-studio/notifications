import{c as at,_ as u,e as j,S as lt,a as se,b as ae,d as Q,w as gt,L as le,s as Ht,f as ce,m as Pe,r as de,g as Ft,h as Te,i as pe,o as Gt,H as Oe,j as Le,k as Re,l as De}from"./my-notifications-list.mJuEgxYN.js";import{g as Be,i as V,x,f as Ot,h as Me,k as Ne}from"./notifications-client.BUika-ET.js";import{n as f,t as Lt}from"./property.BM0hLk1L.js";import{_ as ct}from"./tslib.es6.kHcLnhpD.js";import{S as he}from"./signal-watcher.BAw_Erig.js";import{p as We}from"./context.DlKLWoS2.js";import{n as He}from"./context.bt9QXqlo.js";function ue(t){return{attribute:t,type:Object,hasChanged:(e,o)=>(e==null?void 0:e.toString())!==(o==null?void 0:o.toString()),converter:e=>e&&e.length>0&&Be(e)}}var Fe=V`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,Ie=V`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;const W=Math.min,O=Math.max,_t=Math.round,wt=Math.floor,Z=t=>({x:t,y:t}),je={left:"right",right:"left",bottom:"top",top:"bottom"},Ke={start:"end",end:"start"};function Nt(t,e,o){return O(t,W(e,o))}function dt(t,e){return typeof t=="function"?t(e):t}function tt(t){return t.split("-")[0]}function pt(t){return t.split("-")[1]}function fe(t){return t==="x"?"y":"x"}function It(t){return t==="y"?"height":"width"}function mt(t){return["top","bottom"].includes(tt(t))?"y":"x"}function jt(t){return fe(mt(t))}function Ue(t,e,o){o===void 0&&(o=!1);const i=pt(t),r=jt(t),n=It(r);let s=r==="x"?i===(o?"end":"start")?"right":"left":i==="start"?"bottom":"top";return e.reference[n]>e.floating[n]&&(s=Et(s)),[s,Et(s)]}function Ve(t){const e=Et(t);return[Wt(t),e,Wt(e)]}function Wt(t){return t.replace(/start|end/g,e=>Ke[e])}function qe(t,e,o){const i=["left","right"],r=["right","left"],n=["top","bottom"],s=["bottom","top"];switch(t){case"top":case"bottom":return o?e?r:i:e?i:r;case"left":case"right":return e?n:s;default:return[]}}function Ye(t,e,o,i){const r=pt(t);let n=qe(tt(t),o==="start",i);return r&&(n=n.map(s=>s+"-"+r),e&&(n=n.concat(n.map(Wt)))),n}function Et(t){return t.replace(/left|right|bottom|top/g,e=>je[e])}function Xe(t){return{top:0,right:0,bottom:0,left:0,...t}}function ge(t){return typeof t!="number"?Xe(t):{top:t,right:t,bottom:t,left:t}}function kt(t){const{x:e,y:o,width:i,height:r}=t;return{width:i,height:r,top:o,left:e,right:e+i,bottom:o+r,x:e,y:o}}function Jt(t,e,o){let{reference:i,floating:r}=t;const n=mt(e),s=jt(e),l=It(s),a=tt(e),c=n==="y",p=i.x+i.width/2-r.width/2,h=i.y+i.height/2-r.height/2,m=i[l]/2-r[l]/2;let d;switch(a){case"top":d={x:p,y:i.y-r.height};break;case"bottom":d={x:p,y:i.y+i.height};break;case"right":d={x:i.x+i.width,y:h};break;case"left":d={x:i.x-r.width,y:h};break;default:d={x:i.x,y:i.y}}switch(pt(e)){case"start":d[s]-=m*(o&&c?-1:1);break;case"end":d[s]+=m*(o&&c?-1:1);break}return d}const Ge=async(t,e,o)=>{const{placement:i="bottom",strategy:r="absolute",middleware:n=[],platform:s}=o,l=n.filter(Boolean),a=await(s.isRTL==null?void 0:s.isRTL(e));let c=await s.getElementRects({reference:t,floating:e,strategy:r}),{x:p,y:h}=Jt(c,i,a),m=i,d={},g=0;for(let y=0;y<l.length;y++){const{name:v,fn:b}=l[y],{x:w,y:C,data:k,reset:E}=await b({x:p,y:h,initialPlacement:i,placement:m,strategy:r,middlewareData:d,rects:c,platform:s,elements:{reference:t,floating:e}});p=w??p,h=C??h,d={...d,[v]:{...d[v],...k}},E&&g<=50&&(g++,typeof E=="object"&&(E.placement&&(m=E.placement),E.rects&&(c=E.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:r}):E.rects),{x:p,y:h}=Jt(c,m,a)),y=-1)}return{x:p,y:h,placement:m,strategy:r,middlewareData:d}};async function Kt(t,e){var o;e===void 0&&(e={});const{x:i,y:r,platform:n,rects:s,elements:l,strategy:a}=t,{boundary:c="clippingAncestors",rootBoundary:p="viewport",elementContext:h="floating",altBoundary:m=!1,padding:d=0}=dt(e,t),g=ge(d),v=l[m?h==="floating"?"reference":"floating":h],b=kt(await n.getClippingRect({element:(o=await(n.isElement==null?void 0:n.isElement(v)))==null||o?v:v.contextElement||await(n.getDocumentElement==null?void 0:n.getDocumentElement(l.floating)),boundary:c,rootBoundary:p,strategy:a})),w=h==="floating"?{x:i,y:r,width:s.floating.width,height:s.floating.height}:s.reference,C=await(n.getOffsetParent==null?void 0:n.getOffsetParent(l.floating)),k=await(n.isElement==null?void 0:n.isElement(C))?await(n.getScale==null?void 0:n.getScale(C))||{x:1,y:1}:{x:1,y:1},E=kt(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:w,offsetParent:C,strategy:a}):w);return{top:(b.top-E.top+g.top)/k.y,bottom:(E.bottom-b.bottom+g.bottom)/k.y,left:(b.left-E.left+g.left)/k.x,right:(E.right-b.right+g.right)/k.x}}const Je=t=>({name:"arrow",options:t,async fn(e){const{x:o,y:i,placement:r,rects:n,platform:s,elements:l,middlewareData:a}=e,{element:c,padding:p=0}=dt(t,e)||{};if(c==null)return{};const h=ge(p),m={x:o,y:i},d=jt(r),g=It(d),y=await s.getDimensions(c),v=d==="y",b=v?"top":"left",w=v?"bottom":"right",C=v?"clientHeight":"clientWidth",k=n.reference[g]+n.reference[d]-m[d]-n.floating[g],E=m[d]-n.reference[d],z=await(s.getOffsetParent==null?void 0:s.getOffsetParent(c));let P=z?z[C]:0;(!P||!await(s.isElement==null?void 0:s.isElement(z)))&&(P=l.floating[C]||n.floating[g]);const B=k/2-E/2,X=P/2-y[g]/2-1,G=W(h[b],X),J=W(h[w],X),R=G,ut=P-y[g]-J,T=P/2-y[g]/2+B,M=Nt(R,T,ut),N=!a.arrow&&pt(r)!=null&&T!==M&&n.reference[g]/2-(T<R?G:J)-y[g]/2<0,U=N?T<R?T-R:T-ut:0;return{[d]:m[d]+U,data:{[d]:M,centerOffset:T-M-U,...N&&{alignmentOffset:U}},reset:N}}}),Qe=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o,i;const{placement:r,middlewareData:n,rects:s,initialPlacement:l,platform:a,elements:c}=e,{mainAxis:p=!0,crossAxis:h=!0,fallbackPlacements:m,fallbackStrategy:d="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:y=!0,...v}=dt(t,e);if((o=n.arrow)!=null&&o.alignmentOffset)return{};const b=tt(r),w=tt(l)===l,C=await(a.isRTL==null?void 0:a.isRTL(c.floating)),k=m||(w||!y?[Et(l)]:Ve(l));!m&&g!=="none"&&k.push(...Ye(l,y,g,C));const E=[l,...k],z=await Kt(e,v),P=[];let B=((i=n.flip)==null?void 0:i.overflows)||[];if(p&&P.push(z[b]),h){const R=Ue(r,s,C);P.push(z[R[0]],z[R[1]])}if(B=[...B,{placement:r,overflows:P}],!P.every(R=>R<=0)){var X,G;const R=(((X=n.flip)==null?void 0:X.index)||0)+1,ut=E[R];if(ut)return{data:{index:R,overflows:B},reset:{placement:ut}};let T=(G=B.filter(M=>M.overflows[0]<=0).sort((M,N)=>M.overflows[1]-N.overflows[1])[0])==null?void 0:G.placement;if(!T)switch(d){case"bestFit":{var J;const M=(J=B.map(N=>[N.placement,N.overflows.filter(U=>U>0).reduce((U,Ae)=>U+Ae,0)]).sort((N,U)=>N[1]-U[1])[0])==null?void 0:J[0];M&&(T=M);break}case"initialPlacement":T=l;break}if(r!==T)return{reset:{placement:T}}}return{}}}};async function Ze(t,e){const{placement:o,platform:i,elements:r}=t,n=await(i.isRTL==null?void 0:i.isRTL(r.floating)),s=tt(o),l=pt(o),a=mt(o)==="y",c=["left","top"].includes(s)?-1:1,p=n&&a?-1:1,h=dt(e,t);let{mainAxis:m,crossAxis:d,alignmentAxis:g}=typeof h=="number"?{mainAxis:h,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...h};return l&&typeof g=="number"&&(d=l==="end"?g*-1:g),a?{x:d*p,y:m*c}:{x:m*c,y:d*p}}const to=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var o,i;const{x:r,y:n,placement:s,middlewareData:l}=e,a=await Ze(e,t);return s===((o=l.offset)==null?void 0:o.placement)&&(i=l.arrow)!=null&&i.alignmentOffset?{}:{x:r+a.x,y:n+a.y,data:{...a,placement:s}}}}},eo=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:i,placement:r}=e,{mainAxis:n=!0,crossAxis:s=!1,limiter:l={fn:v=>{let{x:b,y:w}=v;return{x:b,y:w}}},...a}=dt(t,e),c={x:o,y:i},p=await Kt(e,a),h=mt(tt(r)),m=fe(h);let d=c[m],g=c[h];if(n){const v=m==="y"?"top":"left",b=m==="y"?"bottom":"right",w=d+p[v],C=d-p[b];d=Nt(w,d,C)}if(s){const v=h==="y"?"top":"left",b=h==="y"?"bottom":"right",w=g+p[v],C=g-p[b];g=Nt(w,g,C)}const y=l.fn({...e,[m]:d,[h]:g});return{...y,data:{x:y.x-o,y:y.y-i}}}}},oo=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){const{placement:o,rects:i,platform:r,elements:n}=e,{apply:s=()=>{},...l}=dt(t,e),a=await Kt(e,l),c=tt(o),p=pt(o),h=mt(o)==="y",{width:m,height:d}=i.floating;let g,y;c==="top"||c==="bottom"?(g=c,y=p===(await(r.isRTL==null?void 0:r.isRTL(n.floating))?"start":"end")?"left":"right"):(y=c,g=p==="end"?"top":"bottom");const v=d-a.top-a.bottom,b=m-a.left-a.right,w=W(d-a[g],v),C=W(m-a[y],b),k=!e.middlewareData.shift;let E=w,z=C;if(h?z=p||k?W(C,b):b:E=p||k?W(w,v):v,k&&!p){const B=O(a.left,0),X=O(a.right,0),G=O(a.top,0),J=O(a.bottom,0);h?z=m-2*(B!==0||X!==0?B+X:O(a.left,a.right)):E=d-2*(G!==0||J!==0?G+J:O(a.top,a.bottom))}await s({...e,availableWidth:z,availableHeight:E});const P=await r.getDimensions(n.floating);return m!==P.width||d!==P.height?{reset:{rects:!0}}:{}}}};function ht(t){return me(t)?(t.nodeName||"").toLowerCase():"#document"}function L(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function q(t){var e;return(e=(me(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function me(t){return t instanceof Node||t instanceof L(t).Node}function H(t){return t instanceof Element||t instanceof L(t).Element}function F(t){return t instanceof HTMLElement||t instanceof L(t).HTMLElement}function Qt(t){return typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof L(t).ShadowRoot}function yt(t){const{overflow:e,overflowX:o,overflowY:i,display:r}=D(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+o)&&!["inline","contents"].includes(r)}function io(t){return["table","td","th"].includes(ht(t))}function Ut(t){const e=Vt(),o=D(t);return o.transform!=="none"||o.perspective!=="none"||(o.containerType?o.containerType!=="normal":!1)||!e&&(o.backdropFilter?o.backdropFilter!=="none":!1)||!e&&(o.filter?o.filter!=="none":!1)||["transform","perspective","filter"].some(i=>(o.willChange||"").includes(i))||["paint","layout","strict","content"].some(i=>(o.contain||"").includes(i))}function ro(t){let e=et(t);for(;F(e)&&!st(e);){if(Ut(e))return e;e=et(e)}return null}function Vt(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function st(t){return["html","body","#document"].includes(ht(t))}function D(t){return L(t).getComputedStyle(t)}function Rt(t){return H(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function et(t){if(ht(t)==="html")return t;const e=t.assignedSlot||t.parentNode||Qt(t)&&t.host||q(t);return Qt(e)?e.host:e}function ye(t){const e=et(t);return st(e)?t.ownerDocument?t.ownerDocument.body:t.body:F(e)&&yt(e)?e:ye(e)}function ft(t,e,o){var i;e===void 0&&(e=[]),o===void 0&&(o=!0);const r=ye(t),n=r===((i=t.ownerDocument)==null?void 0:i.body),s=L(r);return n?e.concat(s,s.visualViewport||[],yt(r)?r:[],s.frameElement&&o?ft(s.frameElement):[]):e.concat(r,ft(r,[],o))}function be(t){const e=D(t);let o=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const r=F(t),n=r?t.offsetWidth:o,s=r?t.offsetHeight:i,l=_t(o)!==n||_t(i)!==s;return l&&(o=n,i=s),{width:o,height:i,$:l}}function qt(t){return H(t)?t:t.contextElement}function nt(t){const e=qt(t);if(!F(e))return Z(1);const o=e.getBoundingClientRect(),{width:i,height:r,$:n}=be(e);let s=(n?_t(o.width):o.width)/i,l=(n?_t(o.height):o.height)/r;return(!s||!Number.isFinite(s))&&(s=1),(!l||!Number.isFinite(l))&&(l=1),{x:s,y:l}}const no=Z(0);function ve(t){const e=L(t);return!Vt()||!e.visualViewport?no:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function so(t,e,o){return e===void 0&&(e=!1),!o||e&&o!==L(t)?!1:e}function it(t,e,o,i){e===void 0&&(e=!1),o===void 0&&(o=!1);const r=t.getBoundingClientRect(),n=qt(t);let s=Z(1);e&&(i?H(i)&&(s=nt(i)):s=nt(t));const l=so(n,o,i)?ve(n):Z(0);let a=(r.left+l.x)/s.x,c=(r.top+l.y)/s.y,p=r.width/s.x,h=r.height/s.y;if(n){const m=L(n),d=i&&H(i)?L(i):i;let g=m,y=g.frameElement;for(;y&&i&&d!==g;){const v=nt(y),b=y.getBoundingClientRect(),w=D(y),C=b.left+(y.clientLeft+parseFloat(w.paddingLeft))*v.x,k=b.top+(y.clientTop+parseFloat(w.paddingTop))*v.y;a*=v.x,c*=v.y,p*=v.x,h*=v.y,a+=C,c+=k,g=L(y),y=g.frameElement}}return kt({width:p,height:h,x:a,y:c})}const ao=[":popover-open",":modal"];function Yt(t){return ao.some(e=>{try{return t.matches(e)}catch{return!1}})}function lo(t){let{elements:e,rect:o,offsetParent:i,strategy:r}=t;const n=r==="fixed",s=q(i),l=e?Yt(e.floating):!1;if(i===s||l&&n)return o;let a={scrollLeft:0,scrollTop:0},c=Z(1);const p=Z(0),h=F(i);if((h||!h&&!n)&&((ht(i)!=="body"||yt(s))&&(a=Rt(i)),F(i))){const m=it(i);c=nt(i),p.x=m.x+i.clientLeft,p.y=m.y+i.clientTop}return{width:o.width*c.x,height:o.height*c.y,x:o.x*c.x-a.scrollLeft*c.x+p.x,y:o.y*c.y-a.scrollTop*c.y+p.y}}function co(t){return Array.from(t.getClientRects())}function we(t){return it(q(t)).left+Rt(t).scrollLeft}function po(t){const e=q(t),o=Rt(t),i=t.ownerDocument.body,r=O(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),n=O(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let s=-o.scrollLeft+we(t);const l=-o.scrollTop;return D(i).direction==="rtl"&&(s+=O(e.clientWidth,i.clientWidth)-r),{width:r,height:n,x:s,y:l}}function ho(t,e){const o=L(t),i=q(t),r=o.visualViewport;let n=i.clientWidth,s=i.clientHeight,l=0,a=0;if(r){n=r.width,s=r.height;const c=Vt();(!c||c&&e==="fixed")&&(l=r.offsetLeft,a=r.offsetTop)}return{width:n,height:s,x:l,y:a}}function uo(t,e){const o=it(t,!0,e==="fixed"),i=o.top+t.clientTop,r=o.left+t.clientLeft,n=F(t)?nt(t):Z(1),s=t.clientWidth*n.x,l=t.clientHeight*n.y,a=r*n.x,c=i*n.y;return{width:s,height:l,x:a,y:c}}function Zt(t,e,o){let i;if(e==="viewport")i=ho(t,o);else if(e==="document")i=po(q(t));else if(H(e))i=uo(e,o);else{const r=ve(t);i={...e,x:e.x-r.x,y:e.y-r.y}}return kt(i)}function xe(t,e){const o=et(t);return o===e||!H(o)||st(o)?!1:D(o).position==="fixed"||xe(o,e)}function fo(t,e){const o=e.get(t);if(o)return o;let i=ft(t,[],!1).filter(l=>H(l)&&ht(l)!=="body"),r=null;const n=D(t).position==="fixed";let s=n?et(t):t;for(;H(s)&&!st(s);){const l=D(s),a=Ut(s);!a&&l.position==="fixed"&&(r=null),(n?!a&&!r:!a&&l.position==="static"&&!!r&&["absolute","fixed"].includes(r.position)||yt(s)&&!a&&xe(t,s))?i=i.filter(p=>p!==s):r=l,s=et(s)}return e.set(t,i),i}function go(t){let{element:e,boundary:o,rootBoundary:i,strategy:r}=t;const s=[...o==="clippingAncestors"?Yt(e)?[]:fo(e,this._c):[].concat(o),i],l=s[0],a=s.reduce((c,p)=>{const h=Zt(e,p,r);return c.top=O(h.top,c.top),c.right=W(h.right,c.right),c.bottom=W(h.bottom,c.bottom),c.left=O(h.left,c.left),c},Zt(e,l,r));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}}function mo(t){const{width:e,height:o}=be(t);return{width:e,height:o}}function yo(t,e,o){const i=F(e),r=q(e),n=o==="fixed",s=it(t,!0,n,e);let l={scrollLeft:0,scrollTop:0};const a=Z(0);if(i||!i&&!n)if((ht(e)!=="body"||yt(r))&&(l=Rt(e)),i){const h=it(e,!0,n,e);a.x=h.x+e.clientLeft,a.y=h.y+e.clientTop}else r&&(a.x=we(r));const c=s.left+l.scrollLeft-a.x,p=s.top+l.scrollTop-a.y;return{x:c,y:p,width:s.width,height:s.height}}function Bt(t){return D(t).position==="static"}function te(t,e){return!F(t)||D(t).position==="fixed"?null:e?e(t):t.offsetParent}function Ce(t,e){const o=L(t);if(Yt(t))return o;if(!F(t)){let r=et(t);for(;r&&!st(r);){if(H(r)&&!Bt(r))return r;r=et(r)}return o}let i=te(t,e);for(;i&&io(i)&&Bt(i);)i=te(i,e);return i&&st(i)&&Bt(i)&&!Ut(i)?o:i||ro(t)||o}const bo=async function(t){const e=this.getOffsetParent||Ce,o=this.getDimensions,i=await o(t.floating);return{reference:yo(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}};function vo(t){return D(t).direction==="rtl"}const xt={convertOffsetParentRelativeRectToViewportRelativeRect:lo,getDocumentElement:q,getClippingRect:go,getOffsetParent:Ce,getElementRects:bo,getClientRects:co,getDimensions:mo,getScale:nt,isElement:H,isRTL:vo};function wo(t,e){let o=null,i;const r=q(t);function n(){var l;clearTimeout(i),(l=o)==null||l.disconnect(),o=null}function s(l,a){l===void 0&&(l=!1),a===void 0&&(a=1),n();const{left:c,top:p,width:h,height:m}=t.getBoundingClientRect();if(l||e(),!h||!m)return;const d=wt(p),g=wt(r.clientWidth-(c+h)),y=wt(r.clientHeight-(p+m)),v=wt(c),w={rootMargin:-d+"px "+-g+"px "+-y+"px "+-v+"px",threshold:O(0,W(1,a))||1};let C=!0;function k(E){const z=E[0].intersectionRatio;if(z!==a){if(!C)return s();z?s(!1,z):i=setTimeout(()=>{s(!1,1e-7)},1e3)}C=!1}try{o=new IntersectionObserver(k,{...w,root:r.ownerDocument})}catch{o=new IntersectionObserver(k,w)}o.observe(t)}return s(!0),n}function xo(t,e,o,i){i===void 0&&(i={});const{ancestorScroll:r=!0,ancestorResize:n=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:a=!1}=i,c=qt(t),p=r||n?[...c?ft(c):[],...ft(e)]:[];p.forEach(b=>{r&&b.addEventListener("scroll",o,{passive:!0}),n&&b.addEventListener("resize",o)});const h=c&&l?wo(c,o):null;let m=-1,d=null;s&&(d=new ResizeObserver(b=>{let[w]=b;w&&w.target===c&&d&&(d.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var C;(C=d)==null||C.observe(e)})),o()}),c&&!a&&d.observe(c),d.observe(e));let g,y=a?it(t):null;a&&v();function v(){const b=it(t);y&&(b.x!==y.x||b.y!==y.y||b.width!==y.width||b.height!==y.height)&&o(),y=b,g=requestAnimationFrame(v)}return o(),()=>{var b;p.forEach(w=>{r&&w.removeEventListener("scroll",o),n&&w.removeEventListener("resize",o)}),h==null||h(),(b=d)==null||b.disconnect(),d=null,a&&cancelAnimationFrame(g)}}const Co=to,_o=eo,Eo=Qe,ee=oo,ko=Je,So=(t,e,o)=>{const i=new Map,r={platform:xt,...o},n={...r.platform,_c:i};return Ge(t,e,{...r,platform:n})};function $o(t){return zo(t)}function Mt(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function zo(t){for(let e=t;e;e=Mt(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Mt(t);e;e=Mt(e)){if(!(e instanceof Element))continue;const o=getComputedStyle(e);if(o.display!=="contents"&&(o.position!=="static"||o.filter!=="none"||e.tagName==="BODY"))return e}return null}function Ao(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var _=class extends lt{constructor(){super(...arguments),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom");let i=0,r=0,n=0,s=0,l=0,a=0,c=0,p=0;o?t.top<e.top?(i=t.left,r=t.bottom,n=t.right,s=t.bottom,l=e.left,a=e.top,c=e.right,p=e.top):(i=e.left,r=e.bottom,n=e.right,s=e.bottom,l=t.left,a=t.top,c=t.right,p=t.top):t.left<e.left?(i=t.right,r=t.top,n=e.left,s=e.top,l=t.right,a=t.bottom,c=e.left,p=e.bottom):(i=e.right,r=e.top,n=t.left,s=t.top,l=e.right,a=e.bottom,c=t.left,p=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${i}px`),this.style.setProperty("--hover-bridge-top-left-y",`${r}px`),this.style.setProperty("--hover-bridge-top-right-x",`${n}px`),this.style.setProperty("--hover-bridge-top-right-y",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${p}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||Ao(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&(this.cleanup=xo(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[Co({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(ee({apply:({rects:o})=>{const i=this.sync==="width"||this.sync==="both",r=this.sync==="height"||this.sync==="both";this.popup.style.width=i?`${o.reference.width}px`:"",this.popup.style.height=r?`${o.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(Eo({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(_o({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(ee({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:o,availableHeight:i})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${i}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${o}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(ko({element:this.arrowEl,padding:this.arrowPadding}));const e=this.strategy==="absolute"?o=>xt.getOffsetParent(o,$o):xt.getOffsetParent;So(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:se(ae({},xt),{getOffsetParent:e})}).then(({x:o,y:i,middlewareData:r,placement:n})=>{const s=getComputedStyle(this).direction==="rtl",l={top:"bottom",right:"left",bottom:"top",left:"right"}[n.split("-")[0]];if(this.setAttribute("data-current-placement",n),Object.assign(this.popup.style,{left:`${o}px`,top:`${i}px`}),this.arrow){const a=r.arrow.x,c=r.arrow.y;let p="",h="",m="",d="";if(this.arrowPlacement==="start"){const g=typeof a=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",h=s?g:"",d=s?"":g}else if(this.arrowPlacement==="end"){const g=typeof a=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";h=s?"":g,d=s?g:"",m=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(d=typeof a=="number"?"calc(50% - var(--arrow-size-diagonal))":"",p=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(d=typeof a=="number"?`${a}px`:"",p=typeof c=="number"?`${c}px`:"");Object.assign(this.arrowEl.style,{top:p,right:h,bottom:m,left:d,[l]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return x`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${Q({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${Q({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?x`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};_.styles=[at,Ie];u([j(".popup")],_.prototype,"popup",2);u([j(".popup__arrow")],_.prototype,"arrowEl",2);u([f()],_.prototype,"anchor",2);u([f({type:Boolean,reflect:!0})],_.prototype,"active",2);u([f({reflect:!0})],_.prototype,"placement",2);u([f({reflect:!0})],_.prototype,"strategy",2);u([f({type:Number})],_.prototype,"distance",2);u([f({type:Number})],_.prototype,"skidding",2);u([f({type:Boolean})],_.prototype,"arrow",2);u([f({attribute:"arrow-placement"})],_.prototype,"arrowPlacement",2);u([f({attribute:"arrow-padding",type:Number})],_.prototype,"arrowPadding",2);u([f({type:Boolean})],_.prototype,"flip",2);u([f({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],_.prototype,"flipFallbackPlacements",2);u([f({attribute:"flip-fallback-strategy"})],_.prototype,"flipFallbackStrategy",2);u([f({type:Object})],_.prototype,"flipBoundary",2);u([f({attribute:"flip-padding",type:Number})],_.prototype,"flipPadding",2);u([f({type:Boolean})],_.prototype,"shift",2);u([f({type:Object})],_.prototype,"shiftBoundary",2);u([f({attribute:"shift-padding",type:Number})],_.prototype,"shiftPadding",2);u([f({attribute:"auto-size"})],_.prototype,"autoSize",2);u([f()],_.prototype,"sync",2);u([f({type:Object})],_.prototype,"autoSizeBoundary",2);u([f({attribute:"auto-size-padding",type:Number})],_.prototype,"autoSizePadding",2);u([f({attribute:"hover-bridge",type:Boolean})],_.prototype,"hoverBridge",2);var _e=new Map,Po=new WeakMap;function To(t){return t??{keyframes:[],options:{duration:0}}}function oe(t,e){return e.toLowerCase()==="rtl"?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function Dt(t,e){_e.set(t,To(e))}function St(t,e,o){const i=Po.get(t);if(i!=null&&i[e])return oe(i[e],o.dir);const r=_e.get(e);return r?oe(r,o.dir):{keyframes:[],options:{duration:0}}}function $t(t,e){return new Promise(o=>{function i(r){r.target===t&&(t.removeEventListener(e,i),o())}t.addEventListener(e,i)})}function zt(t,e,o){return new Promise(i=>{if((o==null?void 0:o.duration)===1/0)throw new Error("Promise-based animations must be finite.");const r=t.animate(e,se(ae({},o),{duration:Oo()?0:o.duration}));r.addEventListener("cancel",i,{once:!0}),r.addEventListener("finish",i,{once:!0})})}function ie(t){return t=t.toString().toLowerCase(),t.indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?parseFloat(t)*1e3:parseFloat(t)}function Oo(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function At(t){return Promise.all(t.getAnimations().map(e=>new Promise(o=>{e.cancel(),requestAnimationFrame(o)})))}var S=class extends lt{constructor(){super(),this.localize=new le(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const t=ie(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const t=ie(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;(t=this.closeWatcher)==null||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await At(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:o,options:i}=St(this,"tooltip.show",{dir:this.localize.dir()});await zt(this.popup.popup,o,i),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await At(this.body);const{keyframes:o,options:i}=St(this,"tooltip.hide",{dir:this.localize.dir()});await zt(this.popup.popup,o,i),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,$t(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,$t(this,"sl-after-hide")}render(){return x`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${Q({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};S.styles=[at,Fe];S.dependencies={"sl-popup":_};u([j("slot:not([name])")],S.prototype,"defaultSlot",2);u([j(".tooltip__body")],S.prototype,"body",2);u([j("sl-popup")],S.prototype,"popup",2);u([f()],S.prototype,"content",2);u([f()],S.prototype,"placement",2);u([f({type:Boolean,reflect:!0})],S.prototype,"disabled",2);u([f({type:Number})],S.prototype,"distance",2);u([f({type:Boolean,reflect:!0})],S.prototype,"open",2);u([f({type:Number})],S.prototype,"skidding",2);u([f()],S.prototype,"trigger",2);u([f({type:Boolean})],S.prototype,"hoist",2);u([gt("open",{waitUntilFirstUpdate:!0})],S.prototype,"handleOpenChange",1);u([gt(["content","distance","hoist","placement","skidding"])],S.prototype,"handleOptionsChange",1);u([gt("disabled")],S.prototype,"handleDisabledChange",1);Dt("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}});Dt("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});S.define("sl-tooltip");var bt=function(t,e,o,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,o,i);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n};let rt=class extends Ot{constructor(){super(...arguments),this.tooltip=!1}get _iconSize(){return this.iconSize?this.iconSize:this.tooltip!==!1?"32px":"64px"}renderIcon(){return x`
      <sl-icon
        style="color: red; height: ${this._iconSize}; width: ${this._iconSize}; margin-bottom: 8px;"
        src="${ce(Pe)}"
      ></sl-icon>
    `}renderFull(){return x` <div class="column center-content" style="flex: 1">
      ${this.renderIcon()}
      <div style="width: 500px; text-align: center" class="column">
        ${this.headline?x` <span style="margin-bottom: 8px">${this.headline} </span>`:x``}
        <span class="placeholder"
          >${typeof this.error=="object"&&"message"in this.error?this.error.message:this.error}
        </span>
      </div>
    </div>`}renderTooltip(){return x`
      <sl-tooltip hoist .content=${this.headline?this.headline:this.error}>
        ${this.renderIcon()}</sl-tooltip
      >
    `}render(){return this.tooltip!==!1?this.renderTooltip():this.renderFull()}};rt.styles=[Ht,V`
      :host {
        display: flex;
        flex: 1;
      }
    `];bt([f({attribute:"tooltip"})],rt.prototype,"tooltip",void 0);bt([f()],rt.prototype,"headline",void 0);bt([f()],rt.prototype,"error",void 0);bt([f({attribute:"icon-size"})],rt.prototype,"iconSize",void 0);rt=bt([Lt("display-error")],rt);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const re="lit-localize-status";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Lo{constructor(e){this.__litLocalizeEventHandler=o=>{o.detail.status==="ready"&&this.host.requestUpdate()},this.host=e}hostConnected(){window.addEventListener(re,this.__litLocalizeEventHandler)}hostDisconnected(){window.removeEventListener(re,this.__litLocalizeEventHandler)}}const Ro=t=>t.addController(new Lo(t)),Do=Ro;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xt=()=>(t,e)=>(t.addInitializer(Do),t);let Pt=[0],Ct=0;function Bo(t){t[0]===132&&t[1]===32&&t[2]===36?Pt=t.slice(3):Pt=t||[],Ct=0}function A(){return(()=>{const e=Pt[Ct];return Ct=(Ct+1)%Pt.length,e})()/256}function Ee(t){const e=Math.floor(A()*360),o=A()*60+40,i=t||(A()*100+(A()+A()+A()+A())*25)/2;return{h:e,s:o,l:i}}function ke({h:t,s:e,l:o}){return`hsl(${t}, ${e}%, ${o}%)`}function Mo(t,e,o){const i=A()*2*Math.PI,r=e*Math.cos(i),n=e*Math.sin(i),s=o.x+r,l=o.x+n,a=i+2*Math.PI*.3,c=e*Math.cos(a),p=e*Math.sin(a),h=o.x+c,m=o.x+p,d=a+2*Math.PI*.3,g=e*Math.cos(d),y=e*Math.sin(d),v=o.x+g,b=o.x+y;t.beginPath(),t.moveTo(s,l),t.lineTo(h,m),t.lineTo(v,b),t.fill()}function No(t){const e=t.hash||[0];return Bo(e),{backgroundColor:t.backgroundColor||ke(Ee()),hash:e,size:t.size||32}}function Wo(t,e){if(t.hash&&!(t.hash instanceof Uint8Array))throw new Error("invalid type for opts.hash, expecting Uint8Array or null");t=No(t||{});const{size:o,backgroundColor:i}=t;e.width=e.height=o;const r=e.getContext("2d");if(!r)return;r.fillStyle=i,r.fillRect(0,0,e.width,e.height);const n=A()<.5?3:4,s=Array.apply(null,Array(n)).map((l,a)=>{const c=a===0?5+A()*25:a===1?70+A()*25:null;return{x:A()*o,y:A()*o,radius:5+A()*o*.25,type:Math.floor(A()*3),color:ke(Ee(c))}}).sort((l,a)=>l.radius>a.radius?-1:1);for(let l=0;l<n;l++){const a=s[l],{x:c,y:p,radius:h,type:m,color:d}=a;switch(r.fillStyle=d,m){case 0:r.beginPath(),r.arc(c,p,h,0,2*Math.PI),r.fill();break;case 1:r.fillRect(c,p,h*2,h*2);break;case 2:Mo(r,h*2,{x:c,y:p});break;default:throw new Error("shape is greater than 2, this should never happen")}}return e}var Y=function(t,e,o,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,o,i);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n};let I=class extends Ot{constructor(){super(...arguments),this.size=32,this.shape="circle",this.disableTooltip=!1,this.disableCopy=!1,this.justCopiedHash=!1}async copyHash(){this.disableCopy||(await navigator.clipboard.writeText(this.strHash),this.timeout&&clearTimeout(this.timeout),this.justCopiedHash=!0,this._tooltip.show(),this.timeout=setTimeout(()=>{this._tooltip.hide(),setTimeout(()=>{this.justCopiedHash=!1},100)},2e3))}get strHash(){return Me(this.hash)}updated(e){var o,i;super.updated(e),(e.has("hash")&&((o=e.get("hash"))==null?void 0:o.toString())!==((i=this.hash)==null?void 0:i.toString())||e.has("size")||e.has("value"))&&Wo({hash:this.hash,size:this.size},this._canvas)}renderCanvas(){return x` <canvas
      id="canvas"
      width="1"
      height="1"
      class=${Q({square:this.shape==="square",circle:this.shape==="circle"})}
    ></canvas>`}render(){return x`<div
      @click=${()=>this.copyHash()}
      style="${this.disableCopy?"":"cursor: pointer;"} flex-grow: 0"
    >
      <sl-tooltip
        id="tooltip"
        placement="top"
        .content=${this.justCopiedHash?Ft("Copied!"):`${this.strHash.substring(0,6)}...`}
        .trigger=${this.disableTooltip||this.justCopiedHash?"manual":"hover focus"}
        hoist
      >
        ${this.renderCanvas()}
      </sl-tooltip>
    </div>`}static get styles(){return V`
      :host {
        display: flex;
      }

      .square {
        border-radius: 0%;
      }
      .circle {
        border-radius: 50%;
      }
    `}};Y([f(ue("hash"))],I.prototype,"hash",void 0);Y([f({type:Number})],I.prototype,"size",void 0);Y([f({type:String})],I.prototype,"shape",void 0);Y([f({type:Boolean,attribute:"disable-tooltip"})],I.prototype,"disableTooltip",void 0);Y([f({type:Boolean,attribute:"disable-copy"})],I.prototype,"disableCopy",void 0);Y([j("#canvas")],I.prototype,"_canvas",void 0);Y([j("#tooltip")],I.prototype,"_tooltip",void 0);Y([de()],I.prototype,"justCopiedHash",void 0);I=Y([Xt(),Lt("holo-identicon")],I);var Ho=V`
  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: var(--sl-color-neutral-400);
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-0);
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
  }

  .avatar--circle,
  .avatar--circle .avatar__image {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded,
  .avatar--rounded .avatar__image {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`,K=class extends lt{constructor(){super(...arguments),this.hasError=!1,this.image="",this.label="",this.initials="",this.loading="eager",this.shape="circle"}handleImageChange(){this.hasError=!1}render(){const t=x`
      <img
        part="image"
        class="avatar__image"
        src="${this.image}"
        loading="${this.loading}"
        alt=""
        @error="${()=>this.hasError=!0}"
      />
    `;let e=x``;return this.initials?e=x`<div part="initials" class="avatar__initials">${this.initials}</div>`:e=x`
        <div part="icon" class="avatar__icon" aria-hidden="true">
          <slot name="icon">
            <sl-icon name="person-fill" library="system"></sl-icon>
          </slot>
        </div>
      `,x`
      <div
        part="base"
        class=${Q({avatar:!0,"avatar--circle":this.shape==="circle","avatar--rounded":this.shape==="rounded","avatar--square":this.shape==="square"})}
        role="img"
        aria-label=${this.label}
      >
        ${this.image&&!this.hasError?t:e}
      </div>
    `}};K.styles=[at,Ho];K.dependencies={"sl-icon":Te};u([de()],K.prototype,"hasError",2);u([f()],K.prototype,"image",2);u([f()],K.prototype,"label",2);u([f()],K.prototype,"initials",2);u([f()],K.prototype,"loading",2);u([f({reflect:!0})],K.prototype,"shape",2);u([gt("image")],K.prototype,"handleImageChange",1);K.define("sl-avatar");let ot=class extends he(Ot){constructor(){super(...arguments),this.size=32,this.disableTooltip=!1,this.disableCopy=!1}renderIdenticon(){return x` <div
      style=${Gt({position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
    >
      <holo-identicon
        .disableCopy=${this.disableCopy}
        .disableTooltip=${this.disableTooltip}
        .hash=${this.agentPubKey}
        .size=${this.size}
      >
      </holo-identicon>
      <div class="badge"><slot name="badge"></slot></div>
    </div>`}renderProfile(e){if(!e||!e.entry.fields.avatar)return this.renderIdenticon();const o=x`
      <div
        style=${Gt({cursor:this.disableCopy?"":"pointer",position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
      >
        <sl-avatar
          .image=${e.entry.fields.avatar}
          style="--size: ${this.size}px;"
          @click=${()=>this.dispatchEvent(new CustomEvent("profile-clicked",{composed:!0,bubbles:!0,detail:{agentPubKey:this.agentPubKey}}))}
        >
        </sl-avatar>
        <div class="badge"><slot name="badge"></slot></div>
      </div>
    `;return x`
      <sl-tooltip
        id="tooltip"
        placement="top"
        .trigger=${this.disableTooltip?"manual":"hover focus"}
        hoist
        .content=${e.entry.nickname}
      >
        ${o}
      </sl-tooltip>
    `}render(){if(this.store.config.avatarMode==="identicon")return this.renderIdenticon();const e=this.store.profiles.get(this.agentPubKey).get();switch(e.status){case"pending":return x`<sl-skeleton
          effect="pulse"
          style="height: ${this.size}px; width: ${this.size}px"
        ></sl-skeleton>`;case"completed":return this.renderProfile(e.value);case"error":return x`
          <display-error
            tooltip
            .headline=${Ft("Error fetching the agent's avatar")}
            .error=${e.error}
          ></display-error>
        `}}};ot.styles=[Ht,V`
      .badge {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    `];ct([f(ue("agent-pub-key"))],ot.prototype,"agentPubKey",void 0);ct([f({type:Number})],ot.prototype,"size",void 0);ct([f({type:Boolean,attribute:"disable-tooltip"})],ot.prototype,"disableTooltip",void 0);ct([f({type:Boolean,attribute:"disable-copy"})],ot.prototype,"disableCopy",void 0);ct([pe({context:We,subscribe:!0}),f()],ot.prototype,"store",void 0);ot=ct([Xt(),Lt("agent-avatar")],ot);var Fo=V`
  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`,vt=class extends lt{constructor(){super(...arguments),this.variant="primary",this.pill=!1,this.pulse=!1}render(){return x`
      <span
        part="base"
        class=${Q({badge:!0,"badge--primary":this.variant==="primary","badge--success":this.variant==="success","badge--neutral":this.variant==="neutral","badge--warning":this.variant==="warning","badge--danger":this.variant==="danger","badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      >
        <slot></slot>
      </span>
    `}};vt.styles=[at,Fo];u([f({reflect:!0})],vt.prototype,"variant",2);u([f({type:Boolean,reflect:!0})],vt.prototype,"pill",2);u([f({type:Boolean,reflect:!0})],vt.prototype,"pulse",2);vt.define("sl-badge");var Io=V`
  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    display: flex;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    display: block;
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__body {
    display: block;
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`,Se=class extends lt{constructor(){super(...arguments),this.hasSlotController=new Oe(this,"footer","header","image")}render(){return x`
      <div
        part="base"
        class=${Q({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};Se.styles=[at,Io];Se.define("sl-card");var jo=V`
  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`,ne=new WeakMap;function $e(t){let e=ne.get(t);return e||(e=window.getComputedStyle(t,null),ne.set(t,e)),e}function Ko(t){if(typeof t.checkVisibility=="function")return t.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=$e(t);return e.visibility!=="hidden"&&e.display!=="none"}function Uo(t){const e=$e(t),{overflowY:o,overflowX:i}=e;return o==="scroll"||i==="scroll"?!0:o!=="auto"||i!=="auto"?!1:t.scrollHeight>t.clientHeight&&o==="auto"||t.scrollWidth>t.clientWidth&&i==="auto"}function Vo(t){const e=t.tagName.toLowerCase(),o=Number(t.getAttribute("tabindex"));return t.hasAttribute("tabindex")&&(isNaN(o)||o<=-1)||t.hasAttribute("disabled")||t.closest("[inert]")||e==="input"&&t.getAttribute("type")==="radio"&&!t.hasAttribute("checked")||!Ko(t)?!1:(e==="audio"||e==="video")&&t.hasAttribute("controls")||t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&t.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:Uo(t)}function qo(t){var e,o;const i=Xo(t),r=(e=i[0])!=null?e:null,n=(o=i[i.length-1])!=null?o:null;return{start:r,end:n}}function Yo(t,e){var o;return((o=t.getRootNode({composed:!0}))==null?void 0:o.host)!==e}function Xo(t){const e=new WeakMap,o=[];function i(r){if(r instanceof Element){if(r.hasAttribute("inert")||r.closest("[inert]")||e.has(r))return;e.set(r,!0),!o.includes(r)&&Vo(r)&&o.push(r),r instanceof HTMLSlotElement&&Yo(r,t)&&r.assignedElements({flatten:!0}).forEach(n=>{i(n)}),r.shadowRoot!==null&&r.shadowRoot.mode==="open"&&i(r.shadowRoot)}for(const n of r.children)i(n)}return i(t),o.sort((r,n)=>{const s=Number(r.getAttribute("tabindex"))||0;return(Number(n.getAttribute("tabindex"))||0)-s})}var $=class extends lt{constructor(){super(...arguments),this.localize=new le(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.sync=void 0,this.handleKeyDown=t=>{this.open&&t.key==="Escape"&&(t.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=t=>{var e;if(t.key==="Escape"&&this.open&&!this.closeWatcher){t.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(t.key==="Tab"){if(this.open&&((e=document.activeElement)==null?void 0:e.tagName.toLowerCase())==="sl-menu-item"){t.preventDefault(),this.hide(),this.focusOnTrigger();return}setTimeout(()=>{var o,i,r;const n=((o=this.containingElement)==null?void 0:o.getRootNode())instanceof ShadowRoot?(r=(i=document.activeElement)==null?void 0:i.shadowRoot)==null?void 0:r.activeElement:document.activeElement;(!this.containingElement||(n==null?void 0:n.closest(this.containingElement.tagName.toLowerCase()))!==this.containingElement)&&this.hide()})}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=t=>{const e=t.target;!this.stayOpenOnSelect&&e.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const t=this.trigger.assignedElements({flatten:!0})[0];typeof(t==null?void 0:t.focus)=="function"&&t.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find(t=>t.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key)){t.preventDefault(),this.handleTriggerClick();return}const e=this.getMenu();if(e){const o=e.getAllItems(),i=o[0],r=o[o.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),o.length>0&&this.updateComplete.then(()=>{(t.key==="ArrowDown"||t.key==="Home")&&(e.setCurrentItem(i),i.focus()),(t.key==="ArrowUp"||t.key==="End")&&(e.setCurrentItem(r),r.focus())}))}}handleTriggerKeyUp(t){t.key===" "&&t.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const e=this.trigger.assignedElements({flatten:!0}).find(i=>qo(i).start);let o;if(e){switch(e.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":o=e.button;break;default:o=e}o.setAttribute("aria-haspopup","true"),o.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,$t(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,$t(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((t=this.closeWatcher)==null||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(t=this.closeWatcher)==null||t.destroy()}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await At(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes:t,options:e}=St(this,"dropdown.show",{dir:this.localize.dir()});await zt(this.popup.popup,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await At(this);const{keyframes:t,options:e}=St(this,"dropdown.hide",{dir:this.localize.dir()});await zt(this.popup.popup,t,e),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return x`
      <sl-popup
        part="base"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        sync=${Le(this.sync?this.sync:void 0)}
        class=${Q({dropdown:!0,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <div aria-hidden=${this.open?"false":"true"} aria-labelledby="dropdown">
          <slot part="panel" class="dropdown__panel"></slot>
        </div>
      </sl-popup>
    `}};$.styles=[at,jo];$.dependencies={"sl-popup":_};u([j(".dropdown")],$.prototype,"popup",2);u([j(".dropdown__trigger")],$.prototype,"trigger",2);u([j(".dropdown__panel")],$.prototype,"panel",2);u([f({type:Boolean,reflect:!0})],$.prototype,"open",2);u([f({reflect:!0})],$.prototype,"placement",2);u([f({type:Boolean,reflect:!0})],$.prototype,"disabled",2);u([f({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],$.prototype,"stayOpenOnSelect",2);u([f({attribute:!1})],$.prototype,"containingElement",2);u([f({type:Number})],$.prototype,"distance",2);u([f({type:Number})],$.prototype,"skidding",2);u([f({type:Boolean})],$.prototype,"hoist",2);u([f({reflect:!0})],$.prototype,"sync",2);u([gt("open",{waitUntilFirstUpdate:!0})],$.prototype,"handleOpenChange",1);Dt("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});Dt("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});$.define("sl-dropdown");Re.define("sl-spinner");var Go=Object.defineProperty,Jo=Object.getOwnPropertyDescriptor,ze=(t,e,o,i)=>{for(var r=i>1?void 0:i?Jo(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&Go(e,o,r),r};let Tt=class extends he(Ot){render(){const t=Ne([this.notificationsStore.unreadNotifications$.get(),this.notificationsStore.readNotifications$.get()]);switch(t.status){case"pending":return x`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-skeleton></sl-skeleton>
				</div>`;case"error":return x`<display-error
					tooltip
					.headline=${Ft("Error fetching the notifications")}
					.error=${t.error}
				></display-error>`;case"completed":const[e,o]=t.value;return x`
					<sl-dropdown
						placement="bottom-end"
						distance="8"
						@sl-hide=${()=>this.notificationsStore.client.markNotificationsAsRead(Array.from(e.keys()))}
					>
						<div slot="trigger" style="position: relative;">
							<sl-icon-button
								slot="anchor"
								style="font-size: 1.5rem"
								.src=${ce(De)}
							>
							</sl-icon-button>
							${e.size+o.size>0?x`
										<sl-badge
											style="position: absolute; left: 16px; top: 0px; z-index: 1000"
											pill
											.variant=${e.size>0?"primary":"neutral"}
											.pulse=${e.size>0}
											>${e.size+o.size}</sl-badge
										>
									`:x``}
						</div>
						<sl-card style="--padding: 0; width: 500x;">
							<my-notifications-list style="flex: 1"></my-notifications-list>
						</sl-card>
					</sl-dropdown>
				`}}};Tt.styles=[Ht];ze([pe({context:He,subscribe:!0})],Tt.prototype,"notificationsStore",2);Tt=ze([Xt(),Lt("my-notifications-icon-button")],Tt);export{Tt as MyNotificationsIconButton};
