import{S as y,i as p,s as k,L as v,e as C,c as B,a as T,d as _,b as c,f as h,F as E,N,O as q,P as O,x as S,u as j,I as w,t as z,g as D,h as F}from"./vendor-9691cc84.js";function I(l){let e;return{c(){e=z(l[0])},l(i){e=D(i,l[0])},m(i,a){h(i,e,a)},p(i,a){a&1&&F(e,i[0])},d(i){i&&_(e)}}}function L(l){let e,i,a,d,m;const u=l[7].default,f=v(u,l,l[6],null),n=f||I(l);return{c(){e=C("button"),n&&n.c(),this.h()},l(t){e=B(t,"BUTTON",{style:!0,class:!0});var s=T(e);n&&n.l(s),s.forEach(_),this.h()},h(){e.disabled=l[1],c(e,"style",i=""+((l[2]?`height: ${l[2]};`:"")+" "+(l[3]?`margin: ${l[3]};`:"")+" "+(l[4]?`padding: ${l[4]};`:""))),c(e,"class","svelte-qozs0h")},m(t,s){h(t,e,s),n&&n.m(e,null),a=!0,d||(m=E(e,"click",l[5]),d=!0)},p(t,[s]){f?f.p&&(!a||s&64)&&N(f,u,t,t[6],a?O(u,t[6],s,null):q(t[6]),null):n&&n.p&&(!a||s&1)&&n.p(t,a?s:-1),(!a||s&2)&&(e.disabled=t[1]),(!a||s&28&&i!==(i=""+((t[2]?`height: ${t[2]};`:"")+" "+(t[3]?`margin: ${t[3]};`:"")+" "+(t[4]?`padding: ${t[4]};`:""))))&&c(e,"style",i)},i(t){a||(S(n,t),a=!0)},o(t){j(n,t),a=!1},d(t){t&&_(e),n&&n.d(t),d=!1,m()}}}function P(l){const e=document.createElement("div");e.className="ripple",document.body.appendChild(e),e.style.left=`${l.clientX}px`,e.style.top=`${l.clientY}px`,e.style.animation="ripple-effect 400ms linear",e.onanimationend=()=>document.body.removeChild(e)}function R(l,e,i){let{$$slots:a={},$$scope:d}=e,{text:m="Click me"}=e,{disabled:u=!1}=e,{height:f=""}=e,{margin:n=""}=e,{padding:t=""}=e,s,r=!1;const g=w();function b(o){r||(r=!0,P(o),clearTimeout(s),s=setTimeout(()=>{r=!1},2e3),g("click",{}))}return l.$$set=o=>{"text"in o&&i(0,m=o.text),"disabled"in o&&i(1,u=o.disabled),"height"in o&&i(2,f=o.height),"margin"in o&&i(3,n=o.margin),"padding"in o&&i(4,t=o.padding),"$$scope"in o&&i(6,d=o.$$scope)},[m,u,f,n,t,b,d,a]}class X extends y{constructor(e){super();p(this,e,R,L,k,{text:0,disabled:1,height:2,margin:3,padding:4})}}export{X as B};