import{S as s,i as t,s as e,e as a,c as r,a as n,d as c,D as l,b as o,f as $,E as i,F as f,G as d,H as u,A as m,j as p,m as h,o as g,x as v,u as w,v as x,k as E,t as k,n as y,g as b,r as I,w as D,h as N,I as V,J as M,K as A,L as P,M as T}from"../chunks/vendor-3e20c35d.js";import{m as j,s as G,t as R,M as H,G as S,B as _,a as U,n as B,f as W,w as Y,i as F}from"../chunks/wallet-ac05ce9d.js";function J(s){let t,e,u,m,p;return{c(){t=a("button"),e=a("img"),this.h()},l(s){t=r(s,"BUTTON",{class:!0});var a=n(t);e=r(a,"IMG",{src:!0,alt:!0,class:!0}),a.forEach(c),this.h()},h(){l(e.src,u=s[0])||o(e,"src",u),o(e,"alt","darkmode toggle"),o(e,"class","toggle svelte-1schddc"),o(t,"class","svelte-1schddc")},m(s,a){$(s,t,a),i(t,e),m||(p=f(t,"click",R),m=!0)},p(s,[t]){1&t&&!l(e.src,u=s[0])&&o(e,"src",u)},i:d,o:d,d(s){s&&c(t),m=!1,p()}}}function K(s,t,e){let a,r;return u(s,j,(s=>e(1,r=s))),m((()=>{G()})),s.$$.update=()=>{2&s.$$.dirty&&e(0,a="dark"===r?"/_app/assets/dark-toggle-22a24a62.svg":"/_app/assets/light-toggle-e860bf5e.svg")},[a,r]}class L extends s{constructor(s){super(),t(this,s,K,J,e,{})}}function O(s){let t;return{c(){t=k("Unsupported network")},l(s){t=b(s,"Unsupported network")},m(s,e){$(s,t,e)},d(s){s&&c(t)}}}function q(s){let t;return{c(){t=k("Ethereum Mainnet")},l(s){t=b(s,"Ethereum Mainnet")},m(s,e){$(s,t,e)},d(s){s&&c(t)}}}function z(s){let t;return{c(){t=k("Nahmii Mainnet")},l(s){t=b(s,"Nahmii Mainnet")},m(s,e){$(s,t,e)},d(s){s&&c(t)}}}function C(s){let t;return{c(){t=k("Ropsten Testnet")},l(s){t=b(s,"Ropsten Testnet")},m(s,e){$(s,t,e)},d(s){s&&c(t)}}}function Q(s){let t;return{c(){t=k("Nahmii Testnet")},l(s){t=b(s,"Nahmii Testnet")},m(s,e){$(s,t,e)},d(s){s&&c(t)}}}function X(s){let t,e,l,f,d,u,m,I,D,N,V,M,A,P,T,j,G,R,H,U,B,W,Y;return t=new S({props:{$$slots:{default:[O]},$$scope:{ctx:s}}}),N=new _({props:{$$slots:{default:[q]},$$scope:{ctx:s}}}),N.$on("click",s[0]),P=new _({props:{$$slots:{default:[z]},$$scope:{ctx:s}}}),P.$on("click",s[1]),R=new _({props:{$$slots:{default:[C]},$$scope:{ctx:s}}}),R.$on("click",s[2]),W=new _({props:{$$slots:{default:[Q]},$$scope:{ctx:s}}}),W.$on("click",s[3]),{c(){p(t.$$.fragment),e=E(),l=a("p"),f=k("Your active network is not supported!"),d=E(),u=a("p"),m=k("Switch to one of the supported networks:"),I=E(),D=a("div"),p(N.$$.fragment),V=E(),M=a("div"),A=E(),p(P.$$.fragment),T=E(),j=a("div"),G=E(),p(R.$$.fragment),H=E(),U=a("div"),B=E(),p(W.$$.fragment),this.h()},l(s){h(t.$$.fragment,s),e=y(s),l=r(s,"P",{class:!0});var a=n(l);f=b(a,"Your active network is not supported!"),a.forEach(c),d=y(s),u=r(s,"P",{class:!0});var o=n(u);m=b(o,"Switch to one of the supported networks:"),o.forEach(c),I=y(s),D=r(s,"DIV",{class:!0});var $=n(D);h(N.$$.fragment,$),V=y($),M=r($,"DIV",{class:!0}),n(M).forEach(c),A=y($),h(P.$$.fragment,$),T=y($),j=r($,"DIV",{class:!0}),n(j).forEach(c),G=y($),h(R.$$.fragment,$),H=y($),U=r($,"DIV",{class:!0}),n(U).forEach(c),B=y($),h(W.$$.fragment,$),$.forEach(c),this.h()},h(){o(l,"class","modal-text svelte-o35tw1"),o(u,"class","modal-text svelte-o35tw1"),o(M,"class","spacer svelte-o35tw1"),o(j,"class","spacer svelte-o35tw1"),o(U,"class","spacer svelte-o35tw1"),o(D,"class","buttons svelte-o35tw1")},m(s,a){g(t,s,a),$(s,e,a),$(s,l,a),i(l,f),$(s,d,a),$(s,u,a),i(u,m),$(s,I,a),$(s,D,a),g(N,D,null),i(D,V),i(D,M),i(D,A),g(P,D,null),i(D,T),i(D,j),i(D,G),g(R,D,null),i(D,H),i(D,U),i(D,B),g(W,D,null),Y=!0},p(s,e){const a={};16&e&&(a.$$scope={dirty:e,ctx:s}),t.$set(a);const r={};16&e&&(r.$$scope={dirty:e,ctx:s}),N.$set(r);const n={};16&e&&(n.$$scope={dirty:e,ctx:s}),P.$set(n);const c={};16&e&&(c.$$scope={dirty:e,ctx:s}),R.$set(c);const l={};16&e&&(l.$$scope={dirty:e,ctx:s}),W.$set(l)},i(s){Y||(v(t.$$.fragment,s),v(N.$$.fragment,s),v(P.$$.fragment,s),v(R.$$.fragment,s),v(W.$$.fragment,s),Y=!0)},o(s){w(t.$$.fragment,s),w(N.$$.fragment,s),w(P.$$.fragment,s),w(R.$$.fragment,s),w(W.$$.fragment,s),Y=!1},d(s){x(t,s),s&&c(e),s&&c(l),s&&c(d),s&&c(u),s&&c(I),s&&c(D),x(N),x(P),x(R),x(W)}}}function Z(s){let t,e;return t=new H({props:{footer:!1,$$slots:{default:[X]},$$scope:{ctx:s}}}),{c(){p(t.$$.fragment)},l(s){h(t.$$.fragment,s)},m(s,a){g(t,s,a),e=!0},p(s,[e]){const a={};16&e&&(a.$$scope={dirty:e,ctx:s}),t.$set(a)},i(s){e||(v(t.$$.fragment,s),e=!0)},o(s){w(t.$$.fragment,s),e=!1},d(s){x(t,s)}}}function ss(s){return[()=>U("0x1"),()=>U("0x15af"),()=>U("0x3"),()=>U("0x15b1")]}class ts extends s{constructor(s){super(),t(this,s,ss,Z,e,{})}}function es(s){let t,e;return t=new ts({}),{c(){p(t.$$.fragment)},l(s){h(t.$$.fragment,s)},m(s,a){g(t,s,a),e=!0},i(s){e||(v(t.$$.fragment,s),e=!0)},o(s){w(t.$$.fragment,s),e=!1},d(s){x(t,s)}}}function as(s){let t,e,l,f,d,u,m,p,h=!s[1]&&es();return{c(){h&&h.c(),t=E(),e=a("div"),l=a("p"),f=k(s[0]),d=E(),u=a("p"),m=k("Network"),this.h()},l(a){h&&h.l(a),t=y(a),e=r(a,"DIV",{class:!0});var o=n(e);l=r(o,"P",{class:!0});var $=n(l);f=b($,s[0]),$.forEach(c),d=y(o),u=r(o,"P",{class:!0});var i=n(u);m=b(i,"Network"),i.forEach(c),o.forEach(c),this.h()},h(){o(l,"class","network-text network-name svelte-nnx9yp"),o(u,"class","network-text info svelte-nnx9yp"),o(e,"class","network svelte-nnx9yp")},m(s,a){h&&h.m(s,a),$(s,t,a),$(s,e,a),i(e,l),i(l,f),i(e,d),i(e,u),i(u,m),p=!0},p(s,[e]){s[1]?h&&(I(),w(h,1,1,(()=>{h=null})),D()):h?2&e&&v(h,1):(h=es(),h.c(),v(h,1),h.m(t.parentNode,t)),(!p||1&e)&&N(f,s[0])},i(s){p||(v(h),p=!0)},o(s){w(h),p=!1},d(s){h&&h.d(s),s&&c(t),s&&c(e)}}}function rs(s,t,e){let a,r,n;const c=B.subscribe((async s=>{a=await W(s),e(0,r=a.chainName),e(1,n=a.isSupported)}));return V((()=>{c()})),[r,n]}class ns extends s{constructor(s){super(),t(this,s,rs,as,e,{})}}function cs(s){let t,e,f,u,m,p,h,g,v,w;return{c(){t=a("div"),e=a("img"),u=E(),m=a("div"),p=a("p"),h=k(s[1]),g=E(),v=a("p"),w=k("Wallet"),this.h()},l(a){t=r(a,"DIV",{class:!0});var l=n(t);e=r(l,"IMG",{class:!0,src:!0,alt:!0}),u=y(l),m=r(l,"DIV",{class:!0});var o=n(m);p=r(o,"P",{class:!0});var $=n(p);h=b($,s[1]),$.forEach(c),g=y(o),v=r(o,"P",{class:!0});var i=n(v);w=b(i,"Wallet"),i.forEach(c),o.forEach(c),l.forEach(c),this.h()},h(){o(e,"class","wallet-icon svelte-290pmy"),l(e.src,f="https://avatars.dicebear.com/api/jdenticon/"+s[0]+".svg")||o(e,"src",f),o(e,"alt","Autogenerated wallet icon"),o(p,"class","address svelte-290pmy"),o(v,"class","info svelte-290pmy"),o(m,"class","content svelte-290pmy"),o(t,"class","wallet svelte-290pmy")},m(s,a){$(s,t,a),i(t,e),i(t,u),i(t,m),i(m,p),i(p,h),i(m,g),i(m,v),i(v,w)},p(s,[t]){1&t&&!l(e.src,f="https://avatars.dicebear.com/api/jdenticon/"+s[0]+".svg")&&o(e,"src",f),2&t&&N(h,s[1])},i:d,o:d,d(s){s&&c(t)}}}function ls(s,t,e){let a,{address:r="0x"}=t;const n=Y.subscribe((s=>{e(0,r=s[0])}));return V((()=>{n()})),s.$$set=s=>{"address"in s&&e(0,r=s.address)},s.$$.update=()=>{var t;1&s.$$.dirty&&e(1,a="".concat((t=r).slice(0,7),"...",t.slice(-5)))},[r,a]}class os extends s{constructor(s){super(),t(this,s,ls,cs,e,{address:0})}}function $s(s){let t,e,l,f,d,u,m,k,b;return f=new ns({}),k=new os({}),{c(){t=a("div"),e=a("hr"),l=E(),p(f.$$.fragment),d=E(),u=a("hr"),m=E(),p(k.$$.fragment),this.h()},l(s){t=r(s,"DIV",{class:!0});var a=n(t);e=r(a,"HR",{class:!0}),l=y(a),h(f.$$.fragment,a),d=y(a),u=r(a,"HR",{class:!0}),m=y(a),h(k.$$.fragment,a),a.forEach(c),this.h()},h(){o(e,"class","divider svelte-88drs7"),o(u,"class","svelte-88drs7"),o(t,"class","network-wallet svelte-88drs7")},m(s,a){$(s,t,a),i(t,e),i(t,l),g(f,t,null),i(t,d),i(t,u),i(t,m),g(k,t,null),b=!0},i(s){b||(v(f.$$.fragment,s),v(k.$$.fragment,s),b=!0)},o(s){w(f.$$.fragment,s),w(k.$$.fragment,s),b=!1},d(s){s&&c(t),x(f),x(k)}}}function is(s){let t,e,f,d,u,m,k,b,N,V,M;N=new L({});let A=s[0]&&$s();return{c(){t=a("header"),e=a("nav"),f=a("div"),d=a("a"),u=a("img"),k=E(),b=a("div"),p(N.$$.fragment),V=E(),A&&A.c(),this.h()},l(s){t=r(s,"HEADER",{class:!0});var a=n(t);e=r(a,"NAV",{class:!0});var l=n(e);f=r(l,"DIV",{class:!0});var o=n(f);d=r(o,"A",{href:!0,class:!0});var $=n(d);u=r($,"IMG",{src:!0,alt:!0,class:!0}),$.forEach(c),o.forEach(c),k=y(l),b=r(l,"DIV",{class:!0});var i=n(b);h(N.$$.fragment,i),i.forEach(c),l.forEach(c),V=y(a),A&&A.l(a),a.forEach(c),this.h()},h(){l(u.src,m="/_app/assets/nahmii-logo-ab5aa1e4.png")||o(u,"src","/_app/assets/nahmii-logo-ab5aa1e4.png"),o(u,"alt","Nahmii"),o(u,"class","svelte-88drs7"),o(d,"href","https://nahmii.io"),o(d,"class","svelte-88drs7"),o(f,"class","corner svelte-88drs7"),o(b,"class","corner svelte-88drs7"),o(e,"class","svelte-88drs7"),o(t,"class","svelte-88drs7")},m(s,a){$(s,t,a),i(t,e),i(e,f),i(f,d),i(d,u),i(e,k),i(e,b),g(N,b,null),i(t,V),A&&A.m(t,null),M=!0},p(s,[e]){s[0]?A?1&e&&v(A,1):(A=$s(),A.c(),v(A,1),A.m(t,null)):A&&(I(),w(A,1,1,(()=>{A=null})),D())},i(s){M||(v(N.$$.fragment,s),v(A),M=!0)},o(s){w(N.$$.fragment,s),w(A),M=!1},d(s){s&&c(t),x(N),A&&A.d()}}}function fs(s,t,e){let a=!0;return F.subscribe((s=>{e(0,a=s)})),[a]}class ds extends s{constructor(s){super(),t(this,s,fs,is,e,{})}}function us(s){let t,e,l,o;t=new ds({});const i=s[1].default,f=M(i,s,s[0],null);return{c(){p(t.$$.fragment),e=E(),l=a("main"),f&&f.c()},l(s){h(t.$$.fragment,s),e=y(s),l=r(s,"MAIN",{});var a=n(l);f&&f.l(a),a.forEach(c)},m(s,a){g(t,s,a),$(s,e,a),$(s,l,a),f&&f.m(l,null),o=!0},p(s,[t]){f&&f.p&&(!o||1&t)&&A(f,i,s,s[0],o?T(i,s[0],t,null):P(s[0]),null)},i(s){o||(v(t.$$.fragment,s),v(f,s),o=!0)},o(s){w(t.$$.fragment,s),w(f,s),o=!1},d(s){x(t,s),s&&c(e),s&&c(l),f&&f.d(s)}}}function ms(s,t,e){let{$$slots:a={},$$scope:r}=t;return s.$$set=s=>{"$$scope"in s&&e(0,r=s.$$scope)},[r,a]}class ps extends s{constructor(s){super(),t(this,s,ms,us,e,{})}}export{ps as default};
